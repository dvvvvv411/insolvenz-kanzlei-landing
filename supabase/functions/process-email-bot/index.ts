
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

// Optimized Base64 encoding function with memory management
async function blobToBase64Optimized(blob: Blob): Promise<string> {
  console.log(`🔧 Starting optimized Base64 conversion for ${blob.size} bytes`);
  
  try {
    // Use streaming approach for large files
    const stream = blob.stream();
    const reader = stream.getReader();
    let base64 = '';
    let totalProcessed = 0;
    const chunkSize = 3 * 1024; // 3KB chunks for optimal base64 encoding (divisible by 3)
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // Convert chunk to base64
      const chunkArray = Array.from(value);
      const chunkString = String.fromCharCode(...chunkArray);
      base64 += btoa(chunkString);
      
      totalProcessed += value.length;
      
      // Log progress for large files
      if (totalProcessed % (50 * 1024) === 0) {
        console.log(`📊 Base64 progress: ${totalProcessed}/${blob.size} bytes (${Math.round(totalProcessed/blob.size*100)}%)`);
      }
    }
    
    console.log(`✅ Base64 encoding completed: ${base64.length} characters`);
    return base64;
    
  } catch (error: any) {
    console.error(`❌ Optimized Base64 encoding failed: ${error.message}`);
    throw error;
  }
}

// Enhanced PDF attachment preparation with multiple methods and validation
async function preparePdfAttachment(pdfData: Blob, fileName: string) {
  console.log(`🔄 Preparing PDF attachment: ${fileName} (${pdfData.size} bytes)`);
  
  // Validate file size (Resend limit is 40MB total for all attachments)
  const maxFileSize = 25 * 1024 * 1024; // 25MB to be safe
  if (pdfData.size > maxFileSize) {
    throw new Error(`PDF file too large: ${pdfData.size} bytes (max: ${maxFileSize} bytes)`);
  }
  
  // Method 1: Try optimized Base64 encoding (Resend preferred method)
  try {
    console.log('📝 Attempting optimized Base64 encoding...');
    const base64Content = await blobToBase64Optimized(pdfData);
    
    const attachment = {
      filename: fileName,
      content: base64Content,
      type: 'application/pdf',
      disposition: 'attachment' as const
    };
    
    console.log(`✅ Optimized Base64 encoding successful: ${fileName}`);
    return { attachment, method: 'base64_optimized' };
    
  } catch (base64Error: any) {
    console.warn(`⚠️ Optimized Base64 encoding failed: ${base64Error.message}`);
    
    // Method 2: Try Buffer approach (Node.js compatible)
    try {
      console.log('🔄 Trying Buffer-based conversion...');
      const arrayBuffer = await pdfData.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      
      // Convert to base64 using standard approach
      let binary = '';
      const chunkSize = 8192; // 8KB chunks
      
      for (let i = 0; i < buffer.length; i += chunkSize) {
        const chunk = buffer.slice(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, Array.from(chunk));
      }
      
      const base64Content = btoa(binary);
      
      const attachment = {
        filename: fileName,
        content: base64Content,
        type: 'application/pdf',
        disposition: 'attachment' as const
      };
      
      console.log(`✅ Buffer conversion successful: ${fileName} (${base64Content.length} chars)`);
      return { attachment, method: 'buffer_base64' };
      
    } catch (bufferError: any) {
      console.warn(`⚠️ Buffer conversion failed: ${bufferError.message}`);
      
      // Method 3: Direct ArrayBuffer to Base64 (alternative approach)
      try {
        console.log('🔄 Trying direct ArrayBuffer conversion...');
        const arrayBuffer = await pdfData.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        
        // Use TextDecoder for binary data
        const decoder = new TextDecoder('latin1');
        const binaryString = decoder.decode(bytes);
        const base64Content = btoa(binaryString);
        
        const attachment = {
          filename: fileName,
          content: base64Content,
          type: 'application/pdf',
          disposition: 'attachment' as const
        };
        
        console.log(`✅ ArrayBuffer conversion successful: ${fileName}`);
        return { attachment, method: 'arraybuffer_base64' };
        
      } catch (arrayBufferError: any) {
        console.error(`❌ All conversion methods failed. Last error: ${arrayBufferError.message}`);
        throw new Error(`Failed to convert PDF to attachment format: ${arrayBufferError.message}`);
      }
    }
  }
}

