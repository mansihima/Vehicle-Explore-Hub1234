# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── uber-rentals/       # Uber Rentals Vehicle Experience Platform (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── attached_assets/        # User-uploaded assets (logo, etc.)
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Uber Rentals - Vehicle Experience Platform

### What it is
A cinematic, immersive vehicle rental experience platform inspired by Tesla/Apple product pages. Features:
- Dark premium theme with glassmorphism
- 3D vehicle viewer (Three.js via @react-three/fiber + @react-three/drei)
- 360° vehicle exploration with OrbitControls
- Floating hotspots system (Interior, Performance, Comfort, Luggage, Ride Quality)
- Framer Motion scroll-based animations
- Custom logo (public/logo.png) used in Navbar, Loading Screen, 360 Explorer, and Watermark
- Vehicle Discovery section with specs + pricing
- Ride Personality selector
- Booking Panel (3-step booking flow with glassmorphism)
- WebGL error boundary with animated CSS fallback

### Key files
- `artifacts/uber-rentals/src/App.tsx` — Entry, loading screen + main page
- `artifacts/uber-rentals/src/pages/VehicleExperiencePage.tsx` — Main orchestration page
- `artifacts/uber-rentals/src/components/Viewer3D.tsx` — 3D model viewer with hotspots
- `artifacts/uber-rentals/src/components/Vehicle360Viewer.tsx` — 360° explorer overlay
- `artifacts/uber-rentals/src/components/HotspotSystem` — Built into Viewer3D
- `artifacts/uber-rentals/src/components/LoadingScreen.tsx` — Animated loading with logo
- `artifacts/uber-rentals/src/components/BookingPanel.tsx` — Slide-in 3-step booking
- `artifacts/uber-rentals/src/components/Navbar.tsx` — Sticky glass navbar with logo
- `artifacts/uber-rentals/public/logo.png` — Custom Uber Rentals logo

### 3D Model Support
- Place a `.glb` file in `artifacts/uber-rentals/public/` 
- Pass the URL as `modelUrl` prop to `VehicleExperiencePage` in `App.tsx`
- Falls back to an animated CSS car when no model is provided or WebGL fails

### Dependencies
- `@react-three/fiber`, `@react-three/drei`, `three` — 3D rendering
- `framer-motion` — Animations
- All standard React/Vite/Tailwind workspace deps

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`.

- Always typecheck from the root: `pnpm run typecheck`
- `emitDeclarationOnly` — only `.d.ts` files during typecheck
- Project references — when package A depends on B, A's tsconfig lists B

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build`
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly`
