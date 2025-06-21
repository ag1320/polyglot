import { useSelector } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import "../styling/ProfileDetails.css";

const ProfileDetails = () => {

  const user = useSelector((state) => state.user.user);

  const firstLetter = user?.first_name
    ? user.first_name.charAt(0).toUpperCase()
    : "";



  return user ? (
    <>
      <Avatar className="profile-avatar">{firstLetter}</Avatar>

      <Typography variant="body1" color="#000">
        {`Email - ${user.email}`}
      </Typography>
      <Typography variant="body1" color="#000">
        {`Username - ${user.username}`}
      </Typography>
    </>
  ) : (
    <Typography variant="h6" color="#000">
      Loading...
    </Typography>
  );
};

export default ProfileDetails;
