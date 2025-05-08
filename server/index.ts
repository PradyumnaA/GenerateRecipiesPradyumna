import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import dotenv from 'dotenv';
dotenv.config();

const app = new Elysia();
app.use(cors());

// Generate image using a free API (e.g., Lexica Art Proxy)
app.post('/api/generate-image', async ({ body }) => {
  const { keyword } = body;
  try {
    const imagePrompt = `${keyword} vegetarian dish, food photography, realistic, white background`;
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(imagePrompt)}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return { imageUrl: data.urls?.regular || '' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate image' };
  }
});

app.listen(3001);
console.log('Backend running on http://localhost:3001');