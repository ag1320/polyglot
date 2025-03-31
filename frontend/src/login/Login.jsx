import { useState } from "react";
import { verifyUser } from "../utilities/serverCalls";
import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    setErrorMessage("");
    try {
      const isVerified = await verifyUser(username, password);
      setUsername("");
      setPassword("");
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
