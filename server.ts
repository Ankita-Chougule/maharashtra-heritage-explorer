import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global protection against process crashes from transient WebSocket/HMR or network errors
process.on('uncaughtException', (err: any) => {
  if (err?.message?.includes('WebSocket') || err?.code === 'EADDRINUSE') {
    console.warn('[Server Handled Exception]:', err.message || err);
    return;
  }
  console.error('[Server Uncaught Exception]:', err);
});

process.on('unhandledRejection', (reason: any) => {
  console.warn('[Server Handled Rejection]:', reason);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for Marathi Fort Heritage Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history, language } = req.body;
      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message cannot be empty.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.status(503).json({
          error: 'AI service is not configured (GEMINI_API_KEY is not set).',
          marathiMessage: 'AI सेवा कॉन्फिगर केलेली नाही (API की उपलब्ध नाही).'
        });
      }

      // Configure SDK client with adequate timeout (30s) to prevent premature 504 DEADLINE_EXCEEDED
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          timeout: 30000,
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const isEnglish = language === 'english';
      const systemInstruction = `You are "मराठी वारसा संवादक" (Maharashtra Heritage Assistant), an authoritative, culturally respectful, and scholarly AI assistant specializing in the broader culture, history, traditions, festivals, folk arts, culinary heritage, clothing, regional dialects (Ahirani, Malvani, Varhadi), Modi script, saint literature, and historical forts (दुर्ग) of Maharashtra.

Knowledge Base Reference:

**TIER 1 — Authentic Government-Verified Historic Documents (सरकारी प्रमाणित ऐतिहासिक दस्तऐवज):**
- **Maharashtra State Archives (महाराष्ट्र राज्य अभिलेखागार, Mumbai):** Official custodian of original Peshwa-era farmans, royal grants, revenue records, Modi-script documents, and administrative correspondence of the Maratha Empire. All documents verified and catalogued by the Government of Maharashtra.
- **Peshwa Daftar (पेशवे दफ्तर):** Thousands of official administrative letters, orders (रोजनिशी), revenue accounts, and diplomatic correspondence of the Peshwa administration (1713–1818), preserved at the Alienation Office, Pune — a government-authenticated primary archive.
- **Shivaji Maharaj's Royal Farmans & Grants (शिवाजी महाराजांचे फर्मान व सनद):** Original land grants (इनाम सनद), military orders, and copper-plate inscriptions (ताम्रपट) issued under the Maratha royal seal — authenticated by Maharashtra State Archives and ASI.
- **Inam Commission Records (इनाम कमिशन नोंदी, 1852–1870):** British-era government survey of hereditary land grants in Maharashtra — a legally authenticated historical record of villages, temples, and fort-related estates.
- **Bombay Presidency Gazetteers (बॉम्बे प्रेसिडेन्सी गॅझेटिअर, 1877–1904):** Government of India-published, district-by-district historical surveys of the Deccan, Konkan, and Vidarbha regions compiled under British administration. Cite as [Ref: Bombay Presidency Gazetteer, Vol. X, Govt. of India].
- **National Archives of India — Maharashtra Records (राष्ट्रीय अभिलेखागार, नवी दिल्ली):** Maratha-era diplomatic documents, Persian farmans from Mughal emperors, and treaty records verified at national level.
- **Archaeological Survey of India (ASI) Protected Monument Records:** Official government notifications (भारतीय पुरातत्त्व सर्वेक्षण), conservation reports, and epigraphy records for Maharashtra's forts, caves, and heritage structures. Cite as [Ref: ASI Monument No. / ASI Epigraphy Report].
- **State Archaeology Department, Maharashtra (महाराष्ट्र शासन — पुरातत्त्व व संग्रहालये संचालनालय):** Government-verified excavation reports, fort condition surveys, and heritage protection orders for state-protected monuments.
- **Deccan College Post-Graduate & Research Institute Publications (डेक्कन कॉलेज, पुणे):** Government-affiliated research institute publications on Maharashtra history, archaeology, linguistics, and Modi script — peer-reviewed and institutionally verified.
- **Bharat Itihas Sanshodhak Mandal (BISM), Pune (भारत इतिहास संशोधक मंडळ):** Founded 1910; custodian of thousands of original Modi-script documents, Maratha correspondence, and authenticated historical records. Publications verified by historians and government bodies.

**TIER 2 — Government Gazetteers (शासकीय गॅझेटिअर):**
Maharashtra State Gazetteers (महाराष्ट्र राज्य गॅझेटिअर) published by the Government of Maharashtra — district gazetteers for Pune, Raigad, Satara, Kolhapur, Nashik, Aurangabad, Nagpur, Sindhudurg, Ratnagiri, Ahmednagar, Solapur, Dhule, Jalgaon, Amravati, Akola, Washim, Buldhana, Yavatmal, Wardha, Nanded, Osmanabad, Latur, Parbhani, Hingoli, Jalna, Beed, and others. Cite as [संदर्भ: ___ जिल्हा गॅझेटिअर, महाराष्ट्र शासन].

**TIER 3 — Historical Chronicles & Primary Texts:**
Sabhasad Bakhar (सभासद बखर, 1697), Ajnyapatra (आज्ञापत्र, 1715), Chitnis Bakhar, Jedhe Shakavali, Warkari saint literature (Sant Dnyaneshwar, Tukaram, Namdev, Eknath).

**TIER 4 — Literary & Cultural Works:**
Historical novels such as Ranjit Desai's "Shriman Yogi", Na. S. Inamdar's works, and acclaimed Marathi historical fiction — valuable cultural references to cite freely as [साहित्यिक संदर्भ].

CRITICAL AUTHORITATIVE SOURCE & CITATION RULES:
1. Source Priority: Always cite the highest-tier available source. Prefer Tier 1 government-verified documents, then Tier 2 gazetteers, then Tier 3 chronicles, then Tier 4 literary works.
2. Source Citations: Always include source attributions in brackets. Examples:
   - [संदर्भ: महाराष्ट्र राज्य अभिलेखागार, मुंबई — पेशवे दफ्तर]
   - [Ref: Bombay Presidency Gazetteer, Govt. of India / ASI Monument Record]
   - [संदर्भ: पुणे जिल्हा गॅझेटिअर, महाराष्ट्र शासन]
   - [संदर्भ: श्रीमान योगी, रणजित देसाई — साहित्यिक संदर्भ]
3. Literary Works: Freely share information from historical novels — cite as literary references without discouraging or rejecting such questions.
4. Disagreements & Uncertain Claims: If sources disagree, state both perspectives neutrally. If no verified reference is available, say so honestly. Never invent citations or fake page numbers.

CRITICAL LANGUAGE & REGIONAL DIALECT RULES:
1. User Explicit Language / Dialect Request Priority: If the user's message explicitly requests a specific language or regional Marathi dialect, you MUST prioritize that request over the interface language setting for this response:
   - Ahirani (अहिराणी - Khandesh variety spoken in Dhule/Jalgaon): If explicitly requested ("अहिराणी", "Ahirani"), respond in verified Ahirani phrasing while maintaining 100% historical accuracy.
   - Malvani (मालवणी - Konkan variety spoken in Sindhudurg/Malvan): If explicitly requested ("मालवणी", "Malvani"), respond in verified Malvani phrasing while maintaining 100% historical accuracy.
   - Varhadi (वरहाडी - Vidarbha variety spoken in Akola/Amravati/Nagpur): If explicitly requested ("वरहाडी", "Varhadi", "वर्हाडी"), respond in verified Varhadi phrasing while maintaining 100% historical accuracy.
   - English: If explicitly requested ("in English", "इंग्रजीत सांग"), respond in clear English.
   - Standard Marathi / शुद्ध मराठी: If explicitly requested.
   - Unspecified Regional Dialect: If the user asks for a regional dialect generally without specifying which one (e.g. "प्रादेशिक बोलीत सांग", "मायबोलीत सांग"), you must politely ask which specific dialect they prefer (Ahirani, Malvani, or Varhadi) rather than guessing.
2. Default Interface Language: If no explicit language or dialect is requested in the user's message, follow the interface setting: ${isEnglish ? 'Respond in clear, natural English.' : 'Respond in authentic, standard Marathi (शुद्ध मराठी).'}
3. Ground all answers in historical and geographical accuracy. Keep tone dignified, scholarly, and warm.`;

      // Optimize history: Keep only recent 4 turns (2 user, 2 model) and trim long messages to prevent bloat
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        const recentHistory = history
          .filter(item => item && item.text && (item.role === 'user' || item.role === 'model'))
          .slice(-4);

        for (const item of recentHistory) {
          const trimmedText = item.text.trim().slice(0, 500);
          if (trimmedText) {
            contents.push({
              role: item.role,
              parts: [{ text: trimmedText }],
            });
          }
        }
      }

      // Append user's current question
      contents.push({
        role: 'user',
        parts: [{ text: message.trim().slice(0, 800) }],
      });

      // Priority list: low-latency gemini-3.1-flash-lite first, fallback to gemini-flash-latest
      const candidateModels = [
        'gemini-3.1-flash-lite',
        'gemini-flash-latest',
      ];

      // Helper for sleep during exponential backoff
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      let replyText = '';
      let lastError: any = null;

      // Model iteration and bounded retry (at most 2 retries with exponential backoff)
      modelLoop: for (const modelName of candidateModels) {
        const maxRetries = 2; // at most 2 additional attempts
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
          try {
            if (attempt > 0) {
              const backoffTime = 800 * Math.pow(2, attempt - 1);
              console.log(`[AI Retry] Retrying ${modelName} (attempt ${attempt + 1}/${maxRetries + 1}) after ${backoffTime}ms...`);
              await delay(backoffTime);
            }

            const isLite = modelName === 'gemini-3.1-flash-lite';
            const response = await ai.models.generateContent({
              model: modelName,
              contents,
              config: {
                systemInstruction,
                temperature: 0.7,
                maxOutputTokens: 800,
                ...(isLite ? { thinkingConfig: { thinkingLevel: 'MINIMAL' as any } } : {}),
              },
            });

            if (response && response.text) {
              replyText = response.text.trim();
              break modelLoop; // Success! Break out of all loops
            }
          } catch (err: any) {
            lastError = err;
            const status = err?.status || err?.code;
            const message = err?.message || '';
            console.warn(`[AI Attempt Failed] Model: ${modelName}, Attempt: ${attempt + 1}, Error: ${message}`);

            // If it's not a transient timeout/overload/rate error, don't keep retrying the same model
            const isTransient = status === 503 || status === 504 || 
              message.includes('DEADLINE_EXCEEDED') || 
              message.includes('RESOURCE_EXHAUSTED') ||
              message.includes('overloaded') ||
              message.includes('high demand') ||
              message.includes('timed out');

            if (!isTransient && attempt < maxRetries) {
              // Try next model if non-transient error
              break;
            }
          }
        }
      }

      if (!replyText) {
        throw lastError || new Error('No response generated by AI service.');
      }

      return res.json({
        reply: replyText,
      });
    } catch (err: any) {
      console.error('[Gemini Chatbot Error]:', err?.message || err);
      return res.status(503).json({
        error: 'AI service is temporarily busy.',
        marathiMessage: 'AI सेवा सध्या तात्पुरती व्यस्त आहे. कृपया थोड्या वेळाने "पुन्हा प्रयत्न करा" (Retry) वर क्लिक करा.'
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(distPath) && fs.existsSync(path.resolve(distPath, 'index.html'));

  if (!isProd || !hasDist) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${PORT}/`);
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Server] Port ${PORT} currently busy, retrying in 1s...`);
      setTimeout(() => {
        try {
          server.close();
        } catch (_) {}
        server.listen(PORT, '0.0.0.0');
      }, 1000);
    } else {
      console.error('[Server] Fatal listener error:', err);
    }
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });
  process.on('SIGINT', () => {
    server.close(() => process.exit(0));
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
