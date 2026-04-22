# Social Media Integration Setup Guide

## Overview

ImpactFlow now includes social media scraping capabilities to automatically discover community needs and problems from YouTube. This feature helps identify urgent situations by analyzing video descriptions and comments.

## Current Implementation

The current implementation uses **mock data** for demonstration purposes. To enable real-time social media scraping, you need to:

1. Obtain API keys from the respective platforms
2. Configure the environment variables
3. Update the scraper service with real API calls

## Features

### 1. **Social Media Discovery Page** (`/discover`)
- Search by problem type/keyword (e.g., "water shortage", "power outage")
- Filter by location/area
- Results from YouTube
- Automatic urgency detection (Critical, High, Medium, Low)
- AI-based priority scoring
- Results sorted by priority (highest first)

### 2. **Manual Need Submission** (`/needs/submit`)
- Users can manually report community problems
- Form with title, description, location, urgency level
- Tag system for categorization
- Automatic submission to the database

### 3. **Enhanced Needs Page** (`/needs`)
- Search by keyword and location
- Filter by urgency level
- Real-time filtering
- Clear result counts

### 4. **AI-Based Priority Scoring**
The system automatically calculates priority scores based on:
- **Urgency keywords** in the content (critical, urgent, emergency, etc.)
- **Social engagement** (likes, shares, comments)
- **Recency** (more recent posts get higher priority)
- **Content analysis** for problem severity

## Setting Up Real Social Media APIs



### YouTube Data API v3

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create API credentials (API Key)
5. Add to environment variables:
   ```env
   YOUTUBE_API_KEY=your_api_key
   ```

**Example API Call:**
```typescript
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}`);
```

## Alternative: Social Listening Services

If you prefer not to set up individual APIs, consider using social listening services:

- **Brandwatch** - Enterprise social media monitoring
- **Mention** - Real-time social media alerts
- **Hootsuite Insights** - Social media analytics
- **Sprout Social** - Social media management and listening

These services provide APIs that can be integrated with ImpactFlow.

## Database Schema Updates

To support social media features, update your Supabase database:

```sql
-- Add new columns to the needs table
ALTER TABLE needs 
ADD COLUMN source TEXT,
ADD COLUMN source_url TEXT,
ADD COLUMN priority_score INTEGER;

-- Create index for priority-based queries
CREATE INDEX idx_needs_priority_score ON needs(priority_score DESC);
CREATE INDEX idx_needs_source ON needs(source);
```

## Updating the Scraper Service

To replace mock data with real API calls, update `src/services/socialMediaScraper.ts`:

```typescript
async scrapeYouTube(query: string, location?: string): Promise<SocialMediaPost[]> {
  const response = await fetch(`/api/social/search?platform=youtube&query=${encodeURIComponent(query)}&location=${encodeURIComponent(location || '')}`);
  const data = await response.json();
  
  // Transform YouTube data to SocialMediaPost format
  return this.transformYouTubeData(data.items);
}
```

## Priority Scoring Algorithm

The current priority scoring considers:

```typescript
private calculatePriorityScore(post: SocialMediaPost, urgency: string): number {
  let score = 0;

  // Base urgency score
  const urgencyScores = { critical: 100, high: 75, medium: 50, low: 25 };
  score += urgencyScores[urgency];

  // Engagement score
  score += (post.metrics?.likes || 0) * 0.1;
  score += (post.metrics?.shares || 0) * 0.5;
  score += (post.metrics?.comments || 0) * 0.3;

  // Recency score (decays over time)
  const hoursSincePost = (Date.now() - post.timestamp.getTime()) / (1000 * 60 * 60);
  score += Math.max(0, 50 - hoursSincePost);

  return Math.round(score);
}
```

You can customize this algorithm based on your specific needs.

## Rate Limits and Best Practices

- **Twitter**: 450 requests per 15 minutes (free tier)
- **Facebook**: Varies by app type
- **Instagram**: 240 calls per user per hour
- **YouTube**: 10,000 units per day (free tier)

**Best Practices:**
1. Cache results to reduce API calls
2. Use pagination for large result sets
3. Implement exponential backoff for rate limits
4. Respect platform terms of service
5. Only collect public data
6. Implement proper error handling

## Security Considerations

1. Never commit API keys to version control
2. Use environment variables for sensitive data
3. Implement rate limiting on your API
4. Validate and sanitize all input
5. Respect user privacy
6. Comply with data protection regulations (GDPR, CCPA)

## Testing

Test the social media integration:

```bash
# Test with mock data (current implementation)
npm run dev
# Navigate to /discover
# Search for any term to see mock results

# Test with real APIs (after setup)
# Add API keys to .env.local
# Restart the dev server
# Test searches on /discover
```

## Troubleshooting

**Issue: No results appearing**
- Check if API keys are correctly configured
- Verify API credentials are valid
- Check rate limits
- Ensure the query terms match available content

**Issue: API errors**
- Check console for specific error messages
- Verify API permissions
- Ensure you're using the correct API version
- Check if the platform is experiencing outages

**Issue: Low priority scores**
- Adjust the scoring algorithm
- Add more urgency keywords
- Increase engagement weights
- Modify recency decay rate

## Future Enhancements

- [ ] Add more social media platforms (Reddit, LinkedIn, TikTok)
- [ ] Implement image/video analysis for visual needs
- [ ] Add sentiment analysis
- [ ] Create automated alerts for critical needs
- [ ] Implement machine learning for better classification
- [ ] Add geolocation mapping
- [ ] Create admin dashboard for managing sources
- [ ] Add data export functionality

## Support

For issues or questions:
1. Check the documentation for each platform's API
2. Review the code comments in `socialMediaScraper.ts`
3. Test with mock data first
4. Enable debug logging for troubleshooting
