#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const skillName = "aideadmin";
const sourceSkill = path.join(repoRoot, "skill", skillName);

function usage() {
  console.log(`AideAdmin Framework Skill

Usage:
  aideadmin-skill install [--path <skills-dir>] [--force]
  aideadmin-skill path
  aideadmin-skill help

Default install directory:
  $CODEX_HOME/skills when CODEX_HOME is set
  ~/.codex/skills otherwise
`);
}

function defaultSkillsDir() {
  if (process.env.CODEX_HOME) {
    return path.join(process.env.CODEX_HOME, "skills");
  }
  return path.join(os.homedir(), ".codex", "skills");
}

function parseArgs(argv) {
  const args = {
    command: argv[2] || "help",
    path: defaultSkillsDir(),
    force: false,
  };

  for (let i = 3; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--path") {
      args.path = path.resolve(argv[i + 1] || "");
      i += 1;
      continue;
    }
    if (arg === "--force") {
      args.force = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
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

function removeDirectorySafe(target) {
  const resolved = path.resolve(target);
  const skillsDir = path.resolve(path.dirname(resolved));
  if (!resolved.startsWith(skillsDir + path.sep) || path.basename(resolved) !== skillName) {
    throw new Error(`Refusing to remove unexpected path: ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
}

function installSkill(targetSkillsDir, force) {
  if (!fs.existsSync(sourceSkill)) {
    throw new Error(`Skill source not found: ${sourceSkill}`);
  }

  const targetSkill = path.join(targetSkillsDir, skillName);
  fs.mkdirSync(targetSkillsDir, { recursive: true });

  if (fs.existsSync(targetSkill)) {
    if (!force) {
      throw new Error(`Skill already exists: ${targetSkill}\nRun with --force to replace it.`);
    }
    removeDirectorySafe(targetSkill);
  }

  copyDirectory(sourceSkill, targetSkill);
  console.log(`Installed ${skillName} to ${targetSkill}`);
}

function main() {
  try {
    const args = parseArgs(process.argv);
    if (args.command === "help" || args.command === "--help" || args.command === "-h") {
      usage();
      return;
    }
    if (args.command === "path") {
      console.log(sourceSkill);
      return;
    }
    if (args.command === "install") {
      installSkill(args.path, args.force);
      return;
    }
    throw new Error(`Unknown command: ${args.command}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

main();
