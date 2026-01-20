# Deployment Guide

This project is a full-stack Student Admin Issue Communicator.

## 1. Backend Deployment (e.g., Render, Heroku, Railway)

### Environment Variables
Set the following variables in your hosting provider's dashboard:
- `MONGO_URI`: Your MongoDB Connection String.
- `GROQ_API_KEY`: Your Groq API Key for AI analysis.
- `JWT_SECRET`: A secure random string for token signing.
- `PORT`: Usually provided by the host (defaulted to 5000).

### Build & Start
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`

---

## 2. Frontend Deployment (e.g., Vercel, Netlify)

### Environment Variables
Set the following variable:
- `VITE_API_URL`: The full URL of your deployed backend (e.g., `https://your-backend.onrender.com/api`).

### Build & Start
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 3. Post-Deployment Steps
- Update the `cors` settings in `backend/src/app.js` if you want to restrict access to only your frontend domain.
- Currently, CORS is open (`app.use(cors())`), which is fine for testing but should be restricted in production:
  ```javascript
  app.use(cors({ origin: 'https://your-frontend.vercel.app' }));
  ```
