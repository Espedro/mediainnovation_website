import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Parser from "rss-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "public", "blog-feed.json");
const ITEMS_PER_SOURCE = 3;

const sources = [
  { category: "Technology", url: "https://techcrunch.com/feed/" },
  { category: "Technology", url: "https://www.theverge.com/rss/index.xml" },
  { category: "AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { category: "AI", url: "https://venturebeat.com/category/ai/feed/" },
  { category: "UX & UI", url: "https://www.smashingmagazine.com/feed/" },
  { category: "Branding", url: "https://www.underconsideration.com/brandnew/atom.xml" },
  { category: "Marketing", url: "https://blog.hubspot.com/marketing/rss.xml" },
];

const parser = new Parser();
const EXCERPT_MAX_LENGTH = 220;

function buildExcerpt(raw) {
  const clean = (raw || "").replace(/\s+/g, " ").trim();
  if (clean.length <= EXCERPT_MAX_LENGTH) return clean;
  const truncated = clean.slice(0, EXCERPT_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : EXCERPT_MAX_LENGTH)}…`;
}

function sourceName(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function findImage(item) {
  if (item.enclosure?.url && item.enclosure.type?.startsWith("image")) {
    return item.enclosure.url;
  }
  const match = /<img[^>]+src="([^"]+)"/i.exec(item.content || item["content:encoded"] || "");
  return match ? match[1].replace(/&#0?38;/g, "&") : null;
}

async function fetchSource({ category, url }) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.slice(0, ITEMS_PER_SOURCE).map((item) => ({
      category,
      title: item.title,
      link: item.link,
      date: item.isoDate || item.pubDate || null,
      excerpt: buildExcerpt(item.contentSnippet || item.summary || item.content),
      source: sourceName(item.link),
      image: findImage(item),
    }));
  } catch (error) {
    console.warn(`[blog-feed] skipped "${category}" (${url}): ${error.message}`);
    return [];
  }
}

const results = await Promise.all(sources.map(fetchSource));
const seenLinks = new Set();
const items = results
  .flat()
  .filter((item) => item.title && item.link)
  .filter((item) => {
    if (seenLinks.has(item.link)) return false;
    seenLinks.add(item.link);
    return true;
  })
  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2));

console.log(`[blog-feed] wrote ${items.length} items to ${OUTPUT_PATH}`);
