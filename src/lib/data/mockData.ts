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
  source: 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'manual';
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
    source: 'twitter',
    source_url: 'https://twitter.com/status/123456',
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
    source: 'facebook',
    source_url: 'https://facebook.com/post/789012',
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
    source: 'instagram',
    source_url: 'https://instagram.com/p/345678',
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
  {
    id: '6',
    title: 'Food Distribution Needed',
    description: 'Community kitchen running low on supplies. Need volunteers to help distribute food to elderly and disabled residents who cannot leave their homes.',
    location: 'Brooklyn, New York',
    urgency_level: 'medium',
    tags: ['food', 'volunteers', 'elderly', 'community'],
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 48,
    ngo_id: 'ngo-2'
  },
  {
    id: '7',
    title: 'Road Blocked by Fallen Tree',
    description: 'Large tree fell on main road blocking traffic completely. Need tree removal service and traffic diversion. Emergency vehicles cannot pass.',
    location: 'Oak Street, Seattle',
    urgency_level: 'high',
    tags: ['road', 'tree', 'traffic', 'emergency'],
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: 'twitter',
    source_url: 'https://twitter.com/status/234567',
    priority_score: 92
  },
  {
    id: '8',
    title: 'Medical Supplies Needed',
    description: 'Local clinic running low on basic medical supplies. Need first aid kits, bandages, antiseptics, and basic medications for community health checkup camp.',
    location: 'Community Center, Toronto',
    urgency_level: 'medium',
    tags: ['medical', 'health', 'supplies'],
    created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 42,
    ngo_id: 'ngo-3'
  },
  {
    id: '9',
    title: 'School Supplies for Underprivileged',
    description: 'Looking for school supplies including notebooks, pens, pencils, and backpacks for underprivileged children in the area. New academic year starting soon.',
    location: 'Eastside, Boston',
    urgency_level: 'low',
    tags: ['education', 'children', 'school', 'supplies'],
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    source: 'facebook',
    source_url: 'https://facebook.com/post/456789',
    priority_score: 28
  },
  {
    id: '10',
    title: 'Emergency Blood Donation Needed',
    description: 'Urgent need for blood donors at City Hospital. All blood types needed, especially O-negative. Multiple accident victims requiring immediate transfusion.',
    location: 'City Hospital, Los Angeles',
    urgency_level: 'critical',
    tags: ['blood', 'donation', 'medical', 'emergency', 'critical'],
    created_at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    source: 'twitter',
    source_url: 'https://twitter.com/status/345678',
    priority_score: 138,
    ngo_id: 'ngo-1'
  },
  {
    id: '11',
    title: 'Community Garden Maintenance',
    description: 'Community garden needs volunteers for weekend maintenance. Tasks include weeding, planting, and general cleanup. Tools provided. Great for families!',
    location: 'Community Garden, Portland',
    urgency_level: 'low',
    tags: ['garden', 'volunteers', 'community', 'environment'],
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 22
  },
  {
    id: '12',
    title: 'Elderly Companion Program',
    description: 'Seeking volunteers to visit elderly residents who live alone. Just 1-2 hours per week for companionship, help with errands, or check-ins.',
    location: 'Senior Living Complex, Austin',
    urgency_level: 'low',
    tags: ['elderly', 'companionship', 'volunteers', 'community'],
    created_at: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 25,
    ngo_id: 'ngo-2'
  },
  {
    id: '13',
    title: 'Air Quality Alert - Need Masks',
    description: 'Poor air quality due to nearby wildfires. Need N95 masks distribution for vulnerable populations including elderly, children, and those with respiratory conditions.',
    location: 'Downtown, San Francisco',
    urgency_level: 'high',
    tags: ['air quality', 'health', 'emergency', 'masks'],
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: 'twitter',
    source_url: 'https://twitter.com/status/456789',
    priority_score: 95
  },
  {
    id: '14',
    title: 'Library Book Drive',
    description: 'Local library organizing book drive for children. Accepting gently used children books, educational materials, and puzzles. Drop-off at main desk.',
    location: 'Public Library, Denver',
    urgency_level: 'low',
    tags: ['books', 'education', 'children', 'library'],
    created_at: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    source: 'facebook',
    source_url: 'https://facebook.com/post/567890',
    priority_score: 18
  },
  {
    id: '15',
    title: 'Bridge Closure - Detour Help',
    description: 'Main bridge closed for repairs for 2 weeks. Need volunteers to help direct traffic, provide detour information, and assist elderly pedestrians with alternate routes.',
    location: 'River Bridge, Philadelphia',
    urgency_level: 'medium',
    tags: ['traffic', 'bridge', 'volunteers', 'infrastructure'],
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 52
  }
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
    skills: ['construction', 'repair', 'plumbing'],
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
    skills: ['driving', 'logistics', 'delivery'],
    availability: 'flexible',
    location: 'Seattle',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
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
