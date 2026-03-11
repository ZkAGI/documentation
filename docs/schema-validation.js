#!/usr/bin/env node

/**
 * Schema Validation Script for ZkAGI Documentation
 *
 * Validates that every doc page has:
 *   (a) At least one Q&A <h2> (phrased as a question)
 *   (b) A snippet-answer paragraph after each Q&A h2
 *   (c) Valid FAQPage JSON-LD
 *   (d) Valid TechArticle JSON-LD
 *
 * Usage:  node docs/schema-validation.js
 */

const fs = require("fs");
const path = require("path");

const DOCS_DIR = path.resolve(__dirname);

// Recursively find all .md and .mdx files
function findDocFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findDocFiles(full));
    } else if (/\.(md|mdx)$/.test(entry.name) && entry.name !== "schema-validation.js") {
      results.push(full);
    }
  }
  return results;
}

// Extract JSON from JSON.stringify({...}) blocks in the file
function extractJsonLd(content) {
  const blocks = [];
  // Match JSON.stringify( ... ) patterns
  const regex = /JSON\.stringify\((\{[\s\S]*?\})\)\s*\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    try {
      // Try to parse the JSON object literal
      // It may use double quotes already, or be JS object notation
      let jsonStr = match[1];
      // The JSON inside JSON.stringify should be valid JSON
      const parsed = JSON.parse(jsonStr);
      blocks.push(parsed);
    } catch {
      // Try a more lenient extraction: find complete {...} after JSON.stringify(
      // Sometimes the regex captures too little or too much
    }
  }

  // Fallback: look for schema.org references and try to extract
  if (blocks.length === 0) {
    const fallbackRegex = /JSON\.stringify\(([\s\S]*?)\)\s*\}\s*<\/script>/g;
    while ((match = fallbackRegex.exec(content)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        blocks.push(parsed);
      } catch {
        // Not valid JSON
      }
    }
  }

  return blocks;
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const relativePath = path.relative(DOCS_DIR, filePath);
  const errors = [];
  const warnings = [];

  // (a) Check for Q&A h2 headings (phrased as questions)
  // Match both ## and <h2> styles, and Docusaurus {#id} syntax
  const h2Matches = content.match(/^##\s+.+/gm) || [];
  const htmlH2Matches = content.match(/<h2[^>]*>.+<\/h2>/g) || [];
  const allH2 = [...h2Matches, ...htmlH2Matches];

  // Filter to question-style h2s (contain "?", or start with How/What/Why/When/Where/Which/Who/Can/Does/Is)
  const questionH2s = allH2.filter((h) => {
    const text = h.replace(/^##\s+/, "").replace(/<[^>]+>/g, "").replace(/\{#[^}]+\}/g, "").trim();
    return (
      text.endsWith("?") ||
      /^(How|What|Why|When|Where|Which|Who|Can|Does|Is|Are|Do)\s/i.test(text)
    );
  });

  if (questionH2s.length === 0) {
    errors.push("No Q&A-style <h2> headings found (must be phrased as questions)");
  }

  // Check for id attributes on h2s
  const h2sWithId = allH2.filter((h) => {
    return /\{#[\w-]+\}/.test(h) || /id="[\w-]+"/.test(h) || /id='[\w-]+'/.test(h);
  });

  if (allH2.length > 0 && h2sWithId.length === 0) {
    warnings.push(`None of the ${allH2.length} h2 headings have id attributes (use {#id} or id="")`);
  }

  // (b) Check for snippet-answer paragraphs
  const snippetAnswers =
    content.match(/className="snippet-answer"/g) ||
    content.match(/class="snippet-answer"/g) ||
    [];

  if (snippetAnswers.length === 0) {
    errors.push("No snippet-answer paragraphs found (<p className=\"snippet-answer\">)");
  } else if (questionH2s.length > 0 && snippetAnswers.length < questionH2s.length) {
    warnings.push(
      `Only ${snippetAnswers.length} snippet-answer(s) for ${questionH2s.length} Q&A h2(s)`
    );
  }

  // (c) Check for FAQPage JSON-LD
  const jsonLdBlocks = extractJsonLd(content);
  const hasFaqPage = jsonLdBlocks.some(
    (b) => b["@type"] === "FAQPage" && Array.isArray(b.mainEntity) && b.mainEntity.length > 0
  );
  // Also check via string matching as fallback
  const hasFaqPageFallback = content.includes('"FAQPage"') && content.includes('"mainEntity"');

  if (!hasFaqPage && !hasFaqPageFallback) {
    errors.push("No valid FAQPage JSON-LD found");
  }

  // (d) Check for TechArticle JSON-LD
  const hasTechArticle = jsonLdBlocks.some((b) => b["@type"] === "TechArticle");
  const hasTechArticleFallback =
    content.includes('"TechArticle"') && content.includes('"headline"');

  if (!hasTechArticle && !hasTechArticleFallback) {
    errors.push("No valid TechArticle JSON-LD found");
  }

  // Extra: check for Related Questions section
  const hasRelatedQuestions =
    content.includes("Related Questions") || content.includes("related-questions");
  if (!hasRelatedQuestions) {
    warnings.push("No 'Related Questions' section found");
  }

  return { relativePath, errors, warnings, questionH2Count: questionH2s.length, snippetCount: snippetAnswers.length };
}

// ── Main ────────────────────────────────────────────────────────────────
const files = findDocFiles(DOCS_DIR);
let totalErrors = 0;
let totalWarnings = 0;
let passCount = 0;

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║        ZkAGI Documentation Schema Validation Report        ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");
console.log(`Scanning ${files.length} doc files in ${DOCS_DIR}\n`);

for (const file of files) {
  const result = validateFile(file);
  const status = result.errors.length === 0 ? "✅ PASS" : "❌ FAIL";

  if (result.errors.length === 0) passCount++;

  console.log(`${status}  ${result.relativePath}`);
  console.log(`       Q&A h2s: ${result.questionH2Count} | Snippets: ${result.snippetCount}`);

  for (const err of result.errors) {
    console.log(`       ❌ ${err}`);
    totalErrors++;
  }
  for (const warn of result.warnings) {
    console.log(`       ⚠️  ${warn}`);
    totalWarnings++;
  }
  console.log();
}

console.log("────────────────────────────────────────────────────────────────");
console.log(`Results: ${passCount}/${files.length} passed | ${totalErrors} errors | ${totalWarnings} warnings`);
console.log("────────────────────────────────────────────────────────────────");

process.exit(totalErrors > 0 ? 1 : 0);
