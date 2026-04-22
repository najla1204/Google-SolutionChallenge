# ImpactFlow - Community Needs & Volunteer Coordination Platform

ImpactFlow is a platform that connects volunteers with community needs in real-time. It automatically discovers problems from social media, allows manual reporting, and uses AI to prioritize urgent situations.

## Features

### 🎯 Core Functionality
- **Community Needs Discovery** - Browse and search for community problems by location, urgency, and keywords
- **Social Media Integration** - Automatically scrape needs from Twitter, Facebook, Instagram, and YouTube
- **AI-Based Priority Scoring** - Intelligent scoring system that ranks problems by urgency and impact
- **Manual Problem Reporting** - Easy-to-use form for users to report community issues
- **Volunteer Matching** - Connect skilled volunteers with specific needs

### 📊 Dashboard Features
- Real-time metrics on community needs and volunteer activity
- Urgency heatmap visualization
- Activity feed showing recent updates
- Success rate tracking

### 🔍 Search & Filter
- Search by keyword and location
- Filter by urgency level (Critical, High, Medium, Low)
- Real-time filtering with instant results
- Area-based problem discovery

## Workflow

### For Volunteers
1. **Sign Up** - Create an account as a volunteer
2. **Browse Needs** - Visit the Needs page to see community problems
3. **Filter & Search** - Use filters to find needs in your area or matching your skills
4. **Respond** - Connect with NGOs or individuals to help
5. **Track Progress** - Monitor the status of needs you're helping with

### For NGOs/Coordinators
1. **Sign Up** - Create an account as an NGO/Coordinator
2. **Access Dashboard** - View overview of community needs and volunteer activity
3. **Discover Problems** - Use the Discover page to find problems from social media
4. **Create Needs** - Add community needs manually or import from social media
5. **Match Volunteers** - Use the volunteer matching system to connect with helpers
6. **Track Progress** - Monitor resolution status and success rates

### For Community Members
1. **Report Problems** - Use the Submit form to report community issues
2. **Provide Details** - Include location, description, and urgency level
3. **Add Tags** - Categorize the problem for better matching
4. **Track Resolution** - Monitor the status of reported problems

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (for database)
- (Optional) Social media API keys for real-time scraping

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Google-SolutionChallenge.git
cd Google-SolutionChallenge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Database Setup

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the following SQL in the SQL Editor:

```sql
-- Create tables
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  name TEXT,
  role TEXT,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE needs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  urgency_level TEXT,
  tags TEXT[],
  ngo_id UUID REFERENCES profiles(id),
  source TEXT,
  source_url TEXT,
  priority_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  skills TEXT[],
  availability TEXT,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  need_id UUID REFERENCES needs(id),
  volunteer_id UUID REFERENCES volunteers(id),
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_needs_location ON needs(location);
CREATE INDEX idx_needs_urgency ON needs(urgency_level);
CREATE INDEX idx_needs_priority_score ON needs(priority_score DESC);

-- Row Level Security (RLS) Policies
-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow authenticated users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## Social Media Integration

The platform includes social media scraping capabilities to automatically discover community needs. Currently, it uses mock data for demonstration.

To enable real-time social media scraping:

1. See [SOCIAL_MEDIA_SETUP.md](./SOCIAL_MEDIA_SETUP.md) for detailed instructions
2. Obtain API keys from Twitter, Facebook, Instagram, and/or YouTube
3. Add API keys to your environment variables
4. Update the scraper service with real API calls

### Quick Start with Mock Data

The current implementation includes mock data that demonstrates the functionality:

1. Navigate to `/discover`
2. Enter a search term (e.g., "water shortage")
3. Optionally enter a location
4. Click "Search Social Media"
5. View results sorted by priority

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/          # Login page
│   │   └── signup/         # Signup page
│   ├── dashboard/          # NGO dashboard
│   ├── discover/           # Social media discovery
│   ├── needs/
│   │   ├── page.tsx        # Browse needs
│   │   └── submit/         # Submit new need
│   ├── volunteers/         # Volunteer listing
│   └── page.tsx            # Landing page
├── components/
│   ├── atoms/              # Small UI components
│   ├── molecules/          # Medium UI components
│   └── organisms/          # Large UI components
├── lib/
│   ├── database.types.ts   # TypeScript types
│   └── supabase.ts        # Supabase client
└── services/
    ├── auth.ts             # Authentication service
    ├── needs.ts            # Needs service
    ├── volunteers.ts       # Volunteers service
    └── socialMediaScraper.ts  # Social media scraper
```

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19 with Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Language**: TypeScript

## Key Features Explained

### AI-Based Priority Scoring

The system automatically calculates priority scores for each need based on:

- **Urgency Detection**: Keywords like "emergency", "critical", "urgent" increase score
- **Social Engagement**: Higher likes, shares, and comments increase priority
- **Recency**: More recent posts get higher priority
- **Content Analysis**: Problem severity assessment

### Area-Based Discovery

Users can:
- Search by specific location or area
- Filter needs by geographic region
- View problems sorted by proximity
- Import social media results by location

### Manual Problem Submission

Users can:
- Report problems with detailed descriptions
- Specify urgency level
- Add location information
- Include tags for categorization
- Track submission status

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. Create a new service in `src/services/`
2. Add TypeScript types in `src/lib/database.types.ts`
3. Create UI components in `src/components/`
4. Add pages in `src/app/`
5. Update the navbar if needed

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Check the [SOCIAL_MEDIA_SETUP.md](./SOCIAL_MEDIA_SETUP.md) for social media integration
- Review the code comments for detailed explanations
- Open an issue on GitHub for bugs or feature requests

## Acknowledgments

- Built for Google Solution Challenge
- Uses Supabase for backend services
- UI inspired by modern design systems
- Social media integration architecture for community impact
