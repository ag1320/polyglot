import Signup from "./Signup";
import Login from "./Login";
import { Button, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import "../styling/Auth.css";
import logo from "../../images/polyglot-icon.png";

const AuthCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundSecondary.main,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  width: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Auth = () => {
  // 0 = default, 1 = login, 2 = signup
  const [modeEnum, setModeEnum] = useState(0);

  return (
    <div className="auth-container">
      <AuthCard>
        <img src={logo} alt="Logo" className="auth-logo" />
        <div className="divide-line" />
        {modeEnum === 0 ? (
          <>
            <div className="component-padding">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setModeEnum(1)}
              >
                Login
              </Button>
            </div>
            <div className="component-padding">
              <Typography>OR</Typography>
            </div>
            <div className="component-padding">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setModeEnum(2)}
              >
                Signup
              </Button>
            </div>
          </>
        ) : modeEnum === 1 ? (
          <>
            <Login />
            <div className="divide-line" />
            <div className="component-padding">
              <Typography>OR</Typography>
            </div>
            <div className="component-padding">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setModeEnum(2)}
              >
                Signup
              </Button>
            </div>
          </>
        ) : (
          <>
            <Signup />
            <div className="divide-line" />
            <div className="component-padding">
              <Typography>OR</Typography>
            </div>
            <div className="component-padding">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setModeEnum(1)}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </AuthCard>
    </div>
  );
};

export default Auth;
