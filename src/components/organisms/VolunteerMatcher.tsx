"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { UserCheck, Zap, X, MapPin, Search, Loader2, CheckCircle2 } from 'lucide-react';
import { NeedService, Need } from '@/services/needs';
import { VolunteerService } from '@/services/volunteers';
import { supabase } from '@/lib/supabase';

export const VolunteerMatcher = () => {
  const [step, setStep] = useState<'select-need' | 'matching' | 'review' | 'success'>('select-need');
  const [needs, setNeeds] = useState<Need[]>([]);
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNeeds() {
      const data = await NeedService.getAll();
      setNeeds(data.slice(0, 5));
    }
    fetchNeeds();
  }, []);

  const startMatching = async (need: Need) => {
      setSelectedNeed(need);
      setStep('matching');
      setLoading(true);
      
      try {
        // Simulated latency for AI 'feel'
        await new Promise(resolve => setTimeout(resolve, 1500));
        const matchedVolunteers = await VolunteerService.findMatches(need.location, need.tags || []);
        setMatches(matchedVolunteers.slice(0, 2));
        setStep('review');
      } catch (error) {
        console.error('Matching failed:', error);
        setStep('select-need');
      } finally {
        setLoading(false);
      }
  };

  const handleDeploy = async (volunteerId: string) => {
    if (!selectedNeed) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.from('tasks').insert({
        need_id: selectedNeed.id,
        volunteer_id: volunteerId,
        status: 'assigned'
      });
      
      if (error) throw error;
      setStep('success');
    } catch (err) {
      console.error('Deployment failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col min-h-[500px]">
      <div className="p-6 border-b-2 border-black flex items-center justify-between bg-white sticky top-0 z-10">
        <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Intelligence <br />Matcher</h3>
        {step !== 'select-need' && !loading && (
           <button onClick={() => setStep('select-need')} className="p-1 border-2 border-black hover:bg-black/5">
              <X className="w-4 h-4" />
           </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {step === 'select-need' && (
           <div className="space-y-6">
              <div className="relative border-2 border-black/10 px-3 flex items-center bg-slate-50">
                 <Search className="w-3 h-3 text-black/20" />
                 <input type="text" placeholder="Search specific need..." className="bg-transparent border-none text-[10px] uppercase font-black p-2 w-full outline-none" />
              </div>

              <div>
                 <div className="text-[9px] font-black tracking-widest text-black/30 mb-4 uppercase">Select active need to match</div>
                 <div className="space-y-3">
                    {needs.length > 0 ? needs.map((need) => (
                       <div 
                          key={need.id} 
                          onClick={() => startMatching(need)}
                          className="p-4 border-2 border-black hover:border-brand cursor-pointer group transition-all bg-white hover:bg-brand/5"
                       >
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="font-black text-xs uppercase leading-tight group-hover:text-brand italic">{need.title}</h4>
                             <Badge variant={(need.urgency_level?.toLowerCase() as any) || 'medium'} className="text-[8px] border-none">
                               {need.urgency_level}
                             </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] font-bold text-black/40">
                             <MapPin className="w-2.5 h-2.5" /> {need.location}
                          </div>
                       </div>
                    )) : (
                      <p className="text-[10px] uppercase font-black text-black/20 italic">No live needs available.</p>
                    )}
                 </div>
              </div>
           </div>
        )}

        {step === 'matching' && (
           <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="relative mb-8">
                 <div className="w-20 h-20 border-2 border-black rounded-full animate-ping absolute opacity-20 bg-brand"></div>
                 <div className="w-20 h-20 border-4 border-black flex items-center justify-center bg-white relative">
                    <Zap className="w-10 h-10 text-brand fill-brand animate-pulse" />
                 </div>
              </div>
              <h4 className="text-xl font-black italic uppercase tracking-tighter">Analyzing Resources</h4>
              <p className="text-[10px] font-black text-black/30 uppercase mt-2 tracking-widest">Cross-referencing skills & proximity...</p>
           </div>
        )}

        {step === 'review' && (
           <div className="space-y-6">
              <div className="p-3 bg-brand/5 border-2 border-brand/20 mb-6">
                 <p className="text-[8px] font-black uppercase text-brand/40 mb-1">Target Need</p>
                 <p className="text-xs font-black italic uppercase">{selectedNeed?.title}</p>
                 <p className="text-[9px] font-bold text-black/40 mt-1 uppercase tracking-tight">{selectedNeed?.location}</p>
              </div>

              <div className="text-[9px] font-black tracking-widest text-brand mb-4 uppercase">Recommended Responders</div>
              
              <div className="space-y-4">
                 {matches.length > 0 ? matches.map((vol, idx) => (
                    <div key={vol.id} className="border-2 border-black p-4 bg-white relative">
                       <div className={`absolute top-[-10px] right-[-10px] text-[8px] font-black px-2 py-0.5 border-2 border-black ${idx === 0 ? 'bg-brand text-white rotate-3' : 'bg-white text-black -rotate-2'}`}>
                          {idx === 0 ? 'BEST MATCH' : 'ALTERNATIVE'}
                       </div>
                       
                       <div className="flex items-start gap-3 mb-4">
                          <div className="w-8 h-8 border-2 border-black bg-slate-50 flex items-center justify-center shrink-0">
                             <UserCheck className="w-5 h-5" />
                          </div>
                          <div>
                             <div className="font-black text-xs uppercase tracking-tighter">{vol.profiles?.name || 'Anonymous'}</div>
                             <div className="flex flex-wrap gap-1 mt-1">
                                {vol.skills?.slice(0, 2).map((s: string) => <span key={s} className="text-[8px] font-bold text-black/40 lowercase">#{s}</span>)}
                             </div>
                          </div>
                       </div>
                       
                       <Button 
                        size="sm" 
                        disabled={loading}
                        onClick={() => handleDeploy(vol.id)} 
                        className="w-full text-[9px] py-2 h-auto"
                       >
                          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'DEPLOY RESPONDER'}
                       </Button>
                    </div>
                 )) : (
                   <div className="py-8 text-center border-2 border-dashed border-black/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/20">No matching specialists found.</p>
                   </div>
                 )}
              </div>
           </div>
        )}

        {step === 'success' && (
           <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-green-600 border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-black italic uppercase tracking-tighter">Assignment Live</h4>
              <p className="text-xs font-bold text-black/50 mt-4 leading-relaxed max-w-[200px] mx-auto uppercase tracking-tighter">
                 Deployment logged in Supabase. Responder notified via protocol.
              </p>
              <button 
                onClick={() => setStep('select-need')}
                className="mt-12 text-[10px] font-black uppercase tracking-widest border-b-2 border-black hover:text-brand hover:border-brand transition-all"
              >
                 Return to Matcher
              </button>
           </div>
        )}
      </div>

      <div className="p-4 border-t-2 border-black bg-slate-50">
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-brand ${loading ? 'animate-pulse' : ''}`}></div>
            <span className="text-[8px] font-black uppercase text-black/30 tracking-[0.2em]">
              {loading ? 'Processing Operation Cluster' : 'Supabase Integration Active'}
            </span>
         </div>
      </div>
    </div>
  );
};
