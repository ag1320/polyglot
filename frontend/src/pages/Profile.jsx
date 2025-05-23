import { Grid } from "@mui/material";
import AddLanguageCard from "../components/AddLanguageCard";
import DefaultLanguageSelectorCard from "../components/DefaultLanguageSelectorCard.jsx";

const Profile = () => {
  return (
    <Grid container>
      <Grid size={4}>
        <AddLanguageCard />
      </Grid>
      <Grid size={4}>
        <DefaultLanguageSelectorCard />
      </Grid>
    </Grid>
  );
};

export default Profile;
