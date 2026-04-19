"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Shield, User, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navLinks = [
    { name: 'DASHBOARD', href: '/dashboard' },
    { name: 'URGENT NEEDS', href: '/needs' },
    { name: 'DISCOVER', href: '/discover' },
    { name: 'VOLUNTEERS', href: '/volunteers' },
  ];

  return (
    <nav className="w-full border-b-2 border-black sticky top-0 bg-white z-50">
      <div className="max-w-[1550px] mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand p-1.5 border-2 border-black group-hover:rotate-12 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter italic uppercase underline decoration-brand decoration-4">ImpactFlow</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="font-black text-[11px] tracking-[0.2em] text-black/50 hover:text-brand transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 mr-4">
             <div className="w-2 h-2 rounded-full bg-green-500"></div>
             <span className="text-[10px] font-black uppercase text-black/30 tracking-widest text-nowrap">System Sync: Live</span>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-2 border-2 border-black bg-slate-50 cursor-pointer hover:bg-white transition-all">
                <User className="w-4 h-4 text-brand" />
                <span className="text-[10px] font-black uppercase truncate max-w-[100px]">{user.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 border-2 border-black hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="hidden md:inline-flex">LOGIN</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">JOIN NETWORK</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
