import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama3",
                prompt: `You are Rajasekhar's AI assistant. 
           Your goal is to answer clearly, factually, and concisely. 
           Stick to relevant details about Rajasekhar, his skills, projects, and experience. 
           Do not add extra commentary, jokes, or unnecessary text.
           User: ${message}
           Assistant:`,
                stream: false
            }),
        });

        const data = await response.json();

        res.json({ reply: data.response.trim() });
    } catch (err) {
        console.error("❌ Ollama API error:", err);
        res.status(500).json({ error: "Ollama backend error" });
    }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));