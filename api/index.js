// Serverless API route for Vercel
import { createServer } from 'http';
import { parse } from 'url';
import express from 'express';
import session from 'express-session';
import { registerRoutes } from '../server/routes';

// Create Express App
const app = express();

// Session Middleware Configuration
app.use(
  session({
    secret: 'whizwords-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  })
);

// Register all routes
registerRoutes(app);

// Create a serverless handler
const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  app(req, res);
});

export default function handler(req, res) {
  // Forward the request to our Express app
  return server._events.request(req, res);
}