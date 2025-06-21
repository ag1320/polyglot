import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMyLanguagesWithVoices } from "../utilities/helperFunctions.js";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { postVoicePreference } from "../utilities/serverCalls.js";
import "../styling/ChooseVoices.css";
import { translateWord } from "../utilities/serverCalls.js";
import CustomButton from "./CustomButton.jsx";
import VoiceSelect from "./VoiceSelect.jsx";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/userSlice.js";

const ChooseVoices = () => {
  const myLanguagesWithVoices = useSelector(selectMyLanguagesWithVoices);
  const user = useSelector((state) => state.user?.user);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedVoiceTitle, setSelectedVoiceTitle] = useState({});
  const [translatedWord, setTranslatedWord] = useState("Hello");
  const [currentLanguage, setCurrentLanguage] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentLanguage(myLanguagesWithVoices[currentTab]);

    const fetchTranslation = async () => {
      const translatedWord = await translateWord(
        "hello",
        user?.native_language?.code,
        myLanguagesWithVoices[currentTab]?.code
      );

      setTranslatedWord(translatedWord || "hello");
    };

    fetchTranslation();
    //eslint-disable-next-line
  }, [currentTab, myLanguagesWithVoices]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSubmit = () => {
    if (selectedVoiceTitle) {
      postVoicePreference(selectedVoiceTitle, currentLanguage.id);
    }
    dispatch(updateUser());
  };

  const findPreselectedIndex = (languageId) => {
    const currentLanguage = myLanguagesWithVoices.find(
      (lang) => lang.id === languageId
    );
    const preselectedIndex = currentLanguage?.voices?.findIndex(
      (voice) => voice.title === currentLanguage?.voice
    );
    return preselectedIndex !== -1 ? preselectedIndex : 0;
  };

  return (
    <>
      <Typography variant="body1" color="#000" sx={{ mt: 2 }}>
        My Languages Voice Preferences
      </Typography>
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

      <>
        {myLanguagesWithVoices.map((lang, idx) => {
          if (idx !== currentTab) return null;
          return (
            <>
              <Box key={lang.id}>
                <VoiceSelect
                  voices={lang.voices}
                  setSelectedVoiceTitle={setSelectedVoiceTitle}
                  wordToSpeak={translatedWord}
                  preselectedIndex={() => findPreselectedIndex(lang.id)}
                />
              </Box>
              <div className="choose-voice-button-container">
                <CustomButton
                  buttonText={"Submit"}
                  buttonFunction={handleSubmit}
                  className="choose-voice-button"
                />
              </div>
            </>
          );
        })}
      </>
    </>
  );
};

export default ChooseVoices;
