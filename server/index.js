// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Placeholder puzzle API endpoint
app.get('/api/puzzle', (req, res) => {
  res.json({
    date: new Date().toISOString(),
    center: "M",
    outer: ["O", "T", "Z", "A", "N", "E", "C"],
    category: "Classical Music",
    triviaWords: ["MOZART", "SONATA"],
    validWords: ["MOZART", "SONATA", "MOAN", "ZONE"],
    finalTrivia: {
      question: "Who composed the Jupiter Symphony?",
      answer: "Mozart"
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
