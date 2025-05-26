import { Grid } from "@mui/material";
import AddLanguageCard from "../components/AddLanguageCard";
import DefaultLanguageSelectorCard from "../components/DefaultLanguageSelectorCard.jsx";
import ProfileCard from "../components/ProfileCard.jsx";

const Profile = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <Grid size={4}>
        <ProfileCard />
      </Grid>
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
