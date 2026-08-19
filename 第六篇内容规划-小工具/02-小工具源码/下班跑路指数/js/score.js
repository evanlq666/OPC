/**
 * score.js — 计分 + 等级判定 + 再测对比
 * 判定顺序（硬性）：先判隐藏款（满分 48 神 / 最低 12 哦不人），再按 8 档区间匹配。
 */
window.Score = {
  /**
   * 累加各题答案对应分值
   * @param {string[]} answers 每题选中的 key（可为 null）
   * @returns {number} 总分
   */
  calcTotal: function (answers) {
    var total = 0;
    var questions = window.QUESTIONS;
    for (var i = 0; i < questions.length; i++) {
      var key = answers[i];
      if (!key) {
        continue;
      }
      var opts = questions[i].options;
      for (var j = 0; j < opts.length; j++) {
        if (opts[j].key === key) {
          total += opts[j].score;
          break;
        }
      }
    }
    return total;
  },

  /**
   * 按总分判定档位：先隐藏款，后 8 档区间
   * @param {number} total 总分（12–48）
   * @returns {Object|null} 命中的 Result 对象
   */
  getResult: function (total) {
    // 先判隐藏款（满分 / 最低分）
    if (total === window.CONFIG.MAX_TOTAL) {
      return window.Score.getResultByCode('HIDDEN_TOP');
    }
    if (total === window.CONFIG.MIN_TOTAL) {
      return window.Score.getResultByCode('HIDDEN_LOW');
    }
    // 再按 8 档区间匹配（13–47 分）
    for (var i = 0; i < window.RESULTS.length; i++) {
      var r = window.RESULTS[i];
      if (!r.isHidden && total >= r.min && total <= r.max) {
        return r;
      }
    }
    return null;
  },

  /**
   * 按档位代码查找 Result
   * @param {string} code 如 'L8' / 'HIDDEN_TOP' / 'HIDDEN_LOW'
   * @returns {Object|null}
   */
  getResultByCode: function (code) {
    for (var i = 0; i < window.RESULTS.length; i++) {
      if (window.RESULTS[i].code === code) {
        return window.RESULTS[i];
      }
    }
    return null;
  },

  /**
   * 按档位序号查找 Result（哦不人=0 → Lv1=1 … Lv8=8 → 神=9）
   * @param {number} order 档位序号
   * @returns {Object|null}
   */
  getResultByOrder: function (order) {
    for (var i = 0; i < window.RESULTS.length; i++) {
      if (window.RESULTS[i].order === order) {
        return window.RESULTS[i];
      }
    }
    return null;
  },

  /**
   * 再测对比：进步/退步 = 本次序号 − 上次序号
   * @param {Object} cur 本次 Result
   * @param {Object|null} last 上次记录 { order, total, ts }
   * @returns {{arrow:string, text:string}} arrow 为短提示，text 为鼓励语
   */
  compare: function (cur, last) {
    if (!last) {
      return { arrow: '', text: '' };
    }
    var diff = cur.order - last.order;
    if (diff > 0) {
      return {
        arrow: '↑' + diff + ' 档',
        text: '这次比上次多 ' + diff + ' 档自由，尊嘟假嘟！离准时下班又近一步'
      };
    }
    if (diff < 0) {
      return {
        arrow: '↓' + (-diff) + ' 档',
        text: '比上次退了 ' + (-diff) + ' 档，别慌，班味是会反弹的，下周夺回来'
      };
    }
    // 持平（特殊边界文案，PRD 12.6）
    if (cur.order === 9) {
      return { arrow: '持平', text: '稳定封神' };
    }
    if (cur.order === 0) {
      return { arrow: '持平', text: '天花板还在，但今天开始拆天花板' };
    }
    return { arrow: '持平', text: '还是同一档，主打一个稳定，稳住就是胜利' };
  }
};
