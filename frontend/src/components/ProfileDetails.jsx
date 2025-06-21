import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { Avatar, Typography } from "@mui/material";
import { filterVoicesByLanguage } from "../utilities/helperFunctions.js";
import "../styling/ProfileDetails.css";
import VoiceSelect from "./VoiceSelect.jsx";

const ProfileDetails = () => {
  const [selectedVoiceTitle, setSelectedVoiceTitle] = useState("");

  const user = useSelector((state) => state.user.user);
  const allVoices = useSelector((state) => state.audio.voices);
  const nativeVoices = useMemo(() => {
    return filterVoicesByLanguage(allVoices, user?.native_language?.code);
  }, [allVoices, user?.native_language?.code]);

  const firstLetter = user?.first_name
    ? user.first_name.charAt(0).toUpperCase()
    : "";

  //TODO HANDLE SUBMIT

  return user ? (
    <>
      <Avatar className="profile-avatar">{firstLetter}</Avatar>

      <Typography variant="body1" color="#000">
        {`Email - ${user.email}`}
      </Typography>
      <Typography variant="body1" color="#000">
        {`Username - ${user.username}`}
      </Typography>

      <Typography variant="body1" color="#000" sx={{ mt: 2 }}>
        Native Language Voice Preference
      </Typography>
      <VoiceSelect
        voices={nativeVoices}
        setSelectedVoiceTitle={setSelectedVoiceTitle}
      />
    </>
  ) : (
    <Typography variant="h6" color="#000">
      Loading...
    </Typography>
  );
};

export default ProfileDetails;
