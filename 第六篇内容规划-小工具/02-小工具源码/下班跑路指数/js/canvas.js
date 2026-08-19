/**
 * canvas.js — Canvas 2D 结果卡绘制
 * 3:4 指数卡：类型代码 / 搞笑称号 / 表情包舞台 / 人设解读 / 群聊钩子。
 */
window.Canvas = (function () {
  var FONT = window.CONFIG.FONT;

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

  function wrapText(ctx, text, maxWidth) {
    var lines = [];
    var line = '';
    text = String(text || '');
    for (var i = 0; i < text.length; i++) {
      var next = line + text.charAt(i);
      if (ctx.measureText(next).width > maxWidth && line) {
        lines.push(line);
        line = text.charAt(i);
      } else {
        line = next;
      }
    }
    if (line) {
      lines.push(line);
    }
    return lines;
  }

  function drawLines(ctx, lines, x, y, lineH, maxLines, align) {
    var count = Math.min(lines.length, maxLines || lines.length);
    ctx.textAlign = align || 'left';
    for (var i = 0; i < count; i++) {
      var line = lines[i];
      if (i === count - 1 && lines.length > count) {
        line = line.slice(0, Math.max(0, line.length - 1)) + '…';
      }
      ctx.fillText(line, x, y + i * lineH);
    }
    return count * lineH;
  }

  function drawTape(ctx, x, y, w, h, color) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(-0.04);
    ctx.fillStyle = color;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }

  function drawTypePill(ctx, x, y, w, h, result, s) {
    roundRect(ctx, x, y, w, h, 18 * s);
    ctx.fillStyle = result.color;
    ctx.fill();
    ctx.strokeStyle = '#241B14';
    ctx.lineWidth = 2 * s;
    ctx.stroke();

    ctx.fillStyle = '#FFFDF6';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '950 ' + Math.round(20 * s) + 'px ' + FONT;
    ctx.fillText(result.typeCode || ('Lv' + result.order), x + w / 2, y + h / 2 + 1 * s);
  }

  function drawMemeFace(ctx, cx, cy, size, result, s) {
    var face = size;
    ctx.save();
    ctx.lineWidth = 3 * s;
    ctx.strokeStyle = '#241B14';
    ctx.fillStyle = '#FFE7B2';
    ctx.beginPath();
    ctx.arc(cx, cy, face / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = result.color;
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.arc(cx - face * 0.12, cy + face * 0.02, face * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#241B14';
    var mood = result.order;
    if (mood <= 2) {
      ctx.beginPath();
      ctx.arc(cx - face * 0.16, cy - face * 0.08, face * 0.035, 0, Math.PI * 2);
      ctx.arc(cx + face * 0.16, cy - face * 0.08, face * 0.035, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#241B14';
      ctx.lineWidth = 3 * s;
      ctx.beginPath();
      ctx.arc(cx, cy + face * 0.18, face * 0.13, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
    } else if (mood <= 5) {
      ctx.fillRect(cx - face * 0.22, cy - face * 0.09, face * 0.12, 3 * s);
      ctx.fillRect(cx + face * 0.10, cy - face * 0.09, face * 0.12, 3 * s);
      ctx.beginPath();
      ctx.arc(cx, cy + face * 0.14, face * 0.10, 0, Math.PI);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(cx - face * 0.16, cy - face * 0.08, face * 0.045, 0, Math.PI * 2);
      ctx.arc(cx + face * 0.16, cy - face * 0.08, face * 0.045, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#241B14';
      ctx.lineWidth = 3 * s;
      ctx.beginPath();
      ctx.arc(cx, cy + face * 0.08, face * 0.18, 0.12 * Math.PI, 0.88 * Math.PI);
      ctx.stroke();
    }

    ctx.strokeStyle = result.color;
    ctx.lineWidth = 4 * s;
    ctx.beginPath();
    ctx.moveTo(cx - face * 0.34, cy - face * 0.34);
    ctx.lineTo(cx - face * 0.20, cy - face * 0.45);
    ctx.moveTo(cx + face * 0.28, cy - face * 0.35);
    ctx.lineTo(cx + face * 0.42, cy - face * 0.43);
    ctx.stroke();
    ctx.restore();
  }

  function draw(ctx, w, h, result, compareText) {
    var C = window.CONFIG.COLORS;
    var s = w / 375;
    var pad = Math.round(20 * s);
    var innerW = w - pad * 2;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#F6E8C9';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(42,31,20,0.04)';
    for (var px = 10 * s; px < w; px += 16 * s) {
      for (var py = 10 * s; py < h; py += 16 * s) {
        ctx.beginPath();
        ctx.arc(px, py, 0.8 * s, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    roundRect(ctx, pad, pad, innerW, h - pad * 2, 20 * s);
    ctx.fillStyle = '#FFFDF6';
    ctx.fill();
    ctx.strokeStyle = '#241B14';
    ctx.lineWidth = 2 * s;
    ctx.stroke();
    drawTape(ctx, w * 0.18, 10 * s, 58 * s, 17 * s, 'rgba(255,195,39,0.58)');
    drawTape(ctx, w * 0.66, 12 * s, 64 * s, 16 * s, 'rgba(166,142,112,0.28)');

    var y = pad + 20 * s;
    ctx.fillStyle = C.textSub;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '900 ' + Math.round(12 * s) + 'px ' + FONT;
    ctx.fillText('下班跑路指数', pad + 14 * s, y);

    drawTypePill(ctx, w - pad - 96 * s, y - 14 * s, 82 * s, 34 * s, result, s);
    y += 52 * s;

    ctx.fillStyle = C.text;
    ctx.textAlign = 'center';
    ctx.font = '900 ' + Math.round(33 * s) + 'px "Times New Roman", "Songti SC", serif';
    ctx.fillText(result.title, w / 2, y);
    y += 14 * s;
    ctx.strokeStyle = result.color;
    ctx.lineWidth = 5 * s;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 56 * s, y);
    ctx.lineTo(w / 2 + 56 * s, y);
    ctx.stroke();
    y += 18 * s;

    roundRect(ctx, pad + 14 * s, y, innerW - 28 * s, 132 * s, 18 * s);
    ctx.fillStyle = '#F9EBCF';
    ctx.fill();
    ctx.strokeStyle = 'rgba(36,27,20,0.24)';
    ctx.lineWidth = 1.2 * s;
    ctx.stroke();
    drawMemeFace(ctx, w / 2, y + 52 * s, 58 * s, result, s);
    ctx.fillStyle = C.text;
    ctx.font = '850 ' + Math.round(12.5 * s) + 'px ' + FONT;
    drawLines(ctx, wrapText(ctx, result.meme, innerW - 60 * s), w / 2, y + 108 * s, 16 * s, 2, 'center');
    y += 154 * s;

    var tagline = '“' + result.tagline + '”';
    ctx.fillStyle = C.textSub;
    ctx.font = '850 ' + Math.round(14.5 * s) + 'px ' + FONT;
    drawLines(ctx, wrapText(ctx, tagline, innerW - 20 * s), w / 2, y, 20 * s, 2, 'center');
    y += 48 * s;

    roundRect(ctx, pad + 14 * s, y, innerW - 28 * s, 72 * s, 15 * s);
    ctx.fillStyle = '#FFF8E8';
    ctx.fill();
    ctx.strokeStyle = 'rgba(36,27,20,0.14)';
    ctx.lineWidth = 1 * s;
    ctx.stroke();
    ctx.fillStyle = result.color;
    ctx.fillRect(pad + 14 * s, y + 12 * s, 5 * s, 48 * s);
    ctx.fillStyle = C.text;
    ctx.font = '650 ' + Math.round(11.8 * s) + 'px ' + FONT;
    drawLines(ctx, wrapText(ctx, result.persona, innerW - 56 * s), pad + 30 * s, y + 23 * s, 17 * s, 3, 'left');

    var footerY = h - 44 * s;
    if (compareText) {
      ctx.fillStyle = C.red;
      ctx.textAlign = 'center';
      ctx.font = '950 ' + Math.round(12 * s) + 'px ' + FONT;
      ctx.fillText(compareText, w / 2, footerY - 22 * s);
    }

    ctx.strokeStyle = 'rgba(36,27,20,0.14)';
    ctx.setLineDash([5 * s, 5 * s]);
    ctx.beginPath();
    ctx.moveTo(pad + 16 * s, footerY - 8 * s);
    ctx.lineTo(w - pad - 16 * s, footerY - 8 * s);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = C.text;
    ctx.textAlign = 'center';
    ctx.font = '900 ' + Math.round(13 * s) + 'px ' + FONT;
    ctx.fillText('截图发同事群对答案', w / 2, footerY + 10 * s);
  }

  return {
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

    drawResultCard: function (canvas, result, compareText) {
      var setup = window.Canvas.setup(canvas);
      draw(setup.ctx, setup.w, setup.h, result, compareText || '');
    }
  };
})();
