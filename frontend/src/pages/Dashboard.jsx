import { Grid } from "@mui/material";
import MyLanguagesCard from "../components/MyLanguagesCard.jsx";

const Dashboard = () => {
  return (
    <Grid container>
      <Grid size={4}>
        <MyLanguagesCard />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
