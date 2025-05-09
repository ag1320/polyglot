import Signup from "./Signup";
import Login from "./Login";
import { Button, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import "../styling/Auth.css";
import logo from "../../images/polyglot-icon.png";
import CustomButton from "../components/CustomButton";

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
        {modeEnum === 0 ? (
          <Typography variant="h4">Welcome to Polyglot!</Typography>
        ) : (
          <></>
        )}
        <div className="divide-line" />
        {modeEnum === 0 ? (
          <>
            <div className="component-padding">
              <CustomButton
                buttonFunction={() => setModeEnum(1)}
                buttonText={"Login"}
              />
            </div>
            <div className="component-padding">
              <Typography>OR</Typography>
            </div>
            <div className="component-padding">
              <CustomButton
                buttonFunction={() => setModeEnum(2)}
                buttonText={"Signup"}
              />
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
              <CustomButton
                buttonFunction={() => setModeEnum(2)}
                buttonText={"Signup"}
              />
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
              <CustomButton
                buttonFunction={() => setModeEnum(1)}
                buttonText={"Login"}
              />
            </div>
          </>
        )}
      </AuthCard>
    </div>
  );
};

export default Auth;
