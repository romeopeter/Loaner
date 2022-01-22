import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import LandingPage from "./LandingPage";

import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import Register from "./authentication/Register";

import ClientDashboard from "./dashboard/client/ClientDashboard";
import LoanRequest from "./dashboard/client/LoanRequest";
import Offers from "./dashboard/client/Offers";

import ShowOffer from "./dashboard/client/ShowOffer";
import EditOffer from "./dashboard/client/EditOffer";
import PublishOffer from "./dashboard/client/PublishOffer";

import InvestorDashboard from "./dashboard/investor/InvestorDashboard";
import InvestorDashboard2 from "./dashboard/investor/InvestorDashboard2";
import InvestorOffers from "./dashboard/investor/InvestorOffers";
import InvestorBids from "./dashboard/investor/InvestorBids";
import InvestorDeclinedBids from "./dashboard/investor/InvestorDeclinedBids";

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/broker" element={<BrokerDashboard />} />

        {/*Client dashboard*/}
        <Route
          path="/client/dashboard"
          element={
            <RequireAuth>
              <ClientDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/client/new-loan"
          element={
            <RequireAuth>
              <LoanRequest />
            </RequireAuth>
          }
        />
        <Route
          path="/client/offers"
          element={
            <RequireAuth>
              <Offers />
            </RequireAuth>
          }
        />
        <Route
          path="/client/offers/offer"
          element={
            <RequireAuth>
              <ShowOffer />
            </RequireAuth>
          }
        />
        <Route
          path="/client/offers/offer/edit"
          element={
            <RequireAuth>
              <EditOffer />
            </RequireAuth>
          }
        />
        <Route
          path="/client/offers/offer/publish"
          element={
            <RequireAuth>
              <PublishOffer />
            </RequireAuth>
          }
        />

        {/*Investor Dashboard*/}
        <Route
          path="/investor/dashboard"
          element={
            <RequireAuth>
              <InvestorDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/investor/offers"
          element={
            <RequireAuth>
              <InvestorDashboard2 />
            </RequireAuth>
          }
        />
        <Route
          path="/investor/offers/offer"
          element={
            <RequireAuth>
              <InvestorOffers />
            </RequireAuth>
          }
        />
        <Route
          path="/investor/bids"
          element={
            <RequireAuth>
              <InvestorBids />
            </RequireAuth>
          }
        />
        <Route
          path="/investor/bids/declined"
          element={
            <RequireAuth>
              <InvestorDeclinedBids />
            </RequireAuth>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;