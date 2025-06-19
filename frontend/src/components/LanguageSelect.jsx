// LanguageSelect.jsx
import {
  MiniFormControl,
  MiniSelect,
  MiniMenuItem,
  AddLanguageFormControl,
  AddLanguageInputLabel,
  AddLanguageSelect,
  AddLanguageMenuItem,
  SignupLanguageFormControl,
  SignupLanguageInputLabel,
  SignupLanguageSelect,
  SignupLanguageMenuItem,
} from "../styling/LanguageSelect.js";
import "../styling/LanguageSelect.css";
import { Box, Tooltip } from "@mui/material";

const LanguageSelect = ({
  allLanguages,
  selectedLanguage,
  handleLanguageChange,
  inputLabel,
  mode = "full", // 'mini', 'full', or 'signup'
}) => {
  if (!allLanguages || allLanguages.length === 0) {
    return null;
  }

  const sortedLanguages = [...allLanguages].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  return (
    <>
      {mode === "mini" ? (
        <MiniFormControl fullWidth variant="outlined">
          <MiniSelect
            value={selectedLanguage.id}
            onChange={handleLanguageChange}
            label={inputLabel}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#474973",
                },
              },
            }}
            renderValue={(selectedId) => {
              const selectedLang = sortedLanguages.find(
                (lang) => lang.id === selectedId
              );
              return selectedLang ? (
                <Box className="language-select-flag-container">
                  <img
                    src={`https://flagcdn.com/${selectedLang.flag_code}.svg`}
                    alt={`${selectedLang.name} flag`}
                    className="flag-icon"
                  />
                </Box>
              ) : null;
            }}
          >
            {sortedLanguages.map((language) => (
              <MiniMenuItem key={language.code} value={language.id}>
                <Tooltip
                  title={language.name}
                  key={language.code}
                  arrow
                  placement="top"
                >
                  <img
                    src={`https://flagcdn.com/${language.flag_code}.svg`}
                    alt={`${language.name} flag`}
                    className="flag-icon"
                  />
                </Tooltip>
              </MiniMenuItem>
            ))}
          </MiniSelect>
        </MiniFormControl>
      ) : mode === "signup" ? (
        <>
          <SignupLanguageFormControl fullWidth variant="outlined">
            <SignupLanguageInputLabel>
              Select a Language
            </SignupLanguageInputLabel>
            <SignupLanguageSelect
              value={selectedLanguage.id}
              onChange={handleLanguageChange}
              label={inputLabel}
              MenuProps={{
                PaperProps: {
                  sx: {
                    color: "000",
                  },
                },
              }}
              renderValue={(selectedId) => {
                const selectedLang = sortedLanguages.find(
                  (lang) => lang.id === selectedId
                );
                return selectedLang ? (
                  <Box className="language-select-flag-container">
                    <img
                      src={`https://flagcdn.com/${selectedLang.flag_code}.svg`}
                      alt={`${selectedLang.name} flag`}
                      className="flag-icon"
                    />
                    <div className="language-select-name">
                      {selectedLang.name}
                    </div>
                  </Box>
                ) : null;
              }}
            >
              {sortedLanguages.map((language) => (
                <SignupLanguageMenuItem key={language.code} value={language.id}>
                  <img
                    src={`https://flagcdn.com/${language.flag_code}.svg`}
                    alt={`${language.name} flag`}
                    className="flag-icon"
                  />
                  <div className="language-select-name">{language.name}</div>
                </SignupLanguageMenuItem>
              ))}
            </SignupLanguageSelect>
          </SignupLanguageFormControl>
        </>
      ) : (
        <AddLanguageFormControl fullWidth variant="outlined">
          <AddLanguageInputLabel>Add a New Language</AddLanguageInputLabel>
          <AddLanguageSelect
            value={selectedLanguage.id}
            onChange={handleLanguageChange}
            label={inputLabel}
            MenuProps={{
              PaperProps: {
                sx: {
                  color: "000",
                },
              },
            }}
            renderValue={(selectedId) => {
              const selectedLang = sortedLanguages.find(
                (lang) => lang.id === selectedId
              );
              return selectedLang ? (
                <Box className="language-select-flag-container">
                  <img
                    src={`https://flagcdn.com/${selectedLang.flga_code}.svg`}
                    alt={`${selectedLang.name} flag`}
                    className="flag-icon"
                  />
                  <div className="language-select-name">
                    {selectedLang.name}
                  </div>
                </Box>
              ) : null;
            }}
          >
            {sortedLanguages.map((language) => (
              <AddLanguageMenuItem key={language.code} value={language.id}>
                <img
                  src={`https://flagcdn.com/${language.flag_code}.svg`}
                  alt={`${language.name} flag`}
                  className="flag-icon"
                />
                <div className="language-select-name">{language.name}</div>
              </AddLanguageMenuItem>
            ))}
          </AddLanguageSelect>
        </AddLanguageFormControl>
      )}
    </>
  );
};

export default LanguageSelect;
