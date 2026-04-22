"use client";

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { StatCard } from '@/components/molecules/StatCard';
import { UrgencyHeatmap } from '@/components/organisms/UrgencyHeatmap';
import { VolunteerMatcher } from '@/components/organisms/VolunteerMatcher';
import { Badge } from '@/components/atoms/Badge';
import { ArrowRight, Clock, Loader2 } from 'lucide-react';
import { NeedService } from '@/services/needs';
import { VolunteerService } from '@/services/volunteers';
import { supabase } from '@/lib/supabase';

import { recentActivity, volunteers as mockVolunteers } from '@/lib/data/mock';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [metrics, setMetrics] = useState({
    totalNeeds: 0,
    activeVolunteers: 0,
    urgentCases: 0,
    matchRate: '0%'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      try {
        const [needs, volunteers, urgent] = await Promise.all([
          NeedService.getAll(),
          VolunteerService.getAll(),
          NeedService.getUrgent()
        ]);

        setMetrics({
          totalNeeds: needs.length > 0 ? needs.length : 12,
          activeVolunteers: volunteers.length > 0 ? volunteers.length : mockVolunteers.length,
          urgentCases: urgent.length > 0 ? urgent.length : 4,
          matchRate: '92%' 
        });
      } catch (err: any) {
        console.error('Failed to fetch dashboard metrics:', err);
        setError('Failed to sync with live data.');
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  const userName = user?.email?.split('@')[0] || 'Network';

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1550px] mx-auto px-6 py-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
           <div>
              <h1 className="text-6xl font-black tracking-tighter italic mb-2 uppercase">
                {userName}'s COMMAND CENTER
              </h1>
              <p className="text-black/50 font-bold uppercase tracking-widest text-xs">Simulated data stream enabled for demonstration</p>
           </div>
           <div className="flex items-center gap-4">
              <Badge variant="primary">Live Monitor</Badge>
              {loading && <Loader2 className="w-6 h-6 animate-spin text-brand" />}
           </div>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-2 border-red-600 text-red-600 font-black text-sm uppercase tracking-widest">
            ERROR: {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-12 border-2 border-black">
           <div className="border-r-2 border-black last:border-r-0">
             <StatCard 
               label="Active Needs" 
               value={loading ? "..." : metrics.totalNeeds.toString().padStart(2, '0')} 
               subtext="Community problems" 
               href="/needs"
             />
           </div>
           <div className="border-r-2 border-black last:border-r-0">
             <StatCard 
               label="Volunteers" 
               value={loading ? "..." : metrics.activeVolunteers.toString().padStart(2, '0')} 
               subtext="Ready to help" 
               href="/volunteers"
             />
           </div>
           <div className="border-r-2 border-black last:border-r-0">
             <StatCard 
               label="Urgent Needs" 
               value={loading ? "..." : metrics.urgentCases.toString().padStart(2, '0')} 
               variant="urgent" 
               subtext="Immediate attention"
               href="/needs"
             />
           </div>
           <div className="border-r-2 border-black last:border-r-0">
             <StatCard 
               label="Impact Score" 
               value={loading ? "..." : metrics.matchRate} 
               subtext="Efficiency index" 
               href="/discover"
             />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Main Column */}
           <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Heatmap Section */}
              <div className="border-2 border-black relative h-[500px] group overflow-hidden">
                 <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <Badge variant="primary">Heatmap View</Badge>
                    <Badge variant="outline" className="bg-black text-white border-black">Alpha Build</Badge>
                 </div>
                 <UrgencyHeatmap />
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] font-black tracking-widest uppercase">Geospatial Distribution of Urgent Resource Requests</p>
                 </div>
              </div>

              {/* Activity Feed */}
              <div className="border-2 border-black bg-white">
                 <div className="p-8 border-b-2 border-black flex items-center justify-between">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Live Activity Stream</h3>
                    <div className="flex gap-2">
                       <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                    </div>
                 </div>

                 <div className="p-0">
                    {recentActivity.map((activity, i) => (
                       <div key={activity.id} className={`p-6 border-b-2 border-black last:border-b-0 flex items-center justify-between hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                          <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-full bg-brand/10 border-2 border-black flex items-center justify-center font-black text-xs">
                                {activity.user.charAt(0)}
                             </div>
                             <div>
                                <p className="text-xs font-black uppercase">
                                   <span className="text-brand">{activity.user}</span> {activity.action} <span className="underline italic tracking-tight">{activity.target}</span>
                                </p>
                             </div>
                          </div>
                          <div className="text-[10px] font-bold text-black/30 uppercase tracking-widest flex items-center gap-2">
                             <Clock className="w-3 h-3" /> {activity.time}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Sidebar Column */}
           <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="border-2 border-black h-fit shadow-[12px_12px_0px_0px_rgba(37,99,235,1)]">
                 <div className="p-6 border-b-2 border-black bg-slate-50 flex items-center justify-between">
                    <h4 className="text-sm font-black uppercase tracking-widest italic">Smart Match Engine</h4>
                    <Badge variant="primary">AI Enabled</Badge>
                 </div>
                 <VolunteerMatcher />
              </div>
              
              <div className="bg-black text-white p-8 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform cursor-pointer">
                 <h4 className="text-xl font-black italic mb-6 uppercase border-b border-white/20 pb-4">Network Alerts</h4>
                 <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4 py-1">
                       <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">System</p>
                       <p className="text-sm font-bold leading-tight">Sync speed optimized by 40% for the Southern District cluster.</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 py-1">
                       <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Critical</p>
                       <p className="text-sm font-bold leading-tight">Severe storm warning for Downtown. Please update emergency shelters.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
