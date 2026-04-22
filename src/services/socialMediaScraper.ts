/**
 * Social Media Scraper Service
 * 
 * This service is designed to collect needs and problems from YouTube.
 * 
 * IMPORTANT: Real data collection requires official API access and compliance with platform terms of service.
 * This implementation provides a structure that can be extended with real APIs.
 * 
 * Required API Keys for Production:
 * - YouTube: https://developers.google.com/youtube/v3
 */

export interface SocialMediaPost {
  id: string;
  platform: 'youtube';
  content: string;
  author: string;
  location?: string;
  timestamp: Date;
  url: string;
  metrics?: {
    likes?: number;
    shares?: number;
    comments?: number;
  };
}

export interface ScrapedNeed {
  title: string;
  description: string;
  location: string;
  urgency_level: 'critical' | 'high' | 'medium' | 'low';
  tags: string[];
  source: 'youtube' | 'manual';
  source_url?: string;
  priority_score: number;
}

class SocialMediaScraper {
  private youtubeKey: string | null = null;

  constructor() {
    this.youtubeKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || null;
  }

  /**
   * Check if the YouTube scraper is configured
   */
  isConfigured(): boolean {
    return !!this.youtubeKey;
  }

  /**
   * Scrape YouTube for needs and problems
   * Requires YouTube Data API v3 access
   */
  async scrapeYouTube(query: string, location?: string): Promise<SocialMediaPost[]> {
    if (!this.youtubeKey) {
      console.warn('YouTube API not configured. Using mock data.');
      return this.getMockYouTubeData(query, location);
    }

    try {
      const response = await fetch(`/api/social/search?platform=youtube&query=${encodeURIComponent(query)}&location=${encodeURIComponent(location || '')}`);
      const data = await response.json();

      if (!response.ok) {
        console.warn('YouTube API Proxy Error, falling back to mock:', data.error);
        return this.getMockYouTubeData(query, location);
      }

      return (data.items || []).map((item: any) => ({
        id: item.id?.videoId || item.id,
        platform: 'youtube',
        content: `${item.snippet.title}: ${item.snippet.description}`,
        author: item.snippet.channelTitle,
        location: location,
        timestamp: new Date(item.snippet.publishedAt),
        url: `https://www.youtube.com/watch?v=${item.id?.videoId || item.id}`
      }));
    } catch (error) {
      console.warn('Error scraping YouTube, falling back to mock:', error);
      return this.getMockYouTubeData(query, location);
    }
  }

  /**
   * Scrape all supported platforms (currently only YouTube)
   */
  async scrapeAllPlatforms(query: string, location?: string): Promise<SocialMediaPost[]> {
    return await this.scrapeYouTube(query, location);
  }

  /**
   * Convert social media posts to needs format
   */
  convertPostsToNeeds(posts: SocialMediaPost[]): ScrapedNeed[] {
    return posts.map(post => {
      const urgency = this.detectUrgency(post.content);
      const priorityScore = this.calculatePriorityScore(post, urgency);
      
      return {
        title: this.extractTitle(post.content),
        description: post.content,
        location: post.location || 'Unknown location',
        urgency_level: urgency,
        tags: this.extractTags(post.content),
        source: post.platform,
        source_url: post.url,
        priority_score: priorityScore
      };
    }).sort((a, b) => b.priority_score - a.priority_score); // Sort by priority (highest first)
  }

  /**
   * Detect urgency level from content using advanced keyword analysis
   */
  private detectUrgency(content: string): 'critical' | 'high' | 'medium' | 'low' {
    const criticalKeywords = ['emergency', 'critical', 'life threatening', 'danger', 'urgent help needed', 'immediate', 'collapsed', 'trapped', 'fire', 'explosion', 'bleeding'];
    const highKeywords = ['urgent', 'asap', 'help needed', 'serious', 'important', 'shortage', 'outage', 'broken', 'damaged', 'flood', 'storm'];
    const lowKeywords = ['looking for', 'seeking', 'would like', 'planning', 'donating', 'optional', 'future'];

    const lowerContent = content.toLowerCase();

    // Check for intensity markers like caps or multiple exclamation marks
    const hasExclamationIntensity = (content.match(/!{2,}/g) || []).length > 0;
    const hasCapsIntensity = (content.match(/[A-Z]{4,}/g) || []).length > 2;

    if (criticalKeywords.some(keyword => lowerContent.includes(keyword)) || (hasExclamationIntensity && hasCapsIntensity)) {
      return 'critical';
    }
    if (highKeywords.some(keyword => lowerContent.includes(keyword)) || hasExclamationIntensity) {
      return 'high';
    }
    if (lowKeywords.some(keyword => lowerContent.includes(keyword))) {
      return 'low';
    }
    return 'medium';
  }

