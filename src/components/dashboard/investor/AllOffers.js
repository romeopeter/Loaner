import React, { createRef, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";
import Button from "../../Button";
import offerImage from "../../../assets/images/offerImage.png";

import setBgImage from "../../../utils/setBgImage";
import headerBanner from "../../../assets/images/headerBanner.png";

import {successfulBids} from "../../../fake-backend/investor/successfulBids"

export default function InvestorDashboard() {
	const pageName = "Investor";

	const [offerStatus, setOfferStatus] = useState("open")

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
						Offers
					</Link>
					<Link
						to="/"
						id="offers"
						className="dropdown-container"
					>
						Payment
					</Link>
				</div>
				<section id="orderbook-investor-all-offers">
					<div id="bids">
						<div id="offer-tabs" className="flex flex-col sm:flex-row justify-start items-center">
							<h3 className="header cursor-pointer text-xl sm:text-3xl w-full md:w-60 pt-2" onClick={() => setOfferStatus("open")}>
								<span>Open offers</span>
							</h3>
							<h3 className="header cursor-pointer text-xl sm:text-3xl w-full md:w-60" onClick={() => setOfferStatus("coming soon")}>
								<span className="text-gray-400">Coming soon</span>
							</h3>
						</div>
						<div id="table-container" style={{ overflowX: "auto" }}>
							<div id="table-action" className="bg-white py-5 px-2 w-full">
								<select 
									name="table-action" 
									id="select-table-action" 
									className="mr-2 mt-1 focus:ring-white focus:border-black border-2 border-black"
								>
									<option defaultValue="value 1">Select action</option>
									<option value="value 1">Option 1</option>
									<option value="vallue 2">Option 2</option>
									<option value="value 3">Option 3</option>
								</select>
								<Button title="Apply" buttonClass="bg-gray-500 action-btn" />
							</div>
							<table className="bg-white table-auto w-full">
								<thead className="bg-gray-300">
									<th className="pl-10 py-5 text-left">
										<input
											type="checkbox"
											name="checkbox"
											className="checkbox rounded mr-5"
										/>
										<span>Name</span>
									</th>
									<th className="pl-5 py-5" colspan="2">Description</th>
								</thead>
								<tbody>
									{items.map((item, index) => {
										if (item.status === offerStatus) {
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
															buttonClass={`action-btn ${offerStatus.replace(" ","-")}`}
														/>
													</td>
												</tr>
											);
										}
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