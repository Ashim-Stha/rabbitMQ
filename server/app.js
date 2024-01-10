const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "audio.mp3");

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Set the content type to audio/mp3
    res.setHeader("Content-Type", "audio/mp3");

    // Create a readable stream from the file and pipe it to the response
    const rstream = fs.createReadStream(filePath);
    rstream.pipe(res);
  } else {
    // If the file doesn't exist, send a 404 response
    res.status(404).send("File not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
