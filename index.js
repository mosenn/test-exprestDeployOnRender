// // index.js
// const express = require('express');
// const app = express();

// // Render (و اکثر PaaSها) پورت را به صورت متغیر محیطی PROVIDE می‌کنند.
// // حتماً به process.env.PORT گوش بده
// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('سلام از Express — روی Render آماده است 🚀');
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });



const express = require('express');
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TOKEN = "7855890227:AAFQNmUtjm1atKJ-CCK19kgYWsIfwSOKBtQ";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.post("/report-score", async (req, res) => {
  try {
    const { score, user_id, inline_message_id } = req.body;

    if (!user_id || !inline_message_id) {
      return res.status(400).json({ ok: false, error: "user_id یا inline_message_id خالیه" });
    }

    // آماده کردن دیتا برای تلگرام
    const payload = {
      user_id: user_id,
      score: score,
      inline_message_id: inline_message_id,
      force: true
    };

    // درخواست به Telegram API → setGameScore
    const r = await fetch(`${TELEGRAM_API}/setGameScore`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await r.json();
    return res.json(data);

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Server running on port " + PORT));