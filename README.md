# Shopfront — Frontend E-Commerce Dashboard

A responsive React + React Bootstrap frontend for the [DummyJSON](https://dummyjson.com) API, covering authentication, product browsing, cart management, user management, and a full CRUD dashboard.

## Project Overview

This app was built to the following spec:

- User authentication (login, mock register, token persistence)
- Product browsing with search, category filtering, sorting, and pagination
- Full CRUD for Products, Carts, and Users
- A dashboard with navigation, summary widgets, and management views for every resource

## Tech Stack

- **React 18** (via Vite)
- **React Router v6** — client-side routing and route protection
- **React Bootstrap 5** — UI components and responsive layout
- **Axios** — API requests, with an interceptor for token attachment and 401 handling
- **React Hook Form** — form state and validation
- **react-icons** (Lucide set) — iconography

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# App runs at http://localhost:5173
```

To create a production build:

```bash
npm run build
npm run preview   # preview the production build locally
```

No environment variables are required — the app talks directly to `https://dummyjson.com`, which is hardcoded as the base URL in `src/api/axiosClient.js`.

## Logging In

DummyJSON doesn't let you log in with arbitrary credentials — you need one of its seeded test users. The login form is pre-filled with a working pair:

```
username: emilys
password: emilyspass
```

Browse more test accounts at [dummyjson.com/users](https://dummyjson.com/users) (any user's `username` + the shared password pattern documented there will work).

## Project Structure

```
src/
├── api/            Axios instance + one module per resource (auth, products, carts, users)
├── context/         AuthContext — login state, token persistence
├── hooks/            useAuth, usePagination
├── components/
│   ├── layout/       Sidebar, Topbar, DashboardLayout, ProtectedRoute
│   ├── products/     ProductCard, ProductFilters, ProductForm
│   ├── carts/        CartTable, CartDetails, CartForm
│   ├── users/        UserTable, UserDetails, UserForm
│   └── common/       SearchBar, PaginationBar, LoadingSpinner, ErrorAlert, ConfirmDeleteModal
├── pages/            One page component per route
└── utils/            categoryColor — deterministic category chip colors
```

## Known Issues / Notes

- **DummyJSON is a mock API.** `POST`, `PUT`, and `DELETE` requests return a realistic response but **don't actually persist** on the server — a refresh will show the original seed data again. To keep the UI honest in the moment, this app updates its local state optimistically after a successful mock response (e.g. a deleted product disappears from the list immediately), so CRUD flows feel real during a session even though nothing survives a reload.
- **Registration is a mock flow.** DummyJSON has no real "create account" endpoint; the Register page uses `/users/add`, which returns a fake created-user object but doesn't let you log in with it afterward. You'll always need to log in with a seeded test user.
- **Category sort on filtered views.** The category and search endpoints don't support server-side sorting, so sorting is applied client-side on the current page of results when a category filter or search term is active.
- **Token expiry.** DummyJSON tokens expire after the `expiresInMins` set at login (currently 60 minutes). If a request comes back `401`, the app clears the session and redirects to `/login`.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**. No environment variables needed.
4. Deploy — Vercel will run `npm run build` and serve the `dist/` output automatically.
