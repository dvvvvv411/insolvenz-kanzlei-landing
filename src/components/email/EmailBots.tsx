import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { Plus, Play, Pause, Square, Bot, Activity, Clock, Mail, AlertCircle, CheckCircle, Upload, Users } from 'lucide-react';
import EmailBotTester from './EmailBotTester';

interface EmailBot {
  id: string;
  name: string;
  template_id: string;
  recipient_source_id: string;
  recipient_source_type: 'list' | 'batch';
  emails_per_minute: number;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  total_recipients: number;
  emails_sent: number;
  emails_failed: number;
  started_at: string | null;
  completed_at: string | null;
  last_activity_at: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
}

interface RecipientSource {
  id: string;
  name: string;
  type: 'list' | 'batch';
  count?: number;
}

const EmailBots = () => {
  const [bots, setBots] = useState<EmailBot[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [recipientSources, setRecipientSources] = useState<RecipientSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    template_id: '',
    recipient_source_id: '',
    emails_per_minute: 10
  });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchBots, 5000); // Update bot status every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchBots(), fetchTemplates(), fetchRecipientSources()]);
    setIsLoading(false);
  };

  const fetchBots = async () => {
    try {
      const { data, error } = await supabase
        .from('email_bots')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Ensure recipient_source_type and status are properly typed
      const typedBots = (data || []).map(bot => ({
        ...bot,
        recipient_source_type: bot.recipient_source_type as 'list' | 'batch',
        status: bot.status as 'idle' | 'running' | 'paused' | 'completed' | 'failed'
      }));
      
      setBots(typedBots);
    } catch (error) {
      console.error('Error fetching bots:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch email bots.',
        variant: 'destructive'
      });
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('id, name, subject');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchRecipientSources = async () => {
    try {
      const [listsResult, batchesResult] = await Promise.all([
        supabase.from('recipient_lists').select('id, name'),
        supabase.from('email_batches').select('id, name, valid_emails')
      ]);

      if (listsResult.error) throw listsResult.error;
      if (batchesResult.error) throw batchesResult.error;

      const sources: RecipientSource[] = [
        ...(listsResult.data || []).map(list => ({ ...list, type: 'list' as const })),
        ...(batchesResult.data || []).map(batch => ({ ...batch, type: 'batch' as const, count: batch.valid_emails }))
      ];

      setRecipientSources(sources);
    } catch (error) {
      console.error('Error fetching recipient sources:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Calculate total recipients
      let totalRecipients = 0;
      const selectedSource = recipientSources.find(source => source.id === formData.recipient_source_id);
      
      if (selectedSource?.type === 'batch') {
        totalRecipients = selectedSource.count || 0;
      } else {
        const { count } = await supabase
          .from('recipients')
          .select('*', { count: 'exact', head: true })
          .eq('list_id', formData.recipient_source_id);
        totalRecipients = count || 0;
      }

      const { error } = await supabase
        .from('email_bots')
        .insert([{
          ...formData,
          recipient_source_type: selectedSource?.type || 'list',
          total_recipients: totalRecipients
        }]);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Email bot created successfully.'
      });

      setFormData({ name: '', template_id: '', recipient_source_id: '', emails_per_minute: 10 });
      setShowForm(false);
      fetchBots();
    } catch (error) {
      console.error('Error creating bot:', error);
      toast({
        title: 'Error',
        description: 'Failed to create email bot.',
        variant: 'destructive'
      });
    }
  };

  const handleBotAction = async (botId: string, action: 'start' | 'pause' | 'stop') => {
    try {
      let updateData: any = { updated_at: new Date().toISOString() };
      
      switch (action) {
        case 'start':
          updateData.status = 'running';
          updateData.started_at = new Date().toISOString();
          // Don't set last_activity_at here - let the first processing cycle handle it
          break;
        case 'pause':
          updateData.status = 'paused';
          break;
        case 'stop':
          updateData.status = 'idle';
          break;
      }

      const { error } = await supabase
        .from('email_bots')
        .update(updateData)
        .eq('id', botId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Bot ${action}ed successfully.`
      });

      fetchBots();
    } catch (error) {
      console.error(`Error ${action}ing bot:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${action} bot.`,
        variant: 'destructive'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-4 w-4 text-green-500" />;
      case 'paused': return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Square className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (bot: EmailBot) => {
    if (bot.total_recipients === 0) return 0;
    return Math.round((bot.emails_sent / bot.total_recipients) * 100);
  };

  const getRecipientSourceName = (bot: EmailBot) => {
    const source = recipientSources.find(s => s.id === bot.recipient_source_id);
    if (!source) return 'Unknown';
    
    if (source.type === 'batch') {
      return `${source.name} (Email Batch)`;
    }
    return `${source.name} (Recipient List)`;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading email bots...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>Email Bots</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Automated email sending with rate limiting and progress tracking
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Bot</span>
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Email Bot</CardTitle>
            <CardDescription>
              Set up automated email sending with custom rate limiting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bot Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Weekly Newsletter Bot"
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
                  value={formData.recipient_source_id} 
                  onValueChange={(value) => setFormData({ ...formData, recipient_source_id: value })}
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
                              ? ` (${source.count} emails)`
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
                <label className="block text-sm font-medium mb-2">Emails per Minute (1-100)</label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.emails_per_minute}
                  onChange={(e) => setFormData({ ...formData, emails_per_minute: parseInt(e.target.value) || 10 })}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Rate limiting helps avoid spam filters and ensures deliverability
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">Create Bot</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: '', template_id: '', recipient_source_id: '', emails_per_minute: 10 });
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
        {bots.map((bot) => {
          const template = templates.find(t => t.id === bot.template_id);
          const progress = calculateProgress(bot);
          
          return (
            <div key={bot.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(bot.status)}
                        <CardTitle className="text-lg">{bot.name}</CardTitle>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bot.status)}`}>
                          {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                        </span>
                      </div>
                      <CardDescription>
                        Template: {template?.name} | Recipients: {getRecipientSourceName(bot)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {bot.status === 'idle' && (
                        <Button
                          size="sm"
                          onClick={() => handleBotAction(bot.id, 'start')}
                          className="flex items-center space-x-1"
                        >
                          <Play className="h-3 w-3" />
                          <span>Start</span>
                        </Button>
                      )}
                      {bot.status === 'running' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBotAction(bot.id, 'pause')}
                            className="flex items-center space-x-1"
                          >
                            <Pause className="h-3 w-3" />
                            <span>Pause</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBotAction(bot.id, 'stop')}
                            className="flex items-center space-x-1"
                          >
                            <Square className="h-3 w-3" />
                            <span>Stop</span>
                          </Button>
                        </>
                      )}
                      {bot.status === 'paused' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleBotAction(bot.id, 'start')}
                            className="flex items-center space-x-1"
                          >
                            <Play className="h-3 w-3" />
                            <span>Resume</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBotAction(bot.id, 'stop')}
                            className="flex items-center space-x-1"
                          >
                            <Square className="h-3 w-3" />
                            <span>Stop</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-600">
                          {bot.emails_sent} / {bot.total_recipients} ({progress}%)
                        </span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-gray-500">Sent</p>
                          <p className="font-semibold">{bot.emails_sent}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <div>
                          <p className="text-gray-500">Failed</p>
                          <p className="font-semibold">{bot.emails_failed}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-gray-500">Rate</p>
                          <p className="font-semibold">{bot.emails_per_minute}/min</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="text-gray-500">Last Activity</p>
                          <p className="font-semibold">
                            {bot.last_activity_at 
                              ? new Date(bot.last_activity_at).toLocaleTimeString()
                              : 'Never'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    {bot.error_message && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-red-800">Error</span>
                        </div>
                        <p className="text-sm text-red-700 mt-1">{bot.error_message}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Add testing component for running bots */}
              {(bot.status === 'running' || bot.status === 'idle') && (
                <EmailBotTester botId={bot.id} botName={bot.name} />
              )}
            </div>
          );
        })}
      </div>

      {bots.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No email bots found.</p>
            <Button onClick={() => setShowForm(true)} className="mt-4">
              Create Your First Bot
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailBots;
