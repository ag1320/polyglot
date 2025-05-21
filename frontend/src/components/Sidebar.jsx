import React from "react";
import "../styling/Sidebar.css";
import pip from "../../images/Pip.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Tooltip } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import PublicIcon from "@mui/icons-material/Public";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { useDispatch } from "react-redux";
import { logoutUser } from "../state/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <img src={pip} alt="Pip" className="pip" />
      <div className="sidebar-content">
        <IconButton className="sidebar-icon-button">
          <AccountCircleIcon className="sidebar-icon" fontSize="large" />
        </IconButton>
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
          <IconButton className="sidebar-icon-button">
            <MenuBookIcon className="sidebar-icon" fontSize="large" />
          </IconButton>
        </Tooltip>
        <IconButton onClick={logout} className="sidebar-icon-button">
          <LogoutIcon className="sidebar-icon" fontSize="large" />
        </IconButton>
      </div>
    </aside>
  );
};

export default Sidebar;
