import Flashcard from "../components/Flashcard.jsx";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getNextWord } from "../utilities/helperFunctions.js";

const Flashcards = () => {
  const user = useSelector((state) => state.user.user);
  const [word, setWord] = useState({});

  useEffect(() => {
    const nextWord = getNextWord(words);
    setWord(nextWord);
    //eslint-disable-next-line
  }, []);

  const words = user?.words || [];
  const setNextWord = () => {
    const nextWord = getNextWord(words);
    setWord(nextWord);
  };

  console.log("words", words);
  return <Flashcard word={word} user={user} setNextWord={setNextWord} />;
};

export default Flashcards;
