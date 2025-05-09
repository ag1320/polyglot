import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {useEffect} from "react";
import { useSelector } from "react-redux";
import Auth from "./login/Auth";
import Dashboard from "./pages/Dashboard.jsx"; // Protected page
import NotFound from "./pages/NotFound.jsx"; // Optional 404 page
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  useEffect(() => {
    // If user is already authenticated, redirect to the dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Auth />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
