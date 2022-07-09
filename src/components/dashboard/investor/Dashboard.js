import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

// import setBgImage from "../../../utils/setBgImage";
// missing InvestorHeader image from assets so i'm replacing to get passed the error
import headerBanner from "../../../assets/images/headerBanner.png";
import offerImage from "../../../assets/images/offerImage.png";

/* Data call modules */
import { getInvestorAllOffersAction } from "../../../redux/investorSlice";
import { getAllOffersStatusAction } from "../../../redux/bidSlice";

export default function AllOffers() {
	const pageName = "Investor";
	const dispatch = useDispatch();

	const currentUserObj = useSelector((state) => state.auth.user);
	const allBidsStatus = useSelector((state) => state.bid.allBidsStatus);

	const { user: currentUser } = currentUserObj;
	const { id: investorId } = currentUser["investor_details"];

	const [paginateState, setPaginateState] = useState({
		list: [],
		perPage: 9,
		page: 0,
		pages: 0,
	});

	let [isLoading, setisLoading] = useState(true);

	useEffect(function getAllOffers() {
		let componentIsMounted = true;

		(async function () {
			const req = await dispatch(
				getInvestorAllOffersAction(investorId)
			);

			if (req.meta.requestStatus === "fulfilled") {

				if (componentIsMounted) {
					setPaginateState((state) => {
						return {
							...state,
							list: req.payload,
							pages: Math.floor(req.payload.length / paginateState.perPage),
						};
					});

					setisLoading(false);
				}
			}
		})();

		return () => componentIsMounted;

	}, [dispatch, investorId, paginateState.perPage]);

	useEffect(
		function getOffersStatusById() {
			const offersId = paginateState.list.map(
				(offer) => `/v1/bids/?loan_request_id=${offer.id}`
			);

			if (offersId.length > 0)
				dispatch(getAllOffersStatusAction(offersId));
		},
		[dispatch, paginateState.list]
	);

	/*Paginatiion starts*/
	const { page, perPage, pages, list } = paginateState;
	let items = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState((state) => ({ ...state, page: page }));
	};
	/*Paginatiion ends*/

	const calculateLoanTenure = (startDate, EndDate) => {
		let tenure = "";

		const loanStartDate = new Date(startDate);
		const loanEndDate = new Date(EndDate);

		/*
			Get loan tenure. Time difference is calculated and divided by 
			number of miliseconds in a day to get day difference which
			becomes the tenure
		*/
		const timeDifference = loanEndDate.getTime() - loanStartDate.getTime();
		const daysDiffernce = timeDifference / (1000 * 60 * 60 * 24);
		tenure = daysDiffernce;

		/* If the the difference is days is 0 then loan-end date is set to
		 the same time as loan-start date*/
		if (tenure === 0 || tenure < 0) return "***";

		return isNaN(tenure) === false && tenure;
	};

	const checkBidStatus = (offer, offerIndex) => {
		if (allBidsStatus !== null && allBidsStatus !== false) {
			const bid = allBidsStatus[offerIndex];
			let bidStatus = "Loading...";

			if (bid !== undefined && bid.length > 0) {
				let bidObj = bid[0];

				if (
					bidObj["current_status"] === "disagreed" ||
					bidObj["current_status"] === "approved"
				) {
					bidStatus = bidObj["current_status"];
				}

				if (bidObj["current_status"] === null) bidStatus = "pending";
			}

			if (bid !== undefined && bid.length === 0)
				bidStatus = offer.availability;

			return bidStatus;
		}
	};

	const dashboardBanner = {
		backgroundImage: `linear-gradient(to right, rgba(255, 250, 237, 0.979), rgba(252, 251, 249, 0.096)), url(${headerBanner})`,
	};

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-investor-dashboard">
					{/*<div
						id="loan-invest-dropdown"
						class="bg-white px-16 py-10 shadow-md flex justify-start w-full"
					>
						<Link
							to="/investor/dashboard"
							id="home"
							className="dropdown-container mr-5 underline"
						>
							View offers
						</Link>
						<Link
							to="/investor/offers/offer"
							id="offers"
							className="dropdown-container"
						>
							Offers
						</Link>
					</div>*/}
					<div id="orderbook-dashboard-intro" style={dashboardBanner}>
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
							buttonClass="update-profile-cta"
						/>
					</div>
					<div
						id="user-quick-action"
						className="flex flex-row justify-evenly h-20 w-full"
					>
						<div className="actions action-1 border-r border-black">
							<h2 className="font-bold">
								<Link
									to="/investor/offers"
									className="quick-action-links"
								>
									All offers
								</Link>
							</h2>
						</div>
						<div className="actions action-2 border-r border-black">
							<h2 className="font-bold">		
								<Link
									to="/investor/sucessful-bids"
									className="quick-action-links"
								>
									Successful offers
								</Link>
							</h2>
						</div>
						<div className="actions action-3">
							<h2 className="font-bold">
								<Link
									to="/investor/bids/declined"
									className="quick-action-links"
								>
									Decline offers
								</Link>
							</h2>
						</div>
					</div>
					<div id="offer-status" className="w-full">
						<div id="title" className="pb-2 pt-5">
							<h3>My Offers</h3>
						</div>

						{isLoading ? (
							<div className="text-3xl w-full py-5">
								<p className="text-center">
									<i className="fa fa-spinner fa-pulse fa-3x fa-fw ml-2" style={{ fontSize: 30 }}></i>
								</p>
							</div>) : (
							<table className="table-auto w-full">
								{items.length === 0 ? (
									<div className="py-5">
										<p className="text-center text-3xl text-gray-500" style={{ fontSize: "1.9rem" }}>
											You have no offers <i class="fa fa-times ml-2" aria-hidden="true"></i>
										</p>
									</div>
								) : (<>
									<thead>
										<tr>
											<th>Name</th>
											<th>Tranche</th>
											<th>Tenor</th>
											<th>Size</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{
											items.map((item, itemIndex) => (
												<tr key={itemIndex}>
													<td className="offer-title">
														<input
															type="checkbox"
															name="checkbox"
															className="checkbox mr-2 rounded"
														/>
														<img
															src={offerImage}
															alt=""
															className="h-10 w-10 rounded mx-2"
															id="offer-image"
														/>
														<span>{item.deal_name}</span>
													</td>
													<td>{item.tranche_id.name}</td>
													<td>
														{calculateLoanTenure(
															item.tranche_id.timing
																.offer_start,
															item.tranche_id.timing
																.offer_end
														)}
													</td>
													<td>
														{Math.round(
															item.tranche_id.size
																.minimum_subscription
																.amount
														)}
													</td>
													<td>
														{checkBidStatus(
															item,
															itemIndex
														) === "approved" && (
																<Button
																	title="Approved"
																	link={`/investor/dashboard/offers/${item.id}/bid-approved`}
																	buttonClass="bg-green-600 rounded-md bid-approved"
																/>
															)}
														{checkBidStatus(
															item,
															itemIndex
														) === "disagreed" && (
																<Button
																	title="Rejected"
																	// title={checkBidStatus(item, itemIndex)}
																	link={`/investor/dashboard/offers/${item.id}/bid-rejected`}
																	buttonClass="bg-red-600 rounded-md bid-rejected"
																/>
															)}
														{checkBidStatus(
															item,
															itemIndex
														) === "pending" && (
																<Button
																	title="Pending"
																	buttonClass="bg-yellow-400 rounded-md offer-open"
																	buttonDisabled={true}
																/>
															)}
														{checkBidStatus(
															item,
															itemIndex
														) === "open" && (
																<Button
																	title="Open"
																	link={`/investor/dashboard/offers/${item["id"]}/${item["deal_type"].toLowerCase()}/open`}
																	buttonClass="bg-blue-500 rounded-md offer-open"
																/>
															)}
														{checkBidStatus(
															item,
															itemIndex
														) === "coming soon" && (
																<Button
																	title="Coming soon"
																	link={`/investor/dashboard/offers/${item["id"]}/${item["deal_type"].toLowerCase()}/coming-soon`}
																	buttonClass="bg-gray-500 rounded-md coming-soon"
																/>
															)}
													</td>
												</tr>
											))
										}
									</tbody>
								</>
								)}
							</table>)}

						<hr className="border-1 border-white mt-10" />

						{/*Pagination*/}
						{pages === paginateState.perPage ? (
							<div id="paginate-offer-status">
								<ReactPaginate
									previousLabel={"<"}
									nextLabel={">"}
									pageCount={pages}
									containerClassName={"pagination"}
									onPageChange={(e) => handlePageClick(e)}
								/>
							</div>
						) : null}
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}