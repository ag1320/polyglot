import { useState } from "react";
import "../styling/Flashcard.css";
import { sayWord } from "../utilities/helperFunctions.js";

import { IconButton, Button, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const Flashcard = ({ mode = "source", word, user }) => {
  const [flipped, setFlipped] = useState(false);

  if (!word) {
    return (
      <div className="flashcard-wrapper">
        <Typography variant="h6" color="#000">
          No word available
        </Typography>
      </div>
    );
  }

  const isSourceFirst = mode === "source";
  // Determine which language to show first based on the mode
  let frontText = word.word_in_target_language;
  let frontLanguage = word.language_target_id;
  let backText = word.word_in_source_language;
  let backLanguage = word.language_source_id;
  if (isSourceFirst) {
    frontText = word.word_in_source_language;
    frontLanguage = word.language_source_id;
    backText = word.word_in_target_language;
    backLanguage = word.language_target_id;
  }

  const executeAudioSequence = (word, languageId) => {
    let voice = user.my_languages.find((lang) => lang.id === languageId)?.voice;
    if (!voice) {
      voice =
        user.native_language.id === languageId
          ? user.native_language_voice
          : "";
    }
    if (voice) {
      sayWord(voice, word);
    }
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
        onClick={(e) => {
          // Prevent flip if IconButton was clicked
          if (
            e.target.closest(".speaker-icon") ||
            e.target.closest(".MuiIconButton-root")
          ) {
            return;
          }
          setFlipped((f) => !f);
        }}
      >
        <div className="flashcard-face flashcard-front">
          <div className="flashcard-content">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                executeAudioSequence(frontText, frontLanguage);
              }}
            >
              <VolumeUpIcon className="speaker-icon" />
            </IconButton>
            <Typography variant="h3" className="flashcard-word">
              {frontText}
            </Typography>
          </div>
        </div>

        <div className="flashcard-face flashcard-back">
          <div className="flashcard-content">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                executeAudioSequence(backText, backLanguage);
              }}
            >
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
