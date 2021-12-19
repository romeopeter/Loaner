import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage"
import Login from "./authentication/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
