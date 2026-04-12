import requests

def search(query):
    url = f"https://query2.finance.yahoo.com/v1/finance/search?q={query}"
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        res = requests.get(url, headers=headers)
        data = res.json()
        print([{"ticker": q['symbol'], "name": q.get('shortname', '')} for q in data.get('quotes', [])[:5]])
    except Exception as e:
        print("Error:", e)

search('app')
