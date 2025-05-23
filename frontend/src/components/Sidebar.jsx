import "../styling/Sidebar.css";
import pip from "../../images/Pip.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Tooltip } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import PublicIcon from "@mui/icons-material/Public";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../state/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router-dom";
import LanguageSelect from "./LanguageSelect";
import { setSelectedLanguage } from "../state/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLanguages = useSelector((state) => state.user.user?.my_languages);
  const selectedLanguage = useSelector((state) => state.user?.selectedLanguage);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleLanguageChange = (event) => {
    const selectedLang = userLanguages.find(
      (language) => language.id === event.target.value
    );
    dispatch(setSelectedLanguage(selectedLang));
  };

  console.log("Selected Language:", selectedLanguage);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Link to="/dashboard" className="sidebar-link">
          <IconButton className="sidebar-icon-button">
            <img src={pip} alt="Pip" className="pip" />
          </IconButton>
        </Link>
      </div>
      <div className="sidebar-content">
        <Tooltip
          title={
            <>
              Learning
              <br />
              Language
            </>
          }
          arrow
          placement="top"
        >
          <div>
            <LanguageSelect
              allLanguages={userLanguages}
              selectedLanguage={selectedLanguage}
              handleLanguageChange={handleLanguageChange}
              inputLabel=""
              mode="mini"
            />
          </div>
        </Tooltip>
        <Tooltip title="Profile" arrow placement="top">
          <Link to="/profile" className="sidebard-link">
            <IconButton className="sidebar-icon-button">
              <AccountCircleIcon className="sidebar-icon" fontSize="large" />
            </IconButton>
          </Link>
        </Tooltip>
        <IconButton className="sidebar-icon-button">
          <TranslateIcon className="sidebar-icon" fontSize="large" />
        </IconButton>
        <IconButton className="sidebar-icon-button">
          <PublicIcon className="sidebar-icon" fontSize="large" />
        </IconButton>
        <IconButton className="sidebar-icon-button">
          <FlashOnIcon className="sidebar-icon" fontSize="large" />
        </IconButton>
        <Tooltip title="My Words" arrow placement="top">
          <Link to="/mywords" className="sidebar-link">
            <IconButton className="sidebar-icon-button">
              <MenuBookIcon className="sidebar-icon" fontSize="large" />
            </IconButton>
          </Link>
        </Tooltip>
        <IconButton onClick={logout} className="sidebar-icon-button">
          <LogoutIcon className="sidebar-icon" fontSize="large" />
        </IconButton>
      </div>
    </aside>
  );
};

export default Sidebar;
