from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from datetime import datetime

app = FastAPI()

# ✅ CORS (for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HEADERS = {'User-Agent': 'Mozilla/5.0'}

# ✅ Categories
@app.get("/stocks/categories")
def get_categories():
    return {
        "us": ["AAPL", "MSFT", "NVDA", "TSLA", "GOOGL", "AMZN"],
        "indian": ["RELIANCE.NS", "HDFCBANK.NS", "TCS.NS", "INFY.NS", "ICICIBANK.NS"]
    }

# ✅ Live Web Search API
@app.get("/search/{query}")
def search_stocks(query: str):
    url = f"https://query2.finance.yahoo.com/v1/finance/search?q={query}"
    
    try:
        res = requests.get(url, headers=HEADERS)
        data = res.json()
        
        results = []
        for quote in data.get('quotes', []):
            # Only include equities and ETFs to avoid crypto/mutual funds if desired, but we'll accept any valid symbol
            if 'symbol' in quote:
                results.append({
                    "ticker": quote['symbol'], 
                    "name": quote.get('shortname') or quote.get('longname', quote['symbol'])
                })
                
        # Return top 5 matches natively from the web
        return results[:5] if results else [{"ticker": query.upper(), "name": f"Search Ticker: {query.upper()}"}]
        
    except Exception as e:
        print("Search API Error:", e)
        return [{"ticker": query.upper(), "name": f"Search Ticker: {query.upper()}"}]

# ✅ FINAL STOCK API using robust Yahoo v8 Chart API
@app.get("/stock/{ticker}")
def get_stock(ticker: str):
    try:
        # Fetch 1 month of 1 day interval data natively from Yahoo Finance
        url = f"https://query2.finance.yahoo.com/v8/finance/chart/{ticker}?range=1mo&interval=1d"
        res = requests.get(url, headers=HEADERS)
        data = res.json()
        
        if 'error' in data['chart'] and data['chart']['error'] is not None:
             error_msg = data['chart']['error'].get('description', 'Stock not found.')
             return {"error": error_msg}
             
        result = data['chart']['result'][0]
        
        timestamps = result.get('timestamp', [])
        quote = result['indicators']['quote'][0]
        closes = quote.get('close', [])
        
        # Filter out None values in case of market trading halts
        valid_closes = []
        chart_data = []
        for t, c in zip(timestamps, closes):
            if c is not None:
                valid_closes.append(c)
                chart_data.append({
                    "time": datetime.fromtimestamp(t).strftime('%Y-%m-%d'),
                    "price": round(c, 2)
                })
                
        if len(valid_closes) < 2:
            return {"error": "Not enough historical data to generate analysis."}

        current_price = valid_closes[-1]
        previous_price = valid_closes[-2]
        
        # Calculate Algorithmic Score dynamically
        # 1. Compare Current vs Yesterday
        # 2. Compare Current vs 30-day Moving Average (Trend)
        past_month_avg = sum(valid_closes) / len(valid_closes)
        recent_avg = sum(valid_closes[-5:]) / len(valid_closes[-5:])
        
        base_score = 50
        # Positive Momentum (+20 if strongly above historical average)
        if current_price > past_month_avg * 1.02:
            base_score += 20
        elif current_price < past_month_avg * 0.98:
            base_score -= 20
            
        # Recent Spike Trend
        if recent_avg > past_month_avg:
            base_score += 15
        else:
            base_score -= 15
            
        # Daily boost
        if current_price > previous_price:
            base_score += 10
        else:
            base_score -= 10
            
        score = min(max(base_score, 0), 100) # Clamp between 0 and 100
        
        verdict = "HOLD"
        if score >= 70:
            verdict = "BUY"
        elif score <= 40:
            verdict = "AVOID"

        trend = ((current_price - previous_price) / previous_price) * 100

        # Attempt to get the actual Company Name dynamically
        meta = result.get('meta', {})
        stock_name = meta.get('shortName') or meta.get('longName') or ticker.upper()

        return {
            "ticker": ticker.upper(),
            "name": stock_name,
            "current_price": round(current_price, 2),
            "trend": round(trend, 2),
            "score": score,
            "verdict": verdict,
            "chartData": chart_data
        }

    except Exception as e:
        return {
            "ticker": ticker.upper(),
            "name": ticker.upper(),
            "current_price": 0,
            "trend": 0,
            "score": 50,
            "verdict": "HOLD",
            "chartData": [],
            "error": "Failed to fetch stock data: " + str(e)
        }