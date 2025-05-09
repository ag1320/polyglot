import { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/userSlice.js";
import { useNavigate } from "react-router-dom";
import "../styling/Login.css";
import { styled } from "@mui/material/styles";
import CustomButton from "../components/CustomButton.jsx";

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    border: `2px solid white`,
    borderRadius: "4px",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    border: `2px solid ${theme.palette.primary.main}`, // Use primary color for the border when checked
    color: theme.palette.primary.main, // Use the primary color for the check mark as well
  },
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUsernameSaved, setIsUsernameSaved] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    setErrorMessage("");
    try {
      const resultAction = await dispatch(
        loginUser({ username, password, isUsernameSaved })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        console.log("Login successful");
        setUsername("");
        setPassword("");
        navigate("/dashboard");
      } else {
        setErrorMessage(resultAction.payload || "Login failed");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkLogin = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  return (
    <div className="login-container">
      <Typography variant="h6" align="center" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        required
        fullWidth
        value={username}
        margin="normal"
        onChange={handleUsernameChange}
        onKeyDown={checkLogin}
        className="custom-textfield"
      />
      <div className="checkbox-padding">
        <FormControlLabel
          control={
            <CustomCheckbox
              checked={isUsernameSaved}
              onChange={(e) => setIsUsernameSaved(e.target.checked)}
              out
            />
          }
          label="Save Username"
          size="small"
        />
      </div>
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        required
        margin="normal"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
        onKeyDown={checkLogin}
        className="custom-textfield"
      />
      <div className="component-padding">
        <CustomButton
          buttonFunction={login}
          buttonText="Submit"
        />
      </div>
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
