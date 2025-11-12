# Environment Variables Setup Guide

## Overview
Environment variables allow you to manage configuration and secrets without hardcoding them. Your project now has proper environment variable support for both frontend and backend.

## Frontend Setup (React/Vite)

### Local Development
1. Create a `.env` file in the project root:
```
VITE_API_URL=http://localhost:8080
```

2. Access variables in code using `import.meta.env`:
```javascript
const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8080";
```

### Production Deployment
1. Set `VITE_API_URL` on GitHub Pages or your hosting platform
2. For GitHub Pages via GitHub Actions, add to workflow:
```yaml
env:
  VITE_API_URL: https://your-render-backend-url.onrender.com
```

## Backend Setup (Express.js)

### Local Development
1. Create a `server/.env` file:
```
PORT=8080
NODE_ENV=development
```

2. Access variables in code using `process.env`:
```javascript
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
```

3. Install dependencies (if not already):
```bash
cd server
npm install
```

### Production Deployment (Render)
1. Go to your Render service dashboard
2. Click "Environment" → "Environment Variables"
3. Add the following:
   - `PORT`: `8080`
   - `NODE_ENV`: `production`
4. Your `render.yaml` already handles automatic deployment

## Important Security Notes

✅ **DO:**
- Add `.env` to `.gitignore` (already done in your project)
- Use `.env.example` to document required variables
- Store sensitive data (API keys, passwords) only in `.env`
- Use environment variables for all configuration

❌ **DON'T:**
- Commit `.env` files to Git
- Hardcode secrets in source code
- Share environment variable values publicly

## Variable Reference

| Variable | Location | Purpose | Example |
|----------|----------|---------|---------|
| `VITE_API_URL` | Frontend `.env` | Backend API endpoint | `http://localhost:8080` or `https://backend.onrender.com` |
| `PORT` | Server `server/.env` | Server port | `8080` |
| `NODE_ENV` | Server `server/.env` | Environment type | `development` or `production` |

## Testing Environment Variables

### Frontend
```javascript
console.log(import.meta.env.VITE_API_URL);
```

### Backend
```javascript
console.log(process.env.PORT, process.env.NODE_ENV);
```

## Troubleshooting

**Frontend not reading `VITE_API_URL`?**
- Ensure the variable is prefixed with `VITE_`
- Restart your dev server after changing `.env`

**Backend not reading from `.env`?**
- Verify `dotenv` is installed: `npm install dotenv`
- Ensure `require("dotenv").config()` is at the top of `index.js`
- Check that `server/.env` file exists with correct variables

**Variables empty/undefined?**
- Verify the `.env` file is in the correct directory
- Make sure there are no typos in variable names
- Rebuild/restart the dev server
