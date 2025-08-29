# Role-Based Dashboard – Fix & Complete Instructions

## Goal

Fix all errors and complete the Role-Based Dashboard project in **React + Vite + TypeScript** with **Redux Toolkit**.  
Ensure the app fully satisfies the interview requirements:

- Redux properly used (auth + dummy data)
- Role-based login works (Admin, Merchant, Member)
- Protected routes implemented
- All dashboards have dummy features
- Logout works
- data load from JSON

---

## Steps Gemini Should Do

### 1. Project Setup

- **React + Vite + TypeScript**.
- Install and configure:
  - `@reduxjs/toolkit`
  - `react-redux`
  - `react-router`
  - `shadcn` 

---

### 2. Redux Setup

Create Redux slices inside `src/redux/`:

#### `authSlice.ts`

- State: `{ token: string | null, role: 'admin' | 'merchant' | 'member' | null }`
- Actions:
  - `loginSuccess(payload: { token: string, role: string })`
  - `logout()`

#### `dataSlice.ts`

- Store dummy data from JSON files in `src/utils/`:
  - `users.json`
  - `merchants.json`
  - `notifications.json`
  - `points.json`
- Provide reducers to update/approve items.

---

### 3. Authentication Pages

Create 3 login pages:

- `/login/admin` → Email + Password
- `/login/merchant` → Store details + Password
- `/login/member` → Phone/Email + Password (or OTP simulation)

✅ On successful login:

- Save token in `localStorage` (e.g., `"admin-token"`)
- Dispatch Redux `loginSuccess`
- Redirect to respective dashboard.

---

### 4. Protected Routing

Create `src/routes/ProtectedRoute.tsx`:

- Check Redux `auth.token` and `auth.role`.
- If not valid → redirect to correct login page.
- Otherwise → render children.

Update `App.tsx`:

- Routes:
  - `/dashboard/admin`
  - `/dashboard/merchant`
  - `/dashboard/member`

---

### 5. Dashboards

#### Admin Dashboard

- Show dummy **Users/Merchants table**.
- Buttons: Approve / Delete (update Redux state).

#### Merchant Dashboard

- Approve Purchases → Table + Approve button
- Lookup Customer → Search bar (filter dummy JSON)
- Set Contribution Rate → Form (number input)
- Notifications → Dummy requests list

#### Member Dashboard

- Show **Points Summary** from JSON (progress bar/cards)

---

### 6. Logout

- Add Logout button in Navbar.
- On click:
  - Clear Redux state
  - Remove token from `localStorage`
  - Redirect to `/login/{role}`

---

### 7. Extra Features

- Add **form validation** (basic required fields).
- Add **loader/spinner** when data is fetching/approving.
- Keep UI clean with Tailwind and shad cn.

---

### 8. Deployment Readiness

- Ensure `npm run dev` runs without errors.
- Add a clear `README.md` with setup instructions.
- Prepare for deployment (Vercel).

---

## Final Checklist

- [ ] No TypeScript errors
- [ ] Redux Toolkit configured properly
- [ ] Role-based login fully working
- [ ] Protected routes secure
- [ ] All dashboards implemented with dummy features
- [ ] Logout working
- [ ] JSON data used for dashboards

## Rules for Gemini

- ❌ Do **NOT** run the dev server automatically.
- ✅ Only scan, fix, and ensure code is production-ready.
- ✅ After fixes, show me the list of changes you made.
