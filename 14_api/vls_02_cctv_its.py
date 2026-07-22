import urllib
import json
import pandas as pd
import urllib.request
import os
from dotenv import load_dotenv
load_dotenv()
key = os.getenv("API_KEY")
Type = "its"
minX, maxX = 120.95, 127.02   # 동서(가로) 범위 → 한국 전체 가로
minY, maxY = 30.55, 37.69     # 남북(세로) 범위 → 한국 전체 세로
getType = "json"
url_cctv = (
    f"https://openapi.its.go.kr:9443/cctvInfo"
    f"?apiKey={key}&type={Type}&cctvType=1"
    f"&minX={minX}&maxX={maxX}"
    f"&minY={minY}&maxY={maxY}"
    f"&getType={getType}"
)

res = urllib.request.urlopen(url_cctv)
data = res.read().decode("utf-8")
json_obj = json.loads(data)

cctv_play = pd.json_normalize(json_obj['response']['data'], sep='')
test_url = cctv_play["cctvurl"][77]
print(cctv_play.columns[77])
print(test_url)
