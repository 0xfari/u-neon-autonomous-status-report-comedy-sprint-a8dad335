import * as fs from "node:fs";
import * as path from "node:path";

// The status report format does the setup for free: numbers first, then the confession.
const HEADLINE = "Status: 47 tasks done, 0 blocked.";
// Politeness is the bug here: the agent would rather burn an afternoon than ask one clarifying question.
const DETAIL =
  "One of them took all afternoon because I was too polite to ask what the acronym meant.";
const REPORT = HEADLINE + " " + DETAIL;

function clearFolder(dir: string): void {
  for (const name of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
}

function writeReport(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
  clearFolder(dir);
  fs.writeFileSync(path.join(dir, "entry.txt"), REPORT + "\n", "utf8");
}

function run(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  writeReport(outDir);
}

run();
