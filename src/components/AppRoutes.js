import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import LandingPage from './LandingPage';
import NotFound from './NotFound';

import Login from './authentication/Login';
import RequireAuth from './authentication/RequireAuth';
import Register from './authentication/Register';
import AccountSettings from './dashboard/client/AccountSettings';

import CurrentDeals from './dashboard/CurrentDeals';
import ArchivedDeals from './dashboard/ArchivedDeals';
import SingleTrancheDeal from './dashboard/SingleTrancheDeal';
import MultipleTrancheDeal from './dashboard/MultipleTrancheDeal';

import ClientDashboard from './dashboard/client/ClientDashboard';
import LoanRequest from './dashboard/client/LoanRequest';
import Offers from './dashboard/client/Offers';
import ShowOffer from './dashboard/client/ShowOffer';
import EditOffer from './dashboard/client/EditOffer';
import FullEdit from './dashboard/client/FullEdit';
import PublishOffer from './dashboard/client/PublishOffer';
import ViewInvestor from './dashboard/client/ViewInvestor';
import ShowBids from './dashboard/client/ShowBids';
import ShowAllBids from './dashboard/client/ShowAllBids';

import Dashboard from './dashboard/investor/Dashboard';
import AllOffers from './dashboard/investor/AllOffers';
import IncomingOffer from './dashboard/investor/IncomingOffer';
import ShowSingleOffer from './dashboard/investor/ShowSingleOffer';
import BidApproved from './dashboard/investor/BidApproved';
import BidRejected from './dashboard/investor/BidRejected';
import BAPaymentProof from './dashboard/investor/BAPaymentProof';
import BAPaymentDetail from './dashboard/investor/BAPaymentDetail';
import ApprovedBids from './dashboard/investor/ApprovedBids';
import DeclinedBids from './dashboard/investor/DeclinedBids';

import BrokerDashboard from './dashboard/broker/Dashboard';
import NewClient from './dashboard/broker/NewClient';
import AllClients from './dashboard/broker/AllClients';
import CreateOffer from './dashboard/broker/CreateOffer';
import EditBrokerOffer from './dashboard/broker/EditBrokerOffer';
import NewOfferTiming from './dashboard/broker/NewOfferTiming';
import LoanSummary from './dashboard/broker/LoanSummary';
import BrokerOffers from './dashboard/broker/BrokerOffers';
import Bids from './dashboard/broker/Bids';
import AddNewBid from './dashboard/broker/AddNewBid';
import Payment from './dashboard/broker/Payment';
import LoanOfferDraft from './dashboard/broker/LoanOfferDraft';
import LoanOfferPublished from './dashboard/broker/LoanOfferPublished';
import SelectInvestor from './dashboard/broker/SelectInvestor';
import NewClientSave from './dashboard/broker/NewClientSave';
import UploadInvestor from './dashboard/broker/UploadInvestor';

import AdminCurrencies from './dashboard/admin/AdminCurrencies';
import AdminCompanies from './dashboard/admin/AdminCompanies';
import AdminTranche from './dashboard/admin/AdminTranche';
import AdminPreference from './dashboard/admin/AdminPreferenc';
import AdminProfile from './dashboard/admin/AdminProfileSettings';
import PrivacyPolicy from './dashboard/admin/PrivacyPolicy';
import Terms from './dashboard/admin/Terms';

export default function AppRoutes() {
    return (
        <div>
            <ChakraProvider>
                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    {/*Account settings*/}
                    <Route
                        path='/account-settings'
                        element={
                            <RequireAuth>
                                <AccountSettings />
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
                        path='/client/offers/offer/:id/:dealType'
                        element={
                            <RequireAuth>
                                <ShowOffer />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/client/offers/offer/edit/:id/:dealType'
                        element={
                            <RequireAuth>
                                <EditOffer />
                            </RequireAuth>
                        }
                    />
                     <Route
                        path='/client/offers/offer/full-edit/:id/:dealType'
                        element={
                            <RequireAuth>
                                <FullEdit />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/client/offers/offer/publish/:id/:dealType'
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
						path="/investor/dashboard"
						element={
							<RequireAuth>
								<Dashboard />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/offers"
						element={
							<RequireAuth>
								<AllOffers />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/offer-coming-soon"
						element={
							<RequireAuth>
								<IncomingOffer />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/dashboard/offers/:offerId/"
						element={
							<RequireAuth>
								<ShowSingleOffer />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/dashboard/offers/:offerId/bid-approved"
						element={
							<RequireAuth>
								<BidApproved />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/dashboard/offers/:offerId/bid-rejected"
						element={
							<RequireAuth>
								<BidRejected />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/dashboard/payment-proof"
						element={
							<RequireAuth>
								<BAPaymentProof />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/dashboard/offers/:offerId/payment-detail"
						element={
							<RequireAuth>
								<BAPaymentDetail />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/sucessful-bids"
						element={
							<RequireAuth>
								<ApprovedBids />
							</RequireAuth>
						}
					/>
					<Route
						path="/investor/bids/declined"
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
                        path='/broker/dashboard/all-offers/'
                        element={
                            <RequireAuth>
                                <BrokerOffers/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/broker/dashboard/bids/:id'
                        element={
                            <RequireAuth>
                                <Bids />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/broker/dashboard/bids/addnewbid/:id'
                        element={
                            <RequireAuth>
                                <AddNewBid />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/broker/dashboard/uploadInvestor/'
                        element={
                            <RequireAuth>
                                <UploadInvestor />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/broker/dashboard/bids/payment/:id'
                        element={
                            <RequireAuth>
                                <Payment />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/broker/dashboard/loan-offer-draft/:id/:dealType'
                        element={
                            <RequireAuth>
                                <LoanOfferDraft />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/broker/dashboard/loan-offer-published/:id'
                        element={
                            <RequireAuth>
                                <LoanOfferPublished />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/broker/dashboard/edit-loan-offer/:id/:dealType'
                        element={
                            <RequireAuth>
                                <EditBrokerOffer />
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
        </div>
    );
}
