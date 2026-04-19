"use client";

import React, { useState } from 'react';
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

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

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

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'twitter':
        return <Globe className="w-4 h-4" />;
      case 'facebook':
        return <Share2 className="w-4 h-4" />;
      case 'instagram':
        return <Image className="w-4 h-4" />;
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
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter italic mb-4">Discover Problems from Social Media</h1>
          <p className="text-black/50 font-bold uppercase tracking-widest text-sm max-w-2xl leading-relaxed">
            Search for community needs and problems from social media platforms. Enter a problem type and location to find relevant issues posted by people in real-time.
          </p>
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
                This feature searches social media platforms (Twitter, Facebook, Instagram, YouTube) for posts mentioning community problems. 
                Results are automatically analyzed for urgency and priority. Currently using demo data - connect your API keys for real-time scraping.
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
                      <p className="text-xs font-bold text-black/50 mt-1">
                        Priority Score: {need.priority_score}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-black/70 mb-4 leading-relaxed">
                    {need.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {need.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 border-2 border-black/20 bg-slate-100 text-xs font-black uppercase tracking-widest"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Button variant="outline" size="sm" className="gap-2">
                      Import to Needs
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !loading && !error && (
          <div className="border-2 border-dashed border-black/10 p-20 text-center flex flex-col items-center">
            <div className="flex gap-4 mb-6">
              <Globe className="w-12 h-12 text-black/20" />
              <Share2 className="w-12 h-12 text-black/20" />
              <Image className="w-12 h-12 text-black/20" />
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
