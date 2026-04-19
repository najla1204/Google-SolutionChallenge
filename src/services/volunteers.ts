import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { mockVolunteers } from '@/lib/data/mockData';

export type Volunteer = Database['public']['Tables']['volunteers']['Row'];
export type InsertVolunteer = Database['public']['Tables']['volunteers']['Insert'];

// Flag to use mock data for testing (set via environment variable)
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || !process.env.NEXT_PUBLIC_SUPABASE_URL;

export const VolunteerService = {
  async getAll() {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for volunteers');
      return mockVolunteers as any[];
    }

    const { data, error } = await supabase
      .from('volunteers')
      .select('*, profiles(name, email)')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching volunteers from database, falling back to mock data:', error);
      return mockVolunteers as any[];
    }
    
    return data;
  },

  async getById(id: string) {
    if (USE_MOCK_DATA) {
      const volunteer = mockVolunteers.find(v => v.id === id);
      return volunteer as any || null;
    }

    const { data, error } = await supabase
      .from('volunteers')
      .select('*, profiles(name, email)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching volunteer from database, falling back to mock data:', error);
      const volunteer = mockVolunteers.find(v => v.id === id);
      return volunteer as any || null;
    }
    
    return data;
  },

  async create(volunteer: InsertVolunteer) {
    if (USE_MOCK_DATA) {
      console.log('Mock create: would save volunteer to database', volunteer);
      // Return a mock response with the volunteer
      return { ...volunteer, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() } as any;
    }

    const { data, error } = await supabase
      .from('volunteers')
      .insert(volunteer)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getByUserId(userId: string) {
    if (USE_MOCK_DATA) {
      const volunteer = mockVolunteers.find(v => v.user_id === userId);
      return volunteer as any || null;
    }

    const { data, error } = await supabase
      .from('volunteers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching volunteer by user ID, falling back to mock data:', error);
      const volunteer = mockVolunteers.find(v => v.user_id === userId);
      return volunteer as any || null;
    }
    
    return data;
  },

  async findMatches(needLocation: string, skillsNeeded: string[]) {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for volunteer matching');
      return mockVolunteers.filter(vol => {
        const locationMatch = vol.location?.toLowerCase() === needLocation.toLowerCase();
        const skillMatch = vol.skills?.some(skill => skillsNeeded.includes(skill));
        return locationMatch || skillMatch;
      }).sort((a, b) => {
        const scoreA = (a.location === needLocation ? 1 : 0) + (a.skills?.filter(s => skillsNeeded.includes(s)).length || 0);
        const scoreB = (b.location === needLocation ? 1 : 0) + (b.skills?.filter(s => skillsNeeded.includes(s)).length || 0);
        return scoreB - scoreA;
      }) as any[];
    }

    // Basic match: proximity (same location) OR skill overlap
    // For now, let's fetch all and filter client-side or use a simple query
    const { data, error } = await supabase
      .from('volunteers')
      .select('*, profiles(name, email)');
    
    if (error) {
      console.error('Error finding volunteer matches, falling back to mock data:', error);
      return mockVolunteers.filter(vol => {
        const locationMatch = vol.location?.toLowerCase() === needLocation.toLowerCase();
        const skillMatch = vol.skills?.some(skill => skillsNeeded.includes(skill));
        return locationMatch || skillMatch;
      }).sort((a, b) => {
        const scoreA = (a.location === needLocation ? 1 : 0) + (a.skills?.filter(s => skillsNeeded.includes(s)).length || 0);
        const scoreB = (b.location === needLocation ? 1 : 0) + (b.skills?.filter(s => skillsNeeded.includes(s)).length || 0);
        return scoreB - scoreA;
      }) as any[];
    }

    return data.filter(vol => {
      const locationMatch = vol.location?.toLowerCase() === needLocation.toLowerCase();
      const skillMatch = vol.skills?.some(skill => skillsNeeded.includes(skill));
      return locationMatch || skillMatch;
    }).sort((a, b) => {
      // Prioritize double matches
      const scoreA = (a.location === needLocation ? 1 : 0) + (a.skills?.filter(s => skillsNeeded.includes(s)).length || 0);
      const scoreB = (b.location === needLocation ? 1 : 0) + (b.skills?.filter(s => skillsNeeded.includes(s)).length || 0);
      return scoreB - scoreA;
    });
  }
};
