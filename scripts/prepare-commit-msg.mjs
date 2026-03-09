import fs from "node:fs";

const msgFile = process.argv[2];
if (!msgFile || !fs.existsSync(msgFile)) process.exit(0);

const ticket = (process.env.AICOMMITS_TICKET || "").trim();
if (!ticket) process.exit(0);

const raw = fs.readFileSync(msgFile, "utf8");
if (/^Merge\b/.test(raw) || /^Squash!\b/.test(raw)) process.exit(0);

const lines = raw.split(/\r?\n/);
const first = lines[0] || "";

const m = first.match(/^(\w+)(\([^)]+\))?:\s(.+)$/);
if (!m) process.exit(0);

const type = m[1];
const scope = m[2];
const subject = m[3];

if (scope) process.exit(0);

lines[0] = `${type}(${ticket}): ${subject}`;
fs.writeFileSync(msgFile, lines.join("\n"), "utf8");