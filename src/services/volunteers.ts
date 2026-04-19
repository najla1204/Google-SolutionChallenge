import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

export type Volunteer = Database['public']['Tables']['volunteers']['Row'];
export type InsertVolunteer = Database['public']['Tables']['volunteers']['Insert'];

export const VolunteerService = {
  async getAll() {
    const { data, error } = await supabase
      .from('volunteers')
      .select('*, profiles(name, email)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('volunteers')
      .select('*, profiles(name, email)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(volunteer: InsertVolunteer) {
    const { data, error } = await supabase
      .from('volunteers')
      .insert(volunteer)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('volunteers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async findMatches(needLocation: string, skillsNeeded: string[]) {
    // Basic match: proximity (same location) OR skill overlap
    // For now, let's fetch all and filter client-side or use a simple query
    const { data, error } = await supabase
      .from('volunteers')
      .select('*, profiles(name, email)');
    
    if (error) throw error;

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
