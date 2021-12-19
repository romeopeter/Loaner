import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage"
import Login from "./authentication/Login"
import Register from "./authentication/Register"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
