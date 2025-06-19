import { useEffect, useState } from "react";

function useWordList() {
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    fetch("/english-10000.txt")
      .then((res) => res.text())
      .then((text) => {
        const words = text
          .split("\n")
          .map((w) => w.trim())
          .filter(Boolean); // removes empty lines
        setWordList(words);
      });
  }, []);

  return wordList;
}

export default useWordList;
