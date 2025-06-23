
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Add Row Level Security (RLS) to protect admin data
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy that allows authenticated users to view their own admin record
CREATE POLICY "Admin users can view their own record" 
  ON public.admin_users 
  FOR SELECT 
  USING (auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE email = admin_users.email));

-- Create policy that allows authenticated users to update their own admin record
CREATE POLICY "Admin users can update their own record" 
  ON public.admin_users 
  FOR UPDATE 
  USING (auth.uid() IN (SELECT auth.uid() FROM auth.users WHERE email = admin_users.email));

-- Insert a default admin user (you can change this email to your preferred admin email)
INSERT INTO public.admin_users (email) VALUES ('admin@kuelper-kanzlei.de');

-- Create function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = user_email
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update last login timestamp
CREATE OR REPLACE FUNCTION public.update_admin_last_login(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.admin_users 
  SET last_login = now(), updated_at = now()
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
