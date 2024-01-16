const express = require("express");
const app = express();

const ampq = require("amqplib");
const amqpUrl = "amqp://localhost:5672";

const orderData = {
  customerId: 2,
  orderId: 11,
  number: "111 2111 111",
};

app.get("/", async (req, res) => {
  try {
    const connection = await ampq.connect(amqpUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue("orders.shippped");
    channel.sendToQueue(
      "orders.shipped",
      Buffer.from(JSON.stringify(orderData))
    );
  } catch (err) {
    console.log(err);
  }

  res.send("ORDERS API");
});

app.listen(8000, () => {
  console.log("ORDERS API listening on port 8000");
});
