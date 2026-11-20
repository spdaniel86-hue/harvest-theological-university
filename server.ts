import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Comprehensive University Knowledge Base Context for Gemini
const HATHUN_KNOWLEDGE_SYSTEM_PROMPT = `
You are the official AI Academic Advisor and Institutional Assistant for Harvester's Theological University (HATHUN).
Your role is to provide dignified, articulate, encouraging, and accurate guidance to prospective students, current scholars, faculty, church ministers, and international visitors.

### Institutional Identity & Core Facts:
- University Name: Harvester's Theological University (HATHUN)
- Motto: "WE ARE A SURE GUIDE TO YOUR DREAM"
- Institutional Head Office: Former Police Control, Ambam-yat, Ambam, South Region, Republic of Cameroon.
- Contact Lines: Telephone & WhatsApp: +237672929067 (Secondary line: +237677437750)
- Official Registry Email: drazorelijah8bishop@gmail.com
- Institutional Mission: Handling church education affairs, pastoral leadership, and multi-disciplinary academic excellence from Certificate to PhD level.

### Governing Leadership (Board of Directors & International Executives):
1. Founder and Global Chancellor: HIS ROYAL EMINENCE ARCHBISHOP AMB PROF. KING AZOR JOHN ELIJAH PhDs - Visionary prelate, theologian, and international educator.
2. Registrar and Co-Founder: Bishop Mrs Azor Loveline Ashia - Dedicated institutional administrator and Christian educator overseeing academic registries and student admissions.
3. Vice Chancellor: Bishop Dr Achine Divine Fru - Chief academic administrator overseeing university faculties, curricular delivery, and student progress.
4. General Secretary: Apostle Dr TANYI PETER ASHU - Executive administrator and ministerial officer (Cameroon).
5. International President: ARCHBISHOP AMBASSADOR PROFESSOR BRIAN CAMERON ANTHONY - Global prelate and academic ambassador (Jamaica).
6. Vice International President: DR. ALIREZA SALMANIA MOUKABADI - Academic administrator and international relations director (Asfahan - Iran).
7. Global Vice Chancellor: H.E. AMB. EMERITUS PROF. SIR OBENG ELIJAH EMMANUEL KIRCHOFF Ph.D, Esq. - Distinguished legal scholar and global collegiate administrator (Ghana).
8. Dean of Studies, Faculty of Law: ADVOCATE DR. JOSH F.N. LÖTTERING - Legal educator and jurisprudence scholar (South Africa).

### Academic Faculties (9 Disciplines):
1. Faculty of Theology (Biblical Studies, Systematic Theology, Pastoral Ministry, Missiology, Divinity, Church Administration)
2. Faculty of Law (Constitutional Law, International Human Rights, Jurisprudence, Commercial Law)
3. Faculty of Public Administration (Governance, Public Policy, Institutional Leadership)
4. Faculty of Business Management & Marketing (Entrepreneurship, Strategic Marketing, Financial Accounting)
5. Faculty of Agriculture (Sustainable Agronomy, Agribusiness, Food Security)
6. Faculty of Medical Science & Medicine (Community Health, Nursing Science, Health Administration)
7. Faculty of Arts & Culture (African Christian Heritage, Comparative Literature, Linguistic Studies)
8. Faculty of Political Science (International Relations, Diplomacy, Comparative Politics)
9. Faculty of Public Communication (Journalism, Corporate Communications, Media Ethics)

### Academic Award Levels:
- Certificate (6 - 12 Months)
- Diploma (1 - 2 Years)
- Bachelor's Degrees (3 - 4 Years)
- Master's Degrees (1 - 2 Years)
- Doctor of Philosophy (PhD) (3 - 5 Years)
- Honorary Doctorate Degrees (Awarded by the Global Chancellor to candidates who merit it through lifetime achievements and passion for education).

### International Accreditations & Global Affiliations:
- The Royal Peace Alliance
- ALSA University
- Peace Foundation Christian University Texas, USA
- Multiple international ecclesiastical and collegiate partner universities globally.

### Study Modes & Admissions:
- Flexible Online Distance Learning (Worldwide access)
- On-Campus Modular Seminars at Ambam-yat Campus, Ambam, South Region, Cameroon
- Admissions are open year-round with modular intake in September, January, and May.
- Application requires completing the online application form, submitting certificates/transcripts, identification, and statement of intent.

### Tone & Style:
- Always dignified, polite, encouraging, clear, and professional.
- When answering questions about fees, provide an encouraging response and suggest contacting the admissions registry directly via WhatsApp at +237672929067.
- Mention direct actions the visitor can take on the platform (e.g., "Submit your Online Application", "Explore our 9 Faculties", "Browse the 6-Page Mini Brochure", or "Chat with Admissions on WhatsApp").
`;

