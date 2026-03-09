import { spawnSync } from "node:child_process";

function getBranchTicket() {
  const r = spawnSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" });
  const branch = (r.stdout || "").trim();
  const m = branch.match(/([a-z]+-\d+)/i);
  return m ? m[1].toLowerCase() : "";
}

const ticketArg = process.argv[2] || "";
const ticket = ticketArg || getBranchTicket();

const env = { ...process.env };
if (ticket) env.AICOMMITS_TICKET = ticket;

const cmd = process.platform === "win32" ? "npx.cmd" : "npx";
const res = spawnSync(cmd, ["aicommits", "-t", "conventional"], { stdio: "inherit", env });

process.exit(res.status ?? 1);