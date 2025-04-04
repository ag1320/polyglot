import { useEffect, useState } from "react";
import { postUser, fetchUsers, fetchLanguages } from "../utilities/serverCalls";
import "../styling/Signup.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const Signup = () => {
  // user
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");

  // error checking
  const [usernameError, setUsernameError] = useState(false);
  const [allUsernames, setAllUsernames] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // fetch users and languages
  const fetchData = async () => {
    try {
      const users = await fetchUsers();
      const languages = await fetchLanguages();
      setAllUsernames(users.map((user) => user.username));
      setAllLanguages(languages);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // check if username is taken
  useEffect(() => {
    if (allUsernames.includes(username)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  }, [username, allUsernames]);

  const addUser = async () => {
    if (usernameError) {
      console.error("Username is already taken");
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
      setErrorMessage(err.message)
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
        margin="normal"
      />

      {/* Username TextField */}
      <TextField
        label="Username"
        variant="outlined"
        required
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
              sx = {{color: "black"}}
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
        <Button variant="contained" color="primary" fullWidth onClick={addUser}>
          Submit
        </Button>
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
        <Alert onClose={handleSuccessClose} severity="success" className="alert">
          Signup Successful
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
