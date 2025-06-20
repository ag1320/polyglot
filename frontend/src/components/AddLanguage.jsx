import { Card } from "@mui/material";
import LanguageSelect from "./LanguageSelect.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CustomButton from "./CustomButton.jsx";
import { postNewUserLanguage } from "../utilities/serverCalls.js";
import { updateUser } from "../state/userSlice.js";
import { Typography } from "@mui/material";
import "../styling/AddLanguage.css";

const AddLanguage = () => {
  const [newLanguage, setNewLanguage] = useState({});

  const allLanguages = useSelector((state) => state.languages.allLanguages);
  const myLanguages = useSelector((state) => state.user.user?.my_languages);
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
    await postNewUserLanguage(newLanguage, isDefault);
    await dispatch(updateUser()).unwrap();
  };

const allLanguagesFiltered = allLanguages.filter(
  (language) =>
    language.id !== nativeLanguage?.id &&
    !myLanguages?.some((myLang) => myLang.id === language.id)
);


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
