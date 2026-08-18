/**
 * canvas.js — Canvas 2D 结果卡绘制
 * - setup(): 按屏宽算逻辑宽（9:16 竖屏），乘以 devicePixelRatio 高清渲染
 * - drawResultCard(): 自上而下绘制 徽标 → 称号 → 梗句 → 人设 → 钩子 → 底部导流
 * Canvas 内文字不可选中（有意设计，截图晒，无需复制）。
 */
window.Canvas = (function () {
  var FONT = window.CONFIG.FONT;
  var _latest = null;   // 最近一次绘制请求（头像异步加载完成后重绘用）
  var _hooked = false;  // 是否已绑定头像 onload 事件

  /** 圆角矩形路径 */
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /** 中英文混排自动换行 */
  function wrapText(ctx, text, maxWidth) {
    var lines = [];
    var paras = String(text).split('\n');
    for (var p = 0; p < paras.length; p++) {
      var para = paras[p];
      if (para === '') {
        lines.push('');
        continue;
      }
      var line = '';
      for (var i = 0; i < para.length; i++) {
        var test = line + para.charAt(i);
        if (ctx.measureText(test).width > maxWidth && line !== '') {
          lines.push(line);
          line = para.charAt(i);
        } else {
          line = test;
        }
      }
      if (line !== '') {
        lines.push(line);
      }
    }
    return lines;
  }

  /** 绘制等级徽标（圆形，含配色） */
  function drawBadge(ctx, cx, cy, r, result, s) {
    var C = window.CONFIG.COLORS;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = result.color;
    ctx.fill();
    ctx.lineWidth = Math.max(2, 3 * s);
    ctx.strokeStyle = C.ink;
    ctx.stroke();
    // 内圈高光
    ctx.beginPath();
    ctx.arc(cx, cy, r - 4 * s, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 1.5 * s;
    ctx.stroke();
    // 徽标文字
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    if (result.isHidden) {
      ctx.font = 'bold ' + Math.round(r * 1.05) + 'px ' + FONT;
      ctx.fillText(result.badge, cx, cy + 1 * s);
    } else {
      ctx.font = 'bold ' + Math.round(r * 0.78) + 'px ' + FONT;
      ctx.fillText('Lv' + result.order, cx, cy + 1 * s);
    }
    ctx.restore();
  }

  /** 绘制圆形头像（Evan IP，取图片顶部正方形区域） */
  function drawAvatar(ctx, x, y, d) {
    var C = window.CONFIG.COLORS;
    var img = window.EVAN_IMG;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + d / 2, y + d / 2, d / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    if (img && img.complete && img.naturalWidth > 0) {
      var sw = img.naturalWidth;
      var sh = Math.min(img.naturalWidth, img.naturalHeight);
      ctx.drawImage(img, 0, 0, sw, sh, x, y, d, d);
    } else {
      ctx.fillStyle = C.yellow;
      ctx.fillRect(x, y, d, d);
      ctx.fillStyle = C.text;
      ctx.font = 'bold ' + Math.round(d * 0.42) + 'px ' + FONT;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('E', x + d / 2, y + d / 2 + 1);
    }
    ctx.restore();
    // 外圈描边
    ctx.beginPath();
    ctx.arc(x + d / 2, y + d / 2, d / 2, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = C.ink;
    ctx.stroke();
  }

  /** 绘制钩子高亮框，返回框高 */
  function drawHookBox(ctx, text, x, y, maxW, color, s) {
    var C = window.CONFIG.COLORS;
    var padX = Math.round(12 * s);
    var padY = Math.round(10 * s);
    ctx.font = '500 ' + Math.round(12.5 * s) + 'px ' + FONT;
    var lines = wrapText(ctx, text, maxW - padX * 2 - 6 * s);
    var lineH = Math.round(19 * s);
    var boxH = padY * 2 + lines.length * lineH;
    // 底
    roundRect(ctx, x, y, maxW, boxH, 10 * s);
    ctx.fillStyle = C.cream;
    ctx.fill();
    ctx.lineWidth = 1.5 * s;
    ctx.strokeStyle = C.pageDeep;
    ctx.stroke();
    // 左边色条（档位色）
    roundRect(ctx, x, y, 5 * s, boxH, 2.5 * s);
    ctx.fillStyle = color;
    ctx.fill();
    // 文字
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.text;
    var ty = y + padY + Math.round(12 * s);
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x + padX + 6 * s, ty);
      ty += lineH;
    }
    return boxH;
  }

  /** 绘制小机器人（装饰） */
  function drawRobot(ctx, x, y, size) {
    var C = window.CONFIG.COLORS;
    var u = size;
    ctx.save();
    // 天线
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + u * 0.5, y);
    ctx.lineTo(x + u * 0.5, y - u * 0.22);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + u * 0.5, y - u * 0.28, u * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = C.red;
    ctx.fill();
    // 身体
    roundRect(ctx, x, y, u, u * 0.78, u * 0.18);
    ctx.fillStyle = C.yellow;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = C.ink;
    ctx.stroke();
    // 眼睛
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.arc(x + u * 0.32, y + u * 0.32, u * 0.08, 0, Math.PI * 2);
    ctx.arc(x + u * 0.68, y + u * 0.32, u * 0.08, 0, Math.PI * 2);
    ctx.fill();
    // 嘴
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x + u * 0.32, y + u * 0.58);
    ctx.lineTo(x + u * 0.68, y + u * 0.58);
    ctx.stroke();
    ctx.restore();
  }

  /** 主绘制：自上而下排布 */
  function draw(ctx, w, h, result, compareText) {
    var C = window.CONFIG.COLORS;
    var s = w / 375;                      // 缩放系数
    var pad = Math.round(24 * s);         // 卡片内边距
    var padHalf = Math.round(pad * 0.5);

    ctx.clearRect(0, 0, w, h);
    ctx.save();

    // 画布背景（牛皮纸）
    ctx.fillStyle = C.page;
    ctx.fillRect(0, 0, w, h);

    // 卡片主体
    roundRect(ctx, padHalf, padHalf, w - pad, h - pad, 16 * s);
    ctx.fillStyle = C.card;
    ctx.fill();
    ctx.lineWidth = 2 * s;
    ctx.strokeStyle = C.ink;
    ctx.stroke();

    // 顶部胶带装饰
    ctx.save();
    ctx.translate(w * 0.20, padHalf);
    ctx.rotate(-0.06);
    ctx.fillStyle = 'rgba(255,195,39,0.72)';
    ctx.fillRect(-30 * s, -9 * s, 60 * s, 18 * s);
    ctx.restore();
    ctx.save();
    ctx.translate(w * 0.82, padHalf);
    ctx.rotate(0.06);
    ctx.fillStyle = 'rgba(232,213,174,0.85)';
    ctx.fillRect(-26 * s, -8 * s, 52 * s, 16 * s);
    ctx.restore();

    // 顶部角标（账号）
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.textSub;
    ctx.font = '600 ' + Math.round(11 * s) + 'px ' + FONT;
    ctx.fillText('Evan下班了 · 下班自由等级测试', pad, padHalf + 22 * s);

    // 右上角头像
    var avatarD = Math.round(40 * s);
    drawAvatar(ctx, w - pad - avatarD, padHalf + 8 * s, avatarD);

    // 等级徽标
    var badgeR = Math.round(46 * s);
    var badgeCy = padHalf + 78 * s;
    drawBadge(ctx, w / 2, badgeCy, badgeR, result, s);

    // 隐藏款稀有文案 / 普通档跳过
    var curY = badgeCy + badgeR + 18 * s;
    if (result.isHidden) {
      ctx.textAlign = 'center';
      ctx.fillStyle = C.red;
      ctx.font = '700 ' + Math.round(13 * s) + 'px ' + FONT;
      ctx.fillText('✨ ' + result.rareNote + ' ✨', w / 2, curY);
      curY += 24 * s;
    }

    // 称号（大字）
    ctx.textAlign = 'center';
    ctx.fillStyle = C.text;
    ctx.font = '800 ' + Math.round(30 * s) + 'px ' + FONT;
    curY += 8 * s;
    ctx.fillText(result.title, w / 2, curY);

    // 称号下划线（档位色）
    var titleW = ctx.measureText(result.title).width;
    ctx.strokeStyle = result.color;
    ctx.lineWidth = 4 * s;
    ctx.beginPath();
    ctx.moveTo(w / 2 - titleW / 2, curY + 6 * s);
    ctx.lineTo(w / 2 + titleW / 2, curY + 6 * s);
    ctx.stroke();
    curY += 24 * s;

    // 梗句（第一人称内心 OS）
    ctx.fillStyle = C.textSub;
    ctx.font = '700 ' + Math.round(15.5 * s) + 'px ' + FONT;
    var tagLines = wrapText(ctx, '“' + result.tagline + '”', w - pad * 3);
    for (var i = 0; i < tagLines.length; i++) {
      ctx.fillText(tagLines[i], w / 2, curY);
      curY += 21 * s;
    }

    // 人设
    curY += 12 * s;
    ctx.fillStyle = C.text;
    ctx.font = '400 ' + Math.round(13 * s) + 'px ' + FONT;
    var perLines = wrapText(ctx, result.persona, w - pad * 3);
    for (var j = 0; j < perLines.length; j++) {
      ctx.fillText(perLines[j], w / 2, curY);
      curY += 20 * s;
    }

    // 钩子高亮框
    curY += 12 * s;
    var hookH = drawHookBox(ctx, result.hook, pad, curY, w - pad * 2, result.color, s);
    curY += hookH + 16 * s;

    // 对比提示（若为再测）
    if (compareText) {
      ctx.textAlign = 'center';
      ctx.fillStyle = C.red;
      ctx.font = '700 ' + Math.round(12.5 * s) + 'px ' + FONT;
      ctx.fillText(compareText, w / 2, curY);
    }

    // 底部导流 + 水印（锚定底部）
    var footerY = h - pad * 1.55;
    ctx.strokeStyle = C.pageDeep;
    ctx.lineWidth = 1.5 * s;
    ctx.setLineDash([5 * s, 4 * s]);
    ctx.beginPath();
    ctx.moveTo(pad, footerY - 20 * s);
    ctx.lineTo(w - pad, footerY - 20 * s);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.textAlign = 'center';
    ctx.fillStyle = C.text;
    ctx.font = '800 ' + Math.round(14 * s) + 'px ' + FONT;
    ctx.fillText('主页还有《用AI准时下班》', w / 2, footerY + 2 * s);

    ctx.fillStyle = C.textSub;
    ctx.font = '600 ' + Math.round(11 * s) + 'px ' + FONT;
    ctx.fillText('@Evan下班了 · 测测你的下班自由等级', w / 2, footerY + 18 * s);

    // 右下角小机器人
    drawRobot(ctx, w - pad - 16 * s, footerY - 4 * s, 14 * s);

    ctx.restore();
  }

  /** 头像加载完成后重绘最新卡片 */
  function ensureHooked() {
    var img = window.EVAN_IMG;
    if (!img || _hooked) {
      return;
    }
    _hooked = true;
    img.addEventListener('load', function () {
      if (_latest) {
        _latest();
      }
    });
    img.addEventListener('error', function () {});
  }

  return {
    /**
     * 按屏宽算逻辑尺寸 × dpr 高清设置
     * @returns {{ctx:CanvasRenderingContext2D, w:number, h:number, dpr:number}}
     */
    setup: function (canvas) {
      var dpr = Math.min(window.devicePixelRatio || 1, window.CONFIG.CANVAS.maxDpr);
      var viewportW = Math.min(
        document.documentElement.clientWidth || window.innerWidth || 375,
        window.innerWidth || 375
      );
      var w = Math.max(
        window.CONFIG.CANVAS.minWidth,
        Math.min(viewportW - window.CONFIG.CANVAS.margin * 2, window.CONFIG.CANVAS.maxWidth)
      );
      var h = Math.round(w * window.CONFIG.CANVAS.ratio);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textBaseline = 'alphabetic';
      return { ctx: ctx, w: w, h: h, dpr: dpr };
    },

    /**
     * 绘制结果卡
     * @param {HTMLCanvasElement} canvas
     * @param {Object} result Result 对象
     * @param {string} compareText 对比提示（如「较上次 ↑2 档」，首次为空串）
     */
    drawResultCard: function (canvas, result, compareText) {
      var setup = window.Canvas.setup(canvas);
      var drawFn = function () {
        draw(setup.ctx, setup.w, setup.h, result, compareText || '');
      };
      _latest = drawFn;
      var img = window.EVAN_IMG;
      if (img && img.complete && img.naturalWidth > 0) {
        drawFn();
      } else {
        // 头像未就绪：先画无头像版本，加载完成后自动重绘
        drawFn();
        ensureHooked();
      }
    }
  };
})();
