// index.js
const express = require('express');
const app = express();

// Render (و اکثر PaaSها) پورت را به صورت متغیر محیطی PROVIDE می‌کنند.
// حتماً به process.env.PORT گوش بده
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('سلام از Express — روی Render آماده است 🚀');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
