import { useState } from "react";
import "../styling/Flashcard.css";
import { sayWord } from "../utilities/helperFunctions.js";

import { IconButton, Button, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { postFlashcardAttempt } from "../utilities/serverCalls.js";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/userSlice.js";

const Flashcard = ({ mode = "source", word, user }) => {
  const [flipped, setFlipped] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const dispatch = useDispatch();

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

  const handleVote = async (correct) => {
    if (correct) {
      setAnimationClass("flashcard-correct");
    } else {
      setAnimationClass("flashcard-incorrect");
    }

    setTimeout(async () => {
      setFlipped(false);
      setAnimationClass("");
    }, 800); // Adjust duration to match animation

    setTimeout(async () => {
      await postFlashcardAttempt(word.id, word.language_target_id, correct);
      await dispatch(updateUser()).unwrap();
    }, 900); // delayed slightly so that the next answer doesn't appear before the animation ends
  };

  return (
    <div className="flashcard-wrapper">
      <div
        className={`flashcard ${flipped ? "flipped" : ""} ${animationClass}`}
        onClick={(e) => {
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
