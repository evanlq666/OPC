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
    compare: null,
    locked: false
  };

  function $(id) {
    return document.getElementById(id);
  }

  /** 初始化：绑事件 + 读上次记录 + 渲染封面 */
  function init() {
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
    $('btn-screenshot').addEventListener('click', saveResultToAlbum);
    $('btn-restart').addEventListener('click', restart);
    $('btn-home').addEventListener('click', goHome);

    $('cover-last').addEventListener('click', function (e) {
      var target = e.target;
      var btn = target && target.closest ? target.closest('#btn-view-last') : null;
      if (btn) {
        showStoredResult();
      }
    });

    // 选项容器：事件委托读取 data-key（避免每道题重复绑定）
    $('quiz-options').addEventListener('click', function (e) {
      var target = e.target;
      var btn = target && target.closest ? target.closest('[data-key]') : null;
      if (!btn) {
        return;
      }
      selectOption(btn.getAttribute('data-key'), btn);
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
    state.locked = false;
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
  function selectOption(key, btn) {
    if (state.locked) {
      return;
    }
    state.locked = true;
    state.answers[state.current] = key;
    var options = document.querySelectorAll('.option');
    for (var i = 0; i < options.length; i++) {
      var isCurrent = options[i] === btn;
      options[i].classList.toggle('selected', isCurrent);
      options[i].classList.toggle('option-confirming', isCurrent);
      options[i].disabled = true;
    }

    window.setTimeout(function () {
      state.locked = false;
      if (state.current < window.QUESTIONS.length - 1) {
        state.current++;
        renderQuestion();
      } else {
        showResult();
      }
    }, 220);
  }

  /** 回上一题（回改） */
  function prevQuestion() {
    if (!state.locked && state.current > 0) {
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
    setSaveStatus('');
  }

  function showStoredResult() {
    var record = state.last || window.Storage.loadLast();
    if (!record) {
      renderLastOnCover();
      return;
    }
    var result = window.Score.getResultByOrder(record.order);
    if (!result) {
      return;
    }
    state.total = record.total;
    state.result = result;
    state.compare = null;
    $('result-last').textContent = '最近一次：' + result.title + ' · ' + record.total + ' 分';
    $('result-compare').textContent = '';
    $('result-compare-detail').textContent = '';
    switchView('result');
    window.Canvas.drawResultCard($('result-canvas'), result, '');
    setSaveStatus('');
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

  /** 我不服：保留 last 引用（供对比），仅重置答题态 */
  function restart() {
    startQuiz();
  }

  function goHome() {
    state.last = window.Storage.loadLast();
    renderLastOnCover();
    setSaveStatus('');
    switchView('cover');
  }

  function setSaveStatus(text) {
    var el = $('save-status');
    if (el) {
      el.textContent = text || '';
    }
  }

  /** 保存结果卡到系统相册：Canvas dataURL -> 临时文件 -> 相册 */
  function saveResultToAlbum() {
    var bridge = window.xhs && window.xhs.miniTool;
    var canvas = $('result-canvas');
    var btn = $('btn-screenshot');
    if (!canvas || !state.result) {
      setSaveStatus('结果卡还没生成，先完成测试。');
      return;
    }
    if (!bridge || !bridge.saveImageToPhotosAlbum) {
      setSaveStatus('当前预览环境不支持保存相册，真机小工具内可用。');
      return;
    }

    btn.disabled = true;
    btn.textContent = '保存中...';
    setSaveStatus('首次保存时，系统可能会询问相册权限。');

    var dataUrl = canvas.toDataURL('image/png');
    var savePromise;
    if (bridge.writeTempFile) {
      savePromise = bridge.writeTempFile({ data: dataUrl }).then(function (res) {
        return bridge.saveImageToPhotosAlbum({ filePath: res.filePath });
      });
    } else {
      savePromise = bridge.saveImageToPhotosAlbum({ filePath: dataUrl });
    }

    savePromise.then(function () {
      setSaveStatus('已保存到系统相册。');
    }).catch(function () {
      setSaveStatus('保存失败，请确认已允许相册权限后再试。');
    }).then(function () {
      btn.disabled = false;
      btn.textContent = '保存到相册';
    });
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
      chip.innerHTML = '<span>' + r.typeCode + '</span><small>' + r.title + '</small>';
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
      el.innerHTML = '<span>最近一次：' + t + '</span><button type="button" id="btn-view-last">查看结果</button>';
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
    goHome: goHome,
    showStoredResult: showStoredResult,
    saveResultToAlbum: saveResultToAlbum
  };
})();
