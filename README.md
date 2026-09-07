# The Compendium — Mobile (Ionic + Angular demo)

A small mobile companion app for **The Compendium** research repository system,
built with **Ionic + Angular** (standalone components, signals, modern
control-flow syntax). Scoped down to 2 modules for a short presentation.

## Modules demonstrated

1. **Login** — student signs in with their LRN + password (`AuthService`)
2. **Manuscripts** — browse submitted/reviewed/published manuscripts, filter
   by status, and open a manuscript for full detail (`ManuscriptService`)

This is a **frontend-only demo** — no backend/API calls. Both services hold
in-memory mock data (signals) that mirrors the real system's schema and
statuses (`submitted`, `approved_faculty`, `published`, `revision_required`,
`revision_edited`, `denied`).

## Concepts covered (for the presentation)

| Requirement            | Where to point to |
|-------------------------|--------------------|
| **Service**             | `src/app/services/auth.service.ts`, `manuscript.service.ts` — signal-based state, injected with `inject()` |
| **Routing / routerLink**| `src/app/app.routes.ts` (lazy-loaded routes, `:id` param, `authGuard`); `[routerLink]` in `manuscript-card.component.html` and `manuscript-detail.page.html` |
| **Reusable Components** | `src/app/components/manuscript-card/` and `src/app/components/status-chip/` — both used in more than one place |
| **Angular Binding**     | Two-way `[(ngModel)]` on the login form; property binding (`[status]`, `[routerLink]`, `[class]`, `[disabled]`); event binding (`(click)`, `(ionChange)`, `(keyup.enter)`); interpolation (`{{ }}`) throughout |
| **@for / @if**          | `manuscripts.page.html` (list loop + empty state), `manuscript-detail.page.html` (optional remarks sections, not-found state), `login.page.html` (error banner, loading spinner) |
| **UI/UX**               | Dark navy + blue theme matching the web app's brand, loading states, empty states, status chips, filter segments, toast feedback |

## Demo login

The login page has a **"tap to autofill sample credentials"** hint — tap it,
then **Sign In**. (Credentials: LRN `100000000001` / password `student123`,
also visible in `auth.service.ts`.)

## Running it

```bash
npm install
npm start          # opens on http://localhost:4200
```

To view it as a real mobile app shell (Capacitor is already wired up):

```bash
npm run build
npx cap add ios       # or: npx cap add android
npx cap sync
npx cap open ios       # or: npx cap open android
```

## Project structure

```
src/app/
├── components/
│   ├── manuscript-card/     # reusable card, used in the @for loop
│   └── status-chip/         # reusable status pill, used in card + detail
├── guards/
│   └── auth.guard.ts         # protects the /app/* routes
├── models/
│   └── manuscript.model.ts   # Manuscript interface + status label/icon maps
├── pages/
│   ├── login/                 # Module 1
│   ├── manuscripts/            # Module 2 (list)
│   └── manuscript-detail/      # Module 2 (detail, routed via :id)
├── services/
│   ├── auth.service.ts
│   └── manuscript.service.ts
├── app.routes.ts
└── app.config.ts
```
