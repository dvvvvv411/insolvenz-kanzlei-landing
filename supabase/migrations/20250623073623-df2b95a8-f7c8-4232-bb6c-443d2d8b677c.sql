
-- Add PDF attachment support to email templates
ALTER TABLE public.email_templates 
ADD COLUMN pdf_file_name TEXT,
ADD COLUMN pdf_file_path TEXT,
ADD COLUMN pdf_file_size INTEGER;

-- Create storage bucket for PDF attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('email-pdfs', 'email-pdfs', false);

-- Create RLS policies for the email-pdfs bucket
CREATE POLICY "Admin users can upload PDFs" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'email-pdfs' AND 
  public.is_admin_user(auth.jwt()->>'email')
);

CREATE POLICY "Admin users can view PDFs" ON storage.objects
FOR SELECT USING (
  bucket_id = 'email-pdfs' AND 
  public.is_admin_user(auth.jwt()->>'email')
);

CREATE POLICY "Admin users can delete PDFs" ON storage.objects
FOR DELETE USING (
  bucket_id = 'email-pdfs' AND 
  public.is_admin_user(auth.jwt()->>'email')
);
