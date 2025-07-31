# Falcon Alerts - Background Check Platform Demo

A comprehensive React demo showcasing a background check platform with a complete user flow from login to results viewing.

## 🚀 Features

### Complete User Journey

- **Login Screen** with branded authentication
- **Dashboard** with previous checks overview
- **New Check Creation** with dynamic forms for persons/businesses
- **Real-time Processing** simulation with progress tracking
- **Results Display** showing clean or flagged outcomes with detailed reports

### Key Components

- **Login**: Email/password authentication with "Smart Background Intelligence for Smarter Business Decisions" branding
- **Dashboard**: Welcome banner, "Create New Check" CTA, and sortable table of previous checks
- **NewCheck**: Dynamic forms with entity type selection (Person/Business), multi-phone support, and comprehensive data collection
- **Processing**: Animated loading screen simulating data source scanning (12 sources)
- **Results**: Clean results with monitoring confirmation, or flagged results with detailed violation reports

### Technical Features

- React 19 + TypeScript + Vite
- React Router for seamless navigation
- Tailwind CSS for modern, responsive design
- Mock data for realistic demo experience
- Protected routes with authentication flow
- Simulated processing with random result generation

## 🎯 Demo Flow

1. **Start at Login** (`/login`)

   - Enter any email/password to authenticate
   - Redirects to dashboard upon successful login

2. **Dashboard Overview** (`/dashboard`)

   - View previous background checks in table format
   - Click "Create New Check" to start a new background check
   - Click "View Details" on existing checks to see results

3. **Create New Check** (`/new-check`)

   - Select entity type: Person or Business
   - Fill out dynamic form based on selection
   - Submit to initiate background check

4. **Processing** (`/processing`)

   - Watch real-time progress as system "scans" 12 data sources
   - Automatic progression to results (3-5 seconds)

5. **View Results** (`/results`)
   - **Clean**: Green checkmark with monitoring confirmation
   - **Flagged**: Red warning with expandable detailed report including violation records, confidence scores, and download options

## 🛠️ Setup & Running

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
# Start with hot reload
npm run dev
# Open http://localhost:5173

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.tsx          # Authentication screen
│   ├── Dashboard.tsx      # Main dashboard with checks table
│   ├── NewCheck.tsx       # Dynamic form for creating checks
│   ├── Processing.tsx     # Animated loading/progress screen
│   └── Results.tsx        # Clean/flagged results display
├── data/
│   └── mockData.ts        # Sample data for previous checks and violations
├── App.tsx               # Main router and authentication logic
└── main.tsx              # Application entry point
```

## 🎨 Design Highlights

- **Modern UI**: Clean Tailwind CSS design with consistent color scheme
- **Responsive**: Mobile-first approach with responsive layouts
- **Animations**: Smooth loading states and transitions
- **Accessibility**: Proper form labels, keyboard navigation, and ARIA attributes
- **User Experience**: Clear navigation flow with breadcrumbs and back buttons

## 🔒 Authentication

The demo uses mock authentication - any email/password combination will work. In a production environment, you would integrate with your actual authentication service.

## 📊 Mock Data

The application includes realistic mock data for:

- **Previous Checks**: Sample person and business background checks with various statuses
- **Violation Records**: Detailed flagged records with confidence scores, sources, and matching criteria
- **Processing Sources**: 12 realistic data sources for the scanning simulation

## 🚀 Production Notes

This is a **demo/prototype** with:

- Mock authentication (any credentials work)
- Simulated processing (no real background checks)
- Static mock data (no backend integration)
- Random result generation for demonstration

For production deployment:

- Integrate with real authentication service
- Connect to actual background check APIs
- Implement real data persistence
- Add comprehensive error handling
- Include proper security measures
