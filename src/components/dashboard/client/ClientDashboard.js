import React, {useEffect, useState} from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { signOutAsync } from "../../../redux/authSlice";
import { getOffersAction } from "../../../redux/loanSlice";
import { useDispatch, useSelector } from "react-redux";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

import setBgImage from "../../../utils/setBgImage";
import headerBanner from "../../../assets/images/headerBanner.png";
import offerImage from "../../../assets/images/offerImage.png";
import createList from "../../../assets/images/createList.png";
import createOffer from "../../../assets/images/createOffer.png";
import offers from "../../../assets/images/offers.png";
import allLoans from "../../../assets/images/allLoans.png";
import approvedLoans from "../../../assets/images/approvedLoans.png";
import declineLoans from "../../../assets/images/declineLoans.png";

export default function ClientDashboard() {
	const pageName = "Dashboard";

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const authUser = useSelector((state) => state.auth.user);
	const offers = useSelector((state) => state.loan.offers);

	useEffect(() => {

		// Get request
		dispatch(getOffersAction())

	}, [])

	const { user: currentUser } = authUser;

	if (!currentUser) {
		return <Navigate replace to="login" />;
	}


	const handleSignOut = () => {
		dispatch(signOutAsync());
		navigate("/");
	};

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="dashboard-intro-container">
					<div
						id="dashboard-dropdown"
						className="bg-white px-16 py-10 shadow-md flex justify-start"
					>
						<div id="loan" className="dropdown-container">
							<div>
								Loan{" "}
								<i className="fa fa-caret-down mr-5" aria-hidden="true"></i>
							</div>
							<div id="loan-dropdown" className="shadow-md rounded bg-white">
								<Link to="#">All loans</Link>
								<Link to="#">Approved loans</Link>
								<Link to="#">Declined loans</Link>
							</div>
						</div>
						<div id="investor" className="dropdown-container">
							Investor{" "}
							<i className="fa fa-caret-down" aria-hidden="true"></i>
							<div id="investor-dropdown"></div>
						</div>
					</div>
					<div id="orderbook-dashboard-intro" style={setBgImage(headerBanner)}>
						<h1>Hello, {currentUser.first_name}</h1>
						<h3>Welcome to your dashboard</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation
						</p>
						<Button
							title="Update my profile"
							link="/profile"
							buttonClass="update-profile-cta"
						/>
					</div>
					<div
						id="client-user-quick-action"
						className="flex flex-col sm:flex-row justify-around items-stretch sm:items-center h-20"
					>
						<div className="actions action-1 border-r border-black">
							<Link to="/client/new-loan">
							<h2 className="font-bold">
								<div className="action-icon-container">
									<img src={createOffer} alt="" />
								</div>
									

								Create new offer
							</h2>
							</Link>
						</div>
						<div className="actions action-2 border-r border-black">
							<Link to="/client/offers/offer/publish">
							<h2 className="font-bold">
								<div className="action-icon-container">
									<img src={createList} alt="" />
								</div>	

								Create new list
							</h2>
							</Link>
						</div>
						<div className="actions action-3">
							<Link to="/client/offers">
							<h2 className="font-bold">
								<div className="action-icon-container">
									<img src={offers} alt="" />
								</div>	

								My offers
							</h2>
							</Link>
						</div>
					</div>
					<div id="account-overview" className="flex justify-around flex-col md:flex-row">
						<div id="overview-title" className="flex justify-center items-center px-5 pt-5 md:p-2">
							<h3>Account Overview</h3>
						</div>
						<div id="account" className="flex flex-col sm:flex-row justify-around items-stretch sm:items-center sm:w-full">
							<div id="all-loan" className="loan-count">
								<Link to="#">
									<div className="account-icon-container">
									<img src={allLoans} alt="" />
									</div>
									<p>
										10 <br/>All loans
									</p>
								</Link>
							</div>
							<div id="approved-loan" className="loan-count">
								<Link to="#">
									<div className="account-icon-container">
									<img src={approvedLoans} alt="" />
									</div>
									<p>
										5 <br/>Approved loans
									</p>
								</Link>
							</div>
							<div id="declined-loan" className="loan-count">
								<Link to="#">
									<div className="account-icon-container">
									<img src={declineLoans} alt="" />
									</div>
									<p>
										10 <br/>Declined
									</p>
								</Link>
							</div>
						</div>
					</div>
					<div id="offers" className="bg-black p-14">
						<div id="offer-header" className="flex flex-col md:flex-row justify-between pb-10">
							<h3 className="font-bold mb-10 md:mb-0">My offers</h3>
							<div id="sort-by">
								<label htmlFor="sort-offer" className="font-bold">Sort by:</label>{" "}
								<select name="sort-offer" id="sort-offer" className="font-bold p-2">
									<option value="status">Status</option>
								</select>
							</div>
						</div>
						<div id="the-offers">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center place-content-center gap-10">
								{/*<div className="offer" id="offer-1">
									<div className="offer-title">
										<img
											className="offer-image"
											src={offerImage}
											alt=""
										/>
										<h3 className="title">
											Rice Value Chain (Project Finance)
										</h3>
									</div>
									<p className="offer-description">
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in pective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion
									</p>
									<div className="offer-button">
										<Button
											title="Edit draft"
											link="/client/offers/offer/edit"
											type="button"
											buttonClass="h-2 p-2 bg-grey"
										/>
										<Button
											title="Publish"
											link="/client/offers/offer/publish"
											type="button"
											buttonClass="h-2 p-2 bg-white"
										/>
									</div>
								</div>*/}
								{offers.length > 0 ? offers.map((offer,index) => {
									if (index <= 5) {
										return (
											<div className="offer" id="offer-1" key={offer.id}>
											<div className="offer-title">
												<img
													className="offer-image"
													src={offerImage}
													alt=""
												/>
												<h3 className="title">
													{offer.deal_name}
												</h3>
											</div>
											<p className="offer-description">
												{offer.deal_name}
											</p>
											<div className="offer-button">
												<Button
													title="Edit draft"
													link="/client/offers/offer/edit"
													type="button"
													buttonClass="h-2 p-2 bg-grey"
												/>
												<Button
													title="Publish"
													link="/client/offers/offer/publish"
													type="button"
													buttonClass="h-2 p-2 bg-white"
												/>
											</div>
											</div>
										)
									}
								}):(<p className="text-white">Loading offers...</p>)}
							</div>
							<div id="view-more" className="text-right">
								<Link to="/client/offers"  className="text-white text-lg font-bold">View more</Link>{" "}{" "}
								<i
									className="fa fa-long-arrow-right text-white"
									aria-hidden="true"
								></i>
							</div>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}