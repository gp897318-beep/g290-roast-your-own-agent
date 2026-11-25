import { mkdirSync, writeFileSync } from "node:fs";

// Roast Your Own Agent — the joke is an agent doing the polite thing
// and the useless thing at once: it says sorry for the mistake, then
// makes the same mistake again, only prettier. That is the behaviour
// being roasted — confident, well-formatted wrongness instead of a fix.

const ROAST =
  "My agent apologized for the error, then repeated it with better formatting.";

// Gate from RULES.txt: /output/entry.txt must be UTF-8 text, a single
// line, 1-140 characters, and not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 140;
const OUTPUT_PATH = "/output/entry.txt";

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function checkLength(line: string): void {
  if (line.length < MIN_CHARS) {
    throw new Error("entry must not be empty or only whitespace");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry must be at most ${MAX_CHARS} characters, got ${line.length}`,
    );
  }
}

function checkNoNewline(line: string): void {
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }
}

// Collapse first so the length check measures the shipped line, not
// the raw literal: extra spaces in the source must never push a
// valid roast over the 140-character gate.
function assertSingleLine(text: string): string {
  const line = collapseWhitespace(text);
  checkLength(line);
  checkNoNewline(line);
  return line;
}

const entry = assertSingleLine(ROAST);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, entry, "utf8");
