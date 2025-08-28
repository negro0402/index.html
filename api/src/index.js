import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const emotionKeywords = {
  alegria: ['feliz', 'contento', 'alegre', 'bien', 'gracias', 'genial', 'emocionado'],
  tristeza: ['triste', 'deprimido', 'solo', 'llorar', 'mal', 'desanimado'],
  enojo: ['enojado', 'furioso', 'molesto', 'rabia', 'ira', 'odio'],
  estres: ['ansioso', 'ansiedad', 'estres', 'preocupado', 'nervioso', 'agobiado']
};

function analyzeEmotionFromText(text) {
  if (!text || typeof text !== 'string') {
    return { emotion: 'neutro', confidence: 0.0 };
  }
  const lower = text.toLowerCase();
  let best = { emotion: 'neutro', score: 0 };
  for (const [emotion, words] of Object.entries(emotionKeywords)) {
    let score = 0;
    for (const word of words) {
      if (lower.includes(word)) score += 1;
    }
    if (score > best.score) best = { emotion, score };
  }
  const confidence = Math.min(1, best.score / 3);
  return { emotion: best.emotion, confidence };
}

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'emoplay-api' });
});

app.post('/analyze', (req, res) => {
  const { text } = req.body || {};
  const result = analyzeEmotionFromText(text);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

