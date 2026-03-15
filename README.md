# AeroCast

A dashboard that monitors **wind power generation forecasts vs actual generation in the UK**.

---

## Project Overview

AeroCast displays wind power generation data from the UK's Balancing Mechanism Reporting Service (BMRS). Users can compare actual generation against forecasts across configurable date ranges and forecast horizons.

---

## System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│    Backend      │────▶│  MongoDB Atlas  │
│  (React/Vite)   │     │ (Express/Node)  │     │   (Database)    │
│  Vercel Hosted  │     │ Vercel Serverless│    │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **Frontend**: React SPA deployed as a static site on Vercel
- **Backend**: Express API deployed as a serverless function on Vercel
- **Database**: MongoDB Atlas (cloud-hosted)

---

## Tech Stack

| Layer    | Technologies                          |
| -------- | ------------------------------------- |
| Frontend | React, TypeScript, Vite, Recharts     |
| Backend  | Node.js, Express, TypeScript          |
| Database | MongoDB (Mongoose)                    |
| Hosting  | Vercel (frontend + backend)           |

---

## Setup Instructions

### Backend

```bash
cd backend
cp .env.example .env   # Edit .env with your MongoDB URI
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

**Ingest sample data** (optional):

```bash
npm run ingest
```

### Frontend

```bash
cd frontend
cp .env.example .env   # Edit .env if needed (default: localhost:5000)
npm install
npm run dev
```

The dashboard runs at `http://localhost:5173`.

---

## Deployment Instructions

Frontend and backend deploy as **separate Vercel projects**.

### Backend Deployment on Vercel

1. Create a new project on [Vercel](https://vercel.com) and import your repository.
2. Set the **Root Directory** to `backend`.
3. Configure environment variables (see below).
4. Deploy. The API will be available at `https://your-project.vercel.app`.

**Build settings** (Vercel auto-detects):
- Framework: Other
- Build Command: `npm run build` (or leave default)
- Output Directory: Not used (serverless)

### Frontend Deployment on Vercel

1. Create a **second** Vercel project and import the same repository.
2. Set the **Root Directory** to `frontend`.
3. Add `VITE_API_URL` pointing to your deployed backend URL (e.g. `https://your-backend.vercel.app/api`).
4. Deploy. The dashboard will be available at `https://your-frontend.vercel.app`.

---

## Environment Variables

### Backend

| Variable   | Description                          | Required |
| ---------- | ------------------------------------ | -------- |
| `MONGO_URI`| MongoDB connection string (Atlas URI) | Yes      |
| `PORT`     | Server port (local dev only, default: 5000) | No  |

**Configuring in Vercel:**
1. Project → Settings → Environment Variables
2. Add `MONGO_URI` with your MongoDB Atlas connection string
3. Ensure it is set for Production (and Preview if needed)

### Frontend

| Variable       | Description                              | Required |
| -------------- | ---------------------------------------- | -------- |
| `VITE_API_URL` | Backend API base URL (e.g. `https://your-backend.vercel.app/api`) | Yes (for production) |

**Local development:** Defaults to `http://localhost:5000/api` if not set.

**Configuring in Vercel:**
1. Project → Settings → Environment Variables
2. Add `VITE_API_URL` with your deployed backend URL + `/api`
3. Example: `https://aerocast-api.vercel.app/api`

---

## API Endpoints

| Method | Path           | Description                    |
| ------ | -------------- | ------------------------------ |
| GET    | `/health`      | Health check                  |
| GET    | `/api/generation` | Wind generation data (params: `start`, `end`, `horizon`) |

---

## AI Tools Disclosure

AI tools such as ChatGPT or Cursor were used for development assistance during the creation of this project.
