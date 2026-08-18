/**
 * questions.js — 12 道题硬编码数据（题干 + 4 选项 + 每题分值映射，选项位置已打散）
 * 分值：S=4 / A=3 / B=2 / C=1，映射见每项 score。
 * 题目文案：第 1–8 题来自《下班自由等级测试-修正终版》，第 9–12 题来自 PRD v1.3 附录 A。
 */
window.QUESTIONS = [
  {
    id: 1,
    text: '下班时间一到，你的第一反应是？',
    options: [
      { key: 'A', text: '到点？我的下班时间是"手上这活干完"', score: 1 },
      { key: 'B', text: '闹钟响就起身，包早就收拾好了', score: 4 },
      { key: 'C', text: '想走，先瞄一圈大家都没动，又默默坐回去', score: 2 },
      { key: 'D', text: '收个尾、留句"明天我接着弄"，体面走人', score: 3 }
    ]
  },
  {
    id: 2,
    text: '晚上8点，领导在群里@你"在吗"？',
    options: [
      { key: 'A', text: '回一句"收到，我明早到班先处理"，然后不再看', score: 3 },
      { key: 'B', text: '秒回，顺手问一句"还有哪里要改"', score: 1 },
      { key: 'C', text: '已读不回，天塌下来明天上班再说', score: 4 },
      { key: 'D', text: '纠结半天，还是回了个"收到"', score: 2 }
    ]
  },
  {
    id: 3,
    text: '周六早上，工作消息弹出来，你？',
    options: [
      { key: 'A', text: '扫一眼，不紧急先搁着，但会惦记一整天', score: 2 },
      { key: 'B', text: '扫一眼，回"周一处理"，然后关掉去干自己的事', score: 3 },
      { key: 'C', text: '立刻开电脑，顺手把周一的活也干了', score: 1 },
      { key: 'D', text: '工作号周末不登，周一见', score: 4 }
    ]
  },
  {
    id: 4,
    text: '快下班，同事凑过来说"这个帮我看看"？',
    options: [
      { key: 'A', text: '到点了，明天一早帮你弄', score: 4 },
      { key: 'B', text: '不想接，但没好意思拒绝', score: 2 },
      { key: 'C', text: '先看急不急，不急就"明早我帮你过一遍"，体面收工', score: 3 },
      { key: 'D', text: '主动问"还有没有一起处理的"', score: 1 }
    ]
  },
  {
    id: 5,
    text: '看到隔壁工位到点还在敲键盘，你？',
    options: [
      { key: 'A', text: '有点慌，默默核对自己的进度', score: 2 },
      { key: 'B', text: '坐不住，也留下来陪着卷一会儿', score: 1 },
      { key: 'C', text: '关我啥事，我今天的活干完了', score: 4 },
      { key: 'D', text: '按自己的节奏收尾，不被带跑偏', score: 3 }
    ]
  },
  {
    id: 6,
    text: '领导 5:58 说"开个短会"，你？',
    options: [
      { key: 'A', text: '先听两分钟，是急事就给个明确答复再走', score: 3 },
      { key: 'B', text: '拎包就走，会明天开也一样', score: 4 },
      { key: 'C', text: '心里崩溃，脸上还笑着说"好的"', score: 2 },
      { key: 'D', text: '坐下开会，全程盯着表，散会接着干', score: 1 }
    ]
  },
  {
    id: 7,
    text: '到点后，你收拾桌面的动作是？',
    options: [
      { key: 'A', text: '收完回家，打开电脑接着干', score: 1 },
      { key: 'B', text: '到点才慢慢收，边收边观望', score: 2 },
      { key: 'C', text: '写两句进度备忘，明天无缝接上再走', score: 3 },
      { key: 'D', text: '提前5分钟就收好了，踩点走', score: 4 }
    ]
  },
  {
    id: 8,
    text: '说到"准时下班"，你心里真实的想法是？',
    options: [
      { key: 'A', text: '天经地义，是基本权利', score: 4 },
      { key: 'B', text: '把活干漂亮，下班才能理直气壮', score: 3 },
      { key: 'C', text: '有点愧疚，是不是自己不够拼', score: 1 },
      { key: 'D', text: '想做又不敢，怕被说不努力', score: 2 }
    ]
  },
  {
    id: 9,
    text: '周五下午四点，离下班还有两小时，你脑子里在想？',
    options: [
      { key: 'A', text: '先把手头的活儿收个尾，估计今天得晚走半小时', score: 2 },
      { key: 'B', text: '周末躺平清单已经列好了，一到点抬脚就走', score: 4 },
      { key: 'C', text: '总感觉领导会在下班前突然来个「周五复盘会」', score: 1 },
      { key: 'D', text: '把下周一的活儿先排一下，省得周末被消息轰炸', score: 3 }
    ]
  },
  {
    id: 10,
    text: '项目 deadline 就在明天，你手头还压着一堆没做完，你会？',
    options: [
      { key: 'A', text: '能揽的都揽过来，熬夜肝完，不能让领导觉得我不行', score: 1 },
      { key: 'B', text: '今天多做一点，明天争取早点收工', score: 3 },
      { key: 'C', text: '按优先级做，做不完的如实同步，deadline 是大家的事', score: 4 },
      { key: 'D', text: '估计今晚得熬了，怪自己没提前规划好', score: 2 }
    ]
  },
  {
    id: 11,
    text: '领导临时丢来一个「不急，但今天最好给」的活，你手头正忙，你会？',
    options: [
      { key: 'A', text: '先问清楚要什么、什么时候真要用，别做返工', score: 3 },
      { key: 'B', text: '手里的先放一放，领导的事永远第一，加班也得交', score: 1 },
      { key: 'C', text: '直接说现在排期满了，约个明天一早给的时间', score: 4 },
      { key: 'D', text: '嘴上应下来，手上先忙自己的，实在不行再说', score: 2 }
    ]
  },
  {
    id: 12,
    text: '晚上十点，你刚洗漱完躺下，工作群弹出「明天早会的材料谁补一下」，你会？',
    options: [
      { key: 'A', text: '心里咯噔一下，纠结半天还是爬起来补了', score: 2 },
      { key: 'B', text: '不是@我就不动，是我的休息时间，明早的事明早说', score: 4 },
      { key: 'C', text: '秒回「我来」，立刻开电脑，就怕被说不上心', score: 1 },
      { key: 'D', text: '瞄一眼是不是@我，不是就锁屏，是就回「明早处理」', score: 3 }
    ]
  }
];
