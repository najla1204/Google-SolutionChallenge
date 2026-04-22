"use client";

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      if (authData.user) {
        // Preferred method: Check profile table
        const { data: profile, error: profileError } = await (supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single() as any);

        // Self-healing: If profile is missing, create it from metadata
        if (profileError || !profile) {
          console.log('Profile missing, recreating from metadata...');
          const profileData = {
            id: authData.user.id,
            email: authData.user.email || null,
            name: authData.user.user_metadata?.name || authData.user.email?.split('@')[0] || 'User',
            role: authData.user.user_metadata?.role || 'volunteer',
            created_at: new Date().toISOString()
          };
          
          await (supabase.from('profiles') as any).upsert(profileData);
        }

        // Fallback: Check user metadata (stored during signup)
        const role = (profile?.role || authData.user.user_metadata?.role || 'volunteer').toLowerCase();
        
        console.log('Logging in with role:', role);
        router.push(role === 'ngo' ? '/dashboard' : '/needs');
      }
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setError('Network Connection Error: Please check your internet connection or if Supabase is reachable.');
        console.error('Login fetch failure:', err);
      } else {
        setError(err.message || 'An unexpected error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border-4 border-black p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-brand p-2 border-2 border-black mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Welcome Back</h1>
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-2">Sign in to continue helping your community</p>
        </div>

        {error && (
          <div className="mb-6 p-4 border-2 border-red-600 bg-red-50 text-red-600 font-bold text-xs uppercase text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black p-4 pl-12 text-sm font-medium tracking-widest focus:bg-slate-50 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Enter your password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-black p-4 pl-12 pr-12 text-sm font-medium tracking-widest focus:bg-slate-50 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-14 text-sm gap-3">
             {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-8 text-[10px] font-bold text-black/40 uppercase tracking-widest">
          New here? <Link href="/auth/signup" className="text-brand underline">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
