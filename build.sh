#!/bin/sh
# 把 src/ 裡的片段組成 index.html（前台）與 admin.html（老大後台）
set -e
cd "$(dirname "$0")"
cat src/diary_head.html src/data_c.js src/store.js src/helpers_c.js src/diary_tail.js > index.html
cat src/admin_head.html src/data_c.js src/store.js src/helpers_c.js src/admin.js > admin.html
echo "built index.html admin.html"
