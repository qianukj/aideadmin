# Publishing AideAdmin Framework Skill

This repository is designed for three distribution channels:

- GitHub repository
- Gitee repository
- npm global package

## 1. Validate

```bash
node --check ./bin/aideadmin-skill.js
node ./scripts/validate-skill.mjs
python C:/Users/pipiwei/.codex/skills/.system/skill-creator/scripts/quick_validate.py skill/aideadmin
```

`npm run check` runs the Node checks when npm is available.

## 2. GitHub

```bash
git init
git add .
git commit -m "feat: publish aideadmin skill"
git branch -M main
git remote add origin git@github.com:qianukj/aideadmin-skill.git
git push -u origin main
```

## 3. Gitee

```bash
git remote add gitee git@gitee.com:qianukj/aideadmin-skill.git
git push -u gitee main
```

## 4. npm

```bash
npm login
npm publish --access public
```

Global install after publishing:

```bash
npm install -g @qianukj/aideadmin-skill
aideadmin-skill install --force
```

Custom Codex skills directory:

```bash
aideadmin-skill install --path /path/to/skills --force
```

## 5. Release Tags

```bash
git tag v0.1.0
git push origin v0.1.0
git push gitee v0.1.0
```
