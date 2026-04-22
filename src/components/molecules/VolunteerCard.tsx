import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { User, MapPin, Star } from 'lucide-react';

interface VolunteerCardProps {
  name: string;
  skills: string[];
  availability: string;
  location: string;
}

export const VolunteerCard = ({ name, skills, availability, location }: VolunteerCardProps) => {
  return (
    <div className="border-2 border-black p-6 bg-white flex flex-col hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 border-2 border-black bg-brand/5 flex items-center justify-center shrink-0">
          <User className="w-6 h-6 text-brand" />
        </div>
        <div>
          <h3 className="font-black text-lg tracking-tighter uppercase">{name}</h3>
          <div className="flex items-center gap-1 text-[10px] font-bold text-black/40">
            <MapPin className="w-3 h-3" /> {location}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Primary Skills</div>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <Badge key={skill} variant="outline" className="border-black/10 normal-case">{skill}</Badge>
          ))}
        </div>
      </div>
      
      <div className="mt-auto flex items-center justify-between pt-4 border-t-2 border-black/5">
        <div className="flex flex-col">
          <span className="text-[8px] font-black uppercase text-black/30">Availability</span>
          <span className="text-xs font-black text-brand uppercase italic">{availability}</span>
        </div>
        <Button 
          size="sm" 
          className="text-[10px]"
          onClick={() => alert(`Deployment request sent to ${name}. They will be notified immediately.`)}
        >
          MATCH NOW
        </Button>
      </div>
    </div>
  );
};
