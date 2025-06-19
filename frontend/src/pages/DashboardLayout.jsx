import { Outlet } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import Sidebar from "../components/Sidebar";
import "../styling/DashboardLayout.css";
import { styled } from "@mui/material/styles";

const CustomCard = styled(Card)(({theme}) => ({
  backgroundColor: theme.palette.backgroundSecondary.main,
  margin: "10px",
  padding: "30px",
  borderRadius: "25px",
  height: "calc(100vh - 20px)",
}));

const DashboardLayout = () => {
  return (
    <Grid container className="main-layout">
      <Grid size={1} className="sidebar-grid">
        <Sidebar />
      </Grid>
      <Grid size={11} className="main-content-grid-container">
        <CustomCard className="app-content-card">
          <Outlet /> {/* This is where child routes will render */}
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
