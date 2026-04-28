"use client";

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Shield, Mail, Lock, User, MapPin, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'ngo' | 'volunteer'>('volunteer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Profile is created automatically by the DB trigger (handle_new_user)
        // which runs with service-role privileges — no client-side insert needed.
        router.push(role === 'ngo' ? '/dashboard' : '/needs');
      }
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setError('Network Connection Error: Please check your internet connection or if Supabase is reachable.');
        console.error('Signup fetch failure:', err);
      } else {
        setError(err.message || 'An unexpected error occurred during signup');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border-4 border-black p-10 shadow-[20px_20px_0px_0px_rgba(37,99,235,1)]">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-brand p-2 border-2 border-black mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Create Account</h1>
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-2">Join the community and start making a difference</p>
        </div>

        {error && (
          <div className="mb-6 p-4 border-2 border-red-600 bg-red-50 text-red-600 font-bold text-xs uppercase text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
            <input 
              type="text" 
              placeholder="Enter your full name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-black p-4 pl-12 text-sm font-medium tracking-widest focus:bg-slate-50 outline-none"
            />
          </div>

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
              placeholder="Create a password" 
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

          <div className="flex border-2 border-black overflow-hidden">
            <button 
              type="button"
              onClick={() => setRole('volunteer')}
              className={`flex-1 p-3 text-[10px] font-black uppercase tracking-widest transition-all ${role === 'volunteer' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
I want to volunteer
            </button>
            <button 
              type="button"
              onClick={() => setRole('ngo')}
              className={`flex-1 p-3 text-[10px] font-black uppercase tracking-widest transition-all ${role === 'ngo' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
I represent an organization
            </button>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-14 text-sm gap-3">
             {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center mt-8 text-[10px] font-bold text-black/40 uppercase tracking-widest">
          Already have an account? <Link href="/auth/login" className="text-brand underline">Sign in here</Link>
        </p>
      </div>
    </main>
  );
}
