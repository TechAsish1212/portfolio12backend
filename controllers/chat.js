import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '../utils/knowledge.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Simple in-memory rate limit
const hits = new Map();
const LIMIT = 15;
const WINDOW = 60 * 60 * 1000; // 1 hour

export async function chatHandler(req, res) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const now = Date.now();
  const rec = hits.get(ip) || { count: 0, start: now };
  if (now - rec.start > WINDOW) {
    rec.count = 0;
    rec.start = now;
  }
  if (rec.count >= LIMIT) {
    return res.status(429).json({ error: 'Too many messages. Try again later.' });
  }
  rec.count++;
  hits.set(ip, rec);

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  // Build the prompt from conversation history
  const conversation = messages
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  // Server-Sent Events headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); 

  try {
    const stream = await ai.models.generateContentStream({
      model: 'gemini-3.6-flash',
      contents: `${SYSTEM_PROMPT}\n\n--- Conversation ---\n${conversation}\nAssistant:`,
    });

    for await (const chunk of stream) {
      const text = chunk.text || '';
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Gemini error:', err);
    res.write(
      `data: ${JSON.stringify({ error: 'AI service error. Please try again.' })}\n\n`
    );
    res.end();
  }
}