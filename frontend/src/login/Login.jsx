import { useState } from "react";
import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/userSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
  setErrorMessage("");
  try {
    const resultAction = await dispatch(loginUser({ username, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      console.log("Login successful:");
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

  return (
    <div>
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
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        required
        margin="normal"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="component-padding">
        <Button variant="contained" color="primary" fullWidth onClick={login}>
          Submit
        </Button>
      </div>
      <Snackbar open={errorMessage !== ""} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
