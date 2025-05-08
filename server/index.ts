// server/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Use this in Node, optional in Bun

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Your Spoonacular API key
const SPOON_API_KEY = process.env.SPOONACULAR_API_KEY;

app.use(cors());
app.use(express.json());

/**
 * POST /api/generate-image
 * Body: { keyword: string }
 * -> returns { imageUrl: string }
 */
app.post('/api/generate-image', async (req, res) => {
  try {
    const { keyword } = req.body;
    if (!keyword) {
      return res.status(400).json({ message: 'Missing keyword' });
    }

    const resp = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(keyword)}&number=1&apiKey=${SPOON_API_KEY}`
    );
    const data = await resp.json();
    const imageUrl: string = data.results?.[0]?.image || '';

    return res.json({ imageUrl });
  } catch (err) {
    console.error('Image Error:', err);
    return res.status(500).json({ imageUrl: '' });
  }
});

/**
 * POST /api/generate
 * Body: { ingredients: string }
 * -> returns { recipe: string }
 */
app.post('/api/generate', async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients) {
      return res.status(400).json({ message: 'Missing ingredients' });
    }

    const resp = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
        ingredients
      )}&number=1&addRecipeInformation=true&apiKey=${SPOON_API_KEY}`
    );
    const data = await resp.json();
    const result = data.results?.[0];

    const recipe = result
      ? `Title: ${result.title}\n\nSummary: ${result.summary.replace(/<[^>]+>/g, '')}\n\nInstructions: ${
          result.instructions || 'N/A'
        }`
      : 'No recipe found.';

    return res.json({ recipe });
  } catch (err) {
    console.error('Recipe Error:', err);
    return res.status(500).json({ recipe: '' });
  }
});

// Fallback 404
app.use((_req, res) => {
  res.status(404).send('Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
