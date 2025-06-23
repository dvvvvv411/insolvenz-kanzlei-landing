
-- Create table for email bots
CREATE TABLE public.email_bots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  template_id UUID NOT NULL REFERENCES public.email_templates(id) ON DELETE CASCADE,
  recipient_source_id UUID NOT NULL,
  recipient_source_type TEXT NOT NULL CHECK (recipient_source_type IN ('list', 'batch')),
  emails_per_minute INTEGER NOT NULL DEFAULT 10 CHECK (emails_per_minute > 0 AND emails_per_minute <= 100),
  status TEXT NOT NULL DEFAULT 'idle' CHECK (status IN ('idle', 'running', 'paused', 'completed', 'failed')),
  total_recipients INTEGER NOT NULL DEFAULT 0,
  emails_sent INTEGER NOT NULL DEFAULT 0,
  emails_failed INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_activity_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better performance
CREATE INDEX idx_email_bots_status ON public.email_bots(status);
CREATE INDEX idx_email_bots_updated_at ON public.email_bots(updated_at);

-- Create table for bot activity logs
CREATE TABLE public.email_bot_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bot_id UUID NOT NULL REFERENCES public.email_bots(id) ON DELETE CASCADE,
  level TEXT NOT NULL CHECK (level IN ('info', 'success', 'warning', 'error')),
  message TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for bot logs
CREATE INDEX idx_email_bot_logs_bot_id ON public.email_bot_logs(bot_id);
CREATE INDEX idx_email_bot_logs_created_at ON public.email_bot_logs(created_at);
