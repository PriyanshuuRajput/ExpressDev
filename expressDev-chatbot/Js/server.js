
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json({ limit: '100kb' }));

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Please provide chat messages.'
      });
    }

    // Validate the input and limit conversation size.
    const allowedRoles = ['user', 'assistant'];

    if (
      messages.length > 20 ||
      messages.some(
        m =>
          !m ||
          !allowedRoles.includes(m.role) ||
          typeof m.content !== 'string' ||
          m.content.length > 10000
      )
    ) {
      return res.status(400).json({
        error: 'Invalid messages or conversation too long.'
      });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: 'OpenRouter API key is not configured.'
      });
    }

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant. Answer clearly and accurately.'
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter request failed:', response.status);
      return res.status(502).json({
        error: 'The AI service could not process your request.'
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (typeof reply !== 'string') {
      return res.status(502).json({
        error: 'The AI service returned an unexpected response.'
      });
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error.message);
    res.status(500).json({
      error: 'Unable to process your message right now.'
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Chatbot backend running on port 3000');
});
