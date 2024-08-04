const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const geminiApiKey = process.env.GOOGLE_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(bodyParser.json());

app.post('/api/gemini', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json(response.text());
  } catch (error) {
    console.error('Error during API call:', error);
    res.status(500).send('Error during API call');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
