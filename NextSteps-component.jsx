// 這個檔案包含完整的 NextSteps 表單組件代碼
// Cruz 需要把這段代碼替換到 index.html 中的 NextSteps function

function NextSteps() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        timeConfirm: '',
        contentConfirm: '',
        startDate: '',
        invoiceNeeded: '',
        transferLastFive: '',
        questions: ''
    });
    
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        // 驗證必填欄位
        if (!formData.name || !formData.email || !formData.phone || 
            !formData.timeConfirm || !formData.contentConfirm || 
            !formData.startDate || !formData.invoiceNeeded) {
            setError('請填寫所有必填欄位');
            setSubmitting(false);
            return;
        }

        // 準備發送到 Telegram 的訊息
        const price = formData.invoiceNeeded === 'yes' ? '10,000' : '9,500';
        const message = `
🎓 新學員報名確認

👤 學員資訊
姓名：${formData.name}
Email：${formData.email}
電話：${formData.phone}

⏰ 課程確認
時間確認：${formData.timeConfirm}
課程內容：${formData.contentConfirm}
開課日期：${formData.startDate}

💰 繳費資訊
需要發票：${formData.invoiceNeeded === 'yes' ? '是' : '否'}
課程費用：NT$ ${price}
轉帳後五碼：${formData.transferLastFive || '尚未提供'}

💬 其他問題
${formData.questions || '無'}

---
提交時間：${new Date().toLocaleString('zh-TW')}
        `.trim();

        try {
            // 發送到 Telegram
            // Cruz 需要把自己的 Bot Token 和 Chat ID 填入這裡
            const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
            const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';
            
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                throw new Error('發送失敗');
            }
        } catch (err) {
            setError('提交失敗，請直接透過 Email 或 Threads 聯繫我。');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section className="next-steps">
                <div className="success-message">
                    <h2>✅ 確認送出成功！</h2>
                    <p style={{ marginTop: '15px', lineHeight: '1.8' }}>
                        感謝你的報名確認！我已經收到你的資訊。<br/>
                        {formData.transferLastFive ? 
                            '我會在確認款項後 24 小時內透過 Email 聯繫你，提供課前準備資料。' :
                            '請記得轉帳後，再次填寫本表單並提供轉帳後五碼。'
                        }
                    </p>
                    <p style={{ marginTop: '15px' }}>
                        期待 11/24 與你開始這段 AI 自媒體的學習旅程！
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="next-steps">
            <h2>確認報名</h2>
            <p>請填寫以下資訊，確認報名課程：</p>

            <form className="enrollment-form" onSubmit={handleSubmit}>
                {/* 基本資料 */}
                <div className="form-section">
                    <h3>基本資料</h3>
                    <div className="form-group">
                        <label>姓名 *</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>電話 *</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* 課程確認 */}
                <div className="form-section">
                    <h3>課程確認</h3>
                    <div className="form-group">
                        <label>1. 時間確認：每週一、三晚上 8:30-9:30（每次 1 小時正式課程，週間持續陪伴追蹤）*</label>
                        <div className="radio-group">
                            <label>
                                <input 
                                    type="radio" 
                                    name="timeConfirm" 
                                    value="可以配合"
                                    onChange={handleChange}
                                    required
                                />
                                可以配合
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="timeConfirm" 
                                    value="需要調整"
                                    onChange={handleChange}
                                />
                                需要調整
                            </label>
                        </div>
                        <small style={{color: '#666', fontSize: '10pt', display: 'block', marginTop: '8px'}}>
                            ℹ️ 每次 1 小時是正式課程時間，另外週間每天會檢查進度、給回饋（約 30 分鐘/天），總計 18 小時完整教學
                        </small>
                    </div>

                    <div className="form-group">
                        <label>2. 課程內容：以上六週的學習路徑是否符合你的期待？*</label>
                        <div className="radio-group">
                            <label>
                                <input 
                                    type="radio" 
                                    name="contentConfirm" 
                                    value="完全符合"
                                    onChange={handleChange}
                                    required
                                />
                                完全符合
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="contentConfirm" 
                                    value="有疑問"
                                    onChange={handleChange}
                                />
                                有疑問
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>3. 開課日期：11/24（日）開始，是否可以配合？*</label>
                        <div className="radio-group">
                            <label>
                                <input 
                                    type="radio" 
                                    name="startDate" 
                                    value="可以"
                                    onChange={handleChange}
                                    required
                                />
                                可以
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="startDate" 
                                    value="需要調整"
                                    onChange={handleChange}
                                />
                                需要調整
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>4. 發票需求 *</label>
                        <div className="radio-group">
                            <label>
                                <input 
                                    type="radio" 
                                    name="invoiceNeeded" 
                                    value="yes"
                                    onChange={handleChange}
                                    required
                                />
                                需要發票（NT$ 10,000）
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="invoiceNeeded" 
                                    value="no"
                                    onChange={handleChange}
                                />
                                不需要發票（NT$ 9,500）
                            </label>
                        </div>
                    </div>
                </div>

                {/* 繳費資訊 */}
                <div className="form-section">
                    <h3>繳費資訊</h3>
                    <p style={{marginBottom: '15px'}}>
                        請轉帳到以下帳戶，轉帳後請填寫帳號後五碼：
                    </p>
                    <div className="bank-info">
                        <p><strong>銀行：</strong>第一銀行（007）</p>
                        <p><strong>帳號：</strong>321-10-060407</p>
                        <p><strong>戶名：</strong>思考者咖啡有限公司</p>
                        <p><strong>金額：</strong>NT$ {formData.invoiceNeeded === 'yes' ? '10,000' : formData.invoiceNeeded === 'no' ? '9,500' : '___'}</p>
                    </div>
                    <div className="form-group" style={{marginTop: '15px'}}>
                        <label>轉帳帳號後五碼（轉帳後填寫）</label>
                        <input 
                            type="text" 
                            name="transferLastFive"
                            value={formData.transferLastFive}
                            onChange={handleChange}
                            placeholder="轉帳後請填寫，例如：12345"
                            maxLength="5"
                        />
                        <small style={{color: '#666', fontSize: '10pt', display: 'block', marginTop: '5px'}}>
                            尚未轉帳也可以先送出確認，轉帳後再次填寫本表單並提供後五碼即可
                        </small>
                    </div>
                </div>

                {/* 其他問題 */}
                <div className="form-section">
                    <h3>其他問題或備註</h3>
                    <div className="form-group">
                        <textarea 
                            name="questions"
                            value={formData.questions}
                            onChange={handleChange}
                            placeholder="有任何問題或想說的話，都可以在這裡告訴我..."
                        />
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={submitting}
                >
                    {submitting ? '送出中...' : '確認報名'}
                </button>

                <p style={{marginTop: '20px', color: '#666', fontSize: '10pt'}}>
                    送出後，我會在 24 小時內透過 Email 與你聯繫。<br/>
                    如有任何問題，也可以直接透過 <a href="mailto:cruz@thinker.cafe">Email</a> 或 <a href="https://www.threads.net/@tangcruzz" target="_blank">Threads</a> 聯繫我。
                </p>
            </form>
        </section>
    );
}