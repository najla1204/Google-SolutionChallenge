import React from 'react';
import { NeedCard } from '@/components/molecules/NeedCard';
import { needs } from '@/lib/data/mock';

export const ResourceGrid = ({ showTitle = true }: { showTitle?: boolean }) => {
  return (
    <div className="w-full">
      {showTitle && (
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 max-w-[1550px] mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-black tracking-tighter mb-6 italic uppercase leading-none underline decoration-brand decoration-8 underline-offset-8">Active Needs</h2>
            <p className="font-bold text-black/40 uppercase tracking-widest text-sm leading-relaxed">
              Real-time synchronization of fragmented community reports. <br />
              Matches are made based on proximity and skill-verified profiles.
            </p>
          </div>
          <div className="flex border-2 border-black">
             <button className="px-6 py-3 bg-black text-white font-black text-xs uppercase tracking-widest">Global</button>
             <button className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-50">Saved</button>
          </div>
        </div>
      )}

      <div className="max-w-[1550px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {needs.slice(0, 4).map((need) => (
            <NeedCard 
               key={need.id}
               id={need.id}
               title={need.title}
               location={need.location}
               urgency={need.urgency}
               tags={need.tags}
               createdAt={need.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
