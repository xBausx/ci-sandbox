import { spawnSync } from "node:child_process";
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
  env.COMMIT_TICKET = ticket;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const czPath = path.join(rootDir, "node_modules", "commitizen", "dist", "cli", "git-cz.js");

const res = spawnSync(process.execPath, [czPath], {
  stdio: "inherit",
  env,
  cwd: rootDir
});

if (res.error) {
  console.error(res.error);
}

process.exit(res.status ?? 1);