import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import ClientDashboard from "./dashboard/ClientDashboard";
import RequireAuth from "./authentication/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <ClientDashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;