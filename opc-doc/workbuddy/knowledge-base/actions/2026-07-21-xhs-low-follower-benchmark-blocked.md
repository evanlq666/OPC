---
id: 2026-07-21-xhs-low-follower-benchmark-blocked
type: action
status: blocked
created_at: 2026-07-21T22:40:00+08:00
task_type: xhs_benchmark_research
input: "根据 OPC IP 定位查找小红书低粉爆款、高互动频率帖子"
result: blocked
---

# 动作

- 已按 `agent-reach doctor --json` 检查小红书后端。
- 当前小红书 active backend 为 OpenCLI，但 Chrome Browser Bridge extension 未连接。
- 已尝试 `opencli xiaohongshu search "AI焦虑 普通人" -f yaml`，失败原因为 `BROWSER_CONNECT`。
- 已尝试备选：
  - `xhs-cli`：本机未安装。
  - `xiaohongshu-mcp`：mcporter 未配置该 server。
  - `rednote` adapter：同样依赖 Browser Bridge extension，失败。
- 搜索引擎侧对小红书帖子索引不足，无法可靠拿到作者粉丝数、点赞、收藏、评论和评论内容。

# 结果

未能完成真实小红书站内抓取。不能编造“低粉爆款”数据。

# 筛选口径

下一次抓取时按以下规则筛：

- 低粉：作者粉丝数优先 `< 5000`，放宽到 `< 10000`。
- 爆款：单篇点赞/收藏/评论相对粉丝数明显异常，优先看 `互动量 / 粉丝数 > 0.5`。
- 高互动频率：
  - 评论数优先 `>= 30`。
  - 评论/点赞比例优先 `>= 3%`。
  - 评论区出现大量“我也是”“怎么做”“求模板”“蹲后续”。
- 账号匹配：
  - AI 焦虑 / 普通人学 AI / AI 职场提效。
  - AI 副业但不夸大收益。
  - 不会写代码、用 AI 做小产品、普通职场人产出作品。

# 下一步

启用 OpenCLI Browser Bridge extension 后，按以下关键词搜索：

- `AI焦虑 普通人`
- `普通人学AI`
- `AI提效 职场`
- `AI副业 普通人`
- `不会写代码 做产品`
- `AI 周报 职场`
- `AI教程 收藏`

每个关键词抓前 10 条，进入笔记详情和作者主页，记录：

- 标题
- 作者
- 粉丝数
- 点赞
- 收藏
- 评论
- 评论高频词
- 封面文案
- 开头钩子
- 可复用结构
- 风险边界
