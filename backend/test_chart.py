import requests

def get_chart(ticker):
    url = f"https://query2.finance.yahoo.com/v8/finance/chart/{ticker}?range=1mo&interval=1d"
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        res = requests.get(url, headers=headers)
        data = res.json()
        result = data['chart']['result'][0]
        timestamps = result['timestamp']
        closes = result['indicators']['quote'][0]['close']
        
        from datetime import datetime
        chart_data = []
        for t, c in zip(timestamps, closes):
            if c is not None:
                chart_data.append({
                    "time": datetime.fromtimestamp(t).strftime('%Y-%m-%d'),
                    "price": c
                })
        print("Got chart data length:", len(chart_data))
        print("Last price:", chart_data[-1]['price'])
    except Exception as e:
        print("Error:", e)

get_chart('AAPL')
get_chart('RELIANCE.NS')
