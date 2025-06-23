
-- Create table for email batches
CREATE TABLE public.email_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_name TEXT NOT NULL,
  total_emails INTEGER NOT NULL DEFAULT 0,
  valid_emails INTEGER NOT NULL DEFAULT 0,
  invalid_emails INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for batch emails
CREATE TABLE public.batch_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id UUID NOT NULL REFERENCES public.email_batches(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  is_valid BOOLEAN NOT NULL DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_batch_emails_batch_id ON public.batch_emails(batch_id);
CREATE INDEX idx_batch_emails_valid ON public.batch_emails(is_valid);
