"use client";

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Shield, Mail, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        // Fetch profile to redirect
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        router.push(profile?.role === 'ngo' ? '/dashboard' : '/needs');
      }
    } catch (err: any) {
      setError(err.message);
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
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Clearance Login</h1>
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-2">Resume Impact Operations</p>
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
              placeholder="EMAIL ADDRESS" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black p-4 pl-12 text-xs font-black uppercase tracking-widest focus:bg-slate-50 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
            <input 
              type="password" 
              placeholder="PASSWORD" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-black p-4 pl-12 text-xs font-black uppercase tracking-widest focus:bg-slate-50 outline-none"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-14 text-sm gap-3">
             {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM'}
          </Button>
        </form>

        <p className="text-center mt-8 text-[10px] font-bold text-black/40 uppercase tracking-widest">
          New to the network? <Link href="/auth/signup" className="text-brand underline">Create account</Link>
        </p>
      </div>
    </main>
  );
}
