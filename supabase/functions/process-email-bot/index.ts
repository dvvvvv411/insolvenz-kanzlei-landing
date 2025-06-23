
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProcessBotRequest {
  bot_id: string;
}

const supabaseUrl = "https://kwsmszwrlmfnkkfavycb.supabase.co";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bot_id }: ProcessBotRequest = await req.json();
    console.log(`Processing bot: ${bot_id}`);

    // Get bot details
    const { data: bot, error: botError } = await supabase
      .from('email_bots')
      .select('*')
      .eq('id', bot_id)
      .single();

    if (botError || !bot) {
      console.error('Bot not found:', botError);
      return new Response(JSON.stringify({ error: 'Bot not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if bot is still running
    if (bot.status !== 'running') {
      console.log(`Bot ${bot_id} is not running, status: ${bot.status}`);
      return new Response(JSON.stringify({ message: 'Bot is not running' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get email settings
    const { data: emailSettings, error: settingsError } = await supabase
      .from('email_settings')
      .select('*')
      .single();

    if (settingsError || !emailSettings?.resend_api_key) {
      console.error('Email settings not configured:', settingsError);
      
      // Update bot with error
      await supabase
        .from('email_bots')
        .update({
          status: 'failed',
          error_message: 'Email settings not configured',
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      return new Response(JSON.stringify({ error: 'Email settings not configured' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get template details
    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', bot.template_id)
      .single();

    if (templateError || !template) {
      console.error('Template not found:', templateError);
      
      // Update bot with error
      await supabase
        .from('email_bots')
        .update({
          status: 'failed',
          error_message: 'Template not found',
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      return new Response(JSON.stringify({ error: 'Template not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get next recipient to send to
    let recipientEmail = '';
    let recipientName = '';
    
    if (bot.recipient_source_type === 'list') {
      // Get recipients from recipient list, skipping already sent ones
      const { data: recipients, error: recipientsError } = await supabase
        .from('recipients')
        .select('email, first_name, last_name')
        .eq('list_id', bot.recipient_source_id)
        .limit(bot.emails_sent + 1)
        .range(bot.emails_sent, bot.emails_sent);

      if (recipientsError || !recipients || recipients.length === 0) {
        console.log('No more recipients to process for list');
        
        // Mark bot as completed
        await supabase
          .from('email_bots')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', bot_id);

        return new Response(JSON.stringify({ message: 'All emails sent' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const recipient = recipients[0];
      recipientEmail = recipient.email;
      recipientName = [recipient.first_name, recipient.last_name].filter(Boolean).join(' ');
    } else if (bot.recipient_source_type === 'batch') {
      // Get emails from batch, skipping already sent ones
      const { data: batchEmails, error: batchError } = await supabase
        .from('batch_emails')
        .select('email')
        .eq('batch_id', bot.recipient_source_id)
        .eq('is_valid', true)
        .limit(bot.emails_sent + 1)
        .range(bot.emails_sent, bot.emails_sent);

      if (batchError || !batchEmails || batchEmails.length === 0) {
        console.log('No more emails to process for batch');
        
        // Mark bot as completed
        await supabase
          .from('email_bots')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', bot_id);

        return new Response(JSON.stringify({ message: 'All emails sent' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      recipientEmail = batchEmails[0].email;
      recipientName = recipientEmail.split('@')[0]; // Use email prefix as name fallback
    }

    // Initialize Resend
    const resend = new Resend(emailSettings.resend_api_key);

    // Replace template variables
    let emailContent = template.content;
    let emailSubject = template.subject;
    
    // Replace common variables
    emailContent = emailContent.replace(/\{name\}/g, recipientName || 'Valued Customer');
    emailContent = emailContent.replace(/\{email\}/g, recipientEmail);
    emailSubject = emailSubject.replace(/\{name\}/g, recipientName || 'Valued Customer');
    emailSubject = emailSubject.replace(/\{email\}/g, recipientEmail);

    try {
      // Send email using Resend
      const emailResponse = await resend.emails.send({
        from: `${emailSettings.from_name} <${emailSettings.from_email}>`,
        to: [recipientEmail],
        subject: emailSubject,
        html: emailContent,
      });

      console.log(`Email sent successfully to ${recipientEmail}:`, emailResponse);

      // Update bot progress
      await supabase
        .from('email_bots')
        .update({
          emails_sent: bot.emails_sent + 1,
          last_activity_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      // Log success
      await supabase
        .from('email_bot_logs')
        .insert({
          bot_id: bot_id,
          level: 'success',
          message: `Email sent successfully to ${recipientEmail}`,
          details: {
            recipient: recipientEmail,
            subject: emailSubject,
            resend_id: emailResponse.data?.id
          }
        });

      return new Response(JSON.stringify({ 
        success: true, 
        recipient: recipientEmail,
        emails_sent: bot.emails_sent + 1,
        total_recipients: bot.total_recipients
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (emailError: any) {
      console.error(`Failed to send email to ${recipientEmail}:`, emailError);

      // Update bot with failed email count
      await supabase
        .from('email_bots')
        .update({
          emails_failed: bot.emails_failed + 1,
          last_activity_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      // Log failure
      await supabase
        .from('email_bot_logs')
        .insert({
          bot_id: bot_id,
          level: 'error',
          message: `Failed to send email to ${recipientEmail}`,
          details: {
            recipient: recipientEmail,
            error: emailError.message,
            subject: emailSubject
          }
        });

      return new Response(JSON.stringify({ 
        error: 'Failed to send email',
        details: emailError.message,
        recipient: recipientEmail
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

  } catch (error: any) {
    console.error('Error in process-email-bot function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);
