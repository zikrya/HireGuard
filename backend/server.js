const express = require('express');
const bodyParser = require("body-parser");
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

/*app.get('/', async (req, res) => {
  const content = await main();
  res.send(content);
}); */

/*app.get('/', (req, res) => {
    res.send('Hello World!');
  }); */

  app.get('/', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Who won the world series in 2020?" },
                { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020." },
                { role: "user", content: "Where was it played?" }
            ]
        });
        res.status(200).json(completion.data);
    } catch (error) {
        console.error("Error processing the chat completion:", error);
        res.status(500).json({ message: "Failed to process chat completion" });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


