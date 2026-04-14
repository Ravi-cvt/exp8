import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import authMiddleware from './middleware/auth.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://exp8-orpin.vercel.app' : 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));

// Routes
// Register
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod', { expiresIn: '24h' });
    res.json({ token: jwtToken, user: { username } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    // Demo auth: test/test
    if (username === 'test' && password === 'test') {
      const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod', { expiresIn: '24h' });
      res.json({ token: jwtToken, user: { username } });
      return;
    }
    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected route
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

// Removed static serving - handled by Vercel routes

// Vercel serverless handler
console.log('API handler loaded');
module.exports = app;
