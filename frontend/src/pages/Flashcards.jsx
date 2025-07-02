import Flashcard from "../components/Flashcard.jsx";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getNextWord } from "../utilities/helperFunctions.js";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import "../styling/Flashcards.css";

const Flashcards = () => {
  const userData = useSelector((state) => state.user);
  const user = userData.user || {};
  const [word, setWord] = useState({});
  const [mode, setMode] = useState("source");

  useEffect(() => {
    const nextWord = getNextWord(words, word?.id);
    setWord(nextWord);
    //eslint-disable-next-line
  }, [user]);

  const words = user?.words || [];

  console.log("user", user);

  return (
    <>
      <ToggleButtonGroup>
        <ToggleButton
          value={"source"}
          selected={mode === "source"}
          onChange={() => setMode("source")}
          className="flashcard-toggle-button"
        >
          {`${user.native_language.code} → ${userData.selectedLanguage.code}`}
        </ToggleButton>
        <ToggleButton
          value={"target"}
          selected={mode === "target"}
          onChange={() => setMode("target")}
          className="flashcard-toggle-button"
        >
          {`${userData.selectedLanguage.code} → ${user.native_language.code}`}
        </ToggleButton>
      </ToggleButtonGroup>
      <Flashcard word={word} user={user} mode = {mode}/>;
    </>
  );
};

export default Flashcards;
