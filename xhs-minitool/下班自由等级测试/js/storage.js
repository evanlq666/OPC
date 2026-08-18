/**
 * storage.js — localStorage 封装
 * 仅本地存储上次作答记录 { order, total, ts }，不采集、不上传任何数据。
 * 全部 try/catch 包裹，沙箱禁用存储时静默降级，不影响主流程。
 */
window.Storage = {
  /**
   * 读取上次作答记录
   * @returns {Object|null} { order:number, total:number, ts:number } 或 null
   */
  loadLast: function () {
    try {
      var raw = window.localStorage.getItem(window.CONFIG.STORAGE_KEY);
      if (!raw) {
        return null;
      }
      var obj = JSON.parse(raw);
      if (obj && typeof obj.order === 'number' && typeof obj.total === 'number') {
        return { order: obj.order, total: obj.total, ts: obj.ts || 0 };
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  /**
   * 写入本次作答记录
   * @param {Object} result 命中的结果档位（含 order）
   * @param {number} total 本次总分
   */
  saveResult: function (result, total) {
    try {
      var record = { order: result.order, total: total, ts: Date.now() };
      window.localStorage.setItem(window.CONFIG.STORAGE_KEY, JSON.stringify(record));
    } catch (e) {
      // 存储不可用时静默忽略，保证纯前端流程不被中断
    }
  }
};
