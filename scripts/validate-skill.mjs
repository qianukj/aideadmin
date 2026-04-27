import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const skillName = "aideadmin";
const skillDir = path.join(root, "skill", skillName);
const requiredFiles = [
  "SKILL.md",
  "agents/openai.yaml",
  "references/architecture.md",
  "references/backend-rules.md",
  "references/frontend-rules.md",
  "references/integrations.md",
  "references/delivery.md",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
      continue;
    }
    if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(skillDir, file)), `Missing skill file: ${file}`);
}

const skill = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
assert(skill.startsWith("---\n"), "SKILL.md must start with YAML frontmatter");
assert(/name:\s*aideadmin/.test(skill), "SKILL.md missing correct name");
assert(/description:\s*AideAdmin Framework/.test(skill), "SKILL.md missing useful description");
assert(!skill.includes("[TO" + "DO"), "SKILL.md still contains unfinished template markers");

const tmpRoot = path.join(root, ".tmp");
fs.mkdirSync(tmpRoot, { recursive: true });
const tmp = fs.mkdtempSync(path.join(tmpRoot, "aideadmin-skill-test-"));
try {
  copyDirectory(skillDir, path.join(tmp, skillName));
  assert(fs.existsSync(path.join(tmp, skillName, "SKILL.md")), "install command did not copy SKILL.md");
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}

console.log("Skill validation passed.");
