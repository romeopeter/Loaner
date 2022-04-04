import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

import offerImage from "../../../assets/images/offerImage.png";
import { declinedBids } from "../../../fake-backend/investor/declinedBids";

export default function DeclinedBids() {
	const pageName = "Declined offers";

	const eachPage = 9;

	const [paginateState, setPaginateState] = useState({
		list: declinedBids.length > 0 && declinedBids,
		perPage: eachPage,
		page: 0,
		pages: Math.floor(declinedBids.length / eachPage),
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
						Home
					</Link>
					<Link
						to="/investor/offers"
						id="offers"
						className="dropdown-container underline"
					>
						View offers
					</Link>
				</div>
				<section id="orderbook-investor-declined-offers">
					<div id="declined-offers">
						<h3
							id="header"
							className="py-10 text-lg sm:text-2xl pl-5 text-white"
						>
							Declined offers
						</h3>
						<div id="table-container" style={{ overflowX: "auto" }}>
							<div
								id="table-action"
								className="bg-white py-5 px-2 w-full"
							>
								<select
									name="table-action"
									id="select-table-action"
									className="mr-2 mt-1 focus:ring-white focus:border-black border-2 border-black"
								>
									<option defaultValue="value 1">
										Select action
									</option>
									<option value="value 1">Option 1</option>
									<option value="vallue 2">Option 2</option>
									<option value="value 3">Option 3</option>
								</select>
								<Button
									title="Apply"
									buttonClass="bg-gray-500 action-btn"
								/>
							</div>

							<table className="bg-white table-auto w-full">
								<tbody>
									{items.map((item, index) => {
										return (
											<tr key={index}>
												<td className="offer-name">
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
												<td className="table-btn">
													<Button
														title="View details"
														buttonClass="bg-red-600 hover:bg-white text-gray-100 rounded-md declined-button"
													/>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div id="paginate-offers" className="bg-white">
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