import { Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";

import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import Register from "./authentication/Register";

import ClientDashboard from "./dashboard/client/ClientDashboard";
import LoanRequest from "./dashboard/client/LoanRequest";
import Offers from "./dashboard/client/Offers";
import ShowOffer from "./dashboard/client/ShowOffer";
import EditOffer from "./dashboard/client/EditOffer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/*Client dashboard*/}
      <Route
        path="/client/dashboard"
        element={
          <RequireAuth>
            <ClientDashboard />
          </RequireAuth>
        }
      />
      <Route path="/client/new-loan" element={
        <RequireAuth>
          <LoanRequest />
        </RequireAuth>
      } />
      <Route path="/client/offers" element={
        <RequireAuth>
          <Offers />
        </RequireAuth>
      } />
      <Route path="/client/offers/offer" element={
        <RequireAuth>
          <ShowOffer />
        </RequireAuth>
      } />
      <Route path="/client/offers/offer/edit" element={
        <RequireAuth>
          <EditOffer />
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;