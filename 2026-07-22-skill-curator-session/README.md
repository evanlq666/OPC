# OPC 一人公司建盘会话 — 2026-07-22

> 项目：AI Skill 策展人 IP
> 模式：引导模式（边学边做）
> 状态：战略4阶段完成 → 待进入MVP验证

---

## 会话起源

对话始于分析一组 MotionSites 风格的精美提示词，进而延伸到：
1. **提示词工程分析** — 为什么"规格即提示词"能让 Agent 精准输出
2. **MotionSites 竞品调研** — 国内是否有类似网站？结论：没有直接对标
3. **商业方向验证** — "小程序提示词市场" → "AI Skill 策展 IP" 的 pivot

---

## OPC 建盘历程

### 阶段01：资源盘点 ✅
**核心结论**：AI+产品+前端+设计四维交叉能力是核心优势；零渠道零品牌是最大短板。

最大资产：无收入压力，可以长期打磨。

**产出**：`01-resource-audit/inventory.md` + `scorecard.json`

---

### 阶段02：利基定位 ✅
**pivot 关键决策**：从"小程序提示词市场"升级为 **"AI Skill 策展人 IP"**。

理由：国内已有 SkillHub（腾讯，8万+skill）、觅游（美团，4万+）等平台，但**策展层完全空白**——平台只做分发，没人在做精选实测。Skill 比提示词客单价更高（¥29.9-59.9 vs ¥9.9）、壁垒更强。

**三环合一分析**（29/30）：
- 热情环：AI 工具探索 + 策展分享
- 能力环：提示词/Skill 质量判断力（核心）+ 四维交叉
- 市场环：Skill 平台爆发、策展空白

**产出**：`02-niche-positioning/report.md` 等 5 个文件

---

### 阶段03：价值主张 ✅
**三层组合策略**：
- 🅰️ 入口层（提效）：免费周刊 — "每周10分钟，替代数小时筛选"
- 🅱️ 壁垒层（结果）：付费合集 — "四维实测，不只推荐更教怎么用"
- 🅲️ 底色层（降风险）：品牌信任 — "12万+ Skill 中可信赖的导航"

**目标客群**：AI Agent 深度实操型用户（WorkBuddy/Cursor/Copilot 用户）

**关键约束**：创始人要求由 AI Agents 辅助搭建整个平台和工作流体系。

**产出**：`03-value-proposition/report.md` 等 4 个文件

---

### 阶段04：商业模式 ✅
**Lean Canvas 核心结论**：
- 盈亏平衡 < 20 份/月（成本 ¥150-550/月）
- 收入路径：免费周刊 → 付费合集(¥29.9-59.9) → 场景化合集(¥79.9-99.9) → 会员(¥19.9/月)
- Agent 自动化 60-70%（发现90%/初筛80%/发布90%），人工仅介入实测和终审

**TOP 3 高风险假设**（需 MVP 验证）：
| 优先级 | 假设 | 风险 |
|:--:|------|:--:|
| P0 | 用户愿意为 Skill 评测付费 ¥29.9-59.9 | 基石假设 |
| P1 | 免费周刊→付费合集转化率 > 3% | 漏斗假设 |
| P2 | 一人+Agent 能持续产出足够质量 | 产能假设 |

**产出**：`04-business-model/lean-canvas.md` 等 4 个文件

---

## 文件结构

```
2026-07-22-skill-curator-session/
├── README.md                              ← 本文件
├── outputs/
│   ├── 00-orchestrator/
│   │   └── session-summary.md
│   ├── 01-resource-audit/
│   │   ├── inventory.md                   ← 资源盘点（8类）
│   │   └── scorecard.json
│   ├── 02-niche-positioning/
│   │   ├── report.md                      ← 利基定位完整分析
│   │   ├── three-ring-analysis.md          ← 三环分析
│   │   ├── candidates.md                   ← 候选方向+六维评分
│   │   ├── target-segment.json
│   │   └── positioning-statement.md
│   ├── 03-value-proposition/
│   │   ├── report.md                       ← 价值主张完整分析
│   │   ├── value-proposition-canvas.md
│   │   ├── segment-vp-matrix.md
│   │   └── messaging.md
│   └── 04-business-model/
│       ├── lean-canvas.md                  ← Lean Canvas 9模块
│       ├── business-model-canvas-lite.md
│       ├── pricing-notes.md
│       └── risky-assumptions.md            ← 高风险假设
└── state/
    ├── user-preferences.json
    ├── current-stage.json                  ← 当前=04完成，下阶段=06-mvp
    ├── decisions.json                      ← 全部关键决策记录
    └── assumptions.json                    ← 结构化假设列表
```

---

## 如何在新电脑上继续

1. Clone 此仓库后在 WorkBuddy 中打开
2. 告诉 Agent（易牧）：
   > 我要从上次的 OPC 会话继续，read `opc-doc/state/current-stage.json`
3. Agent 会自动识别进度，带你进入 **阶段06：MVP 设计** — 验证 P0 和 P1 两个高风险假设

---

## 关键决策时间线

| 时间 | 阶段 | 决策 |
|------|------|------|
| 17:21 | 开始 | 确认引导模式，从零规划 |
| 17:52 | 01 | 资源盘点完成，确认创始人画像 |
| 18:14 | 02 | 利基定位完成（29/30），确认 Skill 策展 IP |
| 18:19 | pivot | Prompt→Skill 关键 pivot |
| 19:15 | 03 | 价值主张确认，A+B+C 三层策略 |
| 19:30 | 04 | Lean Canvas 完成，盈亏平衡 <20份/月 |
| 19:35 | → | 待进入阶段06 MVP 验证 |
