require('dotenv').config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const { query } = require('express');

const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(cors());

app.post("/chat2", async (req, res) => {
  const { message } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
  });

  const reply = completion.data.choices[0].message.content;
  res.json({ reply });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
  // });

  // const reply = completion.data.choices[0].message.content;
  reply = "The service is not available. Try again later"
  let query = String(message).toLowerCase();
  reply = query
  if(query.includes('hi') || query.includes('hello')){
    reply = "Hello! How can I assist you today?"
    await sleep(2000);
  }
  if(query.includes('march')){
    reply = "5 events occurred in March 2023."
    await sleep(4000);
  }
  if(query.includes('most popular')){
    reply = "The most popular city for events in 2023 is Dallas."
    await sleep(3000);
  }
  if(query.includes('many properties')){
    reply = "7 properties are subscribed."
    await sleep(4000);
  }
  if(query.includes('many event payments')){
    reply = "176 event payments are currently rejected."
    await sleep(3000);
  }
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
