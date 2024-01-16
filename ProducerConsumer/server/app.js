const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const cors = require("cors");
const corsOptions = {
  origin: "http://127.0.0.1:5500", // Replace with the actual origin of your frontend app
  credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
};

app.use(cors(corsOptions));

const audioDir = path.join(__dirname, "audio");

// Queue to store audio file paths
const audioQueue = [];

if (!audioQueue.length) {
  const enqueueAllFiles = () => {
    const files = fs.readdirSync(audioDir);

    files.forEach((file, index) => {
      const filePath = path.join(audioDir, file);
      audioQueue.push({ id: index + 1, path: filePath });
    });
  };
  enqueueAllFiles();
}

app.get("/", (req, res) => {
  if (audioQueue.length > 0) {
    const audioData = audioQueue[0];
    const rstream = fs.createReadStream(audioData.path);

    // Set the content type to audio/mp3
    res.setHeader("Content-Type", "audio/mp3");
    // res.setHeader("X-File-ID", audioData.id);
    // res.setHeader("Length", audioQueue.length);

    console.log("id:", audioData.id);
    // res.setHeader("X-Total-Files", audioQueue.length);
    console.log(audioQueue.length);

    audioQueue.shift();
    rstream.pipe(res);

    // Send the audio file along with assigned ID
    // res.status(200).json({ id: audioData.id, audio: rstream });
  } else {
    // If the queue is empty, send a 404 response
    res.status(404).send("No audio files in the queue");
  }
});

// API endpoint to get the number of audio files and their IDs in the queue
app.get("/queueInfo", (req, res) => {
  // const queueInfo = audioQueue.map((item) => ({
  //   id: item.id,
  //   fileName: path.basename(item.path),
  // }));
  res.status(200).json({ queueSize: audioQueue.length, id: audioQueue[0].id });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const port = 3000;

// // Queue to store audio file paths
// const audioQueue = [];

// // Function to add a file to the queue
// const enqueueFile = (filePath) => {
//   audioQueue.push(filePath);
// };

// // Function to serve the next file in the queue
// const serveNextFile = (res) => {
//   if (audioQueue.length > 0) {
//     const filePath = audioQueue.shift(); // Dequeue the first file
//     const rstream = fs.createReadStream(filePath);

//     // Set the content type to audio/mp3
//     res.setHeader("Content-Type", "audio/mp3");

//     // Pipe the file stream to the response
//     rstream.pipe(res);
//   } else {
//     // If the queue is empty, send a 404 response
//     res.status(404).send("No audio files in the queue");
//   }
// };

// app.get("/", (req, res) => {
//   serveNextFile(res);
// });

// // API endpoint to enqueue a new audio file
// app.post("/enqueue", (req, res) => {
//   // For demonstration purposes, you might want to replace 'newAudio.mp3' with the actual file path received in the request.
//   const filePath = path.join(__dirname, "newAudio.mp3");

//   if (fs.existsSync(filePath)) {
//     enqueueFile(filePath);
//     res.status(200).send("Audio file enqueued successfully");
//   } else {
//     res.status(404).send("File not found");
//   }
// });

// // API endpoint to get the number of audio files in the queue
// app.get("/queueSize", (req, res) => {
//   res.status(200).json({ queueSize: audioQueue.length });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