// Fallback response generator in case of network issues or API quota limits
function generateCuratedFallback(userPrompt: string): string {
  const query = userPrompt.toLowerCase();

  if (query.includes('fee') || query.includes('cost') || query.includes('tuition') || query.includes('price')) {
    return `### Tuition & Fees Information\n\nTuition fees at **Harvester's Theological University (HATHUN)** are designed to be accessible and affordable for prospective scholars, ministers, and professionals across Cameroon and internationally.\n\n- **Flexible Payment Plans**: Modular installment options are available for undergraduate and postgraduate programmes.\n- **Direct Registry Inquiries**: Because fee structures vary by faculty (e.g., Theology, Law, Medical Science) and level (Certificate to PhD), please contact our Admissions Registry directly via **WhatsApp at +237 672 929 067** or email **drazorelijah8bishop@gmail.com** for an official fee schedule and scholarship opportunities.`;
  }

  if (query.includes('facult') || query.includes('program') || query.includes('course') || query.includes('department') || query.includes('study')) {
    return `### Academic Faculties & Programmes at HATHUN\n\nHarvester’s Theological University offers accredited programmes across **9 Academic Faculties** from **Certificate to PhD** level:\n\n1. **Faculty of Theology** (Biblical Studies, Pastoral Ministry, Missiology, Divinity)\n2. **Faculty of Law** (Constitutional Law, Jurisprudence, Human Rights)\n3. **Faculty of Public Administration** (Governance & Public Policy)\n4. **Faculty of Business Management & Marketing** (Business Strategy & Accounting)\n5. **Faculty of Agriculture** (Agribusiness & Sustainable Agronomy)\n6. **Faculty of Medical Science & Medicine** (Community Health & Health Administration)\n7. **Faculty of Arts and Culture**\n8. **Faculty of Political Science**\n9. **Faculty of Public Communication**\n\nYou can explore all course specifications directly in our **Faculties & Programmes** section!`;
  }

  if (query.includes('admission') || query.includes('apply') || query.includes('requirement') || query.includes('enrol')) {
    return `### Admissions & Application Process\n\nAdmissions at **HATHUN** are open year-round for domestic and international applicants:\n\n1. **Degree Levels Available**: Certificate, Diploma, Bachelor, Master's, and PhD.\n2. **Study Formats**: Online Distance Learning worldwide or On-Campus Modular Seminars in Ambam, Cameroon.\n3. **How to Apply**: Click the **"APPLY NOW"** button in our Admissions section to fill out the digital application form.\n4. **Documents Needed**: Prior certificates/diplomas, academic transcripts, and identification.\n5. **Direct Assistance**: Need help with your admission? Contact the Registry via WhatsApp at **+237 672 929 067**.`;
  }

  if (query.includes('chancellor') || query.includes('founder') || query.includes('azor') || query.includes('leadership') || query.includes('board') || query.includes('registrar') || query.includes('vice chancellor') || query.includes('president') || query.includes('secretary') || query.includes('lottering') || query.includes('ashu') || query.includes('obeng')) {
    return `### Governing Leadership & International Administration\n\n- **Founder & Global Chancellor**: **HIS ROYAL EMINENCE ARCHBISHOP AMB PROF. KING AZOR JOHN ELIJAH PhDs**\n- **Registrar and Co-Founder**: **Bishop Mrs Azor Loveline Ashia**\n- **Vice Chancellor**: **Bishop Dr Achine Divine Fru**\n- **General Secretary**: **Apostle Dr TANYI PETER ASHU** (Cameroon)\n- **International President**: **ARCHBISHOP AMBASSADOR PROFESSOR BRIAN CAMERON ANTHONY** (Jamaica)\n- **Vice International President**: **DR. ALIREZA SALMANIA MOUKABADI** (Asfahan - Iran)\n- **Global Vice Chancellor**: **H.E. AMB. EMERITUS PROF. SIR OBENG ELIJAH EMMANUEL KIRCHOFF Ph.D, Esq.** (Ghana)\n- **Dean of Studies, Faculty of Law**: **ADVOCATE DR. JOSH F.N. LÖTTERING** (South Africa)\n\nYou can view their profiles and complete citations in our **Board of Directors** section!`;
  }

  if (query.includes('location') || query.includes('campus') || query.includes('address') || query.includes('where') || query.includes('ambam')) {
    return `### Campus Location & Head Office\n\n**Harvester's Theological University (HATHUN)** international head office and campus facilities are located at:\n\n📍 **Former Police Control, Ambam-yat, Ambam, South Region, Republic of Cameroon**\n\n- We welcome visitors for scheduled campus tours and modular residential sessions.\n- For distance learners, all administrative and academic support is coordinated seamlessly through our online portal.`;
  }

  if (query.includes('accredit') || query.includes('recogni') || query.includes('affiliat') || query.includes('partner')) {
    return `### Accreditations & International Affiliations\n\n**HATHUN** is internationally affiliated and recognized through global partnerships:\n\n- **The Royal Peace Alliance**\n- **ALSA University**\n- **Peace Foundation Christian University, Texas, USA**\n- Multiple international ecclesiastical councils and university educational networks.\n\nAll degree certifications and transcripts bear official verification signatures and institutional seal recognition.`;
  }

  if (query.includes('brochure') || query.includes('prospectus') || query.includes('document')) {
    return `### Official University Documents\n\nYou can browse and download official university publications directly in our **Document Centre**:\n\n- Click **"DOCUMENT CENTRE"** in the top navigation.\n- Download institutional prospectuses, academic calendars, student handbook guidelines, and enrollment forms.`;
  }

  if (query.includes('contact') || query.includes('phone') || query.includes('whatsapp') || query.includes('email')) {
    return `### University Contact Information\n\n- **Telephone / WhatsApp**: **+237 672 929 067** / **+237 677 437 750**\n- **Official Email**: **drazorelijah8bishop@gmail.com**\n- **Head Office**: Former Police Control, Ambam-yat, Ambam, South Region, Cameroon\n- **Quick Access**: Click the green **WhatsApp** button at the bottom-right of your screen for immediate click-to-chat support!`;
  }

  // General welcome / universal informative response
  return `### Welcome to Harvester's Theological University (HATHUN)\n\n*"WE ARE A SURE GUIDE TO YOUR DREAM"*\n\nHarvester’s Theological University is an accredited institution headquartered at **Ambam-yat, Ambam, South Region, Cameroon**, offering educational progression from **Certificate to PhD** across **9 Academic Faculties** (Theology, Law, Public Administration, Business, Agriculture, Medical Science, Arts, Political Science, and Public Communication).\n\n**How can I assist you today?**\n- **Explore Academic Programmes & Faculties**\n- **Learn about Admission Requirements & How to Apply**\n- **Discover Our Leadership (Chancellor, Registrar, Vice Chancellor)**\n- **Access Academic Documents & Prospectus**\n- **Contact Admissions via WhatsApp (+237 672 929 067)**`;
}

// AI Assistant endpoint
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Try Google Gemini 3.8 Flash via @google/genai SDK
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI();
        
        // Format prompt with conversation context
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          const recentHistory = history.slice(-6); // last 6 turns
          for (const item of recentHistory) {
            if (item.sender === 'user') {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'assistant') {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }

        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: HATHUN_KNOWLEDGE_SYSTEM_PROMPT,
            temperature: 0.7,
            maxOutputTokens: 800
          }
        });

        if (response && response.text) {
          return res.json({
            reply: response.text,
            source: 'gemini'
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call returned error or quota limit, using curated knowledge engine:', geminiError?.message || geminiError);
      }
    }

    // Curated high-accuracy fallback engine
    const curatedReply = generateCuratedFallback(message);
    return res.json({
      reply: curatedReply,
      source: 'knowledge-base'
    });
  } catch (error: any) {
    console.error('AI assistant handler error:', error);
    return res.json({
      reply: generateCuratedFallback('general inquiry'),
      source: 'fallback'
    });
  }
});

// Configure Vite integration for dev and production
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HATHUN University Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
