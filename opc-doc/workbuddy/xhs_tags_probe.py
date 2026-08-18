#!/usr/bin/env python3
"""批量爬取8个小红书标签最近一周数据，输出精简分析表"""
import os, json, requests, sys

API_URL = "https://redfox.hk/story/api/xhs/crawl/work"
API_KEY = os.environ.get("REDFOX_API_KEY")
if not API_KEY:
    print("NO KEY"); sys.exit(1)

TAGS = [
    "howto用AI抢救一切", "AI焦虑", "职场经验howto", "AI提效",
    "AI进化生活howto", "AI进化生活", "AI新手村", "AI教程",
]
START, END = "2026-08-08", "2026-08-15"

def crawl(keyword):
    payload = {"keyword": keyword, "startDate": START, "endDate": END,
               "source": "xhs-analysis", "sortType": "_4"}
    headers = {"Content-Type": "application/json", "X-API-Key": API_KEY, "User-Agent": "QoderWork/1.0"}
    r = requests.post(API_URL, json=payload, headers=headers, timeout=25)
    r.raise_for_status()
    result = r.json()
    if result.get("code") != 2000:
        return None, result.get("msg")
    data = result.get("data") or {}
    raw = data.get("works") or data.get("list") or data.get("articles") or []
    return raw, None

all_raw = {}
print("===== 字段探测 =====")
for t in TAGS:
    raw, err = crawl(t)
    if raw is None:
        print(f"[{t}] ERROR: {err}")
        continue
    all_raw[t] = raw
    if raw:
        print(f"[{t}] count={len(raw)} keys={list(raw[0].keys())}")
    else:
        print(f"[{t}] count=0")

# dump 原始数据
out = "/Users/evanyang/WorkBuddy/OPC探索/opc-doc/workbuddy/xhs_tags_raw.json"
with open(out, "w", encoding="utf-8") as f:
    json.dump(all_raw, f, ensure_ascii=False, indent=2)
print("\nDUMPED ->", out)
