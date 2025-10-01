import fs from "fs";
import path from "path";
import { pipeline } from "@xenova/transformers";

// Directory where your portfolio components live
const COMPONENTS_DIR = "../src/Components";

// Helper: recursively read files
function getAllFiles(dirPath, ext, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, ext, files);
    } else if (entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

// Helper: strip JSX/HTML tags, keep text only
function stripTags(content) {
  return content
    .replace(/<[^>]+>/g, " ") // remove HTML/JSX tags
    .replace(/{[^}]+}/g, " ") // remove JSX expressions
    .replace(/\s+/g, " ") // normalize spaces
    .trim();
}

async function main() {
  // 1. Collect all .jsx files under Components
  const jsxFiles = getAllFiles(COMPONENTS_DIR, ".jsx");
  console.log(`📂 Found ${jsxFiles.length} component files`);

  // 2. Extract text from each file
  let portfolioText = "";
  for (const file of jsxFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const plainText = stripTags(content);
    portfolioText += plainText + "\n";
  }

  console.log("✅ Extracted portfolio text length:", portfolioText.length);

  // 3. Split into chunks
  const chunks = portfolioText
    .split(/[\n\.]/)
    .map((c) => c.trim())
    .filter((c) => c.length > 20);

  console.log(`📑 Created ${chunks.length} chunks`);

  // 4. Generate embeddings
  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  const embeddings = [];
  for (const chunk of chunks) {
    const embeddingTensor = await embedder(chunk, { pooling: "mean", normalize: true });
    const embedding = Array.from(embeddingTensor.data);
    embeddings.push({ text: chunk, embedding });
  }

  // 5. Save embeddings
  fs.writeFileSync("portfolioVectors.json", JSON.stringify(embeddings, null, 2));
  console.log("✅ Portfolio content stored in portfolioVectors.json");
}

main();