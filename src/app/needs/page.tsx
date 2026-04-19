"use client";

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { NeedCard } from '@/components/molecules/NeedCard';
import { NeedService, Need } from '@/services/needs';
import { Button } from '@/components/atoms/Button';
import { Filter, Search, ChevronDown, Loader2 } from 'lucide-react';

export default function NeedsPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNeeds() {
      try {
        const data = await NeedService.getAll();
        setNeeds(data);
      } catch (err) {
        setError('Failed to load community needs.');
      } finally {
        setLoading(false);
      }
    }
    fetchNeeds();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1550px] mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-black pb-12">
           <div>
              <h1 className="text-7xl font-black tracking-tighter italic mb-4">COMMUNITY NEEDS</h1>
              <p className="text-black/50 font-bold uppercase tracking-widest text-sm max-w-xl leading-relaxed">
                Live stream of requirements from localized reports. 
                Data synchronized via Supabase Edge.
              </p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative border-2 border-black flex items-center px-4 bg-slate-50 min-w-[300px]">
                 <Search className="w-4 h-4 text-black/40" />
                 <input 
                    type="text" 
                    placeholder="Search by location..." 
                    className="bg-transparent border-none outline-none p-3 w-full text-xs font-bold uppercase tracking-widest"
                 />
              </div>
              <Button className="gap-2">
                 <Filter className="w-4 h-4" /> FILTERS
              </Button>
           </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 animate-spin text-brand mb-4" />
            <p className="font-black text-xs uppercase tracking-widest opacity-20">Accessing Data Cluster...</p>
          </div>
        ) : error ? (
          <div className="p-12 border-2 border-red-600 bg-red-50 text-red-600 font-black text-center uppercase">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {needs.map((need) => (
               <NeedCard 
                  key={need.id}
                  title={need.title}
                  location={need.location}
                  urgency={need.urgency_level || 'MEDIUM'}
                  tags={need.tags || []}
                  createdAt={need.created_at ? new Date(need.created_at).toLocaleDateString() : 'Recent'}
               />
            ))}
            
            {needs.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-black/10 p-20 text-center flex flex-col items-center">
                <p className="text-xl font-black italic opacity-20 uppercase">No active needs detected in this sector.</p>
                <Button variant="outline" className="mt-8">MANUALLY ADD REPORT</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
