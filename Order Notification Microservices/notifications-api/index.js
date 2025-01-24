const express = require("express");

const app = express();

const amqp = require("amqplib");
const amqpUrl = "amqp://localhost:5672";

app.get("/", (req, res) => {
  res.send("NOTIFCATIONS API");
});

async function connect() {
  try {
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue("orders.shipped");
    channel.consume("orders.shipped", (msg) => {
      console.log("Recieved msg from queue");
      console.log(msg.content.toString());
      channel.ack(msg);
    });
  } catch (err) {
    console.log(err);
  }
}

connect();

app.listen(8001, () => {
  console.log("Listening on PORT 8001");
});
