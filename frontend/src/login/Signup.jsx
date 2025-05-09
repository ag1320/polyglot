import { useEffect, useState } from "react";
import {
  postUser,
  fetchLanguages,
  checkUsername,
  checkEmail
} from "../utilities/serverCalls";
import "../styling/Signup.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import CustomButton from "../components/CustomButton";

const Signup = () => {
  // user
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");

  // error checking
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [allLanguages, setAllLanguages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // fetch users and languages
  const fetchData = async () => {
    try {
      const languages = await fetchLanguages();
      setAllLanguages(languages);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addUser = async () => {
    if (usernameError) {
      console.error("Username is already taken");
      return;
    }
    if (emailError) {
      console.error("Email is already associated with an account");
      return;
    }
    if (!email || !username || !password || !nativeLanguage) {
      console.error("All fields are required");
      setErrorMessage("All fields are required");
      return;
    }

    if (password !== passwordVerify) {
      console.error("Passwords do not match");
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await postUser(email, username, password, nativeLanguage.id);
      setEmail("");
      setUsername("");
      setPassword("");
      setPasswordVerify("");
      setNativeLanguage("");
      fetchData();
      setSuccess(true);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleLanguageChange = (event) => {
    setNativeLanguage(event.target.value);
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
        helperText={emailError ? "Email is already associated with an account" : ""}
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

      {/* Native Language Select */}
      <FormControl fullWidth variant="outlined" margin="normal" required>
        <InputLabel id="native-language-label">Native Language</InputLabel>
        <Select
          labelId="native-language-label"
          value={nativeLanguage}
          onChange={handleLanguageChange}
          label="Native Language"
        >
          <MenuItem value="" disabled>
            Select your native language
          </MenuItem>
          {allLanguages.map((language) => (
            <MenuItem
              key={language.code}
              value={language}
              sx={{ color: "black" }}
            >
              <img
                src={`https://flagcdn.com/${language.code}.svg`}
                alt={`${language.name} flag`}
                className="flag-icon"
              />
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submit Button */}
      <div className="component-padding">
        <CustomButton buttonFunction={addUser} buttonText={"Submit"}/>
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
