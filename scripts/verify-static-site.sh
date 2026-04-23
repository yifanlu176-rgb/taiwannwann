#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INDEX_FILE="$ROOT_DIR/index.html"

if [[ ! -f "$INDEX_FILE" ]]; then
  echo "[ERROR] index.html not found: $INDEX_FILE"
  exit 1
fi

echo "[INFO] Checking local asset references in $INDEX_FILE"
missing=0

# 抓取 src/href 中的本地路径（忽略 http(s), mailto, #anchor）
while IFS= read -r ref; do
  [[ -z "$ref" ]] && continue
  case "$ref" in
    http://*|https://*|mailto:*|\#*)
      continue
      ;;
  esac

  target="$ROOT_DIR/$ref"
  if [[ -e "$target" ]]; then
    echo "[OK] $ref"
  else
    echo "[MISSING] $ref"
    missing=1
  fi
done < <(grep -Eo '(src|href)="[^"]+"' "$INDEX_FILE" | cut -d'"' -f2)

if [[ $missing -ne 0 ]]; then
  echo "[FAIL] Missing local assets detected"
  exit 2
fi

echo "[PASS] All local assets exist"
