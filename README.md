📈 StockVerdict
🚀 Real-Time Stock Analysis Platform with Actionable Investment Insights

Transforming complex market data into clear, instant BUY / HOLD / AVOID decisions using a high-performance scoring engine.

🌐 Live Demo
🔗 https://stock-verdict.vercel.app

🧠 Overview

StockVerdict is a full-stack web application that simplifies stock analysis by converting real-time market data into clear, actionable investment insights.

Instead of overwhelming users with raw data, the platform delivers:

🎯 A quantified score (0–100)
📊 Interactive price trend visualizations
💡 A clear BUY / HOLD / AVOID verdict

Designed with a focus on speed, clarity, and usability, it enables faster and more confident decision-making.

✨ Key Features
⚡ Real-Time Data Integration
Fetches and processes live market data using Stooq / yFinance APIs

🎯 Custom Rule-Based Scoring Engine
Combines price trends and momentum signals into a single actionable score

📊 Interactive Visualizations
Clean and responsive charts built with Recharts

🔍 Dynamic Stock Search
Supports both predefined and user-input stock tickers

🎨 Modern UI/UX
Glassmorphic design with smooth animations using Framer Motion

🧩 Reusable Component Architecture
ScoreGauge → SVG-based score visualization
GlassCard → reusable UI container
BackgroundOrbs → animated ambient background

🏗️ Architecture
Frontend (Next.js + TypeScript)
        ↓
     REST API
        ↓
Backend (FastAPI + Python)
        ↓
External APIs (Stooq / yFinance)
        ↓
Processed Data → Score + Charts + Verdict

🛠️ Tech Stack
Frontend
Next.js 15 (App Router)
TypeScript
Tailwind CSS
Framer Motion
Recharts

Backend
FastAPI
Python 3.11
yFinance / Stooq APIs

Deployment
Vercel (Frontend)
Render (Backend)

📁 Project Structure
StockVerdict/
│
├── src/
│   ├── app/              # Next.js routes
│   └── components/       # UI components
│
├── backend/
│   └── main.py           # FastAPI server + scoring logic
│
├── public/               # Static assets
└── README.md

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/adityaakhuntia/StockVerdict.git
cd StockVerdict
2️⃣ Run Frontend
npm install
npm run dev

Runs at: http://localhost:3000

3️⃣ Run Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Runs at: http://localhost:8000

📈 Future Improvements
📊 Advanced indicators (RSI, MACD)
📉 Multi-stock comparison dashboard
🤖 ML-based prediction models
🔐 User authentication & watchlist

💼 Why This Project Stands Out
Demonstrates full-stack development (Next.js + FastAPI)
Integrates real-time external APIs
Implements custom data processing & scoring logic
Deployed on production cloud platforms (Vercel + Render)
Focuses on performance, usability, and clean UI design
👨‍💻 Author

Aditya Khuntia

🔗 GitHub: https://github.com/adityaakhuntia
🔗 LinkedIn: https://linkedin.com/in/adityakhuntia
📄 License

MIT License
