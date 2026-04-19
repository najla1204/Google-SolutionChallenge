import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { ArrowRight, MapPin, Users, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export const LandingHero = () => {
  return (
    <section className="relative w-full border-b-2 border-black overflow-hidden bg-white">
      <div className="max-w-[1550px] mx-auto flex flex-col lg:flex-row min-h-[700px]">
        {/* Left Column: Text */}
        <div className="flex-1 p-8 lg:p-20 border-r-2 border-black flex flex-col justify-center">
          <div className="mb-12">
            <Badge variant="primary" className="mb-6">Volunteer Coordination 2.0</Badge>
            
            <h1 className="text-7xl lg:text-9xl font-black leading-[0.85] tracking-tighter mb-10 italic uppercase">
              Mapping <br />
              <span className="text-brand">Human</span> <br />
              Impact.
            </h1>
            
            <p className="text-xl font-bold max-w-xl mb-12 text-black/60 leading-relaxed uppercase tracking-tight">
              Gathering scattered community intelligence to show <span className="text-black underline decoration-brand decoration-4">urgent needs</span> and connecting the right skilled volunteers in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/dashboard">
                <Button size="lg" className="gap-3 w-full sm:w-auto h-16 px-12 text-xl">
                  ENTER SYSTEM <ArrowRight className="w-6 h-6 border-2 border-white rounded-full p-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-16 px-12 text-xl">
                VIEW LIVE MAP
              </Button>
            </div>
          </div>
          
          <div className="mt-auto grid grid-cols-3 gap-12 pt-12 border-t-2 border-black/5">
            <div>
              <div className="text-5xl font-black mb-2 italic tracking-tighter">12K<span className="text-brand">+</span></div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Needs Fully Matched</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2 italic tracking-tighter">250<span className="text-brand">+</span></div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Cities Onboarded</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2 italic tracking-tighter">85<span className="text-brand">%</span></div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Resolution Rate</div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Visual/Heatmap Placeholder */}
        <div className="flex-1 bg-slate-50 flex items-center justify-center p-8 lg:p-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <div className="relative w-full max-w-lg bg-white border-2 border-black p-6 shadow-[20px_20px_0px_0px_rgba(37,99,235,1)]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-black">
              <span className="font-black text-sm italic flex items-center gap-3 uppercase tracking-widest">
                <Target className="w-5 h-5 text-brand" /> Live Intelligence Feed
              </span>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              </div>
            </div>
            
            {/* Mock Dashboard UI Preview */}
            <div className="flex flex-col gap-4">
               <div className="p-4 border-2 border-black bg-slate-50 flex items-center justify-between group hover:bg-black hover:text-white transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-brand" />
                     </div>
                     <div>
                        <div className="font-black text-xs uppercase">Sector 4 / Downtown</div>
                        <div className="text-[10px] font-bold opacity-60">Critical Water Shortage</div>
                     </div>
                  </div>
                  <Badge variant="critical">Urgent</Badge>
               </div>
               
               <div className="aspect-video bg-slate-100 border-2 border-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand/5"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-brand border-2 border-white rounded-full"></div>
                  <div className="absolute p-3 bg-white border-2 border-black bottom-4 right-4 text-[9px] font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     24 Responders Active
                  </div>
               </div>
            </div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute top-10 right-10 w-20 h-20 border-2 border-black/5 flex items-center justify-center rotate-45">
             <Zap className="w-8 h-8 text-black/5 -rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
};
