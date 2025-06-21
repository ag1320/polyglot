import { useEffect, useRef, useState } from "react";
import { sayWord } from "../utilities/helperFunctions.js";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import "../styling/VoiceSelect.css";

const VoiceSelect = ({
  voices,
  setSelectedVoiceTitle,
  wordToSpeak,
  preselectedIndex,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef([]);

  const handleKeyDown = (e) => {
    let index = selectedIndex;
    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      index = (selectedIndex + 1) % voices.length;
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      index = (selectedIndex - 1 + voices.length) % voices.length;
    }

    setSelectedIndex(index);
    setSelectedVoiceTitle(voices[index].title);
    listRef.current[index]?.focus();
    sayWord(voices[index].title, wordToSpeak);
  };

  useEffect(() => {
    if (voices.length > 0) {
      const indexToUse = preselectedIndex || 0;
      setSelectedIndex(indexToUse);
      setSelectedVoiceTitle(voices[indexToUse]?.title || "");
    }
    //eslint-disable-next-line
  }, [voices]);

  useEffect(() => {
    const selectedItem = listRef.current[selectedIndex];
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div>
      <Paper
        className="voice-dropdown-container"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <List className="voice-dropdown-list">
          {voices.map((voice, index) => (
            <ListItem
              key={index}
              tabIndex={-1}
              className={`voice-item ${
                index === selectedIndex ? "selected" : ""
              }`}
              ref={(el) => (listRef.current[index] = el)}
              onClick={() => {
                setSelectedIndex(index);
                setSelectedVoiceTitle(voices[index].title);
                sayWord(voices[index].title, wordToSpeak);
              }}
            >
              <ListItemText
                className="voice-item-text"
                primary={`Voice ${index + 1}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default VoiceSelect;
