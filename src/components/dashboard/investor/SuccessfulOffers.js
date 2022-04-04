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
	const pageName = "Successful offers";

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
						className="dropdown-container mr-5 underline"
					>
						Dashboard
					</Link>
					<Link
						to="/investor/offers"
						id="offers"
						className="dropdown-container underline"
					>
						Offers
					</Link>
				</div>
				<section id="orderbook-investor-successful-bids">
					<div id="Succesful-bids">
						<h3 id="header" className="py-10 text-lg sm:text-2xl pl-5 text-white">Succesful offers</h3>
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
								<tbody>
									{items.map((item, index) => {
										return (
											<tr key={index}>
												<td className="offer-name">
													<div>
														<input
															type="checkbox"
															name="checkbox"
															className="checkbox rounded"
															title="checkbox"
														/>
														<img
															src={offerImage}
															alt=""
															className="rounded h-10 w-10 hidden sm:block"
														/>
														<span>{item.bidName}</span>
													</div>
												</td>
												<td className="offer-description">
													<p className="">{item.bidDescription}</p>
												</td>
												<td className="table-btn">
													<Button
														title="View details"
														buttonClass="bg-green-600 rounded-md hover:bg-white successful-btn"
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