const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

async function chatGPT(input) {
    try {
        const data = JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: input }
            ]
        });

        const config = {
            method: 'post',
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            data: data
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error processing the chat completion:", error);
        return null;
    }
}

app.post('/chat', async (req, res) => {
    console.log("POST /chat accessed");
    const userMessage = req.body.message || "What's JavaScript"; // Default message if none provided
    const completion = await chatGPT(userMessage);
    if (completion) {
        res.status(200).json(completion);
    } else {
        res.status(500).json({ message: "Failed to process chat completion" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
