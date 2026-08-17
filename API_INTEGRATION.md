# API Integration Map

This frontend consumes the backend through Next.js server actions and service helpers, using the `BACKEND_API_URL` environment variable as the base URL.

## Source of truth

The API calls are defined in these files:

- `app/(authGroup)/_actions/authActions.ts`
- `app/(publicGroup)/_actions/gearActions.ts`
- `app/(publicGroup)/_actions/rentActions.ts`
- `app/(dashboardGroup)/_actions/adminActions.ts`
- `app/(dashboardGroup)/_actions/myGearsActions.ts`
- `app/(dashboardGroup)/_actions/providerGearActions.ts`
- `app/(dashboardGroup)/_actions/rentalActions.ts`
- `app/(dashboardGroup)/_actions/reviewActions.ts`
- `service/getMe.ts`
- `service/refreshToken.ts`

## Authentication and user profile

| Frontend area | Component / function | HTTP method | Backend endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- |
| Login | `LoginForm.tsx` -> `loginAction` | POST | `/api/auth/login` | No | Authenticate user and set access/refresh cookies |
| Register | `RegisterForm.tsx` -> `registerAction` | POST | `/api/auth/register` | No | Create new account |
| Session refresh | `refreshToken.ts` -> `getNewAccessToken` | POST | `/api/auth/refresh-token` | Refresh cookie | Refresh expired access token |
| Current user | `service/getMe.ts` -> `getMe` | GET | `/api/users/me` | Access cookie | Fetch logged-in user profile |
| Admin users | `UserManagement.tsx` / `UserDataTable.tsx` | GET | `/api/users` | Access cookie | List all users |
| Admin user status | `UserManagement.tsx` -> `updateUserStatus` | PATCH | `/api/users/:userId` | Access cookie | Activate or suspend a user |

## Catalog and gear browsing

| Frontend area | Component / function | HTTP method | Backend endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- |
| Homepage | `FeaturedGear.tsx` / `getFeaturedGears` | GET | `/api/gears` | No | Fetch featured gear cards |
| Gear listing | `GearGrid.tsx` / `GearFilter.tsx` / `getAllGears` | GET | `/api/gears` or `/api/gears?query...` | No | Browse gear inventory with filters/search |
| Categories | `GearFilter.tsx` / `getCategories` | GET | `/api/categories` | No | Load category options |
| Gear detail | `app/(publicGroup)/gear/[id]/page.tsx` / `getGearById` | GET | `/api/gears/:id` | Optional cookie | Fetch a single gear details page |
| Provider gear list | `ProviderGearList.tsx` / `getMyGear` | GET | `/api/gears/mygear` | Access cookie | Fetch gears owned by provider |
| Create gear | `AddGearDialog.tsx` / `createGear` | POST | `/api/gears` | Access cookie | Add a new gear item |
| Update gear | `EditGearDialog.tsx` / `updateGear` | PATCH | `/api/gears/:gearId` | Access cookie | Update gear details |
| Delete gear | `ProviderGearList.tsx` / `deleteGear` | DELETE | `/api/gears/:gearId` | Access cookie | Remove gear |

## Rentals and orders

| Frontend area | Component / function | HTTP method | Backend endpoint | Auth | Purpose |
| --- | --- | --- | --- | --- | --- |
| Rent gear | `RentGearDialog.tsx` / `createRental` | POST | `/api/rentals` | Access cookie | Create rental request |
| Customer rentals | `CustomerRentalList.tsx` / `RentalList.tsx` / `getMyRentals` | GET | `/api/rentals/myrental` | Access cookie | View current customer rentals |
| All rentals | `rentalActions.ts` -> `getAllRentals` | GET | `/api/rentals` | Access cookie | Fetch rental records for dashboard roles |
| Provider orders | `ProviderOrderList.tsx` / `getProviderOrders` | GET | `/api/rentals/provider/orders` | Access cookie | View provider-side rental orders |
| Update order status | `ProviderOrderCard.tsx` / `updateProviderOrderStatus` | PATCH | `/api/rentals/:rentalId` | Access cookie | Accept, reject, or update rental status |
| Checkout payment | `PayNowButton.tsx` / `createCheckoutSession` | POST | `/api/payments/checkout` | Access cookie | Start Stripe checkout for a rental |
| Reviews | `ReviewDialog.tsx` / `createReview` | POST | `/api/reviews` | Access cookie | Submit user review after rental |

## Dashboard-to-backend component mapping

### Admin dashboard
- `app/(dashboardGroup)/admin-dashboard/page.tsx`
  - Uses `getAllUsers` and `updateUserStatus`
  - Backend: `GET /api/users`, `PATCH /api/users/:userId`

### Provider dashboard
- `app/(dashboardGroup)/provider-dashboard/page.tsx`
  - Uses `getProviderOrders`, `getMyGears`, `getCategories`, and gear CRUD helpers
  - Backend: `GET /api/rentals/provider/orders`, `GET /api/gears/mygear`, `GET /api/categories`, `POST/PATCH/DELETE /api/gears`

### Customer dashboard
- `app/(dashboardGroup)/dashboard/page.tsx`
  - Uses `getMyRentals`, `createCheckoutSession`, and review actions
  - Backend: `GET /api/rentals/myrental`, `POST /api/payments/checkout`, `POST /api/reviews`

## Notes

- Protected endpoints rely on the `accessToken` cookie being present.
- Some flows also refresh the access token via `refreshToken.ts` when the access token is expired.
- The frontend assumes the backend base URL is defined in `process.env.BACKEND_API_URL`.
- If the backend contract changes, update the server-action callers and this document together.
