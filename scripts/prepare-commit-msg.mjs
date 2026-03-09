import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

function getGitDir() {
  const r = spawnSync("git", ["rev-parse", "--git-dir"], { encoding: "utf8" });
  return (r.stdout || "").trim() || ".git";
}

const msgFile = process.argv[2];
if (!msgFile || !fs.existsSync(msgFile)) process.exit(0);

const gitDir = path.resolve(getGitDir());
const ticketFile = path.join(gitDir, "COMMIT_TICKET");

let ticket = (process.env.COMMIT_TICKET || "").trim().toLowerCase();

if (!ticket && fs.existsSync(ticketFile)) {
  ticket = fs.readFileSync(ticketFile, "utf8").trim().toLowerCase();
}

if (!ticket) process.exit(0);

const raw = fs.readFileSync(msgFile, "utf8");
if (/^Merge\b/.test(raw) || /^Squash!\b/.test(raw)) process.exit(0);

const lines = raw.split(/\r?\n/);
const first = (lines[0] || "").trim();
if (!first) process.exit(0);

if (first.includes(`(${ticket})`)) {
  if (fs.existsSync(ticketFile)) fs.unlinkSync(ticketFile);
  process.exit(0);
}

const m = first.match(/^(\w+)(\([^)]+\))?:\s*(.+)$/);
if (m) {
  const type = m[1];
  const subject = m[3];
  lines[0] = `${type}(${ticket}): ${subject}`;
  fs.writeFileSync(msgFile, lines.join("\n"), "utf8");
  if (fs.existsSync(ticketFile)) fs.unlinkSync(ticketFile);
  process.exit(0);
}

lines[0] = `chore(${ticket}): ${first}`;
fs.writeFileSync(msgFile, lines.join("\n"), "utf8");

if (fs.existsSync(ticketFile)) fs.unlinkSync(ticketFile);