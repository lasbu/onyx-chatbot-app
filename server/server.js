require('dotenv').config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: "YOUR_API_KEY",
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
  });

  const reply = completion.data.choices[0].message.content;
  res.json({ reply });
});

app.post("/chat-TEST", async (req, res) => {
  const { message } = req.body;

  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
  // });

  // const reply = completion.data.choices[0].message.content;
  reply = "Hello! How can I assist you today?"
  await sleep(2000);
  res.json({ reply });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
