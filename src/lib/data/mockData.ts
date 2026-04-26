/**
 * Mock Data for Testing
 * 
 * This file provides realistic sample data for testing the application
 * without requiring a database or API keys.
 */

export interface MockNeed {
  id: string;
  title: string;
  description: string;
  location: string;
  urgency_level: 'critical' | 'high' | 'medium' | 'low';
  tags: string[];
  created_at: string;
  source: 'youtube' | 'manual';
  source_url?: string;
  priority_score: number;
  ngo_id?: string;
}

export const mockNeeds: MockNeed[] = [
  {
    id: '1',
    title: 'Critical Water Shortage in Downtown',
    description: 'Multiple buildings in downtown area reporting no water supply for past 48 hours. Affecting 200+ residents including elderly and children. Emergency water tankers needed immediately.',
    location: 'Downtown, New York',
    urgency_level: 'critical',
    tags: ['water', 'infrastructure', 'emergency', 'critical'],
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 145,
    ngo_id: 'ngo-1'
  },
  {
    id: '2',
    title: 'Power Outage in Northern District',
    description: 'Power outage reported in northern district affecting 500+ homes. Expected to last 6-8 hours due to transformer failure. Residents need temporary lighting and charging stations.',
    location: 'Northern District, Chicago',
    urgency_level: 'high',
    tags: ['power', 'electricity', 'infrastructure'],
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 98,
    ngo_id: 'ngo-2'
  },
  {
    id: '3',
    title: 'Flooding in Low-Lying Areas',
    description: 'Heavy rainfall caused flooding in low-lying areas. Several streets underwater, homes at risk. Need sandbags, pumps, and evacuation assistance for vulnerable residents.',
    location: 'Low-lying Areas, Mumbai',
    urgency_level: 'critical',
    tags: ['flood', 'weather', 'emergency', 'evacuation'],
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 152,
    ngo_id: 'ngo-1'
  },
  {
    id: '4',
    title: 'Homeless Community Needs Shelter',
    description: 'Homeless community in central park area needs shelter, food supplies, and warm clothing as winter approaches. Approximately 30 people affected, including families with children.',
    location: 'Central Park, London',
    urgency_level: 'high',
    tags: ['homeless', 'shelter', 'food', 'winter'],
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'youtube',
    source_url: 'https://youtube.com/watch?v=abc123',
    priority_score: 87,
    ngo_id: 'ngo-3'
  },
  {
    id: '5',
    title: 'Broken Water Pipe in Sector 4',
    description: 'Main water pipe burst in Sector 4 causing flooding on main road. Traffic disrupted, water supply affected to nearby buildings. Need immediate repair.',
    location: 'Sector 4, Delhi',
    urgency_level: 'medium',
    tags: ['water', 'infrastructure', 'road'],
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 55
  },

];

export const mockVolunteers = [
  {
    id: 'v1',
    user_id: 'user-1',
    name: 'John Smith',
    email: 'john@example.com',
    skills: ['medical', 'first aid', 'driving'],
    availability: 'weekends',
    location: 'New York',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v2',
    user_id: 'user-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    skills: ['teaching', 'tutoring', 'childcare'],
    availability: 'evenings',
    location: 'Chicago',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v3',
    user_id: 'user-3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    skills: ['construction', 'repair', 'plumbing', 'Structural Engineering'],
    availability: 'flexible',
    location: 'Los Angeles',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v4',
    user_id: 'user-4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    skills: ['cooking', 'food distribution', 'organization'],
    availability: 'weekdays',
    location: 'Boston',
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v5',
    user_id: 'user-5',
    name: 'David Wilson',
    email: 'david@example.com',
    skills: ['driving', 'logistics', 'delivery', 'Heavy Equipment'],
    availability: 'flexible',
    location: 'Seattle',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const recentActivity = [
  { id: "act-1", user: "John Smith", action: "accepted deployment for", target: "Water Shortage in Downtown", time: "12m ago" },
  { id: "act-2", user: "System", action: "automatically matched", target: "Sarah Johnson to Literacy Camp", time: "25m ago" },
  { id: "act-3", user: "Admin", action: "verified new responder", target: "Robert Fox", time: "1h ago" },
  { id: "act-4", user: "Rajesh Kumar", action: "imported data from", target: "YouTube: #ChennaiCyclones", time: "2h ago" },
  { id: "act-5", user: "ImpactFlow Bot", action: "detected urgency cluster in", target: "Southern District", time: "3h ago" }
];

export const mockNGOs = [
  {
    id: 'ngo-1',
    name: 'Community Relief Foundation',
    email: 'info@communityrelief.org',
    location: 'New York',
    role: 'ngo',
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'ngo-2',
    name: 'Urban Aid Network',
    email: 'contact@urbanaid.org',
    location: 'Chicago',
    role: 'ngo',
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'ngo-3',
    name: 'Health & Hope Initiative',
    email: 'admin@healthhope.org',
    location: 'London',
    role: 'ngo',
    created_at: new Date(Date.now() - 270 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'ngo-4',
    name: 'Tamil Nadu Disaster Relief',
    email: 'info@tndr.org',
    location: 'Chennai, Tamil Nadu, India',
    role: 'ngo',
    created_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'ngo-5',
    name: 'Coimbatore Social Welfare',
    email: 'contact@csw.org',
    location: 'Coimbatore, Tamil Nadu, India',
    role: 'ngo',
    created_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper function to get needs by location
export function getNeedsByLocation(location: string): MockNeed[] {
  const lowerLocation = location.toLowerCase();
  return mockNeeds.filter(need => 
    need.location.toLowerCase().includes(lowerLocation)
  );
}

// Helper function to get needs by urgency
export function getNeedsByUrgency(urgency: string): MockNeed[] {
  return mockNeeds.filter(need => 
    need.urgency_level === urgency.toLowerCase()
  );
}

// Helper function to get needs by source
export function getNeedsBySource(source: string): MockNeed[] {
  return mockNeeds.filter(need => 
    need.source === source.toLowerCase()
  );
}

// Helper function to get needs by tag
export function getNeedsByTag(tag: string): MockNeed[] {
  const lowerTag = tag.toLowerCase();
  return mockNeeds.filter(need => 
    need.tags.some(t => t.toLowerCase().includes(lowerTag))
  );
}

// Helper function to search needs by keyword
export function searchNeeds(keyword: string): MockNeed[] {
  const lowerKeyword = keyword.toLowerCase();
  return mockNeeds.filter(need => 
    need.title.toLowerCase().includes(lowerKeyword) ||
    need.description.toLowerCase().includes(lowerKeyword) ||
    need.tags.some(t => t.toLowerCase().includes(lowerKeyword)) ||
    need.location.toLowerCase().includes(lowerKeyword)
  );
}

// Helper function to get random needs (for testing pagination)
export function getRandomNeeds(count: number): MockNeed[] {
  const shuffled = [...mockNeeds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to get needs sorted by priority
export function getNeedsByPriority(limit?: number): MockNeed[] {
  const sorted = [...mockNeeds].sort((a, b) => b.priority_score - a.priority_score);
  return limit ? sorted.slice(0, limit) : sorted;
}
