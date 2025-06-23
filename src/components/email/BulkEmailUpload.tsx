
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Upload, FileText } from 'lucide-react';

interface BulkEmailUploadProps {
  onUploadComplete: () => void;
}

const BulkEmailUpload: React.FC<BulkEmailUploadProps> = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [batchName, setBatchName] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.txt')) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a .txt file.',
        variant: 'destructive'
      });
      return;
    }

    if (!batchName.trim()) {
      toast({
        title: 'Batch Name Required',
        description: 'Please enter a name for this batch.',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      const text = await file.text();
      const emails = text
        .split('\n')
        .map(email => email.trim())
        .filter(email => email.length > 0);

      if (emails.length === 0) {
        toast({
          title: 'No Emails Found',
          description: 'The file appears to be empty or contains no valid email addresses.',
          variant: 'destructive'
        });
        return;
      }

      const validEmails: string[] = [];
      const invalidEmails: { email: string; error: string }[] = [];

      emails.forEach(email => {
        if (validateEmail(email)) {
          validEmails.push(email);
        } else {
          invalidEmails.push({ email, error: 'Invalid email format' });
        }
      });

      // Create the batch record
      const { data: batch, error: batchError } = await supabase
        .from('email_batches')
        .insert([{
          name: batchName.trim(),
          file_name: file.name,
          total_emails: emails.length,
          valid_emails: validEmails.length,
          invalid_emails: invalidEmails.length
        }])
        .select()
        .single();

      if (batchError) throw batchError;

      // Insert all emails (valid and invalid)
      const emailRecords = [
        ...validEmails.map(email => ({
          batch_id: batch.id,
          email,
          is_valid: true,
          error_message: null
        })),
        ...invalidEmails.map(({ email, error }) => ({
          batch_id: batch.id,
          email,
          is_valid: false,
          error_message: error
        }))
      ];

      const { error: emailsError } = await supabase
        .from('batch_emails')
        .insert(emailRecords);

      if (emailsError) throw emailsError;

      toast({
        title: 'Upload Successful',
        description: `Uploaded ${validEmails.length} valid emails and ${invalidEmails.length} invalid emails.`
      });

      setBatchName('');
      event.target.value = '';
      onUploadComplete();
    } catch (error) {
      console.error('Error uploading emails:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload email batch.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Bulk Email Upload</span>
        </CardTitle>
        <CardDescription>
          Upload a .txt file containing email addresses (one per line)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Batch Name</label>
          <Input
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            placeholder="Enter a name for this batch..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Upload File</label>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <FileText className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {isUploading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Processing emails...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BulkEmailUpload;
