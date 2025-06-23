
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { LogOut, Mail, Users, FileText, Settings, BarChart } from 'lucide-react';
import EmailTemplates from '@/components/email/EmailTemplates';
import RecipientLists from '@/components/email/RecipientLists';
import EmailCampaigns from '@/components/email/EmailCampaigns';
import EmailSettings from '@/components/email/EmailSettings';
import EmailLogs from '@/components/email/EmailLogs';

const AdminEmailDashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: 'Sign Out Failed',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Signed Out',
          description: 'You have been successfully signed out.'
        });
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Mail className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Email Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin')}
              >
                Back to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Email Campaign Management
          </h2>
          <p className="text-gray-600">
            Create templates, manage recipients, and send email campaigns.
          </p>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="campaigns" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger value="recipients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Recipients</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Logs</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="mt-6">
            <EmailCampaigns />
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <EmailTemplates />
          </TabsContent>

          <TabsContent value="recipients" className="mt-6">
            <RecipientLists />
          </TabsContent>

          <TabsContent value="logs" className="mt-6">
            <EmailLogs />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <EmailSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminEmailDashboard;
