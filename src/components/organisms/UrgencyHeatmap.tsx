import React from 'react';
import { MapPin, Info, Users, Layers, Maximize2 } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';

export const UrgencyHeatmap = () => {
  return (
    <div className="w-full h-full bg-slate-100 relative overflow-hidden flex flex-col">
      {/* Map Toolbar */}
      <div className="bg-white border-b-2 border-black flex items-center justify-between px-4 py-3 z-10 sticky top-0">
        <div className="flex gap-4">
          <Badge variant="primary" className="border-none">Live View</Badge>
          <div className="text-[10px] font-bold text-black/50 flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> 12 Active Nodes
          </div>
        </div>
        <div className="flex gap-2">
           <button className="p-1 border-2 border-black hover:bg-black/5"><Layers className="w-4 h-4" /></button>
           <button className="p-1 border-2 border-black hover:bg-black/5"><Maximize2 className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Map Visual (Mock) */}
      <div className="flex-1 relative cursor-crosshair">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* SVG Drawing of a stylized map area */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600" preserveAspectRatio="none">
           <path d="M100 100 L700 100 L700 500 L100 500 Z" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
           <path d="M200 150 Q400 50 600 150 T600 450 Q400 550 200 450 T200 150" fill="none" stroke="black" strokeWidth="2" />
        </svg>

        {/* Heatmap Blobs */}
        <div className="absolute top-[20%] left-[30%] w-48 h-48 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[30%] right-[25%] w-60 h-60 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[50%] left-[60%] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

        {/* Hotspots */}
        <div className="absolute top-[30%] left-[50%] group">
           <div className="w-6 h-6 bg-red-600 border-4 border-white rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform"></div>
           <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white border-2 border-black p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="font-black text-[10px] text-red-600 mb-2 flex items-center gap-1 uppercase tracking-widest">
                 <MapPin className="w-3 h-3" /> Critical Need
              </div>
              <div className="font-black text-sm italic tracking-tighter uppercase underline decoration-red-600 decoration-2">Flood Damage: Sector 4</div>
              <div className="text-[10px] font-bold text-black/60 mt-2 space-y-1">
                 <p>Required: 5 Logistics, 2 Medics</p>
                 <p>Status: Unassigned</p>
              </div>
           </div>
        </div>

        <div className="absolute top-[60%] right-[30%] group">
           <div className="w-5 h-5 bg-orange-500 border-4 border-white rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform"></div>
           <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white border-2 border-black p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="font-black text-[10px] text-orange-500 mb-2 flex items-center gap-1 uppercase tracking-widest">
                 <MapPin className="w-3 h-3" /> Active Operation
              </div>
              <div className="font-black text-sm italic tracking-tighter uppercase underline decoration-orange-500 decoration-2">Southern District Cluster</div>
              <div className="text-[10px] font-bold text-black/60 mt-2 space-y-1">
                 <p>Type: Water Crisis Mitigation</p>
                 <p>Deployed: 12 Responders</p>
              </div>
           </div>
        </div>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-6 right-6 bg-white border-2 border-black p-4 z-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
           <div className="font-black text-[10px] uppercase tracking-widest mb-4 border-b-2 border-black/5 pb-2">Urgency Index</div>
           <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                 <div className="w-4 h-4 bg-red-600 border border-black/10"></div>
                 <span className="text-[9px] font-black uppercase tracking-tighter">Critical (Immediate)</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-4 h-4 bg-orange-500 border border-black/10"></div>
                 <span className="text-[9px] font-black uppercase tracking-tighter">High Priority</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-4 h-4 bg-blue-500 opacity-50 border border-black/10"></div>
                 <span className="text-[9px] font-black uppercase tracking-tighter">Moderate (Stable)</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
