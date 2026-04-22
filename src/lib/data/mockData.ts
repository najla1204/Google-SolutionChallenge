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
    source: 'manual',
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
    source: 'manual',
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
    source: 'manual',
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
    source: 'manual',
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
    source: 'manual',
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
  },
  {
    id: '16',
    title: 'Water Crisis in Chennai Suburbs',
    description: 'Severe water shortage reported in Tambaram and Chromepet areas. Residents facing 48-hour water supply disruption. Tanker trucks needed immediately for drinking water distribution.',
    location: 'Chennai, Tamil Nadu, India',
    urgency_level: 'critical',
    tags: ['water', 'emergency', 'chennai', 'tamilnadu'],
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 148
  },
  {
    id: '17',
    title: 'Flood Warning in Coimbatore',
    description: 'Heavy rainfall in Coimbatore district causing waterlogging in low-lying areas. Noyyal River water level rising. Residents in Singanallur and Peelamedu advised to move to safer locations.',
    location: 'Coimbatore, Tamil Nadu, India',
    urgency_level: 'critical',
    tags: ['flood', 'rain', 'emergency', 'coimbatore', 'tamilnadu'],
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 142
  },
  {
    id: '18',
    title: 'Power Outage in Madurai',
    description: 'Major power outage in Madurai city affecting 50,000+ households. Transformer failure in Thiruparankundram area. TANGEDCO working on restoration, expected to take 6-8 hours.',
    location: 'Madurai, Tamil Nadu, India',
    urgency_level: 'high',
    tags: ['power', 'electricity', 'madurai', 'tamilnadu', 'infrastructure'],
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 96
  },
  {
    id: '19',
    title: 'Road Accident on GST Road',
    description: 'Major accident on Grand Southern Trunk Road near Vandalur. Multiple vehicles involved, traffic completely blocked. Ambulances and police needed. Diversion through Inner Ring Road.',
    location: 'Chennai, Tamil Nadu, India',
    urgency_level: 'critical',
    tags: ['accident', 'traffic', 'emergency', 'chennai', 'tamilnadu'],
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 135
  },
  {
    id: '20',
    title: 'Medical Camp Needed in Tirunelveli',
    description: 'Rural areas in Tirunelveli district need medical camp. Dengue cases rising in Nanguneri and Radhapuram blocks. Doctors, nurses, and medical supplies urgently needed.',
    location: 'Tirunelveli, Tamil Nadu, India',
    urgency_level: 'high',
    tags: ['medical', 'health', 'dengue', 'tirunelveli', 'tamilnadu'],
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 89
  },
  {
    id: '21',
    title: 'Food Distribution for Flood Victims',
    description: 'Flood-affected families in Cuddalore need immediate food supplies. 200+ families in Chidambaram and Kattumannarkoil areas without food. Volunteers needed for distribution.',
    location: 'Cuddalore, Tamil Nadu, India',
    urgency_level: 'high',
    tags: ['food', 'flood', 'relief', 'cuddalore', 'tamilnadu'],
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 92
  },
  {
    id: '22',
    title: 'School Building Damage in Trichy',
    description: 'Government school building in Trichy damaged due to heavy rains. Students studying in temporary shelter. Need repair work and temporary classroom setup.',
    location: 'Trichy, Tamil Nadu, India',
    urgency_level: 'medium',
    tags: ['education', 'school', 'infrastructure', 'trichy', 'tamilnadu'],
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 58
  },
  {
    id: '23',
    title: 'Drinking Water Scarcity in Salem',
    description: 'Drinking water crisis in Salem district. Yamuna river levels low, affecting water supply to Salem city and surrounding areas. Water tankers and borewell restoration needed.',
    location: 'Salem, Tamil Nadu, India',
    urgency_level: 'high',
    tags: ['water', 'drinking', 'salem', 'tamilnadu', 'infrastructure'],
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 87
  },
  {
    id: '24',
    title: 'Tree Removal Needed in Erode',
    description: 'Multiple trees fell on roads in Erode due to heavy winds. Traffic disrupted in Bhavani and Gobichettipalayam areas. Need tree cutting service and traffic management.',
    location: 'Erode, Tamil Nadu, India',
    urgency_level: 'medium',
    tags: ['tree', 'traffic', 'erode', 'tamilnadu', 'infrastructure'],
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 54
  },
  {
    id: '25',
    title: 'Beach Cleanup in Rameswaram',
    description: 'Plastic waste accumulation on Rameswaram beach affecting marine life. Need volunteers for cleanup drive and waste management. Weekend cleanup planned.',
    location: 'Rameswaram, Tamil Nadu, India',
    urgency_level: 'low',
    tags: ['environment', 'beach', 'cleanup', 'rameswaram', 'tamilnadu'],
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 32
  },
  {
    id: '26',
    title: 'Elderly Care Needed in Thanjavur',
    description: 'Elderly residents in Thanjavur need assistance during heat wave. Need volunteers to check on seniors, provide drinking water, and help with medical emergencies.',
    location: 'Thanjavur, Tamil Nadu, India',
    urgency_level: 'high',
    tags: ['elderly', 'heat', 'volunteers', 'thanjavur', 'tamilnadu'],
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 78
  },
  {
    id: '27',
    title: 'Cyclone Preparation in Nagapattinam',
    description: 'Cyclone warning for Nagapattinam coast. Fishermen advised not to venture into sea. Need evacuation assistance for coastal villages. Emergency shelters being set up.',
    location: 'Nagapattinam, Tamil Nadu, India',
    urgency_level: 'critical',
    tags: ['cyclone', 'emergency', 'evacuation', 'nagapattinam', 'tamilnadu'],
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 138
  },
  {
    id: '28',
    title: 'Blood Donation Camp in Vellore',
    description: 'Emergency blood donation camp needed in Vellore. CMC Hospital running low on blood stock. All blood types needed, especially O-negative and B-positive.',
    location: 'Vellore, Tamil Nadu, India',
    urgency_level: 'high',
    tags: ['blood', 'donation', 'medical', 'vellore', 'tamilnadu'],
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 91
  },
  {
    id: '29',
    title: 'Animal Rescue in Kanyakumari',
    description: 'Stray animals affected by heavy rains in Kanyakumari. Need animal rescue volunteers, food supplies for animals, and temporary shelter setup.',
    location: 'Kanyakumari, Tamil Nadu, India',
    urgency_level: 'medium',
    tags: ['animals', 'rescue', 'rain', 'kanyakumari', 'tamilnadu'],
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 51
  },
  {
    id: '30',
    title: 'Temple Renovation in Kumbakonam',
    description: 'Historic temple in Kumbakonam needs renovation. Heritage site damaged by rains. Need masons, architects, and funding for restoration work.',
    location: 'Kumbakonam, Tamil Nadu, India',
    urgency_level: 'low',
    tags: ['heritage', 'temple', 'renovation', 'kumbakonam', 'tamilnadu'],
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    source: 'manual',
    priority_score: 28
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
  },
  {
    id: 'v6',
    user_id: 'user-6',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    skills: ['medical', 'first aid', 'tamil', 'Critical Care'],
    availability: 'weekends',
    location: 'Chennai, Tamil Nadu, India',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v7',
    user_id: 'user-7',
    name: 'Priya Lakshmi',
    email: 'priya@example.com',
    skills: ['teaching', 'tutoring', 'tamil', 'Crisis Counseling'],
    availability: 'evenings',
    location: 'Coimbatore, Tamil Nadu, India',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v8',
    user_id: 'user-8',
    name: 'Suresh Pandian',
    email: 'suresh@example.com',
    skills: ['construction', 'repair', 'plumbing', 'tamil', 'Masonry'],
    availability: 'flexible',
    location: 'Madurai, Tamil Nadu, India',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v9',
    user_id: 'user-9',
    name: 'Anand Ramanathan',
    email: 'anand@example.com',
    skills: ['cooking', 'food distribution', 'tamil', 'Logistics'],
    availability: 'weekdays',
    location: 'Trichy, Tamil Nadu, India',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v10',
    user_id: 'user-10',
    name: 'Kavitha Subramanian',
    email: 'kavitha@example.com',
    skills: ['driving', 'logistics', 'delivery', 'tamil', 'Rescue'],
    availability: 'flexible',
    location: 'Salem, Tamil Nadu, India',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v11',
    user_id: 'user-11',
    name: 'Robert Fox',
    email: 'robert@example.com',
    skills: ['Search & Rescue', 'First Aid', 'Mountain Climbing'],
    availability: 'on-call',
    location: 'Boulder, CO',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'v12',
    user_id: 'user-12',
    name: 'Jane Cooper',
    email: 'jane@example.com',
    skills: ['Nursing', 'Pediatrics', 'Multilingual'],
    availability: 'weekends',
    location: 'New York',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const recentActivity = [
  { id: "act-1", user: "John Smith", action: "accepted deployment for", target: "Water Shortage in Downtown", time: "12m ago" },
  { id: "act-2", user: "System", action: "automatically matched", target: "Sarah Johnson to Literacy Camp", time: "25m ago" },
  { id: "act-3", user: "Admin", action: "verified new responder", target: "Robert Fox", time: "1h ago" },
  { id: "act-4", user: "Rajesh Kumar", action: "imported data from", target: "YouTube: #ChennaiCyclones", time: "2h ago" },
  { id: "act-5", user: "ImpactFlow Bot", action: "detected urgency cluster in", target: "Southern District", time: "3h ago" },
  { id: "act-6", user: "Priya Lakshmi", action: "delivered 500 units of", target: "Medical Kits to Coimbatore", time: "5h ago" },
  { id: "act-7", user: "System", action: "synced with", target: "YouTube Data API v3", time: "6h ago" },
  { id: "act-8", user: "Michael Brown", action: "resolved infrastructure issue at", target: "Sector 4 Main Pipe", time: "8h ago" },
  { id: "act-9", user: "Emily Davis", action: "completed food drive for", target: "Homeless Shelter London", time: "12h ago" },
  { id: "act-10", user: "David Wilson", action: "optimized delivery route for", target: "Nagapattinam Relief", time: "14h ago" },
  { id: "act-11", user: "Kavitha Subramanian", action: "registered as", target: "Structural Engineering Specialist", time: "18h ago" },
  { id: "act-12", user: "NGO: Urban Aid", action: "posted new critical need", target: "Wildfire Mask Distribution", time: "22h ago" },
  { id: "act-13", user: "James Cooper", action: "verified logistics at", target: "Vellore Blood Bank", time: "1d ago" },
  { id: "act-14", user: "System", action: "performed network health scan", target: "All Nodes", time: "1d ago" },
  { id: "act-15", user: "User: 9182", action: "submitted report via", target: "Smart Scanner App", time: "2d ago" }
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
  },
  {
    id: 'ngo-6',
    name: 'Madurai Community Care',
    email: 'admin@mcc.org',
    location: 'Madurai, Tamil Nadu, India',
    role: 'ngo',
    created_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString()
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
