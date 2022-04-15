import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import { getOffersAction } from '../../../redux/loanSlice';

import offerImage from "../../../assets/images/offerImage.png";

export default function Offers() {
	const pageName = "Offers";

	const dispatch = useDispatch();
	const offersArr = useSelector((state) => state.loan.offers);

	useEffect(() => {

		// Get Offers
		if (offersArr.length === 0) {
			dispatch(getOffersAction())
		}
	}, [dispatch, offersArr.length])


	// Pagination
	const [paginateState, setPaginateState] = useState({
		list: offersArr.length > 0 ? offersArr : offersArr,
		perPage: 9,
		page: 0,
		pages: Math.floor(offersArr.length / 9)
	})


	const { page, perPage, pages, list } = paginateState;
	let offerItems = list !== false && list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState(state => ({ ...state, page: page }));
	}

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<div
					id="loan-invest-dropdown"
					class="bg-white px-16 py-10 shadow-md flex justify-start"
				>
					<div id="loan" className="dropdown-container">
						Loan{" "}
						<i className="fa fa-caret-down mr-5" aria-hidden="true"></i>
						<div id="load-dropdown"></div>
					</div>
					<div id="investor" className="dropdown-container">
						Investor{" "}
						<i className="fa fa-caret-down" aria-hidden="true"></i>
						<div id="investor-dropdown"></div>
					</div>
				</div>
				<section id="orderbook-offers">
					<div id="offers">
						<h3 id="header">My offers</h3>

						<div id="the-offers">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center place-content-center gap-20">
								{offerItems !== false ? offerItems.map((offer) => (
									<div
										key={offer.id}
										className="offer"
									>
										<div className="offer-title">
											<img
												src={offerImage}
												alt=""
												className="offer-image"
											/>
											<h3 className="title">
												{offer.deal_name}
											</h3>
										</div>
										<p className="offer-description">
											{offer.deal_name}
										</p>
										{offer['availability'] === null && (
											<div className="offer-button">

												<Button
													title="Edit draft"
													link="/client/offers/offer/edit"
													buttonClass="h-2 p-2 bg-grey"
												/>

												<Button
													title="Publish"
													link="/client/offers/offer/publish"
													buttonClass="h-2 p-2 bg-white"
												/>
											</div>
										)}
										{offer['availability'] === "open" && (
											<div className="offer-button">

												<Button
													title="View offer"
													link="/client/offers/offer/edit"
													buttonClass="h-2 p-2 bg-grey"
													style={{ width: "100%" }}
												/>


											</div>
										)}

									</div>
								)) : "Loading offers..."}
							</div>
						</div>
					</div>

					<div id="paginate-offers">
						<ReactPaginate previousLabel={'<'} nextLabel={'>'} pageCount={pages} containerClassName={'pagination'} onPageChange={(e) => handlePageClick(e)} />
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}