
-- Create email templates table
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recipient lists table
CREATE TABLE public.recipient_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recipients table
CREATE TABLE public.recipients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  list_id UUID REFERENCES public.recipient_lists(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email campaigns table
CREATE TABLE public.email_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  template_id UUID REFERENCES public.email_templates(id) NOT NULL,
  recipient_list_id UUID REFERENCES public.recipient_lists(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'paused')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  total_recipients INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email logs table
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'bounced', 'delivered', 'opened', 'clicked')),
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email settings table
CREATE TABLE public.email_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resend_api_key TEXT,
  from_email TEXT NOT NULL DEFAULT 'noreply@kuelper-kanzlei.de',
  from_name TEXT NOT NULL DEFAULT 'Kuelper Kanzlei',
  rate_limit INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipient_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin users only
CREATE POLICY "Admin users can manage email templates" ON public.email_templates
  FOR ALL USING (public.is_admin_user(auth.jwt()->>'email'));

CREATE POLICY "Admin users can manage recipient lists" ON public.recipient_lists
  FOR ALL USING (public.is_admin_user(auth.jwt()->>'email'));

CREATE POLICY "Admin users can manage recipients" ON public.recipients
  FOR ALL USING (public.is_admin_user(auth.jwt()->>'email'));

CREATE POLICY "Admin users can manage email campaigns" ON public.email_campaigns
  FOR ALL USING (public.is_admin_user(auth.jwt()->>'email'));

CREATE POLICY "Admin users can view email logs" ON public.email_logs
  FOR SELECT USING (public.is_admin_user(auth.jwt()->>'email'));

CREATE POLICY "Admin users can manage email settings" ON public.email_settings
  FOR ALL USING (public.is_admin_user(auth.jwt()->>'email'));

-- Insert default email settings
INSERT INTO public.email_settings (from_email, from_name, rate_limit) 
VALUES ('noreply@kuelper-kanzlei.de', 'Kuelper Kanzlei', 100);

-- Create indexes for better performance
CREATE INDEX idx_recipients_list_id ON public.recipients(list_id);
CREATE INDEX idx_email_logs_campaign_id ON public.email_logs(campaign_id);
CREATE INDEX idx_email_campaigns_status ON public.email_campaigns(status);
