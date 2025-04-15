// Serverless API route for Vercel
import express from 'express';
import { createServer } from 'http';

// Create Express App
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add simple API endpoints for WhizWords
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'WhizWords API is running' });
});

// Add sample stories API
app.get('/api/stories', (req, res) => {
  const stories = [
    {
      id: "forest-adventure",
      title: "Bunny's Garden Adventure",
      theme: "forest",
      content: "Once upon a time, a small bunny hopped through a magical garden. Flowers bloomed with bright colors. Birds sang sweet songs. The bunny made many friends and had fun adventures.",
      difficulty: "easy"
    },
    {
      id: "ocean-colors",
      title: "Ocean of Colors",
      theme: "ocean",
      content: "Deep in the blue sea, colorful fish swam between coral reefs. A curious dolphin explored the underwater world. Glowing jellyfish danced in the currents. Together they discovered hidden treasures.",
      difficulty: "easy"
    },
    {
      id: "space-journey",
      title: "Rocket to Reading Galaxy",
      theme: "space",
      content: "The rocket ship soared through the stars. Planet by planet, they mapped new words. Astronauts collected glowing space rocks. Their journey taught them about the vast universe of reading.",
      difficulty: "medium"
    },
    {
      id: "castle-escape",
      title: "WhizWords Castle Escape",
      theme: "castle",
      content: "Inside the ancient castle, secret passages led to magical libraries. Knights and wizards solved word puzzles to unlock doors. Each room contained new challenges and exciting discoveries.",
      difficulty: "medium"
    },
    {
      id: "fairy-wand",
      title: "The Lost Fairy Wand",
      theme: "forest",
      content: "The fairy's magic wand was missing. Without it, the forest lost its enchantment. Animals joined together to search for clues. When they finally found it, happiness returned to everyone.",
      difficulty: "hard"
    },
    {
      id: "rainbow-quest",
      title: "The Rainbow Unicorn's Quest",
      theme: "rainbow",
      content: "The rainbow unicorn galloped across colorful bridges. Each color represented a different reading skill. By mastering each challenge, the unicorn collected magical words. These words created stories that brought joy to all.",
      difficulty: "hard"
    }
  ];
  
  res.json({ stories });
});

// Create server (for local testing)
const server = createServer(app);

// Export the Express API for Vercel
export default function handler(req, res) {
  return app(req, res);
}