
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Search, Filter } from 'lucide-react';

interface EmailLog {
  id: string;
  campaign_id: string | null;
  recipient_email: string;
  status: string;
  error_message: string | null;
  sent_at: string | null;
}

interface EmailCampaign {
  id: string;
  name: string;
}

const EmailLogs = () => {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCampaign, setFilterCampaign] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsResult, campaignsResult] = await Promise.all([
        supabase
          .from('email_logs')
          .select('*')
          .order('sent_at', { ascending: false })
          .limit(100),
        supabase
          .from('email_campaigns')
          .select('id, name')
          .order('name')
      ]);

      if (logsResult.error) throw logsResult.error;
      if (campaignsResult.error) throw campaignsResult.error;

      setLogs(logsResult.data || []);
      setCampaigns(campaignsResult.data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const emailMatch = log.recipient_email.toLowerCase().includes(searchEmail.toLowerCase());
    const statusMatch = filterStatus === 'all' || log.status === filterStatus;
    const campaignMatch = filterCampaign === 'all' || log.campaign_id === filterCampaign;
    
    return emailMatch && statusMatch && campaignMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'opened': return 'bg-purple-100 text-purple-800';
      case 'clicked': return 'bg-indigo-100 text-indigo-800';
      case 'bounced': return 'bg-orange-100 text-orange-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStats = () => {
    const total = logs.length;
    const sent = logs.filter(log => log.status === 'sent').length;
    const delivered = logs.filter(log => log.status === 'delivered').length;
    const failed = logs.filter(log => log.status === 'failed' || log.status === 'bounced').length;
    const opened = logs.filter(log => log.status === 'opened').length;
    
    return { total, sent, delivered, failed, opened };
  };

  const stats = getStats();

  if (isLoading) {
    return <div className="text-center py-8">Loading email logs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <BarChart className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Email Logs & Analytics</h3>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Emails</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.sent}</p>
              <p className="text-sm text-gray-500">Sent</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
              <p className="text-sm text-gray-500">Delivered</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.opened}</p>
              <p className="text-sm text-gray-500">Opened</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              <p className="text-sm text-gray-500">Failed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Email</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="Search by email..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="opened">Opened</SelectItem>
                  <SelectItem value="clicked">Clicked</SelectItem>
                  <SelectItem value="bounced">Bounced</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Campaign</label>
              <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Email Activity</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logs.length} email logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredLogs.map((log) => {
              const campaign = campaigns.find(c => c.id === log.campaign_id);
              
              return (
                <Card key={log.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <p className="font-medium">{log.recipient_email}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {campaign && (
                          <span>Campaign: {campaign.name} • </span>
                        )}
                        {log.sent_at && (
                          <span>{new Date(log.sent_at).toLocaleString()}</span>
                        )}
                      </div>
                      {log.error_message && (
                        <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                          Error: {log.error_message}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No email logs found.</p>
              {searchEmail || filterStatus !== 'all' || filterCampaign !== 'all' ? (
                <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
              ) : (
                <p className="text-sm text-gray-400 mt-2">Logs will appear here after sending campaigns</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailLogs;
