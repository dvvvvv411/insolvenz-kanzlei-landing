
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Trash2, FileText, Mail, CheckCircle, XCircle } from 'lucide-react';

interface EmailBatch {
  id: string;
  name: string;
  file_name: string;
  total_emails: number;
  valid_emails: number;
  invalid_emails: number;
  created_at: string;
}

interface BatchEmail {
  id: string;
  email: string;
  is_valid: boolean;
  error_message: string | null;
}

interface EmailBatchListProps {
  refreshTrigger: number;
}

const EmailBatchList: React.FC<EmailBatchListProps> = ({ refreshTrigger }) => {
  const [batches, setBatches] = useState<EmailBatch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [batchEmails, setBatchEmails] = useState<BatchEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEmails, setIsLoadingEmails] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, [refreshTrigger]);

  useEffect(() => {
    if (selectedBatch) {
      fetchBatchEmails(selectedBatch);
    }
  }, [selectedBatch]);

  const fetchBatches = async () => {
    try {
      const { data, error } = await supabase
        .from('email_batches')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBatches(data || []);
    } catch (error) {
      console.error('Error fetching batches:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch email batches.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBatchEmails = async (batchId: string) => {
    setIsLoadingEmails(true);
    try {
      const { data, error } = await supabase
        .from('batch_emails')
        .select('*')
        .eq('batch_id', batchId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBatchEmails(data || []);
    } catch (error) {
      console.error('Error fetching batch emails:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch batch emails.',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingEmails(false);
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (!confirm('Are you sure you want to delete this batch and all its emails?')) return;

    try {
      const { error } = await supabase
        .from('email_batches')
        .delete()
        .eq('id', batchId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Batch deleted successfully.'
      });

      if (selectedBatch === batchId) {
        setSelectedBatch(null);
        setBatchEmails([]);
      }
      fetchBatches();
    } catch (error) {
      console.error('Error deleting batch:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete batch.',
        variant: 'destructive'
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading email batches...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Batches List */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold">Email Batches</h4>
        
        {batches.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No email batches found.</p>
            </CardContent>
          </Card>
        ) : (
          batches.map((batch) => (
            <Card 
              key={batch.id} 
              className={`cursor-pointer transition-colors ${
                selectedBatch === batch.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBatch(batch.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{batch.name}</CardTitle>
                    <CardDescription className="mt-1">
                      File: {batch.file_name}
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{batch.total_emails} total</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{batch.valid_emails} valid</span>
                      </span>
                      {batch.invalid_emails > 0 && (
                        <span className="flex items-center space-x-1">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span>{batch.invalid_emails} invalid</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(batch.created_at)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBatch(batch.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      {/* Batch Emails */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold">
          Batch Emails {selectedBatch && `(${batchEmails.length})`}
        </h4>
        
        {!selectedBatch ? (
          <Card>
            <CardContent className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a batch to view emails</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {isLoadingEmails ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Loading emails...</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {batchEmails.map((email) => (
                  <Card key={email.id}>
                    <CardContent className="py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{email.email}</p>
                          {!email.is_valid && email.error_message && (
                            <p className="text-sm text-red-600">
                              Error: {email.error_message}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {email.is_valid ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {batchEmails.length === 0 && !isLoadingEmails && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No emails found in this batch.</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailBatchList;
