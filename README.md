# eLearni

eLearni is a course-selling platform built with the Next.js App Router. It now includes a public marketing and commerce experience, learner-facing course and progress flows, and a protected admin workspace for managing courses, lessons, and course imagery.

The project has moved well beyond the original brochure-style setup. The current app includes:

- a branded homepage with motion, smooth scrolling, and a first-load experience
- separate login and register flows
- course catalog, detail pages, reviews, and instructor profiles
- cart and wishlist flows for learners
- a learn dashboard and lesson-focused learning route
- payment status pages with checkout plumbing left intentionally ready for Razorpay integration
- a floating AI chat assistant on user routes with live backend responses
- admin dashboard, course CRUD, lesson management, and image assignment tools
- JWT cookie auth for users and admins
- bcrypt-based password hashing and legacy password migration on login

## Current Product Surface

### Public and learner routes

- `/` home page
- `/about`
- `/services`
- `/students`
- `/contact`
- `/courses`
- `/courses/[id]`
- `/courses/[id]/reviews`
- `/instructors/[id]`
- `/login`
- `/register`
- `/profile`
- `/wishlist`
- `/cart`
- `/mycart`
- `/checkout/[courseId]`
- `/payment/success`
- `/payment/failed`
- `/learn/[courseId]`
- `/learn/[courseId]/lesson/[lessonId]`
- `/privacy-policy`
- `/refund-policy`
- `/terms`

### Admin routes

- `/admin/login`
- `/admin/dashboard`
- `/admin/courses`
- `/admin/courses/new`
- `/admin/courses/[id]/edit`
- `/admin/courses/[id]/lessons`
- `/admin/images`

### API routes

#### User auth and profile

- `POST /api/v1/user/signup`
- `POST /api/v1/user/login`
- `GET /api/v1/user/me`
- `POST /api/v1/logout`

#### User course and progress APIs

- `GET /api/v1/user/courses`
- `GET /api/v1/user/courses/[id]`
- `GET /api/v1/user/courses/[id]/lessons`
- `GET /api/v1/user/courses/[id]/progress`
- `POST /api/v1/user/courses/purchase/[id]`
- `GET /api/v1/user/courses/purchased`
- `PATCH /api/v1/user/lessons/[lessonId]/progress`

#### Admin auth APIs

- `POST /api/v1/admin/signup`
- `POST /api/v1/admin/login`
- `POST /api/v1/admin/logout`
- `GET /api/v1/admin/me`

#### Admin content APIs

- `GET, POST /api/v1/admin/courses`
- `PUT, DELETE /api/v1/admin/courses/[id]`
- `GET, POST /api/v1/admin/courses/[id]/lessons`
- `PUT, DELETE /api/v1/admin/lessons/[lessonId]`
- `GET, POST /api/v1/admin/images`
- `PATCH /api/v1/admin/courses/bulk/images`
- `POST /api/v1/admin/courses/bulk`

#### Utility routes

- `GET /api/health`
- `POST /api/seed/images`
- `POST /api/v1/chat`

## Tech Stack

- Next.js `16.2.3`
- React `19.2.5`
- TypeScript `5.9`
- Tailwind CSS `3.4`
- Prisma `7.7`
- PostgreSQL
- Framer Motion
- Lenis smooth scrolling
- Groq SDK (chat LLM provider)
- Upstash Redis + Upstash Ratelimit
- JWT cookie auth
- bcryptjs password hashing
- Zustand and Recoil where useful in the UI layer

## Authentication and Security

The app currently uses signed JWT cookies for both learner and admin sessions.

- user and admin passwords are hashed with bcrypt before storage
- legacy plaintext passwords are upgraded to bcrypt after the next successful login
- auth responses sanitize user objects before returning them to the client
- admin and user cookies are `httpOnly`
- secure cookie mode is enabled automatically in production

Required environment variables:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB"
SECRET_KEY="replace-with-a-long-random-secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
GROQ_API_KEY="your-groq-api-key"
UPSTASH_REDIS_REST_URL="https://...upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
```

## AI Chat Assistant

The app now includes a live chat assistant backed by Groq LLM calls and surfaced through `POST /api/v1/chat`.

Current chat behavior:

- model: `llama-3.3-70b-versatile` via Groq
- assistant constrained to course-selling guidance (benefits, pricing, level, duration, enrollment)
- floating chat widget supports prompt shortcuts, formatted assistant responses, and usage hints

### Chat Protection and Rate Limiting

The chat route includes layered safeguards:

- IP-based request rate limit: `20` requests per minute (sliding window)
- message validation: reject non-string payloads, empty messages, and spam-like noisy/repetitive input
- hard message-length limit: `< 200` characters
- Groq output cap per request: `max_tokens = 350`
- per-session token budget: `5000` tokens per hour (tracked in Redis)

When limits are hit, the API returns structured error codes and status codes so the widget can show clear user feedback:

- `RATE_LIMITED` (`429`)
- `SESSION_TOKEN_LIMIT` (`429`)
- `MESSAGE_TOO_LONG` (`400`)
- `EMPTY_MESSAGE` (`400`)
- `INVALID_MESSAGE` (`400`)
- `SPAM_DETECTED` (`400`)
- `SERVER_ERROR` (`500`)

Rate-limit metadata is also returned through headers:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`

## Data Model

The Prisma schema currently models:

- `User`
- `Course`
- `CourseImages`
- `Lesson`
- `Purchase`
- `LessonProgress`

`User` includes both learner and admin roles via the `Role` enum.

## Commerce Notes

- cart and wishlist state are currently client-side and persisted in `localStorage`
- checkout and purchase plumbing exist, but the actual payment gateway is intentionally left open for Razorpay integration
- payment success and failure routes already exist and can be wired to a real gateway callback flow

## UX Notes

The current user experience includes:

- global smooth scroll on public routes
- first-load branded loading screen
- route-level loading UI
- animated homepage sections
- floating chat assistant launcher and chat shell
- immersive profile page with admin access visibility

## Local Development

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL database

### Install

```bash
npm install
```

### Apply database migrations

```bash
npx prisma migrate dev
```

### Start the app

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` start the Next.js dev server
- `npm run build` generate Prisma client and create a production build
- `npm run start` start the production server
- `npm run lint` run ESLint
- `npm run lint:fix` auto-fix lint issues where possible
- `npm run format` format the codebase with Prettier
- `npm run format:check` verify formatting

## Database and Prisma

This repo uses a generated Prisma client under `generated/prisma`, so after dependency or schema changes the client is regenerated by:

- `postinstall`
- `npm run build`

You can inspect the database locally with:

```bash
npx prisma studio
```

## Deployment

You can deploy this app to Vercel, Render, Railway, AWS, or a custom Node/Docker environment.

Recommended production flow:

```bash
npm install
npx prisma migrate deploy
npm run build
npm run start
```

## Current Gaps

A few things are intentionally not finished yet:

- real payment gateway integration, including Razorpay checkout and webhook verification
- persistent server-side cart and wishlist storage
- persistent chat history and long-term conversation memory
- richer course metadata such as categories, tags, coupons, and instructor bios in the database schema

That means the current codebase is best understood as a polished course-selling foundation with real admin management, learner flows, and auth/security in place, plus a few commerce integrations still waiting for the final wiring.
