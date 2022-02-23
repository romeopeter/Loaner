import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import LandingPage from './LandingPage';
import NotFound from './NotFound';

import Login from './authentication/Login';
import RequireAuth from './authentication/RequireAuth';
import Register from './authentication/Register';
import Profile from './dashboard/client/ProfileSettings';

import CurrentDeals from './dashboard/CurrentDeals';
import ArchivedDeals from './dashboard/ArchivedDeals';
import SingleTrancheDeal from './dashboard/SingleTrancheDeal';
import MultipleTrancheDeal from './dashboard/MultipleTrancheDeal';

import ClientDashboard from './dashboard/client/ClientDashboard';
import LoanRequest from './dashboard/client/LoanRequest';
import Offers from './dashboard/client/Offers';
import ShowOffer from './dashboard/client/ShowOffer';
import EditOffer from './dashboard/client/EditOffer';
import PublishOffer from './dashboard/client/PublishOffer';
import ViewInvestor from './dashboard/client/ViewInvestor';
import ShowBids from './dashboard/client/ShowBids';
import ShowAllBids from './dashboard/client/ShowAllBids';

import InvestorDashboard from './dashboard/investor/InvestorDashboard';
import AllOffers from './dashboard/investor/AllOffers';
import SingleOffer from './dashboard/investor/SingleOffer';
import SuccessfulBids from './dashboard/investor/SuccessfulBids';
import DeclinedBids from './dashboard/investor/DeclinedBids';

import BrokerDashboard from './dashboard/broker/Dashboard';
import NewClient from './dashboard/broker/NewClient';
import AllClients from './dashboard/broker/AllClients';
import CreateOffer from './dashboard/broker/CreateOffer';
import NewOfferTiming from './dashboard/broker/NewOfferTiming';
import LoanSummary from './dashboard/broker/LoanSummary';
import AllLoans from './dashboard/broker/AllLoans';
import AllBids from './dashboard/broker/AllBids';
import AddNewBid from './dashboard/broker/AddNewBid';
import LoanOffer from './dashboard/broker/LoanOffer';
import SelectInvestor from './dashboard/broker/SelectInvestor';
import NewClientSave from './dashboard/broker/NewClientSave';

import AdminCurrencies from './dashboard/admin/AdminCurrencies';
import AdminCompanies from './dashboard/admin/AdminCompanies';
import AdminTranche from './dashboard/admin/AdminTranche';
import AdminPreference from './dashboard/admin/AdminPreferenc';
import AdminProfile from './dashboard/admin/AdminProfileSettings';
import PrivacyPolicy from './dashboard/admin/PrivacyPolicy';
import Terms from './dashboard/admin/Terms';

function App() {
    return (
        <ChakraProvider>
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                {/*Profile*/}
                <Route
                    path='/profile'
                    element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                />

                <Route path='/current-deals' element={<CurrentDeals />} />
                <Route path='/archived-deals' element={<ArchivedDeals />} />
                <Route path='single-tranche-deal' element={<SingleTrancheDeal />} />
                <Route path='/multiple-tranche-deal' element={<MultipleTrancheDeal />} />

                {/*Client dashboard*/}
                <Route
                    path='/client/dashboard'
                    element={
                        <RequireAuth>
                            <ClientDashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/client/new-loan'
                    element={
                        <RequireAuth>
                            <LoanRequest />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/client/offers'
                    element={
                        <RequireAuth>
                            <Offers />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/client/offers/offer'
                    element={
                        <RequireAuth>
                            <ShowOffer />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/client/offers/offer/edit'
                    element={
                        <RequireAuth>
                            <EditOffer />
                        </RequireAuth>
                    }
                />

                <Route
                    path='/client/offers/offer/publish'
                    element={
                        <RequireAuth>
                            <PublishOffer />
                        </RequireAuth>
                    }
                />

                <Route
                    path='/client/offers/offer/view-investors'
                    element={
                        <RequireAuth>
                            <ViewInvestor />
                        </RequireAuth>
                    }
                />

                <Route
                    path='/client/offers/offer/show-bids'
                    element={
                        <RequireAuth>
                            <ShowBids />
                        </RequireAuth>
                    }
                />

                <Route
                    path='/client/offers/offer/show-all-bids'
                    element={
                        <RequireAuth>
                            <ShowAllBids />
                        </RequireAuth>
                    }
                />

                {/*Investor Dashboard*/}
                <Route
                    path='/investor/dashboard'
                    element={
                        <RequireAuth>
                            <InvestorDashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/investor/offers'
                    element={
                        <RequireAuth>
                            <AllOffers />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/investor/offers/offer'
                    element={
                        <RequireAuth>
                            <SingleOffer />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/investor/sucessful-bids'
                    element={
                        <RequireAuth>
                            <SuccessfulBids />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/investor/bids/declined'
                    element={
                        <RequireAuth>
                            <DeclinedBids />
                        </RequireAuth>
                    }
                />

                {/*Broker dashboard*/}
                <Route
                    path='/broker/dashboard'
                    element={
                        <RequireAuth>
                            <BrokerDashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/new-client'
                    element={
                        <RequireAuth>
                            <NewClient />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/new-client-save'
                    element={
                        <RequireAuth>
                            <NewClientSave />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/allclients'
                    element={
                        <RequireAuth>
                            <AllClients />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/create-offer'
                    element={
                        <RequireAuth>
                            <CreateOffer />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/new-offer-timing'
                    element={
                        <RequireAuth>
                            <NewOfferTiming />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/new-offer/summary'
                    element={
                        <RequireAuth>
                            <LoanSummary />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/allloans/'
                    element={
                        <RequireAuth>
                            <AllLoans />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/allbids/'
                    element={
                        <RequireAuth>
                            <AllBids />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/allbids/addnewbid/'
                    element={
                        <RequireAuth>
                            <AddNewBid />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/loan-offer/'
                    element={
                        <RequireAuth>
                            <LoanOffer />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/broker/dashboard/loan-offer/select-investor'
                    element={
                        <RequireAuth>
                            <SelectInvestor />
                        </RequireAuth>
                    }
                />

                {/*Admin Dashboard*/}
                <Route
                    path='/admin/currencies'
                    element={
                        <RequireAuth>
                            <AdminCurrencies />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/admin/companies'
                    element={
                        <RequireAuth>
                            <AdminCompanies />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/admin/tranche'
                    element={
                        <RequireAuth>
                            <AdminTranche />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/admin/preference'
                    element={
                        <RequireAuth>
                            <AdminPreference />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/admin/profile-settings'
                    element={
                        <RequireAuth>
                            <AdminProfile />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/admin/privacy'
                    element={
                        <RequireAuth>
                            <PrivacyPolicy />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/admin/terms'
                    element={
                        <RequireAuth>
                            <Terms />
                        </RequireAuth>
                    }
                />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
