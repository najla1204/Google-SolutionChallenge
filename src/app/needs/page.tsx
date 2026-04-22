"use client";

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { NeedCard } from '@/components/molecules/NeedCard';
import { NeedService, Need } from '@/services/needs';
import { Button } from '@/components/atoms/Button';
import { Filter, Search, ChevronDown, Loader2, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';

export default function NeedsPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [filteredNeeds, setFilteredNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchNeeds() {
      try {
        const data = await NeedService.getAll();
        setNeeds(data);
        setFilteredNeeds(data);
      } catch (err) {
        setError('Failed to load community needs.');
      } finally {
        setLoading(false);
      }
    }
    fetchNeeds();
  }, []);

  useEffect(() => {
    let filtered = needs;
    
    if (searchLocation) {
      filtered = filtered.filter(need => 
        need.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    
    if (searchKeyword) {
      filtered = filtered.filter(need => 
        need.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        need.description?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(need => 
        need.urgency_level?.toLowerCase() === urgencyFilter.toLowerCase()
      );
    }
    
    setFilteredNeeds(filtered);
  }, [searchLocation, searchKeyword, urgencyFilter, needs]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1550px] mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-black pb-12">
           <div>
              <h1 className="text-7xl font-black tracking-tighter italic mb-4 uppercase">URGENT NEEDS</h1>
              <p className="text-black/50 font-bold uppercase tracking-widest text-sm max-w-xl leading-relaxed">
                Browse and help with real community problems in your area. Filter by location, urgency, or search by keyword.
              </p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative border-2 border-black flex items-center px-4 bg-slate-50 min-w-[250px]">
                 <Search className="w-4 h-4 text-black/40" />
                 <input 
                    type="text" 
                    placeholder="Search by keyword..." 
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="bg-transparent border-none outline-none p-3 w-full text-sm font-medium tracking-widest"
                 />
              </div>
              <div className="relative border-2 border-black flex items-center px-4 bg-slate-50 min-w-[200px]">
                 <MapPin className="w-4 h-4 text-black/40" />
                 <input 
                    type="text" 
                    placeholder="Enter area/location..." 
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="bg-transparent border-none outline-none p-3 w-full text-sm font-medium tracking-widest"
                 />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                 <Filter className="w-4 h-4" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
           </div>
        </header>

        {showFilters && (
          <div className="mb-8 p-6 border-2 border-black bg-slate-50">
            <h3 className="font-black text-sm uppercase tracking-widest mb-4">Filter by Urgency</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setUrgencyFilter('all')}
                className={`px-4 py-2 border-2 border-black text-sm font-black uppercase tracking-widest transition-all ${
                  urgencyFilter === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-100'
                }`}
              >
                All Urgency Levels
              </button>
              <button
                onClick={() => setUrgencyFilter('critical')}
                className={`px-4 py-2 border-2 border-black text-sm font-black uppercase tracking-widest transition-all ${
                  urgencyFilter === 'critical' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-black hover:bg-slate-100'
                }`}
              >
                Critical
              </button>
              <button
                onClick={() => setUrgencyFilter('high')}
                className={`px-4 py-2 border-2 border-black text-sm font-black uppercase tracking-widest transition-all ${
                  urgencyFilter === 'high' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-black hover:bg-slate-100'
                }`}
              >
                High
              </button>
              <button
                onClick={() => setUrgencyFilter('medium')}
                className={`px-4 py-2 border-2 border-black text-sm font-black uppercase tracking-widest transition-all ${
                  urgencyFilter === 'medium' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-black hover:bg-slate-100'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setUrgencyFilter('low')}
                className={`px-4 py-2 border-2 border-black text-sm font-black uppercase tracking-widest transition-all ${
                  urgencyFilter === 'low' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-black hover:bg-slate-100'
                }`}
              >
                Low
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 animate-spin text-brand mb-4" />
            <p className="font-black text-xs uppercase tracking-widest opacity-20">Loading community needs...</p>
          </div>
        ) : error ? (
          <div className="p-12 border-2 border-red-600 bg-red-50 text-red-600 font-black text-center uppercase">
            {error}
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-bold text-black/50">
                Showing {filteredNeeds.length} {filteredNeeds.length === 1 ? 'need' : 'needs'}
              </p>
              <Link href="/needs/submit">
                <Button variant="outline" className="gap-2" size="sm">
                  <Plus className="w-4 h-4" /> Report a Need
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredNeeds.map((need) => (
                 <NeedCard 
                    key={need.id}
                    id={need.id}
                    title={need.title}
                    location={need.location}
                    urgency={need.urgency_level || 'MEDIUM'}
                    tags={need.tags || []}
                    createdAt={need.created_at ? new Date(need.created_at).toLocaleDateString() : 'Recent'}
                 />
              ))}
              
              {filteredNeeds.length === 0 && (
                <div className="col-span-full border-2 border-dashed border-black/10 p-20 text-center flex flex-col items-center">
                  <p className="text-xl font-black italic opacity-20 uppercase">No needs found matching your filters.</p>
                  <p className="text-sm font-bold text-black/40 mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
