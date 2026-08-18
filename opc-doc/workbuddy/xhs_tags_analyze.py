#!/usr/bin/env python3
"""分析8个标签数据：互动类型、收藏比、粉丝分布、类型推断"""
import json, statistics

RAW = "/Users/evanyang/WorkBuddy/OPC探索/opc-doc/workbuddy/xhs_tags_raw.json"
with open(RAW, encoding="utf-8") as f:
    data = json.load(f)

def guess_type(w):
    """推断图文/视频：无明确字段，基于cover URL特征+desc关键词"""
    cover = w.get("cover", "") or ""
    desc = (w.get("desc", "") or "") + (w.get("title", "") or "")
    topics = " ".join(w.get("topicsName") or [])
    # 视频特征：desc/话题含视频相关词
    video_words = ["视频", "vlog", "短片", "动画", "AI短剧", "出片", "切片", "镜头", "拍", "特效", "混剪"]
    if any(k in (desc + topics) for k in video_words):
        return "视频?"
    # cover 含 video 标记
    if "video" in cover.lower():
        return "视频?"
    return "图文?"

for tag, works in data.items():
    if not works:
        print(f"\n### {tag} (0条)")
        continue
    ws = sorted(works, key=lambda x: x.get("likedCount", 0) or 0, reverse=True)
    likes = [w.get("likedCount", 0) or 0 for w in ws]
    colls = [w.get("collectedCount", 0) or 0 for w in ws]
    comms = [w.get("commentsCount", 0) or 0 for w in ws]
    fans = [w.get("authorFans", 0) or 0 for w in ws]
    avg_l = sum(likes)/len(likes)
    avg_c = sum(colls)/len(colls)
    avg_m = sum(comms)/len(comms)
    ratio = sum(colls)/sum(likes) if sum(likes) else 0
    small = sum(1 for f in fans if f < 10000)
    mid = sum(1 for f in fans if 10000 <= f < 100000)
    big = sum(1 for f in fans if f >= 100000)
    print(f"\n### {tag} | {len(ws)}条 | 均赞{avg_l:.0f} 均藏{avg_c:.0f} 均评{avg_m:.0f} | 藏/赞比{ratio:.2f} | 粉<1万:{small} 1-10万:{mid} 10万+:{big}")
    print("  Top8:")
    for w in ws[:8]:
        t = (w.get("title") or "-")[:30]
        print(f"   {w.get('likedCount',0):>6}赞 {w.get('collectedCount',0):>5}藏 {w.get('commentsCount',0):>4}评 | {t} | 粉{w.get('authorFans',0)} | {guess_type(w)}")
