
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Play, Loader } from 'lucide-react';

interface EmailBotTesterProps {
  botId: string;
  botName: string;
}

const EmailBotTester: React.FC<EmailBotTesterProps> = ({ botId, botName }) => {
  const [isTestingSend, setIsTestingSend] = useState(false);
  const [isTestingProcess, setIsTestingProcess] = useState(false);

  const testSingleEmail = async () => {
    setIsTestingSend(true);
    try {
      console.log('🧪 Testing single email send for bot:', botId);
      
      const { data, error } = await supabase.functions.invoke('process-email-bot', {
        body: { bot_id: botId }
      });

      if (error) {
        console.error('❌ Test email failed:', error);
        toast({
          title: 'Test Failed',
          description: `Failed to send test email: ${error.message}`,
          variant: 'destructive'
        });
      } else {
        console.log('✅ Test email response:', data);
        toast({
          title: 'Test Email Sent',
          description: data.success 
            ? `Email sent to ${data.recipient} (${data.progress})`
            : data.message || 'Test completed',
        });
      }
    } catch (error: any) {
      console.error('💥 Test email error:', error);
      toast({
        title: 'Test Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsTestingSend(false);
    }
  };

  const testProcessFunction = async () => {
    setIsTestingProcess(true);
    try {
      console.log('🧪 Testing process_email_bots function');
      
      const { error } = await supabase.rpc('process_email_bots');

      if (error) {
        console.error('❌ Process function test failed:', error);
        toast({
          title: 'Process Test Failed',
          description: `Failed to run process function: ${error.message}`,
          variant: 'destructive'
        });
      } else {
        console.log('✅ Process function test completed');
        toast({
          title: 'Process Function Tested',
          description: 'The process_email_bots function ran successfully. Check the logs for details.',
        });
      }
    } catch (error: any) {
      console.error('💥 Process function test error:', error);
      toast({
        title: 'Process Test Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsTestingProcess(false);
    }
  };

  return (
    <Card className="border-dashed border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-blue-800">Testing Tools</CardTitle>
        <CardDescription className="text-xs text-blue-600">
          Test email sending functionality for {botName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={testSingleEmail}
            disabled={isTestingSend}
            className="flex items-center space-x-1"
          >
            {isTestingSend ? (
              <Loader className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            <span>Test Single Email</span>
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={testProcessFunction}
            disabled={isTestingProcess}
            className="flex items-center space-x-1"
          >
            {isTestingProcess ? (
              <Loader className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            <span>Test Process Function</span>
          </Button>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Use these buttons to manually test the email sending process and check for issues.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmailBotTester;