// Enhanced email validation and sending
async function sendEmailWithValidation(resend: any, emailData: any, recipientEmail: string, fileName?: string) {
  console.log(`🚀 Sending email to ${recipientEmail} with validation`);
  
  // Pre-send validation
  if (emailData.attachments && emailData.attachments.length > 0) {
    const attachment = emailData.attachments[0];
    console.log(`📎 Validating attachment: ${attachment.filename}`);
    console.log(`📊 Attachment size: ${attachment.content?.length || 0} characters`);
    console.log(`📋 Attachment type: ${attachment.type}`);
    console.log(`📌 Attachment disposition: ${attachment.disposition}`);
    
    // Validate attachment structure
    if (!attachment.filename || !attachment.content || !attachment.type) {
      throw new Error('Invalid attachment structure: missing required fields');
    }
    
    // Validate base64 content
    if (typeof attachment.content === 'string') {
      try {
        // Test base64 validity by attempting to decode a small portion
        const testChunk = attachment.content.substring(0, 100);
        atob(testChunk);
        console.log(`✅ Base64 content validation passed`);
      } catch (b64Error) {
        throw new Error('Invalid base64 content in attachment');
      }
    }
  }
  
  // Send email with enhanced error handling
  try {
    const emailResponse = await resend.emails.send(emailData);
    
    // Check for Resend API errors
    if (!emailResponse || emailResponse.error) {
      const errorMsg = emailResponse?.error?.message || 'Unknown Resend API error';
      throw new Error(`Resend API error: ${errorMsg}`);
    }
    
    // Validate successful response
    if (!emailResponse.data || !emailResponse.data.id) {
      throw new Error('Invalid response from Resend API: missing email ID');
    }
    
    console.log(`✅ Email sent successfully with ID: ${emailResponse.data.id}`);
    return emailResponse;
    
  } catch (sendError: any) {
    console.error(`❌ Email send failed: ${sendError.message}`);
    throw sendError;
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bot_id }: ProcessBotRequest = await req.json();
    console.log(`🤖 Processing bot: ${bot_id}`);

    // Get bot details
    const { data: bot, error: botError } = await supabase
      .from('email_bots')
      .select('*')
      .eq('id', bot_id)
      .single();

    if (botError || !bot) {
      console.error('❌ Bot not found:', botError);
      await logToDB(bot_id, 'error', 'Bot not found during processing', { error: botError?.message });
      return new Response(JSON.stringify({ error: 'Bot not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📊 Bot status: ${bot.status}, emails sent: ${bot.emails_sent}/${bot.total_recipients}`);

    // Check if bot is still running
    if (bot.status !== 'running') {
      console.log(`⏹️ Bot ${bot_id} is not running, status: ${bot.status}`);
      return new Response(JSON.stringify({ message: 'Bot is not running' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if bot has completed all emails
    if (bot.emails_sent >= bot.total_recipients) {
      console.log('✅ All emails sent - marking bot as completed');
      
      await supabase
        .from('email_bots')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      await logToDB(bot_id, 'info', 'All emails sent - bot completed', { total_sent: bot.emails_sent });

      return new Response(JSON.stringify({ message: 'All emails sent - bot completed' }), {
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
      console.error('⚙️ Email settings not configured:', settingsError);
      
      await supabase
        .from('email_bots')
        .update({
          status: 'failed',
          error_message: 'Email settings not configured - missing Resend API key',
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      await logToDB(bot_id, 'error', 'Email settings not configured', { error: 'Missing Resend API key' });

      return new Response(JSON.stringify({ error: 'Email settings not configured' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📧 Email settings found: from ${emailSettings.from_email}`);

    // Get template details
    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', bot.template_id)
      .single();

    if (templateError || !template) {
      console.error('📄 Template not found:', templateError);
      
      await supabase
        .from('email_bots')
        .update({
          status: 'failed',
          error_message: 'Template not found',
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      await logToDB(bot_id, 'error', 'Template not found', { template_id: bot.template_id, error: templateError?.message });

      return new Response(JSON.stringify({ error: 'Template not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📄 Template found: "${template.name}"`);

    // Get next recipient to send to
    let recipientEmail = '';
    let recipientName = '';
    
    if (bot.recipient_source_type === 'list') {
      console.log(`👥 Getting recipient from list: ${bot.recipient_source_id}, position: ${bot.emails_sent}`);
      
      const { data: recipients, error: recipientsError } = await supabase
        .from('recipients')
        .select('email, first_name, last_name')
        .eq('list_id', bot.recipient_source_id)
        .range(bot.emails_sent, bot.emails_sent);

      if (recipientsError) {
        console.error('❌ Error fetching recipients:', recipientsError);
        await logToDB(bot_id, 'error', 'Failed to fetch recipients', { error: recipientsError.message });
        return new Response(JSON.stringify({ error: 'Failed to fetch recipients' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (!recipients || recipients.length === 0) {
        console.log('✅ No more recipients to process for list');
        
        await supabase
          .from('email_bots')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', bot_id);

        await logToDB(bot_id, 'info', 'All emails sent - bot completed', { total_sent: bot.emails_sent });

        return new Response(JSON.stringify({ message: 'All emails sent' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const recipient = recipients[0];
      recipientEmail = recipient.email;
      recipientName = [recipient.first_name, recipient.last_name].filter(Boolean).join(' ');
    } else if (bot.recipient_source_type === 'batch') {
      console.log(`📧 Getting email from batch: ${bot.recipient_source_id}, position: ${bot.emails_sent}`);
      
      const { data: batchEmails, error: batchError } = await supabase
        .from('batch_emails')
        .select('email')
        .eq('batch_id', bot.recipient_source_id)
        .eq('is_valid', true)
        .range(bot.emails_sent, bot.emails_sent);

      if (batchError) {
        console.error('❌ Error fetching batch emails:', batchError);
        await logToDB(bot_id, 'error', 'Failed to fetch batch emails', { error: batchError.message });
        return new Response(JSON.stringify({ error: 'Failed to fetch batch emails' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (!batchEmails || batchEmails.length === 0) {
        console.log('✅ No more emails to process for batch');
        
        await supabase
          .from('email_bots')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', bot_id);

        await logToDB(bot_id, 'info', 'All emails sent - bot completed', { total_sent: bot.emails_sent });

        return new Response(JSON.stringify({ message: 'All emails sent' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      recipientEmail = batchEmails[0].email;
      recipientName = recipientEmail.split('@')[0];
    }

    console.log(`📮 Preparing to send email to: ${recipientEmail} (${recipientName})`);

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
      console.log(`🚀 Sending email to ${recipientEmail} with subject: "${emailSubject}"`);
      
      // Prepare email data
      const emailData: any = {
        from: `${emailSettings.from_name} <${emailSettings.from_email}>`,
        to: [recipientEmail],
        subject: emailSubject,
        html: emailContent,
      };

      let attachmentMethod = 'none';
      let attachmentSuccess = false;

      // Add PDF attachment if template has one
      if (template.pdf_file_path && template.pdf_file_name) {
        console.log(`📎 Processing PDF attachment: ${template.pdf_file_name}`);
        
        try {
          // Download the PDF from Supabase Storage
          console.log(`⬇️ Downloading PDF from storage: ${template.pdf_file_path}`);
          const { data: pdfData, error: storageError } = await supabase.storage
            .from('email-pdfs')
            .download(template.pdf_file_path);

          if (storageError) {
            console.error('❌ Storage download error:', storageError);
            throw new Error(`Storage download failed: ${storageError.message}`);
          }

          if (!pdfData) {
            throw new Error('PDF data is empty or null');
          }

          console.log(`✅ PDF downloaded successfully, size: ${pdfData.size} bytes, type: ${pdfData.type}`);

          // Prepare PDF attachment with enhanced methods
          const { attachment, method } = await preparePdfAttachment(pdfData, template.pdf_file_name);
          attachmentMethod = method;
          
          emailData.attachments = [attachment];
          attachmentSuccess = true;
          
          console.log(`✅ PDF attachment prepared successfully using ${method}: ${template.pdf_file_name}`);

        } catch (attachmentError: any) {
          console.error('❌ PDF attachment processing failed:', attachmentError);
          
          // Log the attachment error but continue without attachment
          await logToDB(bot_id, 'warning', `PDF attachment failed for ${recipientEmail}: ${attachmentError.message}`, {
            recipient: recipientEmail,
            pdf_file_name: template.pdf_file_name,
            pdf_file_path: template.pdf_file_path,
            error: attachmentError.message,
            error_stack: attachmentError.stack
          });

          // For now, fail the email if attachment fails - this ensures we catch issues
          throw new Error(`Email send aborted due to attachment failure: ${attachmentError.message}`);
        }
      }

      // Send email with enhanced validation
      const emailResponse = await sendEmailWithValidation(resend, emailData, recipientEmail, template.pdf_file_name);

      console.log(`✅ Email sent successfully to ${recipientEmail}:`, emailResponse);

      // Update bot progress
      await supabase
        .from('email_bots')
        .update({
          emails_sent: bot.emails_sent + 1,
          last_activity_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      // Log success with detailed attachment info
      await logToDB(bot_id, 'success', `Email sent successfully to ${recipientEmail}`, {
        recipient: recipientEmail,
        subject: emailSubject,
        resend_id: emailResponse.data?.id,
        progress: `${bot.emails_sent + 1}/${bot.total_recipients}`,
        has_attachment: attachmentSuccess,
        attachment_method: attachmentMethod,
        attachment_filename: template.pdf_file_name || null,
        attachment_size: template.pdf_file_size || null
      });

      // Calculate delay for next email based on rate limit
      const secondsBetweenEmails = 60 / bot.emails_per_minute;
      const delayMs = Math.max(1000, secondsBetweenEmails * 1000); // At least 1 second delay

      // Check if there are more emails to send
      const newEmailsSent = bot.emails_sent + 1;
      if (newEmailsSent < bot.total_recipients) {
        console.log(`⏰ Scheduling next email in ${delayMs}ms (${secondsBetweenEmails} seconds) for bot ${bot_id}`);
        
        // Schedule the next email send using a background task
        EdgeRuntime.waitUntil(scheduleNextEmail(bot_id, delayMs));
      } else {
        console.log(`🎉 Bot ${bot_id} has sent all emails (${newEmailsSent}/${bot.total_recipients})`);
      }

      return new Response(JSON.stringify({ 
        success: true, 
        recipient: recipientEmail,
        emails_sent: newEmailsSent,
        total_recipients: bot.total_recipients,
        progress: `${newEmailsSent}/${bot.total_recipients}`,
        next_email_in_seconds: newEmailsSent < bot.total_recipients ? secondsBetweenEmails : null,
        has_attachment: attachmentSuccess,
        attachment_method: attachmentMethod,
        attachment_filename: template.pdf_file_name || null
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (emailError: any) {
      console.error(`❌ Failed to send email to ${recipientEmail}:`, emailError);

      // Update bot with failed email count
      await supabase
        .from('email_bots')
        .update({
          emails_failed: bot.emails_failed + 1,
          last_activity_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', bot_id);

      // Log failure with detailed error info
      await logToDB(bot_id, 'error', `Failed to send email to ${recipientEmail}`, {
        recipient: recipientEmail,
        error: emailError.message,
        subject: emailSubject,
        error_code: emailError.code,
        error_stack: emailError.stack,
        attachment_attempted: !!template.pdf_file_name
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
    console.error('💥 Critical error in process-email-bot function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

// Function to schedule the next email send
async function scheduleNextEmail(botId: string, delayMs: number) {
  console.log(`⏰ Waiting ${delayMs}ms before sending next email for bot ${botId}`);
  
  await new Promise(resolve => setTimeout(resolve, delayMs));
  
  try {
    console.log(`🔄 Triggering next email for bot ${botId}`);
    
    // Make a recursive call to send the next email
    const response = await fetch(`${supabaseUrl}/functions/v1/process-email-bot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`
      },
      body: JSON.stringify({ bot_id: botId })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`❌ Failed to trigger next email for bot ${botId}:`, errorData);
      await logToDB(botId, 'error', 'Failed to trigger next email in sequence', { 
        status: response.status, 
        error: errorData 
      });
    } else {
      const result = await response.json();
      console.log(`✅ Successfully triggered next email for bot ${botId}:`, result);
    }
  } catch (error: any) {
    console.error(`💥 Error scheduling next email for bot ${botId}:`, error);
    await logToDB(botId, 'error', 'Error in email scheduling sequence', { error: error.message });
  }
}

// Helper function to log to database
async function logToDB(bot_id: string, level: string, message: string, details?: any) {
  try {
    await supabase
      .from('email_bot_logs')
      .insert({
        bot_id: bot_id,
        level: level,
        message: message,
        details: details || {}
      });
  } catch (error) {
    console.error('Failed to log to database:', error);
  }
}

serve(handler);
