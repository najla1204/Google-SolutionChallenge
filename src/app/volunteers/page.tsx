"use client";

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { VolunteerCard } from '@/components/molecules/VolunteerCard';
import { VolunteerService } from '@/services/volunteers';
import { Button } from '@/components/atoms/Button';
import { Search, Loader2 } from 'lucide-react';

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchVolunteers() {
      try {
        const data = await VolunteerService.getAll();
        setVolunteers(data);
        setFilteredVolunteers(data);
      } catch (err) {
        setError('Failed to load volunteer network.');
      } finally {
        setLoading(false);
      }
    }
    fetchVolunteers();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = volunteers.filter(v => 
      v.profiles?.name?.toLowerCase().includes(lowerQuery) ||
      v.location?.toLowerCase().includes(lowerQuery) ||
      v.skills?.some((s: string) => s.toLowerCase().includes(lowerQuery))
    );
    setFilteredVolunteers(filtered);
  }, [searchQuery, volunteers]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1550px] mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-black pb-12">
           <div>
              <h1 className="text-7xl font-black tracking-tighter italic mb-4 uppercase">VERIFIED NETWORK</h1>
              <p className="text-black/50 font-bold uppercase tracking-widest text-sm max-w-xl leading-relaxed">
                Directory of vetted responders and specialist taskforces. 
                Manage deployments and skill distributions.
              </p>
           </div>
           
           <div className="flex gap-4">
              <div className="relative border-2 border-black flex items-center px-4 bg-slate-50 min-w-[350px]">
                 <Search className="w-4 h-4 text-black/40" />
                 <input 
                    type="text" 
                    placeholder="Search by skill or location..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none p-3 w-full text-xs font-bold uppercase tracking-widest"
                 />
              </div>
           </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 animate-spin text-brand mb-4" />
            <p className="font-black text-xs uppercase tracking-widest opacity-20">Syncing with Verified Registry...</p>
          </div>
        ) : error ? (
          <div className="p-12 border-2 border-red-600 bg-red-50 text-red-600 font-black text-center uppercase">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVolunteers.map((vol) => (
               <VolunteerCard 
                  key={vol.id}
                  name={vol.profiles?.name || 'Anonymous Responder'}
                  location={vol.location || 'Remote'}
                  skills={vol.skills || []}
                  availability={vol.availability || 'Unknown'}
               />
            ))}
            
            <div className="border-2 border-dashed border-black/20 p-8 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-2 bg-brand"></div>
               <h3 className="font-black italic text-lg mb-2 uppercase text-black/30">Add Responder</h3>
               <p className="text-[10px] font-bold text-black/20 uppercase text-center mb-6">Manually register a verified <br />specialist to the registry.</p>
               <Button variant="outline" size="sm" className="group-hover:bg-brand group-hover:text-white group-hover:border-black transition-all">INVITE TO NETWORK</Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
