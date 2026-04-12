# 📈 StockVerdict

**StockVerdict** is a high-performance financial dashboard designed to provide instant clarity on stock market data. By combining a sleek, glassmorphic React frontend with a specialized Python backend, it delivers real-time analysis, interactive charting, and automated stock "verdicts."

---

## 📖 Project Overview

**StockVerdict** is more than just a stock tracker; it is a full-stack financial analysis tool designed to bridge the gap between raw market data and actionable insights. The project was born from the need for a "cleaner" way to visualize stock volatility while providing a definitive "Verdict" based on technical indicators.

### 🧠 The Core Logic
The application uses a **hybrid architecture** to handle different types of tasks:
* **The Frontend (The Face):** Built with **Next.js 15**, the dashboard focuses on low-latency data rendering. We use **Glassmorphism design principles** to keep the UI modern and focused, ensuring that complex financial data doesn't feel overwhelming.
* **The Backend (The Brain):** A specialized **Python environment** handles the heavy lifting. By utilizing Python's robust financial libraries (like `yfinance` or `pandas`), the backend processes historical data to generate the "Score" you see in the frontend's **ScoreGauge**.

---

## ✨ Key Features

* **Intelligent Verdicts:** Real-time scoring system using custom logic to evaluate stock health.
* **Interactive Visualizations:** Dynamic price action charts built with high-performance UI components.
* **Sleek UI/UX:** A modern, dark-themed dashboard featuring glassmorphism, animated background orbs, and a custom-designed cursor.
* **Hybrid Architecture:** Seamless integration between a Next.js 15 frontend and a Python-based data processing backend.
* **Stock Comparison:** Tools to analyze multiple tickers side-by-side to identify market leaders.

---

## 🛠 Tech Stack

### Frontend 💻
| Technology | Usage |
| :--- | :--- |
| **Next.js 15** | Core Framework (App Router & Server Components) |
| **TypeScript** | Strict type-safety and scalable architecture |
| **Tailwind CSS** | Responsive Styling & Glassmorphism effects |
| **Framer Motion** | Fluid UI animations and background effects |
| **Lucide Icons** | Professional, consistent iconography |

### Backend 🧠
| Technology | Usage |
| :--- | :--- |
| **Python 3.11** | High-level data processing and financial logic |
| **Modular Testing** | Separate scripts for Search (`test_search.py`) & Charting (`test_chart.py`) |
| **Requirements** | Managed environment for financial library dependencies |

### UI Components 🎨
- **BackgroundOrbs:** Dynamic animated background elements for a modern feel.
- **ScoreGauge:** Custom SVG-based financial health indicator.
- **GlassCard:** Specialized high-contrast containers for data visualization.
- **Custom Cursor:** Enhanced user interaction tracking for a premium feel.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.11+)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/adityaakhuntia/StockVerdict.git](https://github.com/adityaakhuntia/StockVerdict.git)
   cd StockVerdict
