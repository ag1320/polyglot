import { useState } from "react";
import { postUser, checkUsername, checkEmail } from "../utilities/serverCalls";
import "../styling/Signup.css";
import { TextField, Typography, Snackbar, Alert } from "@mui/material";
import CustomButton from "../components/CustomButton";
import LanguageSelect from "../components/LanguageSelect";
import { useSelector } from "react-redux";
import { filterVoicesByLanguage } from "../utilities/helperFunctions";

const Signup = () => {
  // user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState({});
  const [learningLanguage, setLearningLanguage] = useState({});

  // error checking
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const allLanguages = useSelector((state) => state.languages.allLanguages);
  const voices = useSelector((state) => state.audio.voices);
  const [allLearningLanguages, setAllLearningLanguages] =
    useState(allLanguages);

  const addUser = async () => {
    if (usernameError) {
      console.error("Username is already taken");
      return;
    }
    if (emailError) {
      console.error("Email is already associated with an account");
      return;
    }
    if (!email || !username || !password || !nativeLanguage || !name) {
      console.error("All fields are required");
      setErrorMessage("All fields are required");
      return;
    }

    if (password !== passwordVerify) {
      console.error("Passwords do not match");
      setErrorMessage("Passwords do not match");
      return;
    }

    const nativeLanguageVoice = filterVoicesByLanguage(
      voices,
      nativeLanguage.code
    )[0]?.title;
    const learningLanguageVoice = filterVoicesByLanguage(
      voices,
      learningLanguage.code
    )[0]?.title;

    try {
      await postUser(
        email,
        username,
        password,
        nativeLanguage.id,
        nativeLanguageVoice,
        learningLanguage.id,
        learningLanguageVoice,
        name
      );
      setEmail("");
      setUsername("");
      setPassword("");
      setPasswordVerify("");
      setNativeLanguage({});
      setLearningLanguage({});
      setName("");
      setSuccess(true);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleNativeLanguageChange = (e) => {
    const selectedLang = allLanguages.find(
      (language) => language.id === e.target.value
    );
    setNativeLanguage(selectedLang);

    const filtered = allLanguages.filter((lang) => lang.id !== selectedLang.id);
    setAllLearningLanguages(filtered);

    // Reset learning language if it matches the new native language
    if (learningLanguage?.id === selectedLang.id) {
      setLearningLanguage({});
    }
  };

  const handleLearningLanguageChange = (e) => {
    const selectedLang = allLearningLanguages.find(
      (language) => language.id === e.target.value
    );
    setLearningLanguage(selectedLang);
  };

  const handleErrorClose = () => {
    setErrorMessage("");
  };

  const handleSuccessClose = () => {
    setSuccess(false);
  };

  const handleCheckUsername = async () => {
    if (!username) {
      setUsernameError(false);
      return;
    }
    const response = await checkUsername(username);
    if (response === undefined) {
      setErrorMessage("Trouble checking username");
      return;
    }
    setUsernameError(!response.isAvailable);
  };

  const handleCheckEmail = async () => {
    if (!email) {
      setEmailError(false);
      return;
    }
    const response = await checkEmail(email);
    if (response === undefined) {
      setErrorMessage("Trouble checking email");
      return;
    }
    setEmailError(!response.isAvailable);
  };

  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        Signup
      </Typography>
      {/* Email TextField */}
      <TextField
        label="Name"
        variant="outlined"
        required
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Email"
        variant="outlined"
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => {
          handleCheckEmail();
        }}
        margin="normal"
        error={emailError}
        helperText={
          emailError ? "Email is already associated with an account" : ""
        }
      />

      {/* Username TextField */}
      <TextField
        label="Username"
        variant="outlined"
        required
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => {
          handleCheckUsername();
        }}
        margin="normal"
        error={usernameError}
        helperText={usernameError ? "Username is already taken" : ""}
      />

      {/* Password TextField */}
      <TextField
        label="Password"
        type={"password"}
        variant="outlined"
        required
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Verify Password"
        type={"password"}
        variant="outlined"
        required
        fullWidth
        value={passwordVerify}
        onChange={(e) => setPasswordVerify(e.target.value)}
        margin="normal"
      />

      <LanguageSelect
        allLanguages={allLanguages}
        selectedLanguage={nativeLanguage}
        handleLanguageChange={handleNativeLanguageChange}
        inputLabel="Native Language"
        mode="signup"
      />

      <LanguageSelect
        allLanguages={allLearningLanguages}
        selectedLanguage={learningLanguage}
        handleLanguageChange={handleLearningLanguageChange}
        inputLabel="1st Language"
        mode="signup"
      />

      {/* Submit Button */}
      <div className="component-padding">
        <CustomButton buttonFunction={addUser} buttonText={"Submit"} />
      </div>
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error" className="alert">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          className="alert"
        >
          Signup Successful
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
