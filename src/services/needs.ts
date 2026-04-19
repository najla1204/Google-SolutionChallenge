import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

export type Need = Database['public']['Tables']['needs']['Row'];
export type InsertNeed = Database['public']['Tables']['needs']['Insert'];

export const NeedService = {
  async getAll() {
    const { data, error } = await supabase
      .from('needs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('needs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(need: InsertNeed) {
    const { data, error } = await supabase
      .from('needs')
      .insert(need)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUrgent() {
    const { data, error } = await supabase
      .from('needs')
      .select('*')
      .in('urgency_level', ['critical', 'high', 'CRITICAL', 'HIGH'])
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};
