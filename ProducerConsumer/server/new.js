const express = require("express");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

const app = express();
const port = 3000;

// Set the path to the ffmpeg executable
ffmpeg.setFfmpegPath(ffmpegPath);

app.get("/api/song/:id", (req, res) => {
  const songId = req.params.id;
  const songInfo = {
    id: songId,
    title: "Sample Song",
    artist: "Sample Artist",
  };

  // Specify the path to your WAV file
  const wavFilePath = path.join(__dirname, "sample.wav");

  // Read the WAV file as binary
  const wavData = fs.readFileSync(wavFilePath);

  // Set response headers
  res.setHeader("Content-Type", "audio/wav");
  //   res.setHeader('Content-Disposition', `attachment; filename=${songInfo.title}.wav`);

  // Send the JSON object and the WAV file in one response
  //   res.json(songInfo);

  // Pipe the WAV file stream to the response
  const stream = fs.createReadStream(wavFilePath);
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
