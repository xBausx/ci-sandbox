import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function getBranchTicket() {
  const r = spawnSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" });
  const branch = (r.stdout || "").trim();
  const m = branch.match(/([a-z]+-\d+)/i);
  return m ? m[1].toLowerCase() : "";
}

const ticketArg = (process.argv[2] || "").trim().toLowerCase();
const ticket = ticketArg || getBranchTicket();

const env = { ...process.env };
if (ticket) {
  env.AICOMMITS_TICKET = ticket;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const cliPath = path.join(rootDir, "node_modules", "aicommits", "dist", "cli.mjs");

if (!fs.existsSync(cliPath)) {
  console.error(`Local aicommits CLI not found: ${cliPath}`);
  process.exit(1);
}

const res = spawnSync(process.execPath, [cliPath, "-t", "conventional"], {
  stdio: "inherit",
  env
});

if (res.error) {
  console.error(res.error);
}

process.exit(res.status ?? 1);