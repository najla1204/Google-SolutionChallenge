"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Shield, User, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    { name: 'COMMAND CENTER', href: '/dashboard' },
    { name: 'URGENT NEEDS', href: '/needs' },
    { name: 'SOCIAL DISCOVERY', href: '/discover' },
    { name: 'VERIFIED NETWORK', href: '/volunteers' },
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`font-black text-[11px] tracking-[0.2em] transition-all relative group ${
                  isActive ? 'text-brand' : 'text-black/50 hover:text-brand'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand transition-all ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            );
          })}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 mr-4">
             <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase text-black tracking-widest text-nowrap">System Sync: Active</span>
             </div>
          </div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-1 pr-4 border-2 border-black bg-slate-50 hover:bg-white transition-all group overflow-hidden"
              >
                <div className="w-10 h-10 bg-brand border-r-2 border-black flex items-center justify-center font-black text-white text-xl uppercase">
                  {(user.user_metadata?.name?.charAt(0) || user.email?.charAt(0) || 'U')}
                </div>
                <div className="flex flex-col items-start pr-2">
                   <span className="text-[10px] font-black uppercase text-black max-w-[120px] truncate">
                     {user.user_metadata?.name || user.email?.split('@')[0]}
                   </span>
                   <span className="text-[8px] font-bold text-brand uppercase tracking-widest flex items-center gap-1">
                     <span className="w-1 h-1 rounded-full bg-brand"></span>
                     {user.user_metadata?.role || 'Member'}
                   </span>
                </div>
              </button>

              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b-2 border-black bg-slate-50">
                       <p className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em] mb-1">Identity</p>
                       <p className="text-xs font-black truncate">{user.email}</p>
                    </div>
                    
                    <Link 
                      href={user.user_metadata?.role === 'ngo' ? '/dashboard' : '/needs'} 
                      className="flex items-center gap-2 p-4 text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-colors border-b-2 border-black"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" /> {user.user_metadata?.role === 'ngo' ? 'Command Center' : 'My Needs Hub'}
                    </Link>
                    
                    <button 
                      className="w-full flex items-center gap-2 p-4 text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-colors border-b-2 border-black"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="w-4 h-4" /> Switch Account
                    </button>

                    <button 
                      className="w-full flex items-center gap-2 p-4 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="w-4 h-4" /> Terminate Session
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="hidden md:inline-flex border-2 border-black font-black">LOGIN</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="font-black">JOIN NETWORK</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
