#!/usr/bin/env python3
"""聚焦：小号(<1万粉)爆款 + 补看AI新手村/AI教程标签"""
import json

RAW = "/Users/evanyang/WorkBuddy/OPC探索/opc-doc/workbuddy/xhs_tags_raw.json"
with open(RAW, encoding="utf-8") as f:
    data = json.load(f)

# 1. 补看 AI新手村 / AI教程
for tag in ["AI新手村", "AI教程"]:
    works = data.get(tag, [])
    ws = sorted(works, key=lambda x: x.get("likedCount", 0) or 0, reverse=True)
    likes = [w.get("likedCount", 0) or 0 for w in ws]
    colls = [w.get("collectedCount", 0) or 0 for w in ws]
    ratio = sum(colls)/sum(likes) if sum(likes) else 0
    small = sum(1 for w in ws if (w.get("authorFans",0) or 0) < 10000)
    print(f"\n### {tag} | {len(ws)}条 | 藏/赞比{ratio:.2f} | 粉<1万:{small}")
    for w in ws[:10]:
        print(f"  {w.get('likedCount',0):>6}赞 {w.get('collectedCount',0):>5}藏 {w.get('commentsCount',0):>4}评 | {(w.get('title') or '-')[:34]} | 粉{w.get('authorFans',0)}")

# 2. 全部标签里的小号爆款（粉<1万 且 赞>=300）
print("\n\n===== 小号爆款合集（粉<1万 且 赞>=300，按赞排序）=====")
pool = []
for tag, works in data.items():
    for w in works:
        f = w.get("authorFans", 0) or 0
        l = w.get("likedCount", 0) or 0
        if f < 10000 and l >= 300:
            pool.append((l, w, tag))
pool.sort(key=lambda x: -x[0])
for l, w, tag in pool:
    c = w.get("collectedCount", 0) or 0
    m = w.get("commentsCount", 0) or 0
    print(f"{l:>6}赞 {c:>5}藏 {m:>4}评 | 粉{w.get('authorFans',0):>6} | [{tag}] {(w.get('title') or '-')[:38]}")
