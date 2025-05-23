import { Card } from "@mui/material";
import LanguageSelect from "../components/LanguageSelect";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CustomButton from "../components/CustomButton.jsx"
import { postNewUserLanguage } from "../utilities/serverCalls.js";
import { updateUser } from "../state/userSlice.js";
import { Typography } from "@mui/material";

const AddLanguageCard = () => {
  const [newLanguage, setNewLanguage] = useState({});

  const allLanguages = useSelector((state) => state.languages.allLanguages);
  const myLanguages = useSelector((state) => state.user.user?.my_languages);
  const dispatch = useDispatch();

  const handleLanguageChange = (e) => {
    const selectedLang = allLanguages.find(
      (language) => language.id === e.target.value
    );
    setNewLanguage(selectedLang);
  };

  const handleSubmit = async () =>{
    const isDefault = myLanguages.length === 0;
    await postNewUserLanguage(newLanguage, isDefault)
    await dispatch(updateUser()).unwrap();
  }

  return (
    <Card className="add-language-card">
      <Typography variant="h5" color = "black">
        Start Learning a New Language
      </Typography>
      <LanguageSelect
        allLanguages={allLanguages}
        selectedLanguage={newLanguage}
        handleLanguageChange={handleLanguageChange}
        inputLabel="New Language"
        mode="full"
      />
      <CustomButton buttonFunction = {handleSubmit} buttonText = {"Submit"}/>
    </Card>
  );
};

export default AddLanguageCard;
