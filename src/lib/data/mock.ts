import { mockNeeds, mockVolunteers, recentActivity } from './mockData';

export const needs = mockNeeds.map(n => ({
  id: n.id,
  title: n.title,
  location: n.location,
  urgency: n.urgency_level.toUpperCase(),
  category: n.tags[0]?.toUpperCase() || 'GENERAL',
  description: n.description,
  tags: n.tags,
  createdAt: 'Recent'
}));

export const volunteers = mockVolunteers.map(v => ({
  id: v.id,
  name: v.name,
  skills: v.skills,
  availability: v.availability,
  location: v.location,
  matchScore: Math.floor(Math.random() * 20) + 80 // 80-100 range
}));

export { recentActivity };
