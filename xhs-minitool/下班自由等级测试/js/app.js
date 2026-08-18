/**
 * app.js — 主入口 + 事件绑定 + 视图切换 + 答题流转 + 结算编排
 * 所有事件一律 addEventListener 绑定；DOM 上无行内事件。
 */
window.App = (function () {
  // 应用内存态（视图 / 当前题 / 答案 / 结果 / 上次记录）
  var state = {
    view: 'cover',
    current: 0,
    answers: [],
    total: 0,
    result: null,
    last: null,
    compare: null
  };

  function $(id) {
    return document.getElementById(id);
  }

  /** 初始化：绑事件 + 读上次记录 + 渲染封面 */
  function init() {
    // 预加载头像素材
    window.EVAN_IMG = new Image();
    window.EVAN_IMG.src = './assets/evan.png';

    state.last = window.Storage.loadLast();
    bindEvents();
    buildBadgePreview();
    renderLastOnCover();
    switchView('cover');
  }

  /** 绑定全部静态按钮 + 选项容器事件委托 */
  function bindEvents() {
    $('btn-start').addEventListener('click', startQuiz);
    $('btn-prev').addEventListener('click', prevQuestion);
    $('btn-screenshot').addEventListener('click', guideScreenshot);
    $('btn-restart').addEventListener('click', restart);

    // 选项容器：事件委托读取 data-key（避免每道题重复绑定）
    $('quiz-options').addEventListener('click', function (e) {
      var target = e.target;
      var btn = target && target.closest ? target.closest('[data-key]') : null;
      if (!btn) {
        return;
      }
      selectOption(btn.getAttribute('data-key'));
    });
  }

  /** 切换三视图显隐（cover / quiz / result） */
  function switchView(name) {
    state.view = name;
    var views = document.querySelectorAll('.view');
    for (var i = 0; i < views.length; i++) {
      views[i].classList.toggle('active', views[i].id === 'view-' + name);
    }
    window.scrollTo(0, 0);
  }

  /** 开始测试：重置答题态，进入答题页 */
  function startQuiz() {
    state.current = 0;
    state.answers = new Array(window.QUESTIONS.length).fill(null);
    state.total = 0;
    state.result = null;
    state.compare = null;
    switchView('quiz');
    renderQuestion();
  }

  /** 渲染当前题：进度条 + 题干 + 4 选项（含选中态、回改标记） */
  function renderQuestion() {
    var q = window.QUESTIONS[state.current];
    $('quiz-progress').textContent = '第 ' + (state.current + 1) + ' / ' + window.QUESTIONS.length + ' 题';
    $('quiz-fill').style.width = (((state.current + 1) / window.QUESTIONS.length) * 100) + '%';
    $('quiz-question').textContent = q.text;

    var container = $('quiz-options');
    container.innerHTML = '';
    var selected = state.answers[state.current];

    for (var i = 0; i < q.options.length; i++) {
      var opt = q.options[i];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option' + (opt.key === selected ? ' selected' : '');
      btn.setAttribute('data-key', opt.key);

      var label = document.createElement('span');
      label.className = 'option-label';
      label.textContent = opt.key;
      btn.appendChild(label);

      var txt = document.createElement('span');
      txt.className = 'option-text';
      txt.textContent = opt.text;
      btn.appendChild(txt);

      container.appendChild(btn);
    }

    // 第 1 题时隐藏「上一题」
    $('btn-prev').style.visibility = state.current === 0 ? 'hidden' : 'visible';
  }

  /** 点选选项：记录答案；非末题进下一题，末题结算 */
  function selectOption(key) {
    state.answers[state.current] = key;
    if (state.current < window.QUESTIONS.length - 1) {
      state.current++;
      renderQuestion();
    } else {
      showResult();
    }
  }

  /** 回上一题（回改） */
  function prevQuestion() {
    if (state.current > 0) {
      state.current--;
      renderQuestion();
    }
  }

  /** 结算：计分 → 判定 → 对比 → 写存储 → 结果页 + Canvas 绘制 */
  function showResult() {
    var total = window.Score.calcTotal(state.answers);
    state.total = total;
    var result = window.Score.getResult(total);
    state.result = result;

    var prev = state.last;                       // 本次作答前的「上次记录」
    var cmp = window.Score.compare(result, prev);
    state.compare = cmp;

    renderResultMeta(result, total, cmp, prev);

    // 将本次结果更新为「上次」，供下一次再测对比；并写入 localStorage
    state.last = { order: result.order, total: total, ts: Date.now() };
    window.Storage.saveResult(result, total);

    switchView('result');
    var canvas = $('result-canvas');
    var compareText = prev ? ('较上次 ' + cmp.arrow) : '';
    window.Canvas.drawResultCard(canvas, result, compareText);
  }

  /** 渲染结果页「上次等级 + 对比提示」 */
  function renderResultMeta(result, total, cmp, prev) {
    if (prev) {
      var prevResult = window.Score.getResultByOrder(prev.order);
      var prevTitle = prevResult ? prevResult.title : ('Lv' + prev.order);
      $('result-last').textContent = '上次等级：' + prevTitle + ' · ' + prev.total + ' 分';
      $('result-compare').textContent = '较上次 ' + cmp.arrow;
      $('result-compare-detail').textContent = cmp.text;
    } else {
      $('result-last').textContent = '这是你的首次作答';
      $('result-compare').textContent = '';
      $('result-compare-detail').textContent = '';
    }
  }

  /** 再测一次：保留 last 引用（供对比），仅重置答题态 */
  function restart() {
    startQuiz();
  }

  /** 截图引导：用系统截图（不调用剪贴板/下载等禁用 API） */
  function guideScreenshot() {
    window.alert(
      '请用手机自带截图功能保存这张结果卡：\n\n' +
      '· iPhone：同时按「电源键 + 音量上键」\n' +
      '· 安卓：同时按「音量下键 + 电源键」\n\n' +
      '截图里已经带文案，保存后直接发到同事群对答案～'
    );
  }

  /** 封面等级徽标预览（制造「我是哪个」悬念） */
  function buildBadgePreview() {
    var box = $('badge-preview');
    if (!box) {
      return;
    }
    box.innerHTML = '';
    var list = window.RESULTS.slice().sort(function (a, b) {
      return b.order - a.order;
    });
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      var chip = document.createElement('span');
      chip.className = 'badge-chip';
      chip.style.background = r.color;
      chip.textContent = r.isHidden ? r.badge : ('Lv' + r.order);
      chip.title = r.title;
      box.appendChild(chip);
    }
  }

  /** 封面提示上次等级（P1-5 本地状态记忆） */
  function renderLastOnCover() {
    var el = $('cover-last');
    if (!el) {
      return;
    }
    if (state.last) {
      var prev = window.Score.getResultByOrder(state.last.order);
      var t = prev ? prev.title : ('Lv' + state.last.order);
      el.textContent = '上次你测出来是「' + t + '」，再测一次？';
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  }

  // 入口：DOM 就绪后 init（兼容脚本在 body 末尾 / head 两种场景）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    init: init,
    switchView: switchView,
    startQuiz: startQuiz,
    renderQuestion: renderQuestion,
    selectOption: selectOption,
    prevQuestion: prevQuestion,
    showResult: showResult,
    restart: restart,
    guideScreenshot: guideScreenshot
  };
})();
