import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  Typography,
} from "@mui/material";
import CustomButton from "./CustomButton.jsx";
import { updateUser } from "../state/userSlice.js";
import { postNewDefaultLanguage } from "../utilities/serverCalls.js";
import "../styling/DefaultLanguageSelector.css";

const DefaultLanguageSelector = () => {
  const dispatch = useDispatch();
  const myLanguages = useSelector(
    (state) => state.user.user?.my_languages || []
  );

  const [selectedLangId, setSelectedLangId] = useState("");

  useEffect(() => {
    const defaultLang = myLanguages.find((lang) => lang.is_default);
    if (defaultLang) {
      setSelectedLangId(defaultLang.id);
    }
  }, [myLanguages]);

  const handleChange = (event) => {
    setSelectedLangId(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await postNewDefaultLanguage(selectedLangId);
      await dispatch(updateUser()).unwrap();
    } catch (error) {
      console.error("Failed to update default language:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" className="default-language-text">
        Select a Default Language
      </Typography>
      <FormControl component="fieldset" fullWidth className="default-language-form-control">
        <RadioGroup value={selectedLangId} onChange={handleChange}>
          {myLanguages.map((lang) => (
            <FormControlLabel
              key={lang.id}
              value={lang.id}
              control={<Radio />}
              className="default-language-form-control-label"
              label={
                <div className="language-choice-container">
                  <img
                    src={`https://flagcdn.com/${lang.flag_code}.svg`}
                    alt={`${lang.name} flag`}
                    className="flag-icon"
                  />
                  <div className="language-choice-text">{lang.name}</div>
                </div>
              }
            />
          ))}
        </RadioGroup>
        <div className="default-language-button-container">
          <CustomButton
            buttonFunction={handleSubmit}
            buttonText="Set Default Language"
            className="default-language-button"
          />
        </div>
      </FormControl>
    </>
  );
};

export default DefaultLanguageSelector;
