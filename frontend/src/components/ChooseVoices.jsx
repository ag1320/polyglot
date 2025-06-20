import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMyLanguagesWithVoices } from "../utilities/helperFunctions.js";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { translateWord } from "../utilities/serverCalls.js";
import { sayWord } from "../utilities/helperFunctions.js";
import { postVoicePreference } from "../utilities/serverCalls.js";
import "../styling/ChooseVoices.css";

const ChooseVoices = () => {
  const myLanguagesWithVoices = useSelector(selectMyLanguagesWithVoices);
  const nativeLanguage = useSelector((state) => state?.user?.user?.native_language);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedVoices, setSelectedVoices] = useState({});

  useEffect(() => {
    const initialVoices = {};
    myLanguagesWithVoices.forEach((lang) => {
      const presetVoice = lang.voice;
      if (presetVoice && lang.voices.some((v) => v.title === presetVoice)) {
        initialVoices[lang.id] = presetVoice;
      } else if (lang.voices.length > 0) {
        initialVoices[lang.id] = lang.voices[0].title;
      }
    });
    setSelectedVoices(initialVoices);
  }, [myLanguagesWithVoices]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleVoiceSelect = async (language, voice) => {
    setSelectedVoices((prev) => ({
      ...prev,
      [language.id]: voice,
    }));

    const translatedWord = await translateWord(
      "hello",
      nativeLanguage.code,
      language.code
    );

    sayWord(voice, translatedWord);
  };

  const handleSubmit = () => {
    const currentLanguage = myLanguagesWithVoices[currentTab];
    const selectedVoice = selectedVoices[currentLanguage.id];
    if (selectedVoice) {
      postVoicePreference(selectedVoice, currentLanguage.id);
    }
  };

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Language Tabs"
      >
        {myLanguagesWithVoices.map((lang) => (
          <Tab key={lang.id} label={lang.name} />
        ))}
      </Tabs>

      <Box className="choose-voice-container">
        {myLanguagesWithVoices.map((lang, idx) => {
          if (idx !== currentTab) return null;
          return (
            <Box key={lang.id}>
              <Typography variant="h6" gutterBottom className="choose-voice-title">
                Choose a Voice
              </Typography>
              <RadioGroup
                value={selectedVoices[lang.id] || ""}
                onChange={(e) => handleVoiceSelect(lang, e.target.value)}
              >
                {lang.voices.map((voice, index) => (
                  <FormControlLabel
                    key={voice.title}
                    value={voice.title}
                    control={<Radio />}
                    label={`Voice ${index + 1}`}
                    className="voice-radio-label"
                  />
                ))}
              </RadioGroup>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
                fullWidth
              >
                Submit Preference
              </Button>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ChooseVoices;
