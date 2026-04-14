# JWT Auth App

Full-stack authentication app with JWT. Backend (Express) + Frontend (React + Vite). Deployed to Vercel.

## Features
- JWT Authentication (login/register)
- Protected routes
- React Context + localStorage
- Tailwind CSS styling
- Vercel-ready deployment

## Local Development

### Backend
```bash
cd jwt-auth-app/server
copy .env.example .env
# Edit .env with your JWT_SECRET
npm install
npm run dev
```

### Frontend
```bash
cd jwt-auth-app/client
npm install
npm run dev
```

**Backend runs on `http://localhost:3001`**
**Frontend runs on `http://localhost:5173` (proxies /api calls)**

**Demo credentials:**
- username: `test`
- password: `test`

## Production Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Add Vercel env vars:
   ```
   JWT_SECRET=your-super-secret-key
   NODE_ENV=production
   ```
4. Deploy!

## Project Structure
```
jwt-auth-app/
├── server/          # Express + JWT
├── client/          # React + Vite + Tailwind
└── vercel.json     # Vercel config
```

Backend APIs: `/api/login`, `/api/register`, `/api/profile`

