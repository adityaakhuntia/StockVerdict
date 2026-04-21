# 📈 StockVerdict

> A high-performance, real-time stock analysis platform that delivers clear **BUY / HOLD / AVOID** decisions using a custom rule-based scoring engine.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)

---

## 🧠 Overview

StockVerdict transforms complex stock market data into simple, actionable insights.
Users can search any stock ticker and instantly receive:

- A **0–100 score**
- A clear **BUY / HOLD / AVOID** verdict
- Interactive price trend visualizations

The platform focuses on **speed, clarity, and usability**, making stock evaluation faster and more accessible.

---

## ✨ Key Features

- 🎯 **Rule-Based Verdict System** — Combines price trends and momentum signals into a single actionable score
- ⚡ **Real-Time Data Integration** — Fetches and processes live market data from external APIs (Stooq / yfinance)
- 📊 **Interactive Visualizations** — Clean and responsive charts via Recharts for price trend analysis
- 🔍 **Dynamic Stock Search** — Supports both predefined and user-input tickers
- 🎨 **Modern UI/UX** — Glassmorphic design with smooth Framer Motion animations
- 🧩 **Custom UI Components:**
  - `ScoreGauge` — SVG-based score visualization
  - `GlassCard` — reusable glassmorphic container
  - `BackgroundOrbs` — animated ambient background

---

## 🏗️ Architecture
┌─────────────────────────────────┐
│   Frontend (Next.js 15 + TS)    │
│   App Router · Tailwind · Recharts │
└──────────────┬──────────────────┘
│ REST API (HTTP)
┌──────────────▼──────────────────┐
│   Backend (FastAPI + Python)    │
└──────────────┬──────────────────┘
│
┌──────────────▼──────────────────┐
│  External APIs (Stooq / yfinance)│
│  CSV parsing · data transform   │
└──────────────┬──────────────────┘
│
┌──────────────▼──────────────────┐
│  Processed Data → Charts + Verdict│
└─────────────────────────────────┘

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Core framework |
| TypeScript | Type-safe frontend logic |
| Tailwind CSS | Styling and glassmorphism |
| Framer Motion | Animations and transitions |
| Recharts | Price trend visualizations |

### Backend
| Technology | Purpose |
|---|---|
| FastAPI | REST API server |
| Python 3.11 | Data processing and scoring logic |
| Stooq / yfinance | Real-time market data sources |

---

## 📁 Project Structure
StockVerdict/
│
├── src/
│   ├── app/              # Next.js App Router pages
│   └── components/       # ScoreGauge, GlassCard, BackgroundOrbs
│
├── backend/
│   └── main.py           # FastAPI entry point + scoring engine
│
├── public/               # Static assets
├── package.json
├── tsconfig.json
└── README.md

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+

### Clone

```bash
git clone https://github.com/adityaakhuntia/StockVerdict.git
cd StockVerdict
```

### Frontend

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000`

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at `http://localhost:8000`

---

## 🔮 Planned Improvements

- [ ] Advanced technical indicators (RSI, MACD)
- [ ] Multi-stock comparison dashboard
- [ ] Live deployment (Vercel + Render)
- [ ] Enhanced scoring with more market signals

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
Built by <a href="https://github.com/adityaakhuntia">Aditya Khuntia</a> ·
<a href="https://linkedin.com/in/adityakhuntia">LinkedIn</a>
</div>
