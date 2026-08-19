/**
 * results.js — 10 档结果映射硬编码（8 档 + 2 隐藏款）
 * 字段：order(档位序号 0–9) / code / typeCode / title(有梗称号)
 *       isHidden / color / min / max / tagline / persona / hook / meme / rareNote
 * 区间 12–48 连续不重不漏；文案全部来自 PRD v1.3 7.3。
 */
window.RESULTS = [
  {
    order: 0, code: 'HIDDEN_LOW', typeCode: 'OHNO', title: '哦不人·天花板', isHidden: true,
    color: window.CONFIG.LEVEL_COLORS.HIDDEN_LOW, min: 12, max: 12,
    tagline: '哦不！我怎么会是这个人格？！原来不是我在上班，是班在上我。',
    persona: '你不是懒也不是废，是把「不好意思走」刻进了 DNA；看到这句，你的觉醒已经开始了。',
    hook: '这图甩同事群，看看谁先笑出声。笑完也别急，明天先试着准点走一次。',
    meme: '表情包：人已经到家，灵魂还在工位回「收到」。',
    rareNote: '隐藏款 ×2！能把自己测到这份上，也是一种天赋。'
  },
  {
    order: 1, code: 'L1', typeCode: 'OTK', title: '隐形加班奴', isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L1, min: 13, max: 21,
    tagline: '谁懂啊，我一直觉得「晚点走」比较安全。',
    persona: '不是不想走，是怕走了被看见、被多想，把「准时下班」熬成了奢侈品。但能看见这一点，觉醒就已经开始了。',
    hook: '这图甩同事群，狠狠共情一波。能不能准点走，先从少回一句废话开始。',
    meme: '表情包：电脑都睡了，你还在假装有事。',
    rareNote: ''
  },
  {
    order: 2, code: 'L2', typeCode: 'WAIT', title: '消息待命人', isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L2, min: 22, max: 25,
    tagline: '谁懂啊，我的下班就是换个地方等消息。',
    persona: '人回了家，班还跟着你，回消息的手比脑子快，正在偷偷攒「明天再弄」的勇气。',
    hook: '截个图甩同事群，看看谁陪你一起预备役。先别转正加班，明天试着准点撤一次。',
    meme: '表情包：手机一亮，心率直接开会。',
    rareNote: ''
  },
  {
    order: 3, code: 'L3', typeCode: 'STAY', title: '想走不敢走', isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L3, min: 26, max: 29,
    tagline: '到点了，可我的屁股说它想再赖一会儿。',
    persona: '心里那根「到点就走」的弦，老被「别人还没走」给扯住，走也不是、坐也不是。',
    hook: '这图甩同事群，敢不敢承认你也是。想走不丢人，一直耗着才真的累。',
    meme: '表情包：包都背上了，人还在门口刷新空气。',
    rareNote: ''
  },
  {
    order: 4, code: 'L4', typeCode: 'BAL', title: '工位端水大师', isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L4, min: 30, max: 34,
    tagline: '准时下班的心，和看领导脸色的眼，我两样都有。',
    persona: '不早退也不多待，主打「大家都走我再走」，是职场里最会读空气的中间派。',
    hook: '截个图甩同事群，端水大师来集合。端稳可以，但别把自己端成默认加班。',
    meme: '表情包：一边收包，一边用余光扫描全场。',
    rareNote: ''
  },
  {
    order: 5, code: 'L5', typeCode: 'PULL', title: '心理拔河人', isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L5, min: 35, max: 38,
    tagline: '每天到点，都是我一个人的心理拔河。',
    persona: '人还在工位，心已经到家八百回了，缺的就是最后那点说走就走的底气。',
    hook: '这图甩同事群，谁还不是个拔河选手。绳子先往自己这边拽一点。',
    meme: '表情包：左脑说走，右脑说再演五分钟。',
    rareNote: ''
  },
  {
    order: 6, code: 'L6', typeCode: 'READY', title: '准点候场选手', isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L6, min: 39, max: 41,
    tagline: '到点前十分钟，我已经在脑内打完下班卡了。',
    persona: '大多数时候到点就走，偶尔多坐五分钟装装样子，良心和班味在体内反复横跳。',
    hook: '截个图甩同事群，看看几个人跟你一样「候场」。候得再优雅，也该下班。',
    meme: '表情包：身体坐着，灵魂已经在电梯口排队。',
    rareNote: ''
  },
  {
    order: 7, code: 'L7', typeCode: 'CLEAN', title: '体面收工侠', isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L7, min: 42, max: 44,
    tagline: '我下班，主打一个体面，谁都别想多薅我一分钟。',
    persona: '能扛事也能收工，到点就走不内耗，是同事眼里那个「活明白了」的人。',
    hook: '这图甩同事群，看谁跟你一样体面。体面不是硬撑，是知道什么时候收工。',
    meme: '表情包：关电脑的动作很轻，但态度很硬。',
    rareNote: ''
  },
  {
    order: 8, code: 'L8', typeCode: 'CTRL', title: '下班拿捏者', isHidden: false,
    color: window.CONFIG.LEVEL_COLORS.L8, min: 45, max: 47,
    tagline: '怎么样，准时下班被我拿捏了吧？',
    persona: '边界感是你的出厂设置，到点就走是肌肉记忆，不是摆烂，是把日子过明白了。',
    hook: '截个图甩同事群对答案，看看谁是拿捏者、谁是哦不人。别装，大家心里都有数。',
    meme: '表情包：领导刚张嘴，你已经优雅离场。',
    rareNote: ''
  },
  {
    order: 9, code: 'HIDDEN_TOP', typeCode: 'GOD', title: '下班跑路的神', isHidden: true,
    color: window.CONFIG.LEVEL_COLORS.HIDDEN_TOP, min: 48, max: 48,
    tagline: '准时下班不是本事，是本能。怎么样，被神拿捏了吧？',
    persona: '你是行走的下班跑路天花板，边界感焊死在骨子里，同事看到你都想鼓掌。',
    hook: '这截图发出去，整个办公室都得来拜你。神不用解释，神到点就走。',
    meme: '表情包：不是我下班，是下班来接我。',
    rareNote: '恭喜触发隐藏款！这款可不好测出来。'
  }
];
