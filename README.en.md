# AideAdmin Framework Skill

[中文](./readme.md) | [English](./README.en.md)

Website: https://aideadmin.com

AideAdmin Framework Skill packages the AideAdmin development rules as an AI-readable Skill for vibe coding. It guides agents to generate Go backend, React PC admin, and React H5 business systems with unified API contracts, RBAC/navigation entries, installer-first database setup, customer IM, third-party storage/SMS integrations, security middleware, Docker delivery, and MIT-friendly commercial use.

## AI Skill Quick Start

Install the npm package globally, then install the Skill into your local AI tool skill directory:

```bash
npm install -g @qianukj/aideadmin-skill
aideadmin-skill install --force
```

By default, it installs to `$CODEX_HOME/skills`. If `CODEX_HOME` is not set, it installs to `~/.codex/skills`.

Custom skill directory:

```bash
aideadmin-skill install --path /path/to/skills --force
```

## Mainstream AI Code Tools

| Tool | Integration | Recommended command / file | Usage |
| --- | --- | --- | --- |
| Codex | Native Skill | `aideadmin-skill install --force` | Say: `use aideadmin to create an article management module` |
| Claude Code | Native Skill | `aideadmin-skill install --path ~/.claude/skills --force` | Restart Claude Code, then trigger with natural language or `/aideadmin` |
| Claude Code project sharing | Project Skill | `aideadmin-skill install --path .claude/skills --force` | Commit `.claude/skills` to share the Skill with the team |
| Cursor | Project Rules | `.cursor/rules/aideadmin.mdc` | Write the core rules into project rules and set them to `Always` or `Agent Requested` |
| Windsurf | Workspace Rules | `.windsurf/rules/aideadmin.md` | Put framework conventions into a workspace rule |
| GitHub Copilot | Repository Instructions | `.github/copilot-instructions.md` | Add repository-level instructions for Go backend, React frontends, installer flow, permission model, and style inheritance |
| Generic AI Agent | Root agent instructions | `AGENTS.md` | Keep stack, directories, API contract, permissions, and security baseline in the root instruction file |

## Prompt Example

```text
Use aideadmin to create an article management module:
- Generate Go model / dto / repository / service / controller / route
- Generate React PC admin list, filters, form, and permission buttons
- Generate React H5 list and detail pages
- Add nav-entry permissions, SQL migration, table_prefix placeholders, and API contracts
```

## Framework Goals

AideAdmin is a frontend-backend separated admin framework for rapid business system development:

- Backend: Go REST API with clear layering and stable contracts.
- PC admin and H5 mobile frontend: React + TypeScript + Vite.
- Built-in common modules: admins, roles, top navigation, icon-card entries, button permissions, system config, dictionaries, upload, operation logs, login logs, cron tasks, and data export.
- Built-in customer IM: H5 quick access, PC global floating dock, message monitoring, WebSocket realtime messages, and quick replies.
- Third-party capability layer: Tencent Cloud COS, Alibaba Cloud OSS, Qiniu object storage, Tencent Cloud SMS, and Alibaba Cloud SMS.
- Server-driven frontend entries, routes, permissions, list contracts, and export rules.
- Standard workflow: table -> model -> repository -> service -> controller -> route -> nav-entry -> api -> page.

## Core Conventions

| Capability | Rule | Implementation Direction |
| --- | --- | --- |
| Frontend-backend separation | Backend only exposes APIs | Go backend returns JSON APIs; frontends deploy independently |
| Modular backend | Layer by admin, common capabilities, and model | `internal/admin` uses controller, service, repository, dto, and vo layers |
| Unified response | Fixed `code`, `show`, `msg`, `data` | Use `response.JSON` everywhere |
| Authentication | Token in header | JWT + Redis session validation |
| Authorization | Navigation entries, buttons, and API permissions share one model | RBAC + middleware permission checks |
| Admin UX | Black/white minimalist, content first | ChatGPT-like restrained tool interface |
| Style encapsulation | Framework provides parent components and base classes | Admin, H5, installer, and generated pages inherit or compose framework styles |
| Navigation UX | Top menu + navigation icon cards | No traditional left permission-tree menu |
| Customer IM | Global floating dock | Not an independent navigation menu |
| Installer flow | No DB connection required on first boot | Enter installer mode, save DB config, then initialize tables and seed data |
| Database prefix | Every table uses installer-submitted prefix | Default `aide_`; migrations and seeds use `{{prefix}}` |
| Security | Rate limiting, debounce, SQL injection prevention, anti-abuse baseline | Redis limits, frontend request governance, ORM parameter binding, deployment behind WAF/CDN/LB |
| License | MIT | Free commercial use, private deployment, modification, redistribution |

## Tech Stack

Backend:

- Go 1.22+
- Gin
- GORM
- MySQL 5.7+ / 8.0+
- Redis 6.0+
- Viper
- Zap / slog
- WebSocket
- robfig/cron
- Excelize

Frontend:

- React 19.x
- TypeScript 5.x
- Vite 6.x
- React Router 7.x
- Zustand 5.x
- Ant Design 5.x for PC admin
- Ant Design Mobile 5.x for H5
- Axios 1.x
- TanStack Query 5.x
- ECharts 5.x

## Monorepo Layout

```text
aideadmin/
├── admin/                         # React PC admin
├── h5/                            # React H5 mobile frontend
├── server/                        # Go backend
│   ├── cmd/
│   │   ├── api/
│   │   └── worker/
│   ├── configs/
│   ├── internal/
│   │   ├── admin/
│   │   ├── im/
│   │   ├── common/
│   │   └── model/
│   ├── migrations/
│   └── storage/
├── docker/
└── docs/
```

## Local Development

Server:

```bash
cd server
cp configs/config.example.yaml configs/config.local.yaml
go mod tidy
go run ./cmd/api
```

Worker:

```bash
cd server
go run ./cmd/worker
```

Admin:

```bash
cd admin
pnpm install
cp .env.example .env.local
pnpm dev --host 0.0.0.0 --port 5173
```

H5:

```bash
cd h5
pnpm install
cp .env.example .env.local
pnpm dev --host 0.0.0.0 --port 5174
```

## Production Build

Server:

```bash
cd server
go test ./...
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o ../dist/server/aideadmin-api ./cmd/api
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o ../dist/server/aideadmin-worker ./cmd/worker
```

Admin / H5:

```bash
cd admin
pnpm install --frozen-lockfile
pnpm lint
pnpm build

cd ../h5
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

Docker:

```bash
docker build -f docker/api.Dockerfile -t aideadmin-api:latest .
docker build -f docker/worker.Dockerfile -t aideadmin-worker:latest .
docker build -f docker/admin.Dockerfile -t aideadmin-web:latest .
docker build -f docker/h5.Dockerfile -t aideadmin-h5-web:latest .
```

## Publishing

Validate:

```bash
node --check ./bin/aideadmin-skill.js
node ./scripts/validate-skill.mjs
```

Publish:

```bash
npm publish --access public
```

## License

AideAdmin Framework follows the MIT License. It allows free commercial use, secondary development, private deployment, source modification, copying, distribution, and sublicensing. Keep the license and copyright notice when redistributing.
