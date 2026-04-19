import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { mockNeeds, getNeedsByPriority } from '@/lib/data/mockData';

export type Need = Database['public']['Tables']['needs']['Row'];
export type InsertNeed = Database['public']['Tables']['needs']['Insert'];

// Flag to use mock data for testing (set via environment variable)
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || !process.env.NEXT_PUBLIC_SUPABASE_URL;

export const NeedService = {
  async getAll() {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for needs');
      return mockNeeds as Need[];
    }

    const { data, error } = await supabase
      .from('needs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching needs from database, falling back to mock data:', error);
      return mockNeeds as Need[];
    }
    
    return data;
  },

  async getById(id: string) {
    if (USE_MOCK_DATA) {
      const need = mockNeeds.find(n => n.id === id);
      return need as Need || null;
    }

    const { data, error } = await supabase
      .from('needs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching need from database, falling back to mock data:', error);
      const need = mockNeeds.find(n => n.id === id);
      return need as Need || null;
    }
    
    return data;
  },

  async create(need: InsertNeed) {
    if (USE_MOCK_DATA) {
      console.log('Mock create: would save need to database', need);
      // Return a mock response with the need
      return { ...need, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() } as Need;
    }

    const { data, error } = await supabase
      .from('needs')
      .insert(need)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUrgent() {
    if (USE_MOCK_DATA) {
      return getNeedsByPriority().filter(n => 
        ['critical', 'high'].includes(n.urgency_level)
      ) as Need[];
    }

    const { data, error } = await supabase
      .from('needs')
      .select('*')
      .in('urgency_level', ['critical', 'high', 'CRITICAL', 'HIGH'])
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching urgent needs from database, falling back to mock data:', error);
      return getNeedsByPriority().filter(n => 
        ['critical', 'high'].includes(n.urgency_level)
      ) as Need[];
    }
    
    return data;
  },

  async getByLocation(location: string) {
    if (USE_MOCK_DATA) {
      return mockNeeds.filter(n => 
        n.location.toLowerCase().includes(location.toLowerCase())
      ) as Need[];
    }

    const { data, error } = await supabase
      .from('needs')
      .select('*')
      .ilike('location', `%${location}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching needs by location, falling back to mock data:', error);
      return mockNeeds.filter(n => 
        n.location.toLowerCase().includes(location.toLowerCase())
      ) as Need[];
    }
    
    return data;
  },

  async search(query: string) {
    if (USE_MOCK_DATA) {
      const lowerQuery = query.toLowerCase();
      return mockNeeds.filter(n => 
        n.title.toLowerCase().includes(lowerQuery) ||
        n.description.toLowerCase().includes(lowerQuery) ||
        n.tags.some(t => t.toLowerCase().includes(lowerQuery))
      ) as Need[];
    }

    const { data, error } = await supabase
      .from('needs')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error searching needs, falling back to mock data:', error);
      const lowerQuery = query.toLowerCase();
      return mockNeeds.filter(n => 
        n.title.toLowerCase().includes(lowerQuery) ||
        n.description.toLowerCase().includes(lowerQuery) ||
        n.tags.some(t => t.toLowerCase().includes(lowerQuery))
      ) as Need[];
    }
    
    return data;
  }
};
