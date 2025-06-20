import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const ProfileDetails = () => {
  const user = useSelector((state) => state.user.user);
  const firstLetter = user?.first_name
    ? user.first_name.charAt(0).toUpperCase()
    : "";

  return <Avatar>{firstLetter}</Avatar>;
};

export default ProfileDetails;
