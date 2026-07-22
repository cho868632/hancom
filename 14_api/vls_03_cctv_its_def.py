import urllib
import json
import pandas as pd
import urllib.request
import os
from dotenv import load_dotenv
import urllib.parse
load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://openapi.its.go.kr:9443/cctvInfo"
BBOX = {"minX": 120.95, "maxX": 127.02,
        "minY": 30.55, "maxY": 37.69}


def _build_url(api_key=API_KEY):
    params = {
        "apiKey": api_key,
        "type": "its",
        "cctvType": 1,
        "getType": "json",
        **BBOX,
    }
    return f"{BASE_URL}?{urllib.parse.urlencode(params)}"


def its_cctv(cctv_index):
    res = urllib.request.urlopen(_build_url())
    data = res.read().decode("utf-8")
    json_obj = json.loads(data)
    cctv_play = pd.json_normalize(json_obj['response']['data'], sep='')
    url = cctv_play["cctvurl"][cctv_index]

    return url
