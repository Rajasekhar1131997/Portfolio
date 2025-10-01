import fs from "fs";
import fetch from "node-fetch";
import { pipeline } from "@xenova/transformers";

// Replace with your GitHub username
const GITHUB_USERNAME = "Rajasekhar1131997";

async function main() {
  // 1. Fetch repos from GitHub API
  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
  const repos = await response.json();

  if (!Array.isArray(repos)) {
    console.error("❌ Error fetching GitHub repos:", repos);
    return;
  }

  console.log(`✅ Fetched ${repos.length} repositories`);

  // 2. Prepare text data
  const repoTexts = repos.map((repo) => {
    return `Repository: ${repo.name}\nDescription: ${repo.description || "No description"}\nURL: ${repo.html_url}`;
  });

  // 3. Load embeddings model
  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  const embeddings = [];
  for (const text of repoTexts) {
    const embeddingTensor = await embedder(text, { pooling: "mean", normalize: true });
    const embedding = Array.from(embeddingTensor.data);
    embeddings.push({ text, embedding });
  }

  // 4. Save embeddings
  fs.writeFileSync("githubVectors.json", JSON.stringify(embeddings, null, 2));
  console.log("✅ GitHub repos stored in githubVectors.json");
}

main();