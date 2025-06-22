import { Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "../styling/MyLanguagesCard.css";
import { BigErrorIcon } from "../styling/MyLanguagesCard.js";

const MyLanguages = () => {
  const myLanguages = useSelector((state) => state.user.user?.my_languages);

  return (
    <>
      {myLanguages?.length > 0 ? (
        <>
          <Typography variant="h5" color="black" className="my-languages-text">
            My Languages:
          </Typography>

          <div className="language-chip-container">
            {myLanguages.map((lang) => (
              <div key={lang.code} className="language-chip">
                <img
                  src={`https://flagcdn.com/${lang.flag_code}.svg`}
                  alt={`${lang.name} flag`}
                  className="language-flag"
                />
                <span className="language-name">{lang.name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Typography variant="h5" color="black" className="add-language-text">
            No languages yet!
          </Typography>
          <BigErrorIcon />
          <Typography variant="h5" color="black" className="add-language-text">
            Add a Language from the Profile Menu
          </Typography>
        </>
      )}
    </>
  );
};

export default MyLanguages;
