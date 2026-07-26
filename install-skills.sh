#!/usr/bin/env bash
#
# OPC Skills Installer
# 将 skills/ 目录下的技能安装到 WorkBuddy 技能目录
#
# 用法:
#   bash install-skills.sh              # 复制模式（推荐）
#   bash install-skills.sh --symlink    # 符号链接模式（开发时用）
#

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
SKILLS_SRC="$SCRIPT_DIR/.workbuddy/skills"
SKILLS_DST="$HOME/.workbuddy/skills"

MODE="copy"

for arg in "$@"; do
  case "$arg" in
    --symlink) MODE="symlink" ;;
    --help|-h)
      echo "用法: bash install-skills.sh [--symlink]"
      echo "  --symlink  符号链接模式（修改源文件立即生效）"
      exit 0
      ;;
    *)
      echo "未知参数: $arg"
      exit 1
      ;;
  esac
done

echo ""
echo "OPC Skills Installer"
echo "  源目录: $SKILLS_SRC"
echo "  目标:   $SKILLS_DST"
echo "  模式:   $MODE"
echo ""

mkdir -p "$SKILLS_DST"

for skill_dir in "$SKILLS_SRC"/*/; do
  skill_name=$(basename "$skill_dir")

  if [[ ! -f "$skill_dir/SKILL.md" ]]; then
    echo "  ⚠️  跳过 $skill_name（缺少 SKILL.md）"
    continue
  fi

  dst="$SKILLS_DST/$skill_name"

  if [[ -e "$dst" || -L "$dst" ]]; then
    echo "  ⚠️  $skill_name 已存在，跳过（先手动删除再重装）"
    continue
  fi

  if [[ "$MODE" == "symlink" ]]; then
    ln -s "$skill_dir" "$dst"
    echo "  ✓ $skill_name（符号链接）"
  else
    cp -R "$skill_dir" "$dst"
    echo "  ✓ $skill_name（复制）"
  fi
done

echo ""
echo "安装完成！重启 WorkBuddy 或新开会话即可使用。"
echo ""
