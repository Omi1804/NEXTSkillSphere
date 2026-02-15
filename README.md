# NEXTSkillSphere

NEXTSkillSphere is a course-selling platform that showcases curated learning paths, enables secure checkout for premium programs, and exposes API routes for both learners and administrators. The app combines server-rendered marketing pages with interactive components (animated learning sections, carousels, cart management) so prospective students can explore offerings and purchase seamlessly.

## Features

- Dynamic home, course catalog, services, students, and contact pages powered by the Next.js App Router.
- Protected admin APIs for course creation, updates, and user management using JWT authentication.
- User APIs for browsing catalog data, managing carts, and tracking purchased courses.
- Prisma-backed data layer for relational storage with PostgreSQL (or any Prisma-supported database).
- Tailwind CSS styling with reusable components, animations, and CSS modules for page-specific layouts.

## Tech Stack

- Next.js 14 (App Router, SSR/ISR)
- React 18 + TypeScript
- Tailwind CSS + CSS Modules
- Prisma ORM + PostgreSQL
- JWT authentication (admins and learners)
- Docker (optional containerized runtime)

## Prerequisites

- Node.js 18+
- npm (examples below use npm, but pnpm/yarn also work)
- PostgreSQL database and a valid `DATABASE_URL`
- `SECRET_KEY` for JWT signing

## Environment Variables

Create a `.env` (or `.env.local`) file with at least:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB"
SECRET_KEY="replace-with-secure-random-string"
```

Add any other provider keys (email, storage, analytics) your deployment requires.

## Local Development (npm)

1. Install dependencies
   ```bash
   npm install
   ```
2. Generate the Prisma client and apply migrations
   ```bash
   npx prisma migrate dev
   ```
3. Start the dev server
   ```bash
   npm run dev
   ```
4. Visit http://localhost:3000 to browse the marketing site, hit `/api` routes, and iterate on components.

### Useful Scripts

- `npm run dev` – start Next.js in development mode
- `npm run build` – compile for production
- `npm run start` – run the production server
- `npx prisma studio` – inspect and edit the database via Prisma Studio

## Docker Workflow

A standard Next.js production Dockerfile lets you containerize the app.

1. Build the image
   ```bash
   docker build -t nextskillsphere .
   ```
2. Run the container (ensure `.env` contains all required variables)
   ```bash
   docker run --env-file .env -p 3000:3000 nextskillsphere
   ```
3. Access the app at http://localhost:3000.

> Tip: For local databases, share network access (`--network host` on Linux or `--add-host host.docker.internal:host-gateway` on macOS/Windows) so the container can reach your DB.

## Deployment

- Deploy to Vercel, AWS, Render, or any platform that supports Node.js or Docker.
- Run `npx prisma migrate deploy` before starting the app in production to keep the schema in sync.
