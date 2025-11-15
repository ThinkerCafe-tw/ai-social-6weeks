# 課綱頁面已還原為簡潔版本

## 完成的修改

### ✅ 已移除
1. 複雜的互動式表單
2. Telegram Bot 整合
3. 所有表單相關的 CSS 樣式

### ✅ 已保留
1. 簡潔的「下一步」區塊，列出需要確認的事項
2. 修正了重複的發票需求項目（原本寫了兩次）
3. Email 和 Threads 聯絡方式改為可點擊的連結

## 當前狀態

課綱頁面現在是純展示性質，包含：
- 課程標題和簡介
- 六週完整課程規劃
- 課程包含項目
- 下一步確認事項（簡單的列表）
- 聯絡資訊（可點擊的 Email 和 Threads 連結）

## 使用方式

直接把這個頁面的連結發給學員，然後透過私訊（Threads 或 Email）與他確認：
1. 時間是否可以配合
2. 課程內容是否符合期待
3. 11/24 開課日期是否 OK
4. 是否需要發票

確認後再提供銀行轉帳資訊。

## 檔案位置

- 主檔案：`/Users/thinkercafe/Documents/ai-social-6weeks/index.html`
- 備份的表單組件：`/Users/thinkercafe/Documents/ai-social-6weeks/NextSteps-component.jsx` （保留供未來參考）
- Telegram 設定說明：`/Users/thinkercafe/Documents/ai-social-6weeks/TELEGRAM_SETUP.md` （保留供未來參考）

## 下一步建議

如果未來想要自動化收集報名資訊，建議：
1. 使用 Google Forms（最簡單、最安全）
2. 或使用 Typeform / Tally.so 等現成服務
3. 避免在靜態網站暴露 API Token

---

**現在可以放心把課綱發給學員了！** 🎉
