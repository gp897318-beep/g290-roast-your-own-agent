import { mkdirSync, writeFileSync } from "node:fs";

// Roast Your Own Agent: the roast is the formatting doing the
// work — the agent does the right social move (apologize) and the
// wrong technical one (repeat the error), then dresses the failure
// up prettier. It targets a real agent behaviour: confident,
// well-formatted wrongness instead of a fix.
const line =
  "My agent apologized for the error, then repeated it with better formatting.";

// The gate: UTF-8 text, one line, 1-140 characters. Check the limit
// here so an invalid line can never ship.
const MAX_CHARS = 140;

function oneLine(text: string): string {
  const line = text.replace(/\s+/g, " ").trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("line must be a single line");
  }
  return line;
}

const checked = oneLine(line);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", checked, "utf8");
