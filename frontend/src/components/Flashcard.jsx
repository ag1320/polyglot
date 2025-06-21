import { useState } from "react";
import "../styling/Flashcard.css";
import { sayWord } from "../utilities/helperFunctions.js";

import { IconButton, Button, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const Flashcard = ({ mode = "source", word, user }) => {
  const [flipped, setFlipped] = useState(false);

  const isSourceFirst = mode === "source";
  const frontText = isSourceFirst
    ? word.word_in_source_language
    : word.word_in_target_language;
  const backText = isSourceFirst
    ? word.word_in_target_language
    : word.word_in_source_language;

  const executeAudioSequence = (word) => {
    // const voice = user.my_languages.find(
    //   (lang) => lang.id === word.language_target_id
    // )?.voice;
    //get voice
    // if (voice) {
    //   sayWord(voice, word);
    // }
  };

  const handleVote = (correct) => {
    // You can dispatch actions here or call APIs later
    console.log(`User voted: ${correct ? "Correct" : "Incorrect"}`);
    setFlipped(false);
  };

  return (
    <div className="flashcard-wrapper">
      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flashcard-face flashcard-front">
          <div className="flashcard-content">
            <IconButton onClick={() => executeAudioSequence(frontText)}>
              <VolumeUpIcon className="speaker-icon" />
            </IconButton>
            <Typography variant="h3" className="flashcard-word">
              {frontText}
            </Typography>
          </div>
        </div>

        <div className="flashcard-face flashcard-back">
          <div className="flashcard-content">
            <IconButton onClick={() => executeAudioSequence(backText)}>
              <VolumeUpIcon className="speaker-icon" />
            </IconButton>
            <Typography variant="h3" className="flashcard-word">
              {backText}
            </Typography>
            <div className="vote-buttons">
              <Button
                variant="contained"
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(true);
                }}
                className="vote-button correct"
              >
                ✅ Got it
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(false);
                }}
                className="vote-button incorrect"
              >
                ❌ Missed it
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
