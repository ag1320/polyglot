import { Grid, Card } from "@mui/material";
import MyLanguages from "../components/MyLanguages.jsx";
import MyLevel from "../components/MyLevel.jsx"
import "../styling/Dashboard.css";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Card className="dashboard-card">
          <MyLanguages />
        </Card>
      </Grid>
      <Grid size={4}>
        <Card className="dashboard-card">
          <MyLevel />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
