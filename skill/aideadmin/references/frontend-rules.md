# Frontend Rules Reference

## Stack

Both frontends use React:

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

Do not use non-React frontend stacks or framework-local theme systems.

## Shared Rules

- PC admin and H5 share API contracts, auth rules, permission data shape, and request wrapper strategy.
- Extract shared types, request wrappers, permission helpers, and utilities into a shared package such as `packages/shared`.
- Request wrappers must support token injection, unified response parsing, debounce, request dedupe, idempotency keys for writes, route-change cancellation, and 401/403 handling.

## Admin UX

The admin interface uses a black/white minimalist tool style similar to the official ChatGPT UI:

- Primary palette: black, white, gray.
- Content first; avoid decorative large images, colorful gradients, large dark backgrounds, and complex motion.
- Top menu switches first-level modules.
- Module home pages use navigation icon cards for feature entries.
- Customer IM is a global floating dock and drawer, not an independent menu page.

## Style Encapsulation

The framework must provide style foundations. Generated pages inherit or compose framework styles.

Recommended shared styles:

```text
packages/ui/styles/
├── tokens.css
├── reset.css
├── base.css
├── admin.css
├── h5.css
└── install.css
```

Use CSS variables for colors, spacing, radius, font sizes, shadows, and z-index.

Required base class namespace:

| Class | Purpose |
| --- | --- |
| `aide-page` | Page root |
| `aide-page__header` | Title, description, primary actions |
| `aide-section` | Content section |
| `aide-filter` | Filter form container |
| `aide-actions` | Action area |
| `aide-entry-card` | Navigation icon card |
| `aide-empty` | Empty state |
| `aide-mobile-page` | H5 page root |
| `aide-install-page` | Installer page root |

Preferred parent components:

- `DataPage`
- `FormPage`
- `DetailPage`
- `MobilePage`
- `InstallPage`

Generated React pages must not create independent themes or large inline style blocks.

## Permission Component

Use server-returned permission strings through components or hooks:

```tsx
import { Button } from 'antd'
import { Permission } from '@/components/Permission'

export function AdminToolbar() {
  return (
    <>
      <Permission value="auth.admin/add">
        <Button type="primary">Create</Button>
      </Permission>
      <Permission anyOf={['auth.admin/edit', 'auth.admin/delete']}>
        <Button>Action</Button>
      </Permission>
    </>
  )
}
```

## Data Page Pattern

```tsx
import { DataPage } from '@aideadmin/ui'

export default function AdminListPage() {
  return (
    <DataPage
      title="Admin"
      description="Admin accounts, roles, and status maintenance"
      permission="auth.admin/list"
      filter={<AdminFilter />}
      actions={<AdminActions />}
      table={<AdminTable />}
      emptyText="No admins yet"
    />
  )
}
```
