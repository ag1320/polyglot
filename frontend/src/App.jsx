//TODO - add a modal to show the user that they are about to be logged out
//fix signup native language box styling
//profile picture or the first letter of their name
//profile page styling
//Make level (based on score) for each language
//fix the language select box in the signup form
//add a delete language card to profile page
//Change user detail in profile card
//Create a leaderboard card on profile page - display language scores/levels/progress bar
//practice weak words flash card mode
//practice all words flash card mode
//lightning flashcard mode
//clip art for each word
//audio clip for each word
// optimize add word search bar, batch translate words?
// make a button on the add word search bar to find alternative translations
// undo adding previous word
//add a reset word parameters/stats feature
// make custom word add (for words not in the 10000 most common words)
//do not allow user to submit duplicate word combos
//signout tooltip above the icon

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
import Flashcards from "./pages/Flashcards.jsx";


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
          <Route path = "/flashcards" element={<Flashcards/>}/>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
