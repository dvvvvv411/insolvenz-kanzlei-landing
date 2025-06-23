
-- Create storage bucket for PDF attachments if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('email-pdfs', 'email-pdfs', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin users can upload PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can view PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can delete PDFs" ON storage.objects;

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

-- Create policy for edge functions to access PDFs
CREATE POLICY "Edge functions can access PDFs" ON storage.objects
FOR SELECT USING (
  bucket_id = 'email-pdfs'
);
