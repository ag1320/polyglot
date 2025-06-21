import LanguageSelect from "./LanguageSelect.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CustomButton from "./CustomButton.jsx";
import { postNewUserLanguage } from "../utilities/serverCalls.js";
import { updateUser } from "../state/userSlice.js";
import { Typography } from "@mui/material";
import "../styling/AddLanguage.css";
import { filterVoicesByLanguage } from "../utilities/helperFunctions.js";

const AddLanguage = () => {
  const [newLanguage, setNewLanguage] = useState({});

  const allLanguages = useSelector((state) => state.languages.allLanguages);
  const myLanguages = useSelector((state) => state.user.user?.my_languages);
  const voices = useSelector((state) => state.audio.voices);
  const nativeLanguage = useSelector(
    (state) => state.user.user?.native_language
  );
  const dispatch = useDispatch();

  const handleLanguageChange = (e) => {
    const selectedLang = allLanguages.find(
      (language) => language.id === e.target.value
    );
    setNewLanguage(selectedLang);
  };

  const handleSubmit = async () => {
    const isDefault = myLanguages.length === 0;
    const voice = filterVoicesByLanguage(
      voices,
      newLanguage.code
    )[0]?.title;
    await postNewUserLanguage(newLanguage, isDefault, voice);
    await dispatch(updateUser()).unwrap();
  };

const allLanguagesFiltered = allLanguages.filter(
  (language) =>
    language.id !== nativeLanguage?.id &&
    !myLanguages?.some((myLang) => myLang.id === language.id)
);

console.log("voices", voices);


  return (
    <>
      <Typography variant="h5" color="black">
        Start Learning a New Language
      </Typography>
      <LanguageSelect
        allLanguages={allLanguagesFiltered}
        selectedLanguage={newLanguage}
        handleLanguageChange={handleLanguageChange}
        inputLabel="New Language"
        mode="full"
      />
      <div className="add-language-button-container">
        <CustomButton
          className="add-language-button"
          buttonFunction={handleSubmit}
          buttonText={"Submit"}
        />
      </div>
    </>
  );
};

export default AddLanguage;
