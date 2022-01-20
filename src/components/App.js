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

function App() {
  return (
    <ChakraProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/broker" element={<BrokerDashboard/>} />


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