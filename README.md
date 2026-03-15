# AeroCast

A dashboard that monitors **wind power generation forecasts vs actual generation in the UK**.

---

## 🚀 Live Application

The application is deployed on Vercel:
**[https://aero-cast-theta.vercel.app/](https://aero-cast-theta.vercel.app/)**

---

## 📂 Project Structure

```text
AeroCast/
├── analysis/           # Data analysis & visualisations
│   ├── wind_forecast_analysis.ipynb  # Main analysis notebook
│   └── *.csv           # Exported datasets
├── backend/            # Node.js/Express TypeScript API
│   ├── src/scripts/    # Data ingestion & export scripts
│   └── vercel.json     # Backend deployment config
└── frontend/           # React/Vite TypeScript Dashboard
    └── src/components/ # UI & Charting components
```

---

## 🛠️ Tech Stack

| Layer    | Technologies                          |
| -------- | ------------------------------------- |
| Frontend | React, TypeScript, Vite, Recharts     |
| Backend  | Node.js, Express, TypeScript          |
| Database | MongoDB Atlas (Mongoose)              |
| Analysis | Python, Pandas, Matplotlib, Seaborn   |
| Hosting  | Vercel (Frontend + API)               |

---

## ⚙️ Setup Instructions

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # Configure your MONGO_URI (e.g. MongoDB Atlas or local MongoDB)
npm run dev
```

**Prerequisites:** Ensure MongoDB is running (local or Atlas). Set `MONGO_URI` in `.env` before running ingestion.

**Data Preparation Scripts:**
- `npm run ingest`: Fetch January 2024 wind data from BMRS and load into MongoDB.
- `npx ts-node src/scripts/exportDataToCSV.ts`: Export data to CSVs for the analysis folder (run from `backend/`).

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env   # Set VITE_API_URL if needed
npm run dev
```
Dashboard runs at `http://localhost:5173`.

### 3. Analysis
1. Export datasets to `analysis/` by running from `backend/`: `npx ts-node src/scripts/exportDataToCSV.ts`
2. Open `analysis/wind_forecast_analysis.ipynb` in any Jupyter-supported environment (VS Code, JupyterLab).

---

## 📡 API Endpoints

| Method | Path           | Description                    |
| ------ | -------------- | ------------------------------ |
| GET    | `/health`      | Server health check            |
| GET    | `/api/generation` | Wind generation data (filters: `start`, `end`, `horizon`) |

---

## 🤖 AI Tools Disclosure

AI tools such as ChatGPT and Cursor were used for development assistance during the creation of this project.
