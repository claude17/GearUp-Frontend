# GearUp Frontend 🏋️

A modern Next.js frontend for a sports and outdoor gear rental platform.

Live Demo: [live link](https://gearup-frontend-chi.vercel.app)

"Rent Sports & Outdoor Gear Instantly"

## Project Overview

GearUp is a responsive rental marketplace where customers can browse gear, compare options, reserve equipment for specific dates, and complete a checkout flow. Providers manage their inventory, track incoming orders, and update rental statuses. Admins can oversee platform users and monitor overall activity.

This project is built using the Next.js App Router and uses cookie-based JWT authentication against a backend API.

> Note: This is a frontend-focused and depends on a backend API from a previous project or external service.

---

## Roles & Permissions

| Role | Description | Frontend expectations |
| --- | --- | --- |
| Customer | Rents gear for events, trips, and activities | Public browsing, date selection, checkout flow, rental tracking, review submission |
| Provider | Lists and manages rental equipment | Provider dashboard, gear CRUD, order management, stock updates |
| Admin | Moderates the platform | User management, platform stats, account actions, moderation tools |

Users can register with a selected role and get redirected to a role-specific dashboard after login.

---

## Key Features

### Public Features
- Responsive gear grid with pricing and availability info
- Search and filtering by category, brand, price, and stock
- Detailed gear page with specifications and rental CTA
- Landing page with featured equipment
- Loading states and graceful fallback screens

### Customer Features
- Registration and login flow
- Rental request creation with date selection
- Payment checkout redirection flow
- Rental order history and status tracking
- Review submission after return/completion

### Provider Features
- Provider dashboard summary widgets
- Add, edit, and delete gear entries
- Image URL support for listing media
- View provider orders and update their status

### Admin Features
- Admin dashboard summary
- User listing and role-based moderation actions
- Activate/suspend user accounts

---

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components
- JWT-based auth with cookie storage
- Server Actions for backend integration

---

## Project Structure

```bash
gearup-frontend/
├── app/
│   ├── (authGroup)/
│   │   ├── _actions/
│   │   ├── _components/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboardGroup)/
│   │   ├── _actions/
│   │   ├── _components/
│   │   ├── admin-dashboard/
│   │   ├── dashboard/
│   │   └── provider-dashboard/
│   └── (publicGroup)/
│       ├── _actions/
│       ├── _components/
│       ├── gear/
│       └── page.tsx
├── components/
│   └── ui/
├── service/
├── lib/
├── public/
├── hooks/
├── utils/
├── API_INTEGRATION.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── README.md
```

---

## API Integration

This frontend communicates with the backend through server actions using the `BACKEND_API_URL` environment variable.

The backend contract is documented in [API_INTEGRATION.md](API_INTEGRATION.md).

### Main backend routes used
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh-token`
- `GET /api/users/me`
- `GET /api/users`
- `PATCH /api/users/:userId`
- `GET /api/gears`
- `GET /api/gears/:id`
- `GET /api/categories`
- `POST /api/gears`
- `PATCH /api/gears/:gearId`
- `DELETE /api/gears/:gearId`
- `POST /api/rentals`
- `GET /api/rentals/myrental`
- `GET /api/rentals/provider/orders`
- `PATCH /api/rentals/:rentalId`
- `POST /api/payments/checkout`
- `POST /api/reviews`

---

## Environment Variables

Create a `.env.local` file in the project root with the following:

```bash
BACKEND_API_URL="YOUR_BACKEND_API"
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

> Update these values to match your backend service and local environment.

---

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run the app locally

```bash
pnpm dev
```

Then open:

```bash
http://localhost:3000
```

### Production build

```bash
pnpm build
pnpm start
```

---

## Routes Overview

### Public
- `/` — Home page with featured gear
- `/gear` — Gear browser with filters
- `/gear/[id]` — Gear details page
- `/login` — Login screen
- `/register` — Registration screen

### Customer Dashboard
- `/dashboard` — User overview and rentals
- `/dashboard/rentals` — Rental management

### Provider Dashboard
- `/provider-dashboard` — Provider summary
- `/provider-dashboard/gears` — Gear inventory management
- `/provider-dashboard/orders` — Incoming orders

### Admin Dashboard
- `/admin-dashboard` — Platform overview
- `/admin-dashboard/admin` — User management interface

---

## Notes

- All protected routes rely on authenticated cookie-based tokens.
- The app uses server actions and secure cookie handling for session management.
- The design is optimized for mobile and desktop responsiveness.
- This frontend is intended to work with a matching backend API for auth, gear, rentals, payments, and reviews.