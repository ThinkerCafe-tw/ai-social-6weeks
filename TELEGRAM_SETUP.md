# Telegram Bot 設定指南

## 目的
當學員填寫報名表單後，自動發送通知到你的 Telegram，包含所有報名資訊。

## 設定步驟

### 1. 建立 Telegram Bot

1. 在 Telegram 中搜尋 `@BotFather`
2. 發送 `/newbot` 命令
3. 依照指示設定 Bot 名稱和 username
4. 完成後會收到一個 **Bot Token**，類似這樣：
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz-1234567
   ```
5. **保存這個 Token，等等會用到**

### 2. 取得你的 Chat ID

1. 在 Telegram 中搜尋你剛建立的 Bot
2. 發送任意訊息給 Bot（例如：`/start`）
3. 在瀏覽器開啟以下網址（把 `YOUR_BOT_TOKEN` 替換成你的 Bot Token）：
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. 你會看到類似這樣的 JSON 回應：
   ```json
   {
     "ok": true,
     "result": [{
       "update_id": 123456789,
       "message": {
         "message_id": 1,
         "from": {
           "id": 987654321,  // 這就是你的 Chat ID
           "is_bot": false,
           "first_name": "Cruz"
         }
       }
     }]
   }
   ```
5. **記下 `from.id` 的值，這就是你的 Chat ID**

### 3. 更新 index.html

在 `index.html` 的 NextSteps 組件中，找到這兩行：

```javascript
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';
```

替換成你的實際值：

```javascript
const TELEGRAM_BOT_TOKEN = '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz-1234567';
const TELEGRAM_CHAT_ID = '987654321';
```

### 4. 部署到 GitHub Pages

```bash
cd /Users/thinkercafe/Documents/ai-social-6weeks
git add .
git commit -m "Add enrollment form with Telegram notification"
git push
```

## 安全性考量

⚠️ **重要提醒**：

由於這是靜態網站部署在 GitHub Pages，Bot Token 會被公開在原始碼中。這有以下風險：

1. 任何人都可以用你的 Bot Token 發送訊息
2. 可能會被濫用

### 更安全的替代方案

如果擔心安全性，可以考慮：

1. **使用後端服務**：
   - 建立一個簡單的 Cloudflare Worker 或 Vercel Serverless Function
   - Token 存在環境變數中，不會暴露

2. **使用 Google Forms + Zapier/Make**：
   - 用 Google Forms 收集表單
   - 用 Zapier 或 Make.com 自動發送到 Telegram

3. **目前方案的風險控制**：
   - 定期更換 Bot Token
   - 監控異常訊息
   - Bot 只用於接收報名通知，不執行其他敏感操作

## 測試

1. 開啟 `index.html`
2. 填寫表單並送出
3. 檢查 Telegram 是否收到通知

如果收到訊息，就設定成功了！

## 訊息格式範例

當學員報名後，你會收到類似這樣的訊息：

```
🎓 新學員報名確認

👤 學員資訊
姓名: 王小明
Email: wang@example.com
電話: 0912-345-678

⏰ 課程確認
時間確認: 可以配合
課程內容: 完全符合
開課日期: 可以

💰 繳費資訊
需要發票: 否
課程費用: NT$ 9,500
轉帳後五碼: 12345

💬 其他問題
期待上課！

---
提交時間: 2024/11/15 下午2:30:00
```

## 疑難排解

### 沒收到訊息？

1. 確認 Bot Token 和 Chat ID 是否正確
2. 打開瀏覽器開發者工具（F12）查看 Console 是否有錯誤
3. 確認是否有先發送訊息給 Bot（啟動對話）
4. 檢查網路連線

### 其他問題

直接在 Telegram 測試 API：

```bash
curl -X POST \
  https://api.telegram.org/bot你的BOT_TOKEN/sendMessage \
  -H 'Content-Type: application/json' \
  -d '{
    "chat_id": "你的CHAT_ID",
    "text": "測試訊息"
  }'
```

如果這個指令成功，問題就出在前端代碼。
