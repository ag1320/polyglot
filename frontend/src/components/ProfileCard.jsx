import {Card} from "@mui/material"
import "../styling/ProfileCard.css"
import { useSelector } from "react-redux";
import {Avatar } from "@mui/material";

const ProfileCard = () => {

  const user = useSelector((state) => state.user.user);
  const firstLetter = user?.first_name ? user.first_name.charAt(0).toUpperCase() : '';

  return (
    <Card className="profile-card">
      <Avatar>{firstLetter}</Avatar>
    </Card>
  );
}

export default ProfileCard;