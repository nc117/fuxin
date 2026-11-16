# 福信貓老大｜官網原型

高雄無籠家庭貓舍「福信貓老大」的官網原型（風格 C：老大手帳）。

- `index.html`：前台
- `admin.html`：老大後台（原型）。資料存在瀏覽器，正式版會改接雲端資料庫。

## 修改方式
內容與程式在 `src/`：
- `data_c.js`：貓舍資料、每隻貓、保固、流程、常見問題
- `diary_head.html`：前台樣式
- `diary_tail.js`：前台頁面
- `admin_head.html`、`admin.js`：後台

改完執行 `sh build.sh`，重新產生 `index.html` 與 `admin.html`。
