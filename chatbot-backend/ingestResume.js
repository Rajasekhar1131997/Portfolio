import fs from "fs";
import { pipeline } from "@xenova/transformers";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import path from "path";

// Path to your resume
const resumePath = path.resolve("./Rajasekhar_Reddy_Kolagotla.pdf");

// Extract text from PDF
async function extractPdfText(filePath) {
  const pdf = await getDocument(filePath).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }
  return text;
}

// Cosine similarity helper
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

async function main() {
  // 1. Load Resume Text
  const resumeText = await extractPdfText(resumePath);
  console.log("✅ Extracted resume text\n", resumeText.substring(0, 500), "...");

  // 2. Chunk Text
  const chunks = resumeText
    .split(/[\n\.]/)
    .map((c) => c.trim())
    .filter((c) => c.length > 20);
  console.log(`📑 Created ${chunks.length} chunks`);

  // 3. Load Embeddings Model
  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  const embeddings = [];
  for (const chunk of chunks) {
    const embeddingTensor = await embedder(chunk, { pooling: "mean", normalize: true });
    const embedding = Array.from(embeddingTensor.data);
    embeddings.push({ text: chunk, embedding });
  }

  // 4. Save JSON Vector Store
  fs.writeFileSync("resumeVectors.json", JSON.stringify(embeddings, null, 2));
  console.log("✅ Resume stored in JSON vector store (resumeVectors.json)");
}

main();