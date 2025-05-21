import "../styling/Dashboard.css";
import Sidebar from "../components/Sidebar";
import MainPage from "./MainPage";
import { Grid } from "@mui/material";

const Dashboard = () => {
  return (
    <Grid container className="main-layout">
      <Grid item xs={1}>
        <Sidebar />
      </Grid>
      <Grid item xs={11} className="main-content-grid-container">
        <MainPage />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
