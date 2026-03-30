# Next Steps: Deploying Sunflower Effect Command Centre as a Live Web App

## Current State

The app is well-built — React frontend, Express backend, SQLite database, and routing are all in place. The frontend already calls the backend API (`/api/enquiries`, `/api/bookings`, etc.) through a Vite proxy. It runs locally with `npm start`.

**The gap:** It was built in Google AI Studio and runs locally, but is not yet deployed as a live web application accessible from a browser anywhere.

---

## Task List

### Step 1 — Set Up Your Environment File
- [ ] Copy `.env.example` to `.env.local`
- [ ] Replace `MY_GEMINI_API_KEY` with your actual Gemini API key (get one free at https://aistudio.google.com)
- [ ] This unlocks any AI-powered features built into the app

### Step 2 — Test It Locally First
- [ ] Run `npm start` inside the `sunflower-effect-command-centre/` folder
- [ ] Check that the dashboard loads at http://localhost:3000
- [ ] Verify enquiries, bookings, and invoices display data correctly
- [ ] This confirms the frontend ↔ backend connection is working before deploying

### Step 3 — Deploy the Backend (Express + SQLite)
The Express server (`server.js`) needs to be hosted. Recommended options:
- **Railway** (recommended — free tier, easy Node.js deploy, persistent storage for SQLite)
- **Render** — similar, also has a free tier

Steps:
- [ ] Create a free account at https://railway.app
- [ ] Create a new project and connect your project folder (or push to GitHub first)
- [ ] Set the start command to `node server.js`
- [ ] Note the public URL Railway gives you (e.g. `https://your-app.railway.app`)

### Step 4 — Deploy the Frontend (React)
- [ ] Run `npm run build` to produce the `dist/` folder
- [ ] Create a free account at https://vercel.com or https://netlify.com
- [ ] Deploy by connecting your GitHub repo or dragging the `dist/` folder
- [ ] Note the public URL (e.g. `https://sunflower-effect.vercel.app`)

### Step 5 — Connect Frontend to Backend in Production
Right now the frontend uses a local proxy (`/api` → `localhost:5000`). In production:
- [ ] Add `VITE_API_URL=https://your-backend.railway.app` as an environment variable in Vercel/Netlify
- [ ] Update the API fetch calls in the page components to use `import.meta.env.VITE_API_URL` as the base URL
- [ ] Redeploy the frontend after making this change

### Step 6 — Build Out Placeholder Pages (Ongoing)
Three sections currently show a placeholder with no real functionality:
- [ ] **Template Updates** (`/templates`) — needs a template library or editor
- [ ] **Personal Tab** (`/personal`) — needs personal notes or goals tracker
- [ ] **Knowledge Base** (`/knowledge`) — needs a resource library or document store

---

## Recommended Path (Easiest / Quickest to Go Live)

If you want everything in one place with minimal setup, **Railway** can host both the Express backend AND serve the built React frontend as static files — no need for two separate services.

1. Push the project to a GitHub repository
2. Connect GitHub repo to Railway
3. Railway auto-detects Node.js and runs `npm start`
4. One URL serves the whole app

---

## Pages Already Built

| Section | Route | Status |
|---|---|---|
| Daily Briefing (Home) | `/` | Built |
| Enquiry Management | `/enquiry` | Built + connected to DB |
| Booking Management | `/booking` | Built + connected to DB |
| Content Studio | `/content` | Built + connected to DB |
| Newsletter Updates | `/newsletter` | Built |
| Website Updates | `/website` | Built |
| Google Profile | `/google` | Built |
| YouTube Editing | `/youtube` | Built |
| Book Promotion | `/promotion` | Built |
| Publicity & PR | `/publicity` | Built |
| Impact Study | `/impact` | Built |
| Invoices & Receipts | `/invoices` | Built + connected to DB |
| Template Updates | `/templates` | Placeholder |
| Personal Tab | `/personal` | Placeholder |
| Knowledge Base | `/knowledge` | Placeholder |
