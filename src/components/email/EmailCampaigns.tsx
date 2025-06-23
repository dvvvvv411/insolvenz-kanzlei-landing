
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Plus, Play, Pause, BarChart, Users, Upload } from 'lucide-react';

interface EmailCampaign {
  id: string;
  name: string;
  template_id: string;
  recipient_list_id: string;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  total_recipients: number | null;
  sent_count: number | null;
  created_at: string;
  updated_at: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
}

interface RecipientList {
  id: string;
  name: string;
  type: 'list';
}

interface EmailBatch {
  id: string;
  name: string;
  valid_emails: number;
  type: 'batch';
}

type RecipientSource = RecipientList | EmailBatch;

const EmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [recipientSources, setRecipientSources] = useState<RecipientSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    template_id: '',
    recipient_list_id: '',
    scheduled_at: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [campaignsResult, templatesResult, listsResult, batchesResult] = await Promise.all([
        supabase.from('email_campaigns').select('*').order('created_at', { ascending: false }),
        supabase.from('email_templates').select('id, name, subject'),
        supabase.from('recipient_lists').select('id, name'),
        supabase.from('email_batches').select('id, name, valid_emails')
      ]);

      if (campaignsResult.error) throw campaignsResult.error;
      if (templatesResult.error) throw templatesResult.error;
      if (listsResult.error) throw listsResult.error;
      if (batchesResult.error) throw batchesResult.error;

      setCampaigns(campaignsResult.data || []);
      setTemplates(templatesResult.data || []);
      
      // Combine recipient lists and email batches
      const sources: RecipientSource[] = [
        ...(listsResult.data || []).map(list => ({ ...list, type: 'list' as const })),
        ...(batchesResult.data || []).map(batch => ({ ...batch, type: 'batch' as const }))
      ];
      setRecipientSources(sources);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch campaign data.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let recipientCount = 0;
      const selectedSource = recipientSources.find(source => source.id === formData.recipient_list_id);
      
      if (selectedSource?.type === 'batch') {
        // For email batches, use the valid_emails count
        recipientCount = (selectedSource as EmailBatch).valid_emails;
      } else {
        // For recipient lists, count from recipients table
        const { count } = await supabase
          .from('recipients')
          .select('*', { count: 'exact', head: true })
          .eq('list_id', formData.recipient_list_id);
        recipientCount = count || 0;
      }

      const { error } = await supabase
        .from('email_campaigns')
        .insert([{
          ...formData,
          total_recipients: recipientCount,
          scheduled_at: formData.scheduled_at || null
        }]);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Campaign created successfully.'
      });

      setFormData({ name: '', template_id: '', recipient_list_id: '', scheduled_at: '' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: 'Error',
        description: 'Failed to create campaign.',
        variant: 'destructive'
      });
    }
  };

  const handleStatusChange = async (campaignId: string, newStatus: string) => {
    try {
      const updateData: any = { 
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      if (newStatus === 'sent') {
        updateData.sent_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('email_campaigns')
        .update(updateData)
        .eq('id', campaignId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Campaign ${newStatus} successfully.`
      });

      fetchData();
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast({
        title: 'Error',
        description: 'Failed to update campaign status.',
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecipientSourceName = (campaign: EmailCampaign) => {
    const source = recipientSources.find(s => s.id === campaign.recipient_list_id);
    if (!source) return 'Unknown';
    
    if (source.type === 'batch') {
      return `${source.name} (Email Batch)`;
    }
    return `${source.name} (Recipient List)`;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Email Campaigns</h3>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Campaign Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Monthly Newsletter"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email Template</label>
                <Select 
                  value={formData.template_id} 
                  onValueChange={(value) => setFormData({ ...formData, template_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Recipients</label>
                <Select 
                  value={formData.recipient_list_id} 
                  onValueChange={(value) => setFormData({ ...formData, recipient_list_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipientSources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        <div className="flex items-center space-x-2">
                          {source.type === 'batch' ? (
                            <Upload className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Users className="h-4 w-4 text-green-500" />
                          )}
                          <span>
                            {source.name} 
                            {source.type === 'batch' 
                              ? ` (${(source as EmailBatch).valid_emails} emails)`
                              : ' (Recipient List)'
                            }
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Schedule (Optional)</label>
                <Input
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">Create Campaign</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: '', template_id: '', recipient_list_id: '', scheduled_at: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const template = templates.find(t => t.id === campaign.template_id);
          
          return (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <CardDescription className="mt-1">
                      Template: {template?.name} | Recipients: {getRecipientSourceName(campaign)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                    {campaign.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(campaign.id, 'sent')}
                        className="flex items-center space-x-1"
                      >
                        <Play className="h-3 w-3" />
                        <span>Send</span>
                      </Button>
                    )}
                    {campaign.status === 'sending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(campaign.id, 'paused')}
                        className="flex items-center space-x-1"
                      >
                        <Pause className="h-3 w-3" />
                        <span>Pause</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total Recipients</p>
                    <p className="font-semibold">{campaign.total_recipients || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Sent Count</p>
                    <p className="font-semibold">{campaign.sent_count || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Created</p>
                    <p className="font-semibold">{new Date(campaign.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      {campaign.sent_at ? 'Sent' : campaign.scheduled_at ? 'Scheduled' : 'Status'}
                    </p>
                    <p className="font-semibold">
                      {campaign.sent_at 
                        ? new Date(campaign.sent_at).toLocaleDateString()
                        : campaign.scheduled_at 
                          ? new Date(campaign.scheduled_at).toLocaleDateString()
                          : campaign.status
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {campaigns.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No email campaigns found.</p>
            <Button onClick={() => setShowForm(true)} className="mt-4">
              Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailCampaigns;
