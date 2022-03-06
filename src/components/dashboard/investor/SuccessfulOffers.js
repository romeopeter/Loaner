import React, { useState, useEffect } from "react";

import {Link} from "react-router-dom";

import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

import offerImage from "../../../assets/images/offerImage.png";

import {successfulBids} from "../../../fake-backend/investor/successfulBids"

export default function SuccessfulBids() {
	const pageName = "Bids";

	// Pagination
	const eachPage = 9;

	const [paginateState, setPaginateState] = useState({
		list: successfulBids.length > 0 && successfulBids,
		perPage: eachPage,
		page: 0,
		pages: Math.floor(successfulBids.length / eachPage),
	});

	const { page, perPage, pages, list } = paginateState;
	let items = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState((state) => ({ ...state, page: page }));
	};

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<div
					id="loan-invest-dropdown"
					class="bg-white px-16 py-10 shadow-md flex justify-start w-full"
				>
					<Link
						to="/investor/dashboard"
						id="home"
						className="dropdown-container mr-5"
					>
						Home
					</Link>
					<Link
						to="/investor/offers/offer"
						id="offers"
						className="dropdown-container"
					>
						Offers
					</Link>
				</div>
				<section id="orderbook-investor-successful-offers">
					<div id="bids">
						<h3 id="header">Succesful offers</h3>
						<div style={{ overflowX: "auto" }}>
							<table className="bg-white table-auto w-full">
								<tbody>
									{items.map((item, index) => {
										return (
											<tr key={index}>
												<td className="bid-name">
													<input
														type="checkbox"
														name="checkbox"
														className="checkbox rounded"
													/>
													<img
														src={offerImage}
														alt=""
														className="rounded h-10 w-10"
													/>
													<span>{item.bidName}</span>
												</td>
												<td>
													<p>{item.bidDescription}</p>
												</td>
												<td>
													<Button
														title="View details"
														buttonClass="bg-green-600 hover:bg-white hover:shadow"
													/>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div id="paginate-bids" className="bg-white">
							<ReactPaginate
								previousLabel={"<"}
								nextLabel={">"}
								pageCount={pages}
								containerClassName={"pagination"}
								onPageChange={(e) => handlePageClick(e)}
							/>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}