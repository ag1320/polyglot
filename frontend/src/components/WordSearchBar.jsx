import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import useWordList from "../data-fetch/useWordList";
import "../styling/WordSearchBar.css";
import { batchTranslateWords, postWord } from "../utilities/serverCalls.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/userSlice.js";

import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";

export default function WordSearchBar() {
  const wordList = useWordList();
  const fuseRef = useRef(null);
  const dispatch = useDispatch();

  // Get full language objects
  const sourceLanguage = useSelector(
    (state) => state?.user?.user?.native_language
  );
  const targetLanguage = useSelector((state) => state?.user?.selectedLanguage);

  const addWord = async (
    sourceWord,
    translatedWord,
    sourceLangId,
    targetLangId
  ) => {
    await postWord(sourceWord, translatedWord, sourceLangId, targetLangId);
    await dispatch(updateUser()).unwrap();
  };

  const [input, setInput] = useState("");
  const [sourceWords, setSourceWords] = useState([]);
  const [translatedWords, setTranslatedWords] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const debouncedSearch = useRef();

  useEffect(() => {
    if (wordList.length > 0) {
      fuseRef.current = new Fuse(wordList, {
        includeScore: true,
        threshold: 0.3,
      });
    }
  }, [wordList]);

  useEffect(() => {
    debouncedSearch.current = debounce((value) => {
      if (!fuseRef.current || value.length < 2) {
        setSourceWords([]);
        setTranslatedWords([]);
        setDropdownVisible(false);
        return;
      }

      const matches = fuseRef.current.search(value).slice(0, 5);
      const words = matches?.map((m) => m.item);
      setSourceWords(words);
    }, 300);
  }, []);

  useEffect(() => {
    if (debouncedSearch.current) {
      debouncedSearch.current(input);
    }
  }, [input]);

  useEffect(() => {
    if (
      sourceWords.length === 0 ||
      !sourceLanguage?.code ||
      !targetLanguage?.code
    ) {
      setTranslatedWords([]);
      setDropdownVisible(false);
      return;
    }

    batchTranslateWords(sourceWords, sourceLanguage.code, targetLanguage.code)
      .then((translations) => {
        setTranslatedWords(translations);
        setDropdownVisible(true);
        setHighlightedIndex(-1);
      })
      .catch((err) => {
        console.error("Batch translation failed:", err);
        setTranslatedWords([]);
        setDropdownVisible(false);
      });
  }, [sourceWords, sourceLanguage?.code, targetLanguage?.code]);

  const suggestions = sourceWords?.map((source, i) => ({
    source,
    translated: translatedWords[i] || "",
  }));

  const handleSelect = (item) => {
    addWord(
      item.source,
      item.translated,
      sourceLanguage?.id,
      targetLanguage?.id
    );
    setInput("");
    setSourceWords([]);
    setTranslatedWords([]);
    setDropdownVisible(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSelect(suggestions[highlightedIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    } else if (e.key === "Escape") {
      setDropdownVisible(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <Box className="wordsearch-container">
      <div className="wordsearch-textbox-container">
        <TextField
          fullWidth
          inputRef={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          label="Type to add a word"
          variant="outlined"
          className="wordsearch-textbox"
          slotProps={{
            input: {
              endAdornment: input && (
                <span
                  onClick={() => setInput("")}
                  style={{
                    cursor: "pointer",
                    marginRight: 8,
                    color: "#ccc",
                    fontSize: "1.2rem",
                  }}
                  title="Clear"
                >
                  ×
                </span>
              ),
            },
          }}
        />

        {isDropdownVisible && suggestions.length > 0 && (
          <Paper
            elevation={3}
            className="wordsearch-dropdown"
            sx={{
              position: "absolute",
              width: "600px",
              zIndex: 10,
              top: "100%",
              maxHeight: 240,
              overflowY: "auto",
              backgroundColor: "#fff",
            }}
          >
            <List className="wordsearch-list">
              {suggestions?.map((item, idx) => (
                <ListItem
                  key={idx}
                  button
                  onClick={() => handleSelect(item)}
                  selected={idx === highlightedIndex}
                  sx={{
                    backgroundColor:
                      idx === highlightedIndex ? "#A69CAC" : "inherit",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor:
                        idx === highlightedIndex ? "#A69CAC" : "#D3D0D8",
                    },
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="h6" sx={{ color: "#000" }} align={"center"}>
                        {`${item.source} – ${item.translated}`}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </Box>
  );
}
