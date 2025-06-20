import { Grid } from "@mui/material";
import AddLanguage from "../components/AddLanguage";
import DefaultLanguageSelector from "../components/DefaultLanguageSelector.jsx";
import ChooseVoices from "../components/ChooseVoices.jsx";
import ProfileDetails from "../components/ProfileDetails.jsx";
import MyLevel from "../components/MyLevel.jsx";
import { Card } from "@mui/material";
import "../styling/Profile.css";

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
        <Card className="profile-card">
          <ProfileDetails />
        </Card>
      </Grid>
      <Grid size={4}>
        <Card className="profile-card">
          <AddLanguage />
        </Card>
      </Grid>
      <Grid size={4}>
        <Card className="profile-card">
          <DefaultLanguageSelector />
        </Card>
      </Grid>
      <Grid size={4}>
        <Card className="profile-card">
          <ChooseVoices />
        </Card>
      </Grid>
      <Grid size={4}>
        <Card className="profile-card">
          <MyLevel />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
