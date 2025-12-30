# LegacyLearn Frontend

A modern, responsive React frontend for the LegacyLearn mentorship platform.

## Features

- 🔐 User Authentication (Student & Mentor)
- 🎯 AI-Powered Mentor Matching
- 📱 Fully Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time API Integration

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:8000` (or configure via environment variables)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file to configure the API URL:
```env
VITE_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components (Navbar, etc.)
│   ├── context/         # React Context (AuthContext)
│   ├── pages/          # Page components
│   ├── services/       # API service layer
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html         # HTML template
└── package.json        # Dependencies
```

## Features Overview

### Authentication
- Separate registration/login for students and mentors
- JWT token-based authentication
- Protected routes

### Student Dashboard
- Search for mentors using natural language queries
- View AI-powered mentor recommendations
- Submit feedback on mentor matches

### Mentor Dashboard
- Profile overview
- Refresh embeddings for better matching
- View sessions and reviews (UI ready)

## API Integration

The frontend communicates with the FastAPI backend through the following endpoints:

- `POST /api/students/register` - Student registration
- `POST /api/students/login` - Student login
- `POST /api/mentors/register` - Mentor registration
- `POST /api/mentors/login` - Mentor login
- `GET /api/match/` - Get mentor recommendations
- `POST /api/match/refresh` - Refresh mentor embeddings
- `POST /api/feedback/` - Submit feedback

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- The frontend uses a proxy configuration in `vite.config.js` to forward `/api` requests to the backend
- Authentication tokens are stored in localStorage
- The app is fully responsive and works on mobile, tablet, and desktop devices

