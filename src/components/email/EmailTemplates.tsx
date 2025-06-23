
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Eye, Code, Type, Upload, FileText, X } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  pdf_file_name: string | null;
  pdf_file_path: string | null;
  pdf_file_size: number | null;
  created_at: string;
  updated_at: string;
}

const EmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: ''
  });
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch email templates.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePdfUpload = async (file: File): Promise<{ fileName: string; filePath: string; fileSize: number } | null> => {
    try {
      setUploadingPdf(true);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `pdfs/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('email-pdfs')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      return {
        fileName: file.name,
        filePath: data.path,
        fileSize: file.size
      };
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload PDF file.',
        variant: 'destructive'
      });
      return null;
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let pdfData = null;
      
      // Handle PDF upload if a file is selected
      if (selectedPdf) {
        pdfData = await handlePdfUpload(selectedPdf);
        if (!pdfData) return; // Upload failed
      }

      const templateData = {
        name: formData.name,
        subject: formData.subject,
        content: formData.content,
        ...(pdfData && {
          pdf_file_name: pdfData.fileName,
          pdf_file_path: pdfData.filePath,
          pdf_file_size: pdfData.fileSize
        }),
        updated_at: new Date().toISOString()
      };

      if (editingTemplate) {
        const { error } = await supabase
          .from('email_templates')
          .update(templateData)
          .eq('id', editingTemplate.id);

        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Template updated successfully.'
        });
      } else {
        const { error } = await supabase
          .from('email_templates')
          .insert([templateData]);

        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Template created successfully.'
        });
      }

      setFormData({ name: '', subject: '', content: '' });
      setSelectedPdf(null);
      setShowForm(false);
      setEditingTemplate(null);
      setIsHtmlMode(false);
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: 'Error',
        description: 'Failed to save template.',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      // Get template to check if it has a PDF
      const template = templates.find(t => t.id === id);
      
      // Delete PDF from storage if it exists
      if (template?.pdf_file_path) {
        await supabase.storage
          .from('email-pdfs')
          .remove([template.pdf_file_path]);
      }

      // Delete template from database
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Template deleted successfully.'
      });
      
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete template.',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      content: template.content
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ name: '', subject: '', content: '' });
    setSelectedPdf(null);
    setShowForm(false);
    setEditingTemplate(null);
    setIsHtmlMode(false);
  };

  const toggleHtmlMode = () => {
    setIsHtmlMode(!isHtmlMode);
  };

  const handlePdfFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: 'Invalid File Type',
          description: 'Please select a PDF file.',
          variant: 'destructive'
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'File Too Large',
          description: 'PDF file must be smaller than 10MB.',
          variant: 'destructive'
        });
        return;
      }
      setSelectedPdf(file);
    }
  };

  const removePdf = () => {
    setSelectedPdf(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading templates...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Email Templates</h3>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Template</span>
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTemplate ? 'Edit Template' : 'Create New Template'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Template Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Welcome Email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject Line</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Welcome to our service!"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">PDF Attachment (Optional)</label>
                <div className="space-y-2">
                  {editingTemplate?.pdf_file_name && !selectedPdf && (
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <FileText className="h-4 w-4 text-red-600" />
                      <span className="text-sm">{editingTemplate.pdf_file_name}</span>
                      <span className="text-xs text-gray-500">
                        ({editingTemplate.pdf_file_size ? formatFileSize(editingTemplate.pdf_file_size) : 'Unknown size'})
                      </span>
                    </div>
                  )}
                  
                  {selectedPdf ? (
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <FileText className="h-4 w-4 text-red-600" />
                      <span className="text-sm">{selectedPdf.name}</span>
                      <span className="text-xs text-gray-500">({formatFileSize(selectedPdf.size)})</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removePdf}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfFileSelect}
                        className="flex-1"
                      />
                      <Upload className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Upload a PDF file to attach to emails sent with this template (max 10MB)
                  </p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Email Content</label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={toggleHtmlMode}
                      className="flex items-center space-x-1"
                    >
                      {isHtmlMode ? <Type className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                      <span>{isHtmlMode ? 'Text Mode' : 'HTML Mode'}</span>
                    </Button>
                    
                    <Dialog open={showPreview} onOpenChange={setShowPreview}>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Email Preview</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm text-gray-600 mb-1">Subject:</h4>
                            <p className="text-lg font-medium">{formData.subject || 'No subject'}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-600 mb-2">Content:</h4>
                            <div className="border rounded-lg p-4 bg-white min-h-[300px]">
                              {isHtmlMode ? (
                                <div 
                                  dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content</p>' }}
                                  className="prose max-w-none"
                                />
                              ) : (
                                <div className="whitespace-pre-wrap">
                                  {formData.content || 'No content'}
                                </div>
                              )}
                            </div>
                          </div>
                          {(selectedPdf || editingTemplate?.pdf_file_name) && (
                            <div>
                              <h4 className="font-medium text-sm text-gray-600 mb-2">Attachment:</h4>
                              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                <FileText className="h-4 w-4 text-red-600" />
                                <span className="text-sm">
                                  {selectedPdf?.name || editingTemplate?.pdf_file_name}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={isHtmlMode ? 
                    "Enter your HTML content here...\n\nExample:\n<h1>Welcome!</h1>\n<p>Thank you for joining us.</p>" : 
                    "Enter your email content here..."
                  }
                  rows={isHtmlMode ? 15 : 10}
                  className={isHtmlMode ? "font-mono text-sm" : ""}
                  required
                />
                {isHtmlMode && (
                  <p className="text-xs text-gray-500 mt-1">
                    You can use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a&gt;, etc.
                  </p>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" disabled={uploadingPdf}>
                  {uploadingPdf ? 'Uploading...' : (editingTemplate ? 'Update Template' : 'Create Template')}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="mt-1">{template.subject}</CardDescription>
                  {template.pdf_file_name && (
                    <div className="flex items-center space-x-2 mt-2">
                      <FileText className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-gray-600">{template.pdf_file_name}</span>
                      <span className="text-xs text-gray-400">
                        ({template.pdf_file_size ? formatFileSize(template.pdf_file_size) : 'Unknown size'})
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-3">
                {template.content.substring(0, 200)}...
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(template.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No email templates found.</p>
            <Button onClick={() => setShowForm(true)} className="mt-4">
              Create Your First Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailTemplates;
