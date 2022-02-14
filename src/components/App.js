import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import LandingPage from "./LandingPage";
import NotFound from "./NotFound";

import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import Register from "./authentication/Register";
import Profile from "./dashboard/client/ProfileSettings";

import CurrentDeals from "./dashboard/CurrentDeals";
import ArchivedDeals from "./dashboard/ArchivedDeals";
import SingleTrancheDeal from "./dashboard/SingleTrancheDeal";
import MultipleTrancheDeal from "./dashboard/MultipleTrancheDeal";

import { Client, Investor, Broker, Admin } from "./ComponentsRoute";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*Profile*/}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route path="/current-deals" element={<CurrentDeals />} />
        <Route path="/archived-deals" element={<ArchivedDeals />} />
        <Route path="single-tranche-deal" element={<SingleTrancheDeal />} />
        <Route
          path="/multiple-tranche-deal"
          element={<MultipleTrancheDeal />}
        />

        {/*Client dashboard*/}
        <Client />

        {/*Investor Dashboard*/}
        <Investor />

        {/*Broker dashboard*/}
        <Broker />

        {/*Admin Dashboard*/}
        <Admin />
      </Routes>
    </ChakraProvider>
  );
}

export default App;