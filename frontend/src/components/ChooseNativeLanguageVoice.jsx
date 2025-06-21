import { useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { Typography } from "@mui/material";
import { filterVoicesByLanguage } from "../utilities/helperFunctions.js";
import VoiceSelect from "./VoiceSelect.jsx";
import CustomButton from "./CustomButton.jsx";
import "../styling/ChooseNativeLanguageVoice.css";
import { postNativeVoicePreference } from "../utilities/serverCalls.js";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/userSlice.js";

const ChooseNativeLanguageVoice = () => {
  const dispatch = useDispatch();
  const [selectedVoiceTitle, setSelectedVoiceTitle] = useState("");
  const [preselectedIndex, setPreselectedIndex] = useState(0);

  const user = useSelector((state) => state.user.user);
  const allVoices = useSelector((state) => state.audio.voices);
  const nativeVoices = useMemo(() => {
    return filterVoicesByLanguage(allVoices, user?.native_language?.code);
  }, [allVoices, user?.native_language?.code]);

  const handleSubmit = () => {
    if (selectedVoiceTitle) {
      postNativeVoicePreference(selectedVoiceTitle);
      dispatch(updateUser());
    } else {
      console.warn("No voice selected");
    }
  };

  useEffect(() => {
    const preselectedI = nativeVoices.findIndex((voice) => {
      return voice.title === user?.native_language_voice;
    });
    setPreselectedIndex(preselectedI);
    //eslint-disable-next-line
  }, [user, allVoices]);

  return user ? (
    <>
      <Typography variant="body1" color="#000" sx={{ mt: 2 }}>
        Native Language Voice Preference
      </Typography>
      <VoiceSelect
        voices={nativeVoices}
        setSelectedVoiceTitle={setSelectedVoiceTitle}
        wordToSpeak={"hello"}
        preselectedIndex={preselectedIndex}
      />
      <div className="native-language-voice-submit-button-container">
        <CustomButton
          buttonText={"Submit"}
          buttonFunction={handleSubmit}
          className="native-language-voice-submit-button"
        />
      </div>
    </>
  ) : (
    <Typography variant="h6" color="#000">
      Loading...
    </Typography>
  );
};

export default ChooseNativeLanguageVoice;
