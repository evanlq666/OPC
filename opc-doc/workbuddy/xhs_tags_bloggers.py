#!/usr/bin/env python3
"""提取爆款博主信息：昵称/粉丝/作品链接/主页链接"""
import json

RAW = "/Users/evanyang/WorkBuddy/OPC探索/opc-doc/workbuddy/xhs_tags_raw.json"
data = json.load(open(RAW, encoding="utf-8"))

def home(uid):
    return f"https://www.xiaohongshu.com/user/profile/{uid}" if uid else "-"

def line(w):
    return (f"  {w.get('authorNickname') or '?'} | 粉{format(w.get('authorFans') or 0, ',')} | "
            f"{w.get('likedCount',0)}赞{w.get('collectedCount',0)}藏{w.get('commentsCount',0)}评 | "
            f"{(w.get('title') or '-')[:26]}")

# 1. 各有效标签 Top3 博主
print("===== 各标签 Top3 博主 =====")
for tag in ["AI提效", "howto用AI抢救一切", "AI焦虑"]:
    ws = sorted(data.get(tag, []), key=lambda x: x.get("likedCount", 0) or 0, reverse=True)
    print(f"\n【{tag}】")
    for w in ws[:3]:
        print(line(w))
        print(f"    作品: {w.get('shareInfoLink') or '-'}")
        print(f"    主页: {home(w.get('authorId'))}")

# 2. 小号爆款（粉<1万 赞>=500）博主
print("\n\n===== 小号爆款博主（粉<1万 赞>=500）=====")
seen = set()
pool = []
for tag, works in data.items():
    for w in works:
        f = w.get("authorFans", 0) or 0
        l = w.get("likedCount", 0) or 0
        if f < 10000 and l >= 500 and w.get("authorId") not in seen:
            seen.add(w.get("authorId"))
            pool.append((l, w, tag))
pool.sort(key=lambda x: -x[0])
for l, w, tag in pool:
    print(f"\n{line(w)} | [{tag}]")
    print(f"    作品: {w.get('shareInfoLink') or '-'}")
    print(f"    主页: {home(w.get('authorId'))}")
