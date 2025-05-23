import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const useTokenWatchdog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Failed to decode token", err);
      return;
    }

    const expiry = decoded.exp * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      if (expiry && now > expiry) {
        dispatch(logoutUser());
        navigate("/");
        clearInterval(interval);
      }
    }, 10000);// Check every 10 seconds

    return () => clearInterval(interval);
  }, [dispatch, navigate]);
};

export default useTokenWatchdog;
