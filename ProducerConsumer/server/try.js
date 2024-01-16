const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");

// Set the path to the ffmpeg executable
ffmpeg.setFfmpegPath(ffmpegPath);

// Specify the path to your MP3 file
const mp3FilePath = path.join(__dirname, "audio.mp3");

// Specify the path to save the decoded WAV file
const wavFilePath = path.join(__dirname, "sample.wav");

// Use fluent-ffmpeg to convert MP3 to WAV
ffmpeg()
  .input(mp3FilePath)
  .inputFormat("mp3")
  .audioCodec("pcm_s16le")
  .audioFrequency(44100)
  .audioChannels(2)
  .on("end", () => {
    console.log("Conversion finished.");
  })
  .on("error", (err) => {
    console.error("Error:", err);
  })
  .save(wavFilePath);
