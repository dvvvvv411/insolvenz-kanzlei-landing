
-- Enable the pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable the pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function to process email bot queue
CREATE OR REPLACE FUNCTION process_email_bots()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    bot_record RECORD;
    time_since_last_activity INTERVAL;
    should_process BOOLEAN;
    seconds_between_emails NUMERIC;
BEGIN
    -- Loop through all running bots
    FOR bot_record IN 
        SELECT * FROM email_bots 
        WHERE status = 'running' 
        ORDER BY last_activity_at ASC NULLS FIRST
    LOOP
        -- Check if enough time has passed based on rate limit
        should_process := FALSE;
        
        -- Calculate seconds between emails based on emails per minute
        seconds_between_emails := 60.0 / bot_record.emails_per_minute;
        
        IF bot_record.last_activity_at IS NULL THEN
            -- First time running, allow processing
            should_process := TRUE;
        ELSE
            time_since_last_activity := EXTRACT(EPOCH FROM (now() - bot_record.last_activity_at));
            -- Check if enough time has passed
            IF time_since_last_activity >= seconds_between_emails THEN
                should_process := TRUE;
            END IF;
        END IF;
        
        IF should_process THEN
            -- Check if bot has completed all emails
            IF bot_record.emails_sent >= bot_record.total_recipients THEN
                -- Mark bot as completed
                UPDATE email_bots 
                SET status = 'completed', 
                    completed_at = now(),
                    updated_at = now()
                WHERE id = bot_record.id;
                
                -- Log completion
                INSERT INTO email_bot_logs (bot_id, level, message, details)
                VALUES (bot_record.id, 'info', 'Bot completed successfully', 
                        jsonb_build_object('total_sent', bot_record.emails_sent, 'total_failed', bot_record.emails_failed));
                        
                CONTINUE;
            END IF;
            
            -- Log processing attempt
            INSERT INTO email_bot_logs (bot_id, level, message, details)
            VALUES (bot_record.id, 'info', 'Processing bot - calling edge function', 
                    jsonb_build_object(
                        'emails_sent', bot_record.emails_sent, 
                        'total_recipients', bot_record.total_recipients,
                        'rate_limit_seconds', seconds_between_emails,
                        'time_since_last_activity', time_since_last_activity
                    ));
            
            -- Call the edge function to send the next email
            PERFORM net.http_post(
                url := 'https://kwsmszwrlmfnkkfavycb.supabase.co/functions/v1/process-email-bot',
                headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3c21zendybG1mbmtrZmF2eWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDY3MTUsImV4cCI6MjA2NjIyMjcxNX0.ogdGNsaD3PdQzZWukL_X63pIPpPcXsC-rsS8LBQAHyc"}'::jsonb,
                body := jsonb_build_object('bot_id', bot_record.id)
            );
        ELSE
            -- Log rate limiting
            INSERT INTO email_bot_logs (bot_id, level, message, details)
            VALUES (bot_record.id, 'info', 'Rate limited - waiting for next cycle', 
                    jsonb_build_object(
                        'seconds_between_emails', seconds_between_emails,
                        'time_since_last_activity', time_since_last_activity,
                        'emails_per_minute', bot_record.emails_per_minute
                    ));
        END IF;
    END LOOP;
END;
$$;

-- Schedule the function to run every 30 seconds
SELECT cron.schedule(
    'process-email-bots',
    '*/30 * * * * *', -- every 30 seconds
    'SELECT process_email_bots();'
);
