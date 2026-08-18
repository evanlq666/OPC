/**
 * results.js — 10 档结果映射硬编码（8 档 + 2 隐藏款）
 * 字段：order(档位序号 0–9) / code / title(有梗称号) / badge(徽标，普通档 null 由 Canvas 画 Lv 数字)
 *       isHidden / color(主色) / min / max(分数区间) / tagline(梗句) / persona(人设) / hook(钩子) / rareNote(隐藏款稀有文案)
 * 区间 12–48 连续不重不漏；文案全部来自 PRD v1.3 7.3。
 */
window.RESULTS = [
  {
    order: 0, code: 'HIDDEN_LOW', title: '哦不人·天花板', badge: '💀', isHidden: true,
    color: window.CONFIG.LEVEL_COLORS.HIDDEN_LOW, min: 12, max: 12,
    tagline: '哦不！我怎么会是这个人格？！原来不是我在上班，是班在上我。',
    persona: '你不是懒也不是废，是把「不好意思走」刻进了 DNA；看到这句，你的觉醒已经开始了。',
    hook: '这图甩同事群，评论区会笑疯，但笑完记得点主页《用AI准时下班》，咱们从「哦不人」毕业。',
    rareNote: '隐藏款 ×2！能把自己测到这份上，也是一种天赋。'
  },
  {
    order: 1, code: 'L1', title: '隐形加班奴', badge: null, isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L1, min: 13, max: 21,
    tagline: '谁懂啊，我一直觉得「晚点走」比较安全。',
    persona: '不是不想走，是怕走了被看见、被多想，把「准时下班」熬成了奢侈品。但能看见这一点，觉醒就已经开始了。',
    hook: '这图甩同事群，狠狠共情一波，但记得去主页《用AI准时下班》，咱们得把准时下班抢回来。',
    rareNote: ''
  },
  {
    order: 2, code: 'L2', title: '隐形加班预备役', badge: null, isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L2, min: 22, max: 25,
    tagline: '谁懂啊，我的下班就是换个地方等消息。',
    persona: '人回了家，班还跟着你，回消息的手比脑子快，正在偷偷攒「明天再弄」的勇气。',
    hook: '截个图甩同事群，看看谁陪你一起预备役。主页还有《用AI准时下班》，从预备役转正成自由人。',
    rareNote: ''
  },
  {
    order: 3, code: 'L3', title: '想走不敢走', badge: null, isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L3, min: 26, max: 29,
    tagline: '到点了，可我的屁股说它想再赖一会儿。',
    persona: '心里那根「到点就走」的弦，老被「别人还没走」给扯住，走也不是、坐也不是。',
    hook: '这图甩同事群，敢不敢承认你也是。主页还有《用AI准时下班》，想走就真的走。',
    rareNote: ''
  },
  {
    order: 4, code: 'L4', title: '工位端水大师', badge: null, isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L4, min: 30, max: 34,
    tagline: '准时下班的心，和看领导脸色的眼，我两样都有。',
    persona: '不早退也不多待，主打「大家都走我再走」，是职场里最会读空气的中间派。',
    hook: '截个图甩同事群，端水大师来集合。主页还有《用AI准时下班》，端久了不如把水端稳了准时走。',
    rareNote: ''
  },
  {
    order: 5, code: 'L5', title: '摇摆下班人', badge: null, isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L5, min: 35, max: 38,
    tagline: '每天到点，都是我一个人的心理拔河。',
    persona: '人还在工位，心已经到家八百回了，缺的就是最后那点说走就走的底气。',
    hook: '这图甩同事群，谁还不是个拔河选手。主页还有《用AI准时下班》，帮你把绳子往自由这边拽。',
    rareNote: ''
  },
  {
    order: 6, code: 'L6', title: '准点候场选手', badge: null, isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L6, min: 39, max: 41,
    tagline: '到点前十分钟，我已经在脑内打完下班卡了。',
    persona: '大多数时候到点就走，偶尔多坐五分钟装装样子，良心和班味在体内反复横跳。',
    hook: '截个图甩同事群，看看几个人跟你一样「候场」。主页还有《用AI准时下班》，候场直接改登顶。',
    rareNote: ''
  },
  {
    order: 7, code: 'L7', title: '体面收工侠', badge: null, isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L7, min: 42, max: 44,
    tagline: '我下班，主打一个体面，谁都别想多薅我一分钟。',
    persona: '能扛事也能收工，到点就走不内耗，是同事眼里那个「活明白了」的人。',
    hook: '这图甩同事群，看谁跟你一样体面。主页还有《用AI准时下班》，体面也要讲方法。',
    rareNote: ''
  },
  {
    order: 8, code: 'L8', title: '下班拿捏者', badge: null, isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L8, min: 45, max: 47,
    tagline: '怎么样，准时下班被我拿捏了吧？',
    persona: '边界感是你的出厂设置，到点就走是肌肉记忆，不是摆烂，是把日子过明白了。',
    hook: '截个图甩同事群对答案，看看谁是拿捏者、谁是哦不人？主页还有《用AI准时下班》，把自由焊死在身上。',
    rareNote: ''
  },
  {
    order: 9, code: 'HIDDEN_TOP', title: '下班自由的神', badge: '👑', isHidden: true,
    color: window.CONFIG.LEVEL_COLORS.HIDDEN_TOP, min: 48, max: 48,
    tagline: '准时下班不是本事，是本能。怎么样，被神拿捏了吧？',
    persona: '你是行走的下班自由天花板，边界感焊死在骨子里，同事看到你都想鼓掌。',
    hook: '这截图发出去，整个办公室都得来拜你。主页还有《用AI准时下班》，神也要方法论。',
    rareNote: '恭喜触发隐藏款！这款可不好测出来。'
  }
];
