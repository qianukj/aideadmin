# Architecture Reference

## Product Goal

AideAdmin Framework is a rapid development framework for vibe coding. It targets AI-assisted business system generation with a Go backend, React PC admin, React H5 mobile frontend, unified API contracts, server-driven permissions, installer-first setup, and reusable style foundations.

## Monorepo Layout

```text
aideadmin/
├── admin/                         # React PC admin
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── layout/
│       ├── pages/
│       ├── router/
│       ├── stores/
│       ├── styles/
│       ├── utils/
│       └── main.tsx
├── h5/                            # React H5 mobile frontend
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── router/
│       ├── stores/
│       ├── styles/
│       ├── utils/
│       └── main.tsx
├── server/                        # Go backend
│   ├── cmd/
│   │   ├── api/
│   │   └── worker/
│   ├── configs/
│   ├── internal/
│   │   ├── admin/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── route/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   └── vo/
│   │   ├── im/
│   │   │   ├── gateway/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── dto/
│   │   │   └── vo/
│   │   ├── common/
│   │   │   ├── auth/
│   │   │   ├── bootstrap/
│   │   │   ├── cache/
│   │   │   ├── config/
│   │   │   ├── contextx/
│   │   │   ├── database/
│   │   │   ├── errors/
│   │   │   ├── export/
│   │   │   ├── list/
│   │   │   ├── logger/
│   │   │   ├── middleware/
│   │   │   ├── response/
│   │   │   ├── sdk/
│   │   │   │   ├── storage/
│   │   │   │   └── sms/
│   │   │   └── upload/
│   │   └── model/
│   ├── migrations/
│   └── storage/
├── docker/
├── docs/
└── README.md
```

## Standard Development Path

```text
table
  -> model
  -> repository
  -> service
  -> controller
  -> route
  -> nav-entry
  -> api
  -> page
```

Keep this path visible in AI-generated work. It gives another agent clear context for follow-up edits.

## Module Responsibilities

| Layer | Responsibility | Do Not |
| --- | --- | --- |
| route | Register route groups and middleware | Write business logic |
| controller | Bind DTO, call service, return response | Write complex SQL |
| dto | Define request fields and validation | Depend on database |
| service | Business rules, transactions, orchestration | Write HTTP responses |
| repository | Data queries, updates, complex conditions | Handle permissions or response shape |
| model | Database table mapping | Store business workflows |
| vo | Response fields for frontend | Return sensitive fields |

## Admin UX Architecture

Admin UX is not a traditional permission tree. It is:

```text
Top menu -> module home -> navigation icon cards -> page
```

Permission records may still use a table such as `sys_menu`, but the meaning is navigation entries plus permission points:

- `M`: top navigation module.
- `C`: icon-card feature entry.
- `A`: button or API permission.

