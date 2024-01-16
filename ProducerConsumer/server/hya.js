const Lame = require("node-lame").Lame;
const path = require("path");
const encoder = new Lame({
  output: path.join(__dirname, "audio.mp3"),
  bitrate: 192,
}).setFile(path.join(__dirname, "sample.wav"));

encoder
  .encode()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    // Something went wrong
  });

const NodeID3 = require("node-id3");

let tags = {
  title: "Title goes here",
  artist: "Artist Name",
  album: "Album Name",
  genre: "Genre",
  year: "2024",
  comment: "This is a comment",
};

NodeID3.write(tags, path.join(__dirname, "audio.mp3"), function (err, buffer) {
  if (err) throw err;
  // Tags were successfully written
});

const decoder = new Lame({
  output: path.join(__dirname, "audio.mp3"),
}).setFile(path.join(__dirname, "sample.wav"));

decoder
  .decode()
  .then(() => {})
  .catch((error) => {
    // Something went wrong
  });
