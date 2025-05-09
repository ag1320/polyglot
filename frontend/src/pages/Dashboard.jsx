import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  
  return (
    <Button onClick={logout} variant="contained" color="primary">
      Logout
    </Button>
  );
}

export default Dashboard;