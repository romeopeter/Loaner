import React, { createRef, useState, useEffect } from "react";

import { Link, useNavigate, Navigate } from "react-router-dom";
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
import {getInvestorAllOffersAction} from "../../../redux/investorSlice";
import { offers } from "../../../fake-backend/investor/offers";

export default function AllOffers() {
	const pageName = "Investor";

	const currentUserObj = useSelector((state) => state.auth.user);
	const allOffers = useSelector(state => state.investor.allOffers);
	const dispatch = useDispatch();

	const { user: currentUser } = currentUserObj;
	const {tokens: userTokens } = currentUserObj;
	const {id: investorId} = currentUser["investor_details"];

	const [paginateState, setPaginateState] = useState({
		list: [],
		perPage: 0,
		page: 0,
		pages: 0,
	});

	useEffect(async function getAllInvestorOffers() {
		if (userTokens.access !== undefined || userTokens.access !== null) {
			const req = await dispatch(getInvestorAllOffersAction(investorId));

			if (req.meta.requestStatus === "fulfilled") {
				const offersPayload = req.payload;

				setPaginateState(state => {
					return {
						...state,
						list: offersPayload,
						perPage: 9,
						pages: Math.floor(req.payload.length / 9),
					}
				});
			}
		}
	}, [])


	// Call endpoint to get all bid status for each offer
	/*useEffect(() => {
		return () => {
			effect
		};
	}, [])*/
	

	/*Paginatiion starts*/
	const { page, perPage, pages, list } = paginateState;
	let items = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState((state) => ({ ...state, page: page }));
	};
	/*Paginatiion ends*/

	const dashboardBanner = {
		backgroundImage: `linear-gradient(to right, rgba(255, 250, 237, 0.979), rgba(252, 251, 249, 0.096)), url(${headerBanner})`,
	};

	const trancheTenure = (offerStart, offerEnds) => {
		const offerStartDate = new Date(offerStart);
		const offerEndDate = new Date(offerEnds);
		let tenure = "120 days";

		console.log(offerStart, offerEnds);

		return tenure;
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
								{/*<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>*/}

								<Link to="/investor/offers" className="quick-action-links">All offers</Link>
							</h2>
						</div>
						<div className="actions action-2 border-r border-black">
							<h2 className="font-bold">
							{/*	<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>*/}

								<Link to="/investor/sucessful-bids" className="quick-action-links">
									Successful offers
								</Link>
							</h2>
						</div>
						<div className="actions action-3">
							<h2 className="font-bold">
								{/*<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>*/}

								<Link to="/investor/bids/declined" className="quick-action-links">
									Decline offers
								</Link>
							</h2>
						</div>
					</div>
					<div id="offer-status" className="w-full">
						<div id="title" className="pb-2 pt-5">
							<h3>My Offers</h3>
						</div>
						<table className="table-auto w-full">
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
								{items.length > 0 ? items.map((item, index) => (
									<tr key={index}>
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
										<td>{trancheTenure(item.tranche_id.timing.offer_start, item.tranche_id.timing.offer_end)}</td>
										<td>{Math.round(item.tranche_id.size.minimum_subscription.amount)}</td>
										<td>
											{item.status === "approved" && (
												<Button
													title={item.status}
													link="/investor/dashboard/bid-approved"
													buttonClass="bg-green-600 rounded-md bid-approved"
												/>
											)}
											{item.status === "rejected" && (
												<Button
													title={item.status}
													link="/investor/dashboard/bid-rejected"
													buttonClass="bg-red-600 rounded-md bid-rejected"
												/>
											)}
											{item.availability === "open" && (
												<Button
													title={item.availability}
													link={`/investor/dashboard/offers/${item.id}/`}
													buttonClass="bg-gray-500 rounded-md offer-open"
												/>
											)}
											{item.status === "Coming soon" && (
												<Button
													title={item.status}
													link="/investor/offer-coming-soon"
													buttonClass="bg-gray-500 rounded-md coming-soon"
												/>
											)}
										</td>
									</tr>
								)):(<tr className="text-3xl text-center w-full py-5">Loading...</tr>)}
							</tbody>
						</table>

						<hr className="border-1 border-white mt-10" />

						{/*Pagination*/}
						{pages >= 1 ? (
							<div id="paginate-offer-status">
								<ReactPaginate
									previousLabel={"<"}
									nextLabel={">"}
									pageCount={pages}
									containerClassName={"pagination"}
									onPageChange={(e) => handlePageClick(e)}
								/>
							</div>
						) : null }
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}