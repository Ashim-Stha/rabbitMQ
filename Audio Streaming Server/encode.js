const fs = require("fs");
const NodeID3 = require("node-id3");
const path = require("path");

// Encode text into an MP3 file
function encodeTextIntoMP3(mp3FilePath, textToEmbed, outputFilePath) {
  const mp3Buffer = fs.readFileSync(mp3FilePath);

  // Add a custom frame with the text as a comment
  const tags = {
    userDefinedText: [textToEmbed],
  };

  const success = NodeID3.write(tags, mp3Buffer, outputFilePath);
  if (success) {
    console.log("Text encoded into MP3 file:", outputFilePath);
  } else {
    console.error("Error encoding text into MP3 file");
  }
}

// Decode text from an MP3 file
function decodeTextFromMP3(mp3FilePath) {
  // Introduce a delay or use a callback to ensure the file is created
  setTimeout(() => {
    const mp3Buffer = fs.readFileSync(mp3FilePath);

    // Read the custom frame containing the text
    const tags = NodeID3.read(mp3Buffer);
    const decodedText =
      tags && tags.userDefinedText ? tags.userDefinedText[0] : null;

    console.log("Decoded text from MP3 file:", decodedText);
  }, 1000); // Delay for 1 second (adjust as needed)
}

// Example usage
const mp3FilePath = path.join(__dirname, "audio.mp3");
const textToEmbed = "Hello, this is hidden text!";
const outputFilePath = path.join(__dirname, "okay.mp3");

encodeTextIntoMP3(mp3FilePath, textToEmbed, outputFilePath);
decodeTextFromMP3(outputFilePath);
