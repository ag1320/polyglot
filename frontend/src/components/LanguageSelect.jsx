// LanguageSelect.jsx
import {
  MiniFormControl,
  MiniSelect,
  MiniMenuItem,
  AddLanguageFormControl,
  AddLanguageInputLabel,
  AddLanguageSelect,
  AddLanguageMenuItem,
} from "../styling/LanguageSelect.js";
import "../styling/LanguageSelect.css";
import { InputLabel, Box } from "@mui/material";

const LanguageSelect = ({
  allLanguages,
  selectedLanguage,
  handleLanguageChange,
  inputLabel,
  mode = "full", // 'mini' or 'full or signup'
}) => {
  if (!allLanguages || allLanguages.length === 0 || !selectedLanguage) {
    return null;
  }

  console.log("Selected Language:", selectedLanguage);

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
              const selectedLang = allLanguages.find(
                (lang) => lang.id === selectedId
              );
              return selectedLang ? (
                <Box className="language-select-flag-container">
                  <img
                    src={`https://flagcdn.com/${selectedLang.code}.svg`}
                    alt={`${selectedLang.name} flag`}
                    className="flag-icon"
                  />
                </Box>
              ) : null;
            }}
          >
            {allLanguages.map((language) => (
              <MiniMenuItem key={language.code} value={language.id}>
                <img
                  src={`https://flagcdn.com/${language.code}.svg`}
                  alt={`${language.name} flag`}
                  className="flag-icon"
                />
              </MiniMenuItem>
            ))}
          </MiniSelect>
        </MiniFormControl>
      ) : (
        <AddLanguageFormControl fullWidth variant="outlined">
          <AddLanguageInputLabel>
            Add a New Language
          </AddLanguageInputLabel>
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
              const selectedLang = allLanguages.find(
                (lang) => lang.id === selectedId
              );
              return selectedLang ? (
                <Box className="language-select-flag-container">
                  <img
                    src={`https://flagcdn.com/${selectedLang.code}.svg`}
                    alt={`${selectedLang.name} flag`}
                    className="flag-icon"
                  />
                  <div className="language-select-name">{selectedLang.name}</div>
                </Box>
              ) : null;
            }}
          >
            {allLanguages.map((language) => (
              <AddLanguageMenuItem key={language.code} value={language.id}>
                <img
                  src={`https://flagcdn.com/${language.code}.svg`}
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

{
  /* <StyledFormControl ownerState={{ mode }} fullWidth variant="outlined" required>
  <StyledInputLabel ownerState={{ mode }}>{inputLabel}</StyledInputLabel>
  <StyledSelect
    ownerState={{ mode }}
    value={selectedLanguage}
    onChange={handleLanguageChange}
    label={inputLabel}
    IconComponent={showArrow ? undefined : () => null}
    renderValue={(selected) =>
      mode === "mini" ? (
        <img
          src={`https://flagcdn.com/${selected.code}.svg`}
          alt={`${selected.name} flag`}
          className="flag-icon"
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`https://flagcdn.com/${selected.code}.svg`}
            alt={`${selected.name} flag`}
            className="flag-icon"
          />
          {selected.name}
        </div>
      )
    }
  >
    {allLanguages.map((language) => (
      <StyledMenuItem
        key={language.code}
        value={language}
        ownerState={{ mode }}
      >
        <img
          src={`https://flagcdn.com/${language.code}.svg`}
          alt={`${language.name} flag`}
          className="flag-icon"
        />
        {mode === "full" && language.name}
      </StyledMenuItem>
    ))}
  </StyledSelect>
  {showHelperText && (
    <p style={{ fontSize: "0.75rem", marginTop: 4 }}>Select your language</p>
  )}
</StyledFormControl>; */
}
