# Quick Setup Guide

## Prerequisites

1. **Node.js & npm**: Make sure you have Node.js 18+ installed
   ```bash
   node --version  # Should be 18+
   npm --version
   ```

2. **Backend Running**: Ensure your FastAPI backend is running on `http://localhost:8000`

## Installation Steps

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Testing the Application

### As a Student:
1. Register a new student account
2. Login with your credentials
3. Use the search box to describe what you want to learn (e.g., "I want to learn Python programming")
4. View recommended mentors
5. Provide feedback on matches

### As a Mentor:
1. Register a new mentor account (fill in skill, experience, etc.)
2. Login with your credentials
3. Use "Refresh Embeddings" to update your profile in the AI matching system
4. View your dashboard

## Troubleshooting

### API Connection Issues
- Make sure the backend is running: `uvicorn app.main:app --reload`
- Check that the backend is on `http://localhost:8000`
- Or set `VITE_API_URL` in a `.env` file

### Port Already in Use
- If port 3000 is taken, Vite will automatically use the next available port
- Check the terminal output for the actual port

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Production Build

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory. You can preview it with:

```bash
npm run preview
```

