# AeroCast

A dashboard that monitors **wind power generation forecasts vs actual generation in the UK**.

## Project Structure

```
aerocast/
├── backend/     # Express + TypeScript API
├── frontend/    # React + Vite dashboard
└── analysis/    # Data analysis scripts (future)
```

## Tech Stack

- **Frontend:** React + TypeScript (Vite), Recharts
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB (Mongoose)

## Quick Start

### Backend

```bash
cd backend
cp .env.example .env   # Edit .env with your MongoDB URI
npm install
npm run dev
```

API runs at http://localhost:5000

- Health check: `GET http://localhost:5000/health`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Dashboard runs at http://localhost:5173

## Environment Variables

Create a `.env` file in the backend folder (see `.env.example`):

- `MONGO_URI` - MongoDB connection string (default: mongodb://localhost:27017/aerocast)
- `PORT` - Server port (default: 5000)
