# 📈 StockVerdict 

A full-stack web application that analyzes real-time stock data and provides clear **BUY / HOLD / AVOID** decisions using a custom scoring system.
  

--- 

## 🌐 Live Demo

[https://stock-verdict.vercel.app](https://stock-verdict.vercel.app)

---

## 🧠 Overview

StockVerdict simplifies stock analysis by transforming real-time market data into concise, actionable insights.

Users can:

* View a **score (0–100)** representing stock strength
* Analyze **price trends through charts**
* Get a clear **investment verdict**

The application focuses on **clarity, speed, and usability**, making stock evaluation efficient and accessible.

---

## ✨ Features

* Real-time stock data integration (yFinance / Stooq)
* Rule-based scoring system for decision making
* Interactive price charts
* Dynamic stock search
* Responsive and modern UI

---

## 🏗️ Architecture

```
Frontend (Next.js)
        ↓
     REST API
        ↓
Backend (FastAPI)
        ↓
External APIs (yFinance / Stooq)
```

---

## 🛠️ Tech Stack

**Frontend**

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Recharts

**Backend**

* FastAPI
* Python

**Deployment**

* Vercel (Frontend)
* Render (Backend)

---

## 📁 Project Structure

```
StockVerdict/
├── src/
│   ├── app/
│   └── components/
├── backend/
│   └── main.py
├── public/
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/adityaakhuntia/StockVerdict.git
cd StockVerdict
```

### Run frontend

```bash
npm install
npm run dev
```

### Run backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📈 Future Improvements

* Add advanced indicators (RSI, MACD)
* Multi-stock comparison
* Machine learning-based predictions
* User authentication and watchlist

---

## 👨‍💻 Author

Aditya Khuntia

* [https://github.com/adityaakhuntia](https://github.com/adityaakhuntia)
* [https://linkedin.com/in/adityakhuntia](https://linkedin.com/in/adityakhuntia)

---

## 📄 License

MIT License
    
