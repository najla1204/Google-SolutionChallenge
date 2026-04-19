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

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalNeeds: 0,
    activeVolunteers: 0,
    urgentCases: 0,
    matchRate: '0%'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const [needs, volunteers, urgent] = await Promise.all([
          NeedService.getAll(),
          VolunteerService.getAll(),
          NeedService.getUrgent()
        ]);

        setMetrics({
          totalNeeds: needs.length,
          activeVolunteers: volunteers.length,
          urgentCases: urgent.length,
          matchRate: '85%' // Placeholder logic for now
        });
      } catch (err: any) {
        console.error('Failed to fetch dashboard metrics:', err);
        setError('Failed to sync with live data.');
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1550px] mx-auto px-6 py-12">
        <header className="mb-12 flex items-end justify-between">
           <div>
              <h1 className="text-6xl font-black tracking-tighter italic mb-2">Dashboard</h1>
              <p className="text-black/50 font-bold uppercase tracking-widest text-xs">Overview of community needs and volunteer activity</p>
           </div>
           {loading && <Loader2 className="w-6 h-6 animate-spin text-brand" />}
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
             />
           </div>
           <div className="border-r-2 border-black last:border-r-0">
             <StatCard 
               label="Volunteers" 
               value={loading ? "..." : metrics.activeVolunteers.toString().padStart(2, '0')} 
               subtext="Ready to help" 
             />
           </div>
           <div className="border-r-2 border-black last:border-r-0">
             <StatCard 
               label="Urgent Needs" 
               value={loading ? "..." : metrics.urgentCases.toString().padStart(2, '0')} 
               variant="urgent" 
               subtext="Immediate attention"
             />
           </div>
           <div className="border-r-2 border-black last:border-r-0">
             <StatCard 
               label="Success Rate" 
               value={loading ? "..." : metrics.matchRate} 
               subtext="Problems solved" 
             />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Main Column */}
           <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Heatmap Section */}
              <div className="border-2 border-black relative h-[500px]">
                 <div className="absolute top-4 left-4 z-10">
                    <Badge variant="primary">Needs by Location</Badge>
                 </div>
                 <UrgencyHeatmap />
              </div>

              {/* Activity Feed Placeholder */}
              <div className="border-2 border-black p-8">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Recent Activity</h3>
                    <div className="h-[2px] flex-1 bg-black/10 mx-6"></div>
                    <ArrowRight className="w-6 h-6" />
                 </div>

                 <div className="flex flex-col items-center justify-center py-12 text-black/20">
                    <Clock className="w-12 h-12 mb-4" />
                    <p className="font-black text-xs uppercase tracking-[0.2em]">Loading recent activity...</p>
                 </div>
              </div>
           </div>

           {/* Sidebar Column */}
           <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="border-2 border-black h-fit shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                 <VolunteerMatcher />
              </div>
              
              <div className="bg-black text-white p-8 border-2 border-black">
                 <h4 className="text-xl font-black italic mb-4 uppercase">Notifications</h4>
                 <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-1">
                       <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">System</p>
                       <p className="text-sm font-bold leading-tight">Database connected successfully. Ready to receive new needs.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
