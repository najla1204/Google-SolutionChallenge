# Mock Data Guide

## Overview

The ImpactFlow application now includes comprehensive mock data for testing purposes. This allows you to test the application without setting up a database or API keys.

## How It Works

The application automatically detects whether to use mock data or real database data based on the environment configuration:

- **If Supabase is not configured** → Uses mock data automatically
- **If `NEXT_PUBLIC_USE_MOCK_DATA=true`** → Forces use of mock data
- **If Supabase is configured** → Uses real database data
- **If database errors occur** → Falls back to mock data gracefully

## Available Mock Data

### 1. Community Needs (15 items)

The mock data includes diverse community needs:

**Critical Priority:**
- Water shortage in Downtown, New York
- Flooding in Low-lying Areas, Mumbai
- Emergency blood donation needed in Los Angeles

**High Priority:**
- Power outage in Northern District, Chicago
- Homeless community needs shelter in London
- Road blocked by fallen tree in Seattle
- Air quality alert in San Francisco

**Medium Priority:**
- Broken water pipe in Sector 4, Delhi
- Food distribution needed in Brooklyn
- Medical supplies needed in Toronto
- Bridge closure in Philadelphia

**Low Priority:**
- School supplies for underprivileged children in Boston
- Community garden maintenance in Portland
- Elderly companion program in Austin
- Library book drive in Denver

### 2. Volunteers (5 profiles)

Mock volunteer profiles with various skills:
- John Smith - Medical, first aid, driving
- Sarah Johnson - Teaching, tutoring, childcare
- Michael Brown - Construction, repair, plumbing
- Emily Davis - Cooking, food distribution
- David Wilson - Driving, logistics, delivery

### 3. NGOs (3 organizations)

Mock NGO profiles:
- Community Relief Foundation (New York)
- Urban Aid Network (Chicago)
- Health & Hope Initiative (London)

## Using Mock Data

### Option 1: Automatic (No Database Required)

Simply run the application without configuring Supabase:

```bash
npm run dev
```

The app will automatically use mock data when:
- No `NEXT_PUBLIC_SUPABASE_URL` is set
- No `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set

### Option 2: Force Mock Data

Add this to your `.env.local` file:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

This forces the app to use mock data even if Supabase is configured.

### Option 3: Use Real Database

Configure Supabase in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The app will use real data and fall back to mock data only if errors occur.

## Testing Scenarios

### Test the Needs Page

1. Navigate to `/needs`
2. You'll see 15 mock needs displayed
3. Try the search functionality:
   - Search for "water" → Shows water-related needs
   - Search for "emergency" → Shows critical needs
4. Try location search:
   - Enter "New York" → Shows needs in New York
5. Try urgency filters:
   - Click "Show Filters"
   - Select "Critical" → Shows only critical needs

### Test the Discover Page

1. Navigate to `/discover`
2. Enter a search term (e.g., "water shortage")
3. Optionally enter a location
4. Click "Search Social Media"
5. View mock social media results with priority scores

### Test the Submit Form

1. Navigate to `/needs/submit`
2. Fill in the form with test data
3. Submit the form
4. In mock mode, it will log the submission to console
5. Redirects to needs page after 2 seconds

### Test the Dashboard

1. Navigate to `/dashboard`
2. View mock metrics:
   - Active Needs: 15
   - Volunteers: 5
   - Urgent Needs: 7
   - Success Rate: 85%

## Mock Data Features

### Helper Functions

The mock data includes helper functions for testing:

```typescript
import { 
  mockNeeds, 
  mockVolunteers,
  getNeedsByLocation,
  getNeedsByUrgency,
  getNeedsBySource,
  getNeedsByTag,
  searchNeeds,
  getRandomNeeds,
  getNeedsByPriority
} from '@/lib/data/mockData';

// Get needs by location
const newYorkNeeds = getNeedsByLocation('New York');

// Get needs by urgency
const criticalNeeds = getNeedsByUrgency('critical');

// Search by keyword
const waterNeeds = searchNeeds('water');

// Get random needs (for pagination testing)
const randomFive = getRandomNeeds(5);

// Get needs sorted by priority
const prioritized = getNeedsByPriority();
```

### Data Structure

Each mock need includes:
- `id`: Unique identifier
- `title`: Need title
- `description`: Detailed description
- `location`: Geographic location
- `urgency_level`: critical, high, medium, low
- `tags`: Array of relevant tags
- `created_at`: Timestamp
- `source`: twitter, facebook, instagram, youtube, manual
- `source_url`: Link to original post (if from social media)
- `priority_score`: AI-calculated priority (0-200)
- `ngo_id`: Associated NGO (optional)

### Priority Scoring

Mock needs have realistic priority scores:
- Critical needs: 135-155
- High needs: 85-100
- Medium needs: 40-60
- Low needs: 15-30

Scores are calculated based on:
- Urgency level (base score)
- Social engagement (simulated)
- Recency (simulated timestamps)

## Switching Between Mock and Real Data

### During Development

Use mock data for quick development and testing:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### For Production

Remove the mock data flag and configure Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
# Remove NEXT_PUBLIC_USE_MOCK_DATA
```

### For Testing

Create a test environment file `.env.test`:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

Run tests with:
```bash
cp .env.test .env.local
npm run test
```

## Adding Custom Mock Data

To add your own mock data, edit `src/lib/data/mockData.ts`:

```typescript
export const mockNeeds: MockNeed[] = [
  // Add your custom needs here
  {
    id: 'custom-1',
    title: 'Your Custom Need',
    description: 'Description of the need',
    location: 'Your Location',
    urgency_level: 'high',
    tags: ['custom', 'tag'],
    created_at: new Date().toISOString(),
    source: 'manual',
    priority_score: 75
  },
  // ... more needs
];
```

## Troubleshooting

### Mock Data Not Loading

If you're not seeing mock data:

1. Check browser console for "Using mock data" message
2. Verify `.env.local` doesn't have Supabase credentials (unless you want real data)
3. Try setting `NEXT_PUBLIC_USE_MOCK_DATA=true` explicitly
4. Restart the development server

### Data Not Persisting

Mock data doesn't persist between sessions. This is expected behavior:
- When you submit a form in mock mode, it logs to console
- Data resets when you refresh the page
- To persist data, configure Supabase

### TypeScript Errors

If you see TypeScript errors related to database types:
- These are linting warnings and won't prevent the app from running
- They occur because mock data structure may differ from database schema
- The app will still work correctly in development mode

## Best Practices

1. **Use mock data for**: 
   - Initial development
   - UI testing
   - Demonstrations
   - CI/CD pipelines

2. **Use real database for**:
   - Production deployments
   - User testing
   - Data persistence
   - Multi-user scenarios

3. **Test both modes**:
   - Verify features work with mock data
   - Verify features work with real database
   - Test the fallback behavior

## Performance

Mock data is loaded synchronously and is very fast:
- No network requests
- No database queries
- Instant page loads
- Perfect for local development

## Security

Mock data is safe because:
- No credentials required
- No external API calls
- No data exposure
- Works completely offline
