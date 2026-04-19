export const needs = [
  {
    id: "need-1",
    title: "Water Filtration Kits",
    location: "Downtown / East Side",
    urgency: "CRITICAL",
    category: "WATER",
    description: "Urgent need for water purification tablets and portable filtration units for 50 households.",
    tags: ["Immediate", "Health"],
    createdAt: "2h ago"
  },
  {
    id: "need-2",
    title: "Emergency Shelter Mats",
    location: "Northside Community Center",
    urgency: "HIGH",
    category: "SHELTER",
    description: "40 foam mats required for temporary overnight shelter due to storm damage.",
    tags: ["Logistics", "Cold-Weather"],
    createdAt: "5h ago"
  },
  {
    id: "need-3",
    title: "Baby Formula & Diapers",
    location: "Southwood Family Shelter",
    urgency: "HIGH",
    category: "FOOD",
    description: "Supplies running low for infants aged 0-12 months. Immediate replenishment needed.",
    tags: ["Family", "Urgent Supplies"],
    createdAt: "1h ago"
  },
  {
    id: "need-4",
    title: "Medical Consultation",
    location: "Greenwood Park Clinic",
    urgency: "MEDIUM",
    category: "MEDICAL",
    description: "Seeking two volunteer nurses to help with outpatient checkups this weekend.",
    tags: ["Professional", "Medical"],
    createdAt: "10h ago"
  },
  {
    id: "need-5",
    title: "Localized Power Backup",
    location: "Pinecrest Senior Living",
    urgency: "CRITICAL",
    category: "ENERGY",
    description: "Oxygen concentrators require backup power. Generator or large battery units needed.",
    tags: ["Critical Care", "Infrastructure"],
    createdAt: "30m ago"
  }
];

export const volunteers = [
  {
    id: "vol-1",
    name: "Alex Rivera",
    skills: ["Medical", "First Aid", "Spanish Speaking"],
    availability: "Immediate",
    location: "Downtown",
    matchScore: 98
  },
  {
    id: "vol-2",
    name: "Sarah Chen",
    skills: ["Logistics", "Driving", "Heavy Lifting"],
    availability: "Weekends",
    location: "Northside",
    matchScore: 85
  },
  {
    id: "vol-3",
    name: "James Wilson",
    skills: ["Electrician", "Solar Tech"],
    availability: "Evening",
    location: "East Side",
    matchScore: 92
  },
  {
    id: "vol-4",
    name: "Dr. Maria Santos",
    skills: ["Pediatrics", "Emergency Med"],
    availability: "On-Call",
    location: "West End",
    matchScore: 88
  }
];

export const recentActivity = [
  {
    id: "act-1",
    user: "Alex Rivera",
    action: "matched to",
    target: "Water Filtration Kits",
    time: "45m ago"
  },
  {
    id: "act-2",
    user: "System",
    action: "extracted data from",
    target: "Pinecrest Report.pdf",
    time: "1h ago"
  },
  {
    id: "act-3",
    user: "Maria Santos",
    action: "completed checkup at",
    target: "Greenwood Clinic",
    time: "3h ago"
  }
];
