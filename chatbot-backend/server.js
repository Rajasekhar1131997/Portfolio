import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs";
import { pipeline } from "@xenova/transformers";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Load all knowledge sources
const resumeData = JSON.parse(fs.readFileSync("resumeVectors.json", "utf-8"));
const githubData = JSON.parse(fs.readFileSync("githubVectors.json", "utf-8"));
const portfolioData = JSON.parse(fs.readFileSync("portfolioVectors.json", "utf-8"));

// ✅ Cosine similarity helper
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

// ✅ Load embeddings model once
let embedder;
async function loadEmbedder() {
  embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
}
await loadEmbedder();

// ✅ Conversation memory
let conversationHistory = [];

// ✅ Chat endpoint (full reply only)
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // 1. Embed the user query
    const queryTensor = await embedder(message, { pooling: "mean", normalize: true });
    const queryEmbedding = Array.from(queryTensor.data);

    // 2. Search across knowledge sources
    const combinedData = [...resumeData, ...githubData, ...portfolioData];
    const ranked = combinedData
      .map((item) => ({
        text: item.text,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    const context = ranked.map((r) => r.text).join("\n");

    // 3. Add conversation memory
    const historyText = conversationHistory
      .map((turn) => `${turn.role === "user" ? "User" : "Assistant"}: ${turn.text}`)
      .join("\n");

    // 4. Build prompt
    const prompt = `You are Rajasekhar's AI assistant.
Use the following resume, GitHub, and portfolio context to answer clearly and concisely. 
Stay factual and avoid inventing details.

Context:
${context}

Conversation history:
${historyText}

User: ${message}
Assistant:`;

    // 5. Call Ollama (non-streaming)
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt,
        stream: false, // ✅ full reply at once
      }),
    });

    const data = await response.json();
    const reply = data.response || "⚠️ No response from model";

    // 6. Update memory
    conversationHistory.push({ role: "user", text: message });
    conversationHistory.push({ role: "assistant", text: reply });
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10); // keep last 5 exchanges
    }

    // ✅ Send full reply back
    res.json({ reply });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Clear history endpoint
app.post("/clear", (req, res) => {
  conversationHistory = [];
  res.json({ message: "✅ Conversation history cleared" });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));