# Delivery Reference

## Local Development

Prerequisites:

```text
Go 1.22+
Node.js 20+
pnpm 9+
MySQL 5.7+ / 8.0+
Redis 6.0+
Docker 24+ optional
```

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

Integration order:

1. Start MySQL and Redis.
2. Start `server`; if not installed, it enters install mode.
3. Open admin installer and submit database config.
4. Initialize data and create the install lock.
5. Start or refresh admin and H5 for integration.

## Production Build

Server:

```bash
cd server
go mod tidy
go test ./...
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o ../dist/server/aideadmin-api ./cmd/api
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o ../dist/server/aideadmin-worker ./cmd/worker
```

Admin:

```bash
cd admin
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

H5:

```bash
cd h5
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

Build checks:

- Server passes `go test ./...`.
- Admin and H5 pass lint and TypeScript checks.
- Production config does not include real database passwords, AK/SK, or JWT secrets.
- Build artifacts do not include `.env.local`, `config.local.yaml`, logs, or temp uploads.

## Docker

Build images:

```bash
docker build -f docker/api.Dockerfile -t aideadmin-api:latest .
docker build -f docker/worker.Dockerfile -t aideadmin-worker:latest .
docker build -f docker/admin.Dockerfile -t aideadmin-web:latest .
docker build -f docker/h5.Dockerfile -t aideadmin-h5-web:latest .
```

Run API:

```bash
docker run -d --name aideadmin-api \
  -p 8080:8080 \
  -v ./server/configs/config.local.yaml:/app/configs/config.local.yaml \
  -v ./server/storage:/app/storage \
  aideadmin-api:latest
```

Run frontend containers:

```bash
docker run -d --name aideadmin-web -p 8081:80 aideadmin-web:latest
docker run -d --name aideadmin-h5-web -p 8082:80 aideadmin-h5-web:latest
```

Compose:

```bash
docker compose -f docker/compose.yaml up -d
docker compose -f docker/compose.yaml logs -f api
docker compose -f docker/compose.yaml down
```

Runtime requirements:

- Mount `server/storage` as a persistent volume.
- Inject `config.local.yaml` by mount or environment variables; do not bake secrets into images.
- Put production traffic behind HTTPS, WAF, CDN, or a load balancer.

## Publishing the Skill

This repository can be published to GitHub and Gitee as a normal git repository. The npm package installs `skill/aideadmin` into the local Codex skill directory.

Suggested release flow:

```bash
git tag v0.1.0
git push origin main --tags
git push gitee main --tags
npm publish --access public
```