  /**
   * Calculate priority score based on multiple factors:
   * 1. Base Urgency (up to 100 pts)
   * 2. Social Amplification (up to 50 pts)
   * 3. Temporal Decay (recent posts maintain higher scores)
   * 4. Content Density (longer, more descriptive posts have higher confidence)
   */
  private calculatePriorityScore(post: SocialMediaPost, urgency: string): number {
    let score = 0;

    // 1. Urgency score
    const urgencyScores = { critical: 100, high: 75, medium: 50, low: 25 };
    score += urgencyScores[urgency as keyof typeof urgencyScores];

    // 2. Engagement score (logarithmic to prevent outliers from dominating)
    if (post.metrics) {
      const likes = post.metrics.likes || 0;
      const shares = post.metrics.shares || 0;
      const comments = post.metrics.comments || 0;
      
      score += Math.min(25, Math.log10(likes + 1) * 5);
      score += Math.min(25, Math.log10(shares + 1) * 8);
      score += Math.min(10, Math.log10(comments + 1) * 3);
    }

    // 3. Recency score (Linear decay over 72 hours)
    const hoursSincePost = (Date.now() - post.timestamp.getTime()) / (1000 * 60 * 60);
    const recencyBonus = Math.max(0, 50 - (hoursSincePost * 0.7));
    score += recencyBonus;

    // 4. Content Quality Confidence
    if (post.content.length > 100) score += 5;
    if (post.content.includes('#')) score += 5;

    return Math.min(199, Math.round(score));
  }

  /**
   * Extract title from content
   */
  private extractTitle(content: string): string {
    const words = content.split(' ');
    if (words.length <= 10) return content;
    return words.slice(0, 10).join(' ') + '...';
  }

  /**
   * Extract tags from content
   */
  private extractTags(content: string): string[] {
    const tags: string[] = [];
    const hashtagRegex = /#(\w+)/g;
    let match;

    while ((match = hashtagRegex.exec(content)) !== null) {
      tags.push(match[1]);
    }

    return tags.slice(0, 5); // Limit to 5 tags
  }

  /**
   * Import a scraped need into the system
   * This is a placeholder for real backend integration
   */
  async importToNeeds(need: ScrapedNeed): Promise<void> {
    // In a real application, this would call an API to save the need to a database
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  private getMockYouTubeData(query: string, location?: string): SocialMediaPost[] {
    // If searching for Tamil Nadu, return Tamil Nadu specific data
    if (location && location.toLowerCase().includes('tamil nadu')) {
      return [
        {
          id: 'tn-yt-1',
          platform: 'youtube',
          content: `Video report: Drinking water crisis in Salem district. Yamuna river levels low affecting water supply. Need immediate intervention. 💧 #Salem #TamilNadu #WaterCrisis`,
          author: 'Tamil Nadu News Network',
          location: 'Salem, Tamil Nadu, India',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          url: 'https://youtube.com/watch?v=salem_water',
          metrics: { likes: 2345, shares: 567, comments: 345 }
        }
      ];
    }

    return [
      {
        id: 'yt-5',
        platform: 'youtube',
        content: `Video report: Homeless community in ${location || 'central park'} needs shelter and food supplies. Winter is approaching fast.`,
        author: 'Social Justice Channel',
        location: location || 'Central Park',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        url: 'https://youtube.com/watch?v=5',
        metrics: { likes: 1234, shares: 45, comments: 156 }
      },
      {
        id: 'yt-6',
        platform: 'youtube',
        content: `URGENT: Infrastructure collapse in ${location || 'East District'}. Bridge repairs stalled, affecting emergency vehicle access.`,
        author: 'Local News Daily',
        location: location || 'East District',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        url: 'https://youtube.com/watch?v=6',
        metrics: { likes: 3450, shares: 1200, comments: 450 }
      },
      {
        id: 'yt-7',
        platform: 'youtube',
        content: `Medical Supply Crisis: Rural clinics in ${location || 'the outskirts'} reporting critical shortages of insulin and antibiotics.`,
        author: 'Health Watch',
        location: location || 'Rural Areas',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        url: 'https://youtube.com/watch?v=7',
        metrics: { likes: 890, shares: 560, comments: 230 }
      },
      {
        id: 'yt-8',
        platform: 'youtube',
        content: `Storm Relief Update: Emergency shelters in ${location || 'West Sector'} have reached capacity. Volunteers needed for distribution.`,
        author: 'Weather Channel Official',
        location: location || 'West Sector',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        url: 'https://youtube.com/watch?v=8',
        metrics: { likes: 15600, shares: 8900, comments: 3400 }
      }
    ];
  }
}

// Export singleton instance
export const socialMediaScraper = new SocialMediaScraper();
