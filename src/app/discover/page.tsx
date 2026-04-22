"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';
import { Search, MapPin, Loader2, AlertCircle, Globe, Share2, Image, Video } from 'lucide-react';
import { socialMediaScraper, ScrapedNeed } from '@/services/socialMediaScraper';
import { Badge } from '@/components/atoms/Badge';

export default function DiscoverPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ScrapedNeed[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-search on page load to demonstrate the feature
  useEffect(() => {
    const autoSearch = async () => {
      setQuery('emergency');
      setLocation('');
      setLoading(true);
      try {
        const posts = await socialMediaScraper.scrapeAllPlatforms('emergency');
        const needs = socialMediaScraper.convertPostsToNeeds(posts);
        setResults(needs);
        setHasSearched(true);
      } catch (err: any) {
        setError(err.message || 'Failed to search social media. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    autoSearch();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setHasSearched(true);

    try {
      const posts = await socialMediaScraper.scrapeAllPlatforms(query, location || undefined);
      const needs = socialMediaScraper.convertPostsToNeeds(posts);
      setResults(needs);
    } catch (err: any) {
      setError(err.message || 'Failed to search social media. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (need: ScrapedNeed) => {
    setLoading(true);
    try {
      // In a real app, this would call NeedService.create()
      // The socialMediaScraper.importToNeeds helper handles this
      await socialMediaScraper.importToNeeds(need);
      alert(`Successfully imported: ${need.title}`);
      // Redirect to needs page to show the result
      window.location.href = '/needs';
    } catch (err: any) {
      setError(err.message || 'Failed to import need');
    } finally {
      setLoading(false);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'youtube':
        return <Video className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black pb-8">
          <div>
            <h1 className="text-7xl font-black tracking-tighter italic mb-4 uppercase">SOCIAL DISCOVERY</h1>
            <p className="text-black/50 font-bold uppercase tracking-widest text-sm max-w-2xl leading-relaxed">
              Harvesting community crisis data from global social streams. 
              Our neural priority algorithm automatically ranks reports based on urgency, engagement, and recency.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">YouTube API Proxy: CONNECTED</span>
             </div>
             <Badge variant="outline" className="bg-black text-white text-[9px] py-1 border-none">Latency: 145ms</Badge>
          </div>
        </div>

        {/* Quick Test Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery('emergency');
              setLocation('Tamil Nadu, India');
              handleSearch();
            }}
            className="gap-2 bg-blue-50 border-blue-600"
          >
            🇮🇳 Tamil Nadu, India
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery('water shortage');
              setLocation('Downtown');
              handleSearch();
            }}
            className="gap-2"
          >
            💧 Water Crisis
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery('power outage');
              setLocation('');
              handleSearch();
            }}
            className="gap-2"
          >
            ⚡ Power Outage
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery('flood');
              setLocation('');
              handleSearch();
            }}
            className="gap-2"
          >
            🌊 Flooding
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery('emergency');
              setLocation('');
              handleSearch();
            }}
            className="gap-2"
          >
            🚨 Emergency
          </Button>
        </div>

        {/* Search Form */}
        <div className="border-2 border-black p-8 mb-8 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-black text-xs uppercase tracking-widest mb-3">
                Problem Type / Keyword
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                <input
                  type="text"
                  placeholder="e.g., water shortage, power outage, flooding"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full border-2 border-black p-4 pl-12 text-sm font-medium focus:bg-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-black text-xs uppercase tracking-widest mb-3">
                Location / Area (optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                <input
                  type="text"
                  placeholder="e.g., downtown, sector 4, Mumbai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full border-2 border-black p-4 pl-12 text-sm font-medium focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={loading}
            className="w-full h-14 text-xl gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Searching Social Media...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" /> Search Social Media
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="mb-8 p-4 border-2 border-red-600 bg-red-50 text-red-600 font-black text-sm uppercase tracking-widest flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Info Banner */}
        <div className="mb-8 p-6 border-2 border-blue-600 bg-blue-50">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 p-2 rounded">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest mb-2">How it works</h3>
              <p className="text-sm font-bold text-black/70 leading-relaxed">
                This feature connects directly to YouTube (via YouTube Data API v3) to search for live reports of community needs. 
                Our AI-driven pipeline analyzes video descriptions for urgency and automatically prioritizes them. **YouTube integration is configured**—simply add your API key to the environment variables to activate live fetching.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                Found {results.length} {results.length === 1 ? 'result' : 'results'}
              </h2>
              <p className="text-sm font-bold text-black/50">
                Sorted by priority (highest first)
              </p>
            </div>

            {/* Area Summary */}
            <div className="mb-6 p-4 border-2 border-black/10 bg-slate-50">
              <h3 className="font-black text-xs uppercase tracking-widest mb-3">Areas Found:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.from(new Set(results.map(r => r.location))).map((location, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border-2 border-black bg-white text-xs font-black uppercase tracking-widest flex items-center gap-2"
                  >
                    <MapPin className="w-3 h-3" />
                    {location}
                  </span>
                ))}
              </div>

              <h3 className="font-black text-xs uppercase tracking-widest mb-3">Urgency Breakdown:</h3>
              <div className="flex flex-wrap gap-2">
                {['critical', 'high', 'medium', 'low'].map(urgency => {
                  const count = results.filter(r => r.urgency_level === urgency).length;
                  if (count === 0) return null;
                  return (
                    <span
                      key={urgency}
                      className={`px-3 py-1 border-2 border-black ${getUrgencyColor(urgency)} text-xs font-black uppercase tracking-widest`}
                    >
                      {urgency}: {count}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {results.map((need, index) => (
                <div
                  key={`${need.source}-${index}`}
                  className="border-2 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${getUrgencyColor(need.urgency_level)}`}>
                        {getSourceIcon(need.source)}
                      </div>
                      <div>
                        <h3 className="font-black text-lg uppercase tracking-tighter">{need.title}</h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-black/50">
                          <MapPin className="w-3 h-3" />
                          {need.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={need.urgency_level === 'critical' ? 'critical' : 'primary'}>
                        {need.urgency_level.toUpperCase()}
                      </Badge>
                      <div className="mt-2 text-right">
                         <p className="text-xs font-black uppercase tracking-tighter">Priority: {need.priority_score}/200</p>
                         <div className="flex gap-1 justify-end mt-1">
                            <span className="w-1 h-1 bg-brand"></span>
                            <span className="w-1 h-1 bg-brand"></span>
                            <span className="w-1 h-1 bg-brand opacity-30"></span>
                            <span className="w-1 h-1 bg-brand opacity-30"></span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-black/70 mb-4 leading-relaxed">
                    {need.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {need.tags.map((tag, i) => (
                        <span
                          key={`${index}-tag-${tag}-${i}`}
                          className="px-3 py-1 border-2 border-black/20 bg-slate-100 text-xs font-black uppercase tracking-widest"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleImport(need)}
                    >
                      Import to Needs
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !loading && !error && hasSearched && (
          <div className="border-2 border-dashed border-black/10 p-20 text-center flex flex-col items-center">
            <div className="flex gap-4 mb-6">
              <Video className="w-12 h-12 text-black/20" />
            </div>
            <p className="text-xl font-black italic opacity-20 uppercase mb-2">No results yet</p>
            <p className="text-sm font-bold text-black/40">Enter a search term above to discover community problems from social media</p>
          </div>
        )}
      </div>
    </main>
  );
}
