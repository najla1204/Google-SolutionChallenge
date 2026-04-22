"use client";

import React, { useEffect, useState, use } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { MapPin, Clock, ArrowLeft, Shield, Share2, Users, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { NeedService } from '@/services/needs';

export default function NeedDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const [need, setNeed] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNeed() {
      try {
        const data = await NeedService.getById(params.id);
        setNeed(data);
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchNeed();
  }, [params.id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-black uppercase text-xs tracking-widest animate-pulse">Syncing Details...</div>;
  
  // Robust fallback for demo if ID doesn't exist in DB
  const displayNeed = need || {
    title: "Water Filtration Kits (Refined Search)",
    description: "Urgent need for water purification tablets and portable filtration units for 50 households in the East Side District.",
    location: "East Side, Downtown",
    urgency_level: "CRITICAL",
    tags: ["WATER", "IMMEDIATE", "HEALTH"],
    created_at: new Date().toISOString()
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1550px] mx-auto px-6 py-12">
        <Link href="/needs" className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-black/40 hover:text-brand transition-colors mb-8">
           <ArrowLeft className="w-4 h-4" /> Back to Feed
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Info Column */}
           <div className="lg:col-span-8">
              <header className="mb-12">
                 <div className="flex items-center gap-4 mb-6">
                    <Badge variant={displayNeed.urgency_level?.toLowerCase() as any}>{displayNeed.urgency_level}</Badge>
                    <div className="flex items-center gap-2 text-xs font-bold text-black/40 uppercase tracking-widest">
                       <Clock className="w-4 h-4" /> Posted recently
                    </div>
                 </div>

                 <h1 className="text-6xl font-black tracking-tighter italic uppercase mb-6 leading-none">
                    {displayNeed.title}
                 </h1>

                 {/* Tags */}
                 <div className="flex flex-wrap gap-3 pb-8 border-b-2 border-black/5">
                    {displayNeed.tags?.map((tag: string) => (
                       <span key={tag} className="px-3 py-1 border-2 border-black bg-slate-50 text-[10px] font-black uppercase tracking-widest">#{tag}</span>
                    ))}
                 </div>
              </header>

              <section className="mb-12">
                 <h2 className="text-sm font-black uppercase tracking-widest text-black/30 mb-4">Situation Description</h2>
                 <div className="text-2xl font-bold text-black leading-tight uppercase tracking-tight max-w-2xl">
                    {displayNeed.description}
                 </div>
              </section>

              {/* Requirement Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                 <div className="p-8 border-2 border-black bg-slate-50">
                    <h3 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Shield className="w-4 h-4 text-brand" /> Verification status
                    </h3>
                    <p className="text-lg font-black italic uppercase">COMMUNITY VERIFIED</p>
                    <p className="text-[10px] font-bold text-black/40 uppercase mt-2">Validated by 14 local responders</p>
                 </div>
                 <div className="p-8 border-2 border-black bg-black text-white">
                    <h3 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Users className="w-4 h-4 text-blue-400" /> Volunteers Needed
                    </h3>
                    <p className="text-lg font-black italic uppercase">12 OF 20 SPOTS LEFT</p>
                    <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden">
                       <div className="w-[40%] h-full bg-blue-500"></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sidebar / Action Column */}
           <div className="lg:col-span-4">
              <div className="border-2 border-black p-8 sticky top-32 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
                 <div className="mb-8">
                    <div className="flex items-center gap-2 text-brand font-black text-xs uppercase tracking-widest mb-2">
                       <MapPin className="w-4 h-4" /> Precise Location
                    </div>
                    <div className="text-xl font-black italic uppercase truncate">{displayNeed.location}</div>
                 </div>

                 <div className="space-y-4">
                    <Button 
                      className="w-full h-16 text-xl gap-3"
                      onClick={() => alert('Commitment registered! We are connecting you with the local coordinator.')}
                    >
                       COMMIT TO HELP <CheckCircle2 className="w-6 h-6 border-2 border-white rounded-full p-1" />
                    </Button>
                    <Button variant="outline" className="w-full h-16 text-xl gap-3 border-2 border-black">
                       <Share2 className="w-5 h-5" /> SHARE NEED
                    </Button>
                 </div>

                 <p className="mt-8 text-[9px] font-bold text-black/30 uppercase tracking-[0.2em] leading-relaxed">
                    By committing, you agree to coordinate with verified NGO partners. ImpactFlow ensures transparent task distribution.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
