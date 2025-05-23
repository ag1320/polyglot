import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
} from "@mui/material";
import CustomButton from "./CustomButton";
import { updateUser } from "../state/userSlice";
import { postNewDefaultLanguage } from "../utilities/serverCalls.js";

const DefaultLanguageSelectorCard = () => {
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
    <Card className="add-language-card">
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Select Default Language</FormLabel>
        <RadioGroup value={selectedLangId} onChange={handleChange}>
          {myLanguages.map((lang) => (
            <FormControlLabel
              key={lang.id}
              value={lang.id}
              control={<Radio />}
              label={
                <>
                  <div>{lang.name}</div>
                  <img
                    src={`https://flagcdn.com/${lang.code}.svg`}
                    alt={`${lang.name} flag`}
                    className="flag-icon"
                  />
                </>
              }
            />
          ))}
        </RadioGroup>
        <CustomButton
          buttonFunction={handleSubmit}
          buttonText="Set Default Language"
        />
      </FormControl>
    </Card>
  );
};

export default DefaultLanguageSelectorCard;
