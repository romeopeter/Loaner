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
import Profile from "./dashboard/client/ProfileSettings";

import BrokerDashboard from "./dashboard/broker/Dashboard";
import NewClient from "./dashboard/broker/NewClient";
import AllClients from "./dashboard/broker/AllClients";
import NewOffer from "./dashboard/broker/NewOffer";
import NewOfferTranche from "./dashboard/broker/NewOfferTranche";
import NewOfferTiming from "./dashboard/broker/NewOfferTiming";
import LoanSummary from "./dashboard/broker/LoanSummary";
import AllLoanRequests from "./dashboard/broker/LoanRequests";
import LoanOffer from "./dashboard/broker/LoanOffer";
import SelectInvestor from "./dashboard/broker/SelectInvestor";

import AdminCurrencies from "./dashboard/admin/AdminCurrencies";
import AdminCompanies from "./dashboard/admin/AdminCompanies";
import AdminTranche from "./dashboard/admin/AdminTranche";
import AdminPreference from "./dashboard/admin/AdminPreferenc";
import AdminProfile from "./dashboard/admin/AdminProfileSettings";
import PrivacyPolicy from "./dashboard/admin/PrivacyPolicy";
import Terms from "./dashboard/admin/Terms";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

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
          path="/broker/dashboard"
          element={
            // <RequireAuth>
            <BrokerDashboard />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/new-client"
          element={
            // <RequireAuth>
            <NewClient />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/allclients"
          element={
            // <RequireAuth>
            <AllClients />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/new-offer"
          element={
            // <RequireAuth>
            <NewOffer />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/new-offer-tranche"
          element={
            // <RequireAuth>
            <NewOfferTranche />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/new-offer-timing"
          element={
            // <RequireAuth>
            <NewOfferTiming />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/new-offer/summary"
          element={
            // <RequireAuth>
            <LoanSummary />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/allloans/"
          element={
            // <RequireAuth>
            <AllLoanRequests />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/loan-offer/"
          element={
            // <RequireAuth>
            <LoanOffer />
            // </RequireAuth>
          }
        />
        <Route
          path="/broker/dashboard/loan-offer/select-investor"
          element={
            // <RequireAuth>
            <SelectInvestor />
            // </RequireAuth>
          }
        />

        <Route
          path="/admin/currencies"
          element={
            // <RequireAuth>
            <AdminCurrencies />
            // </RequireAuth>
          }
        />
        <Route
          path="/admin/companies"
          element={
            // <RequireAuth>
            <AdminCompanies />
            // </RequireAuth>
          }
        />
        <Route
          path="/admin/tranche"
          element={
            // <RequireAuth>
            <AdminTranche />
            // </RequireAuth>
          }
        />
        <Route
          path="/admin/preference"
          element={
            // <RequireAuth>
            <AdminPreference />
            // </RequireAuth>
          }
        />
        <Route
          path="/admin/profile-settings"
          element={
            // <RequireAuth>
            <AdminProfile />
            // </RequireAuth>
          }
        />
        <Route
          path="/admin/privacy"
          element={
            // <RequireAuth>
            <PrivacyPolicy />
            // </RequireAuth>
          }
        />
        <Route
          path="/admin/terms"
          element={
            // <RequireAuth>
            <Terms />
            // </RequireAuth>
          }
        />
     
        <Route path="/broker/dashboard/new-offer/summary" element={
          <RequireAuth>
            <LoanSummary/>
          </RequireAuth>
        } />
         <Route path="/broker/dashboard/allloans/" element={
          <RequireAuth>
            <AllLoanRequests/>
          </RequireAuth>
        } />
        <Route path="/broker/dashboard/loan-offer/" element={
          <RequireAuth>
            <LoanOffer/>
          </RequireAuth>
        } />
        <Route path="/broker/dashboard/loan-offer/select-investor" element={
          <RequireAuth>
            <SelectInvestor/>
          </RequireAuth>
        } />
      </Routes>
    </ChakraProvider>
  );
}

export default App;