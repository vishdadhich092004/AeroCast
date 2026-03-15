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
cp .env.example .env   # Configure your MONGO_URI
npm run dev
```

**Data Preparation Scripts:**
- `npm run ingest`: Fetch recent wind data from BMRS.
- `ts-node src/scripts/exportDataToCSV.ts`: (Used to generate CSVs for the analysis folder).

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env   # Set VITE_API_URL if needed
npm run dev
```
Dashboard runs at `http://localhost:5173`.

### 3. Analysis
1. Ensure you have the datasets in `analysis/` (run the backend export script if needed).
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
