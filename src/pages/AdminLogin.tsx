
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

interface AdminLoginForm {
  email: string;
  password: string;
}

interface AdminRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const loginForm = useForm<AdminLoginForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const registerForm = useForm<AdminRegisterForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    // Check if user is already logged in and is admin
    const checkAdminSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data: isAdmin } = await supabase.rpc('is_admin_user', { 
          user_email: session.user.email 
        });
        if (isAdmin) {
          navigate('/admin');
        }
      }
    };
    
    checkAdminSession();
  }, [navigate]);

  const onLogin = async (values: AdminLoginForm) => {
    setIsLoading(true);
    
    try {
      // First check if this email is an admin
      const { data: isAdmin, error: adminCheckError } = await supabase.rpc('is_admin_user', { 
        user_email: values.email 
      });

      if (adminCheckError) {
        throw new Error('Error checking admin status');
      }

      if (!isAdmin) {
        toast({
          title: 'Access Denied',
          description: 'You are not authorized to access the admin panel.',
          variant: 'destructive'
        });
        return;
      }

      // Try to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Login Failed',
            description: 'Invalid email or password.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Login Failed',
            description: error.message,
            variant: 'destructive'
          });
        }
        return;
      }

      if (data.user) {
        // Update last login timestamp
        await supabase.rpc('update_admin_last_login', { 
          user_email: values.email 
        });

        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin panel!'
        });
        
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (values: AdminRegisterForm) => {
    if (values.password !== values.confirmPassword) {
      toast({
        title: 'Registration Failed',
        description: 'Passwords do not match.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // First create the auth user
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (error) {
        toast({
          title: 'Registration Failed',
          description: error.message,
          variant: 'destructive'
        });
        return;
      }

      if (data.user) {
        // Add the user to the admin_users table
        const { error: adminError } = await supabase
          .from('admin_users')
          .insert([{ email: values.email }]);

        if (adminError) {
          console.error('Error adding admin user:', adminError);
          toast({
            title: 'Registration Warning',
            description: 'Account created but admin privileges may not be active. Please contact support.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Registration Successful',
            description: 'Your admin account has been created. Please check your email to confirm your account.',
          });
          
          // Clear the form
          registerForm.reset();
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription>
            Sign in or register for admin access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="admin@kuelper-kanzlei.de"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    rules={{
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="email"
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your-email@kuelper-kanzlei.de"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    rules={{
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    rules={{
                      required: 'Please confirm your password',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Admin Account'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
