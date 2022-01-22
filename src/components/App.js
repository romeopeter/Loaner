import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';


import LandingPage from "./LandingPage";

import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import Register from "./authentication/Register";

import ClientDashboard from "./dashboard/client/ClientDashboard";
import LoanRequest from "./dashboard/client/LoanRequest";
import Offers from "./dashboard/client/Offers";
import Profile from "./dashboard/client/ProfileSettings";

import BrokerDashboard from "./dashboard/broker/Dashboard";
import NewClient from "./dashboard/broker/NewClient";
import AllClients from "./dashboard/broker/AllClients";
import NewOffer from "./dashboard/broker/NewOffer";
import NewOfferTranche from "./dashboard/broker/NewOfferTranche";
import NewOfferTiming from "./dashboard/broker/NewOfferTiming";

function App() {
  return (
    <ChakraProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile/>} />

      <Route path="/broker/dashboard" element={<BrokerDashboard/>} />
      <Route path="/broker/dashboard/new-client" element={<NewClient/>} />
      <Route path="/broker/dashboard/allclients" element={<AllClients/>} />
      <Route path="/broker/dashboard/new-offer" element={<NewOffer/>} />
      <Route path="/broker/dashboard/new-offer-tranche" element={<NewOfferTranche/>} />
      <Route path="/broker/dashboard/new-offer-timing" element={<NewOfferTiming/>} />


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
    </Routes>
    </ChakraProvider>
  );
}

export default App;