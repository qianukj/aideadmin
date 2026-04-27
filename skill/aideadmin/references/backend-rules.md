# Backend Rules Reference

## Stack

- Go 1.22+
- Gin 1.10+
- GORM 1.25+
- MySQL 5.7+ / 8.0+
- Redis 6.0+
- Viper
- Zap or slog
- Validator
- Casbin or custom RBAC
- Excelize
- robfig/cron

## Unified API Contract

Every API response uses:

```json
{
  "code": 1,
  "show": 0,
  "msg": "success",
  "data": {}
}
```

Common codes:

| code | Meaning |
| --- | --- |
| 1 | Success |
| 0 | Business failure |
| 401 | Not logged in or token expired |
| 403 | No permission |
| 422 | Validation failed |
| 429 | Too many requests |
| 500 | System error |

Pagination:

```json
{
  "code": 1,
  "show": 0,
  "msg": "success",
  "data": {
    "lists": [],
    "count": 0,
    "page_no": 1,
    "page_size": 15,
    "extend": {}
  }
}
```

## First-run Installer

The server must not require database connectivity on first startup.

Rules:

- If `server/storage/install.lock` does not exist, enter install mode.
- Install mode loads only base config, logs, install routes, static assets, and health checks.
- Install mode does not initialize business DB pools, normal migrations, worker, or DB-backed cron tasks.
- Normal admin APIs return a not-installed response until installation is complete.
- Only after installer submits config should the backend check DB connectivity and install tables/seeds.

Installer APIs:

```text
GET  /installapi/status
POST /installapi/database/check
POST /installapi/config/save
POST /installapi/install
```

## Database Prefix Rules

The install page submits `database.table_prefix`. The backend validates it, writes it to config, then migrations and seeds render physical table names with it.

Allowed prefix:

- letters, numbers, underscore
- must start with a letter
- recommended to end with `_`
- default: `aide_`

Use logical table names in code and docs:

```text
sys_admin  -> {{prefix}}sys_admin
im_session -> {{prefix}}im_session
cms_article -> {{prefix}}cms_article
```

Never hardcode final physical table names in models, repositories, migrations, or seed SQL. Use `{{prefix}}` in SQL seed files.

## Authentication

Login flow:

```text
submit account/password
  -> validate captcha or SMS code
  -> check account status
  -> validate password hash
  -> generate token
  -> write session to Redis
  -> update last login time and IP
  -> write login log
  -> return token, admin info, nav entries, permission strings
```

Headers:

```text
token: <admin-token>
version: <client-version>
terminal: admin
```

Redis keys:

```text
auth:admin:token:{token}
auth:admin:user:{admin_id}
auth:admin:perm:{admin_id}
auth:login:fail:{username}
auth:captcha:{captcha_key}
auth:sms:{scene}:{mobile}
```

## Security Middleware

Recommended order:

```text
Recovery
  -> Trace
  -> CORS
  -> SecurityHeader
  -> ClientIP
  -> RateLimit
  -> AntiReplay
  -> SqlGuard
  -> LoginAuth
  -> AdminContext
  -> Permission
  -> OperateLog
  -> Controller
```

Rate limiting:

- Implement with Redis Lua token bucket or sliding window.
- Limit by IP, admin/user ID, route, and scene.
- Apply stricter limits to login, SMS, upload, export, and IM message send.
- Return `429` with `retry_after`.

SQL injection prevention:

- Use GORM parameter binding or `db.Raw(sql, args...)`.
- Whitelist sort fields, filter fields, export fields, and sort direction.
- Escape LIKE search values.
- Do not trust `SqlGuard` as a substitute for repository-level binding.

## Naming

- Go package names: lowercase.
- File names: snake_case.
- DTO types end with `DTO`.
- VO types end with `VO` or `Item`.
- API paths: lowercase and `/`.
- Permission strings: `module.resource/action`, for example `auth.admin/add`.
