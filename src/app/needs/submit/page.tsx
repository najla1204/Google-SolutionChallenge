"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';
import { MapPin, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { NeedService, InsertNeed } from '@/services/needs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SubmitNeedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    urgency_level: 'medium',
    tags: [] as string[],
    tagInput: ''
  });

  const urgencyOptions = [
    { value: 'critical', label: 'Critical - Immediate danger', color: 'bg-red-600' },
    { value: 'high', label: 'High - Urgent attention needed', color: 'bg-orange-500' },
    { value: 'medium', label: 'Medium - Can wait a few days', color: 'bg-yellow-500' },
    { value: 'low', label: 'Low - Not urgent', color: 'bg-green-500' }
  ];

  const handleAddTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: ''
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const needData: InsertNeed = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        urgency_level: formData.urgency_level,
        tags: formData.tags
      };

      await NeedService.create(needData);
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/needs');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit need. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="border-2 border-green-600 bg-green-50 p-12 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black italic mb-4 uppercase">Need Submitted Successfully!</h2>
            <p className="text-black/60 font-bold mb-6">Thank you for helping your community. Redirecting to needs page...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/needs" className="inline-flex items-center gap-2 text-black/50 hover:text-black font-bold text-sm uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Needs
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter italic mb-4">Report a Community Need</h1>
          <p className="text-black/50 font-bold uppercase tracking-widest text-sm max-w-xl leading-relaxed">
            Help us identify problems in your community. Your report will be visible to volunteers who can help.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 border-2 border-red-600 bg-red-50 text-red-600 font-black text-sm uppercase tracking-widest flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest mb-3">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Briefly describe the problem (e.g., 'Broken water pipe in downtown')"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border-2 border-black p-4 text-sm font-medium focus:bg-slate-50 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest mb-3">
              Detailed Description <span className="text-red-600">*</span>
            </label>
            <textarea
              placeholder="Provide more details about the problem, what help is needed, and any other relevant information..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border-2 border-black p-4 text-sm font-medium min-h-[150px] focus:bg-slate-50 outline-none resize-y"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest mb-3">
              Location/Area <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
              <input
                type="text"
                placeholder="Enter the location (e.g., 'Downtown, New York' or 'Sector 4, Mumbai')"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border-2 border-black p-4 pl-12 text-sm font-medium focus:bg-slate-50 outline-none"
                required
              />
            </div>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest mb-3">
              How urgent is this need?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {urgencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency_level: option.value })}
                  className={`p-4 border-2 border-black text-left transition-all ${
                    formData.urgency_level === option.value
                      ? `${option.color} text-white border-current`
                      : 'bg-white text-black hover:bg-slate-50'
                  }`}
                >
                  <div className="font-black text-sm uppercase tracking-widest mb-1">{option.value}</div>
                  <div className="text-xs font-bold opacity-80">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-black text-xs uppercase tracking-widest mb-3">
              Tags (optional)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add tags (e.g., 'water', 'infrastructure', 'health')"
                value={formData.tagInput}
                onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 border-2 border-black p-4 text-sm font-medium focus:bg-slate-50 outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-6 border-2 border-black bg-black text-white font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all"
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black bg-slate-100 text-sm font-bold"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-16 text-xl gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                </>
              ) : (
                'Submit Need Report'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-12 p-6 border-2 border-black/10 bg-slate-50">
          <h3 className="font-black text-sm uppercase tracking-widest mb-3">Tips for a good report:</h3>
          <ul className="space-y-2 text-sm font-bold text-black/60">
            <li>• Be specific about the location</li>
            <li>• Include photos if possible (feature coming soon)</li>
            <li>• Provide contact information if you want volunteers to reach you</li>
            <li>• Update the report once the problem is resolved</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
