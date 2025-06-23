
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Settings, Save } from 'lucide-react';

interface EmailSettingsData {
  id: string;
  resend_api_key: string | null;
  from_email: string;
  from_name: string;
  created_at: string;
  updated_at: string;
}

const EmailSettings = () => {
  const [settings, setSettings] = useState<EmailSettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    resend_api_key: '',
    from_email: '',
    from_name: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('email_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings(data);
        setFormData({
          resend_api_key: data.resend_api_key || '',
          from_email: data.from_email,
          from_name: data.from_name
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch email settings.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (settings) {
        // Update existing settings
        const { error } = await supabase
          .from('email_settings')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        // Insert new settings
        const { error } = await supabase
          .from('email_settings')
          .insert([formData]);

        if (error) throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Email settings saved successfully.'
      });

      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save email settings.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Email Settings</h3>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
          <CardDescription>
            Configure your email sending settings. You'll need a Resend API key to send emails.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Resend API Key
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.resend_api_key}
                  onChange={(e) => setFormData({ ...formData, resend_api_key: e.target.value })}
                  placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxx"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from{' '}
                  <a 
                    href="https://resend.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    resend.com/api-keys
                  </a>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    From Email
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.from_email}
                    onChange={(e) => setFormData({ ...formData, from_email: e.target.value })}
                    placeholder="noreply@kuelper-kanzlei.de"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be a verified domain in Resend
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    From Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.from_name}
                    onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
                    placeholder="Kuelper Kanzlei"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-500">
                {settings ? (
                  <>Last updated: {new Date(settings.updated_at).toLocaleString()}</>
                ) : (
                  'No settings configured yet'
                )}
              </div>
              <Button type="submit" disabled={isSaving} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>• You need to verify your domain in Resend before sending emails</p>
          <p>• The from email must match a verified domain</p>
          <p>• Free Resend accounts have a daily sending limit</p>
          <p>• Rate limiting is configured per email bot in the Bots tab</p>
          <p>• Test your settings with a small campaign first</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSettings;
