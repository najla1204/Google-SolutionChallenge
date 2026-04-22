import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface NeedCardProps {
  id: string;
  title: string;
  location: string;
  urgency: string;
  tags: string[];
  createdAt: string;
}

export const NeedCard = ({ id, title, location, urgency, tags, createdAt }: NeedCardProps) => {
  const urgencyVariant = urgency.toLowerCase() as 'critical' | 'high' | 'medium';
  
  return (
    <div className="border-2 border-black p-6 bg-white flex flex-col group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
      <div className="flex justify-between items-start mb-4">
        <Badge variant={urgencyVariant}>{urgency}</Badge>
        <div className="flex items-center gap-1 text-[10px] font-bold text-black/40 uppercase">
          <Clock className="w-3 h-3" /> {createdAt}
        </div>
      </div>
      
      <h3 className="text-xl font-black mb-2 group-hover:text-brand transition-colors tracking-tighter italic">
        {title}
      </h3>
      
      <div className="flex items-center gap-1 text-[11px] font-bold text-black/60 mb-6">
        <MapPin className="w-3.5 h-3.5" /> {location}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map(tag => (
          <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-black/30">#{tag}</span>
        ))}
      </div>
      
      <div className="mt-auto pt-4 border-t-2 border-black/5 flex items-center justify-between">
        <Link href={`/needs/${id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full text-[10px] gap-2">
            VIEW DETAILS <ArrowUpRight className="w-3 h-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
