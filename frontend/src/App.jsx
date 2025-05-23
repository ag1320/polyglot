//TODO - add a modal to show the user that they are about to be logged out

// App.jsx
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Auth from "./login/Auth";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx"
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MyWords from "./pages/MyWords.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import { useDispatch } from "react-redux";
import { loadLanguages } from "./state/languageSlice.js";
import GetUsers from "./data-fetch/GetUser.jsx";
import useTokenWatchdog from "./utilities/useTokenWatchdog.js";


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useTokenWatchdog();

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  useEffect(() => {
    dispatch(loadLanguages());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <GetUsers />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mywords" element={<MyWords />} />
          <Route path = "/profile" element={<Profile/>}/>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
