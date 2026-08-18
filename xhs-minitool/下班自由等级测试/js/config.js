/**
 * config.js — 全局常量配置（唯一出处）
 * 分值、等级主色、总分区间、storage key、Canvas 默认尺寸等。
 * 其余文件一律引用本文件，不重复定义常量。
 */
window.CONFIG = {
  // 选项分值：S=4 / A=3 / B=2 / C=1（选项位置已打散，具体映射见 questions.js）
  SCORE: { S: 4, A: 3, B: 2, C: 1 },

  // 总分区间（12 题，每题 1–4 分）
  MIN_TOTAL: 12,
  MAX_TOTAL: 48,

  // localStorage key（纯本地，仅存上次等级序号 + 总分 + 时间戳）
  STORAGE_KEY: 'xfzy_last_result',

  // 页面基础配色（PRD 6.2）
  COLORS: {
    page: '#F2E4C8',        // 牛皮纸底
    pageDeep: '#E8D5AE',    // 深牛皮纸纹理/区块
    card: '#FFFBF2',        // 卡片米白
    cream: '#FAF3E3',       // 奶油底（选项/钩子框底）
    text: '#3B2A1C',        // 主文字深棕
    textSub: '#8A7158',     // 副文字浅棕
    yellow: '#FFC327',      // Evan 黄（主按钮/高亮）
    orange: '#FF8A3D',      // 高亮橙（进度条/次级强调）
    red: '#E4572E',         // 点缀红（标签/印章）
    ink: '#2A1F14',         // 墨线黑（描边）
    shadow: 'rgba(59,42,28,0.12)'
  },

  // 10 档主色（暖→冷 = 自由→压抑，PRD 6.3）
  LEVEL_COLORS: {
    HIDDEN_TOP: '#FFC300',  // 隐藏款·下班自由的神（鎏金，比 Lv8 更亮）
    L8: '#F5B301',          // Lv8 烫金
    L7: '#FFB020',          // Lv7 琥珀金
    L6: '#FF8C42',          // Lv6 琥珀橙
    L5: '#FF7A5C',          // Lv5 珊瑚橙
    L4: '#17B890',          // Lv4 薄荷绿
    L3: '#4FA8A0',          // Lv3 青绿
    L2: '#5B7F9E',          // Lv2 雾霾蓝
    L1: '#6B7A8F',          // Lv1 雾霾灰蓝
    HIDDEN_LOW: '#47505C'   // 隐藏款·哦不人天花板（暗夜灰蓝）
  },

  // Canvas 结果卡：9:16 竖屏，按屏宽自适应 + dpr 高清
  CANVAS: {
    ratio: 16 / 9,          // 高宽比（9:16 竖屏）
    margin: 16,             // 卡片距屏幕两侧边距（逻辑 px）
    minWidth: 280,
    maxWidth: 380,
    maxDpr: 3               // dpr 上限，防止超大内存占用
  },

  // 系统字体栈（不内嵌字体，PRD 6.4）
  FONT: 'system-ui, -apple-system, "PingFang SC", "HarmonyOS Sans", "MiSans", "Microsoft YaHei", sans-serif'
};
