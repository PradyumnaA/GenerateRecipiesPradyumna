import { Elysia } from 'elysia';
import { Configuration, OpenAIApi } from 'openai';
import { cors } from '@elysiajs/cors';
import dotenv from 'dotenv';
dotenv.config();

const app = new Elysia();
app.use(cors());

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post('/api/generate', async ({ body }) => {
  const { ingredients } = body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Suggest 3 vegetarian recipes using: ${ingredients}. Format with name, description, ingredients, and instructions.`
        }
      ]
    });
    return { recipe: completion.data.choices[0].message.content };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to generate recipe' };
  }
});

app.listen(3001);
console.log('Backend running on http://localhost:3001');