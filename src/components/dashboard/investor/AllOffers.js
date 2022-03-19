import React, { createRef, useState, useEffect } from "react";
import { useSelector, useDispatch }  from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";
import Button from "../../Button";

import ShowAllIncomingOffers from "./ShowAllIncomingOffers";
import ShowAllOpenedOffers from "./ShowAllOpenedOffers";

import offerImage from "../../../assets/images/offerImage.png";
import setBgImage from "../../../utils/setBgImage";
import headerBanner from "../../../assets/images/headerBanner.png";

import { successfulBids } from "../../../fake-backend/investor/successfulBids";

export default function InvestorDashboard() {
	const pageName = "Investor";

	const [offerStatus, setOfferStatus] = useState("open");

	const allOffers = useSelector(state => state.investor.allOffers);

	const [openOffers, setOpenOffers] = useState(null);
	const [incomingOffers, setIncomingOffers] = useState(null);


	useEffect(() => {
		if (allOffers !== null && allOffers !== false) {

			allOffers.forEach(offer => {
				if (offer.availability === "open") {
					// setOfferStatus("open");
					setOpenOffers(allOffers);
				};

				if (offer.availability === "coming soon") {
					// setOfferStatus("coming soon");
					setIncomingOffers(allOffers);
				};
			})
		}
	}, [allOffers])

	

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<div
					id="loan-invest-dropdown"
					class="bg-white px-16 py-10 shadow-md flex justify-start w-full"
				>
					<Link to="/investor/dashboard" id="offers" className="dropdown-container mr-5 underline">
						Dashboard
					</Link>
					<Link
						to="/investor/offers"
						id="home"
						className="dropdown-container mr-5 underline"
					>
						Offers
					</Link>
					<Link to="/" id="offers" className="dropdown-container">
						Payment
					</Link>
				</div>
				<section id="orderbook-investor-all-offers">
					<div id="offers">
						<div
							id="offer-tabs"
							className="flex flex-col sm:flex-row justify-start items-center"
						>
							<h3
								className="header cursor-pointer text-xl sm:text-3xl w-full md:w-60 pt-2"
								onClick={() => setOfferStatus("open")}
							>
								<span
									className={
										offerStatus === "open"
											? "text-white"
											: "text-gray-400"
									}
								>
									Open offers
								</span>
							</h3>
							<h3
								className="header cursor-pointer text-xl sm:text-3xl w-full md:w-60"
								onClick={() => setOfferStatus("coming soon")}
							>
								<span
									className={
										offerStatus === "coming soon"
											? "text-white"
											: "text-gray-400"
									}
								>
									Coming soon
								</span>
							</h3>
						</div>
						{offerStatus === "open" && (<ShowAllOpenedOffers openOffers={openOffers} />)}
						{offerStatus === "coming soon" && (<ShowAllOpenedOffers openOffers={incomingOffers} />)}
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}