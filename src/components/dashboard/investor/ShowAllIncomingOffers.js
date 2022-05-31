import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Button from "../../Button";

import offerImage from "../../../assets/images/offerImage.png";

export default function ShowAllIncomingOffers({ incomingOffers }) {
	// Pagination
	const [paginateState, setPaginateState] = useState({
		list: [],
		perPage: 9,
		page: 0,
		pages: 0,
	});

	useEffect(() => {
		if (incomingOffers !== null) {
			setPaginateState({
				list: incomingOffers,
				perPage: 9,
				page: 0,
				pages: Math.floor(incomingOffers.length / 9),
			});
		}
	}, []);

	const { page, perPage, pages, list } = paginateState;
	let items = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState((state) => ({ ...state, page: page }));
	};

	return (
		<div className="mb-5">
			<div id="table-container" style={{ overflowX: "auto" }}>
				{items.length > 0 ? (
					<>
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
							<thead className="bg-gray-300">
								<th className="pl-10 py-5 text-left">
									<input
										type="checkbox"
										name="checkbox"
										className="checkbox rounded mr-5"
									/>
									<img
										src={offerImage}
										alt=""
										className="h-10 w-10 rounded mx-2"
										id="offer-image"
									/>
									<span>Name</span>
								</th>
								<th className="pl-5 py-5" colspan="2">
									Description
								</th>
							</thead>
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
												<span>{item.deal_name}</span>
											</td>
											<td>
												<p className="text-left">
													Lorem ipsum dolor sit amet,
													consectetur adipisicing
													elit, sed do eiusmod tempor
													incididunt ut labore et
													dolore magna aliqua. Ut enim
													ad minim veniam, quis
													nostrud exercitation ullamco
													laboris nisi ut aliquip ex
													ea commodo consequat. Duis
													aute irure dolor in
													reprehenderit in voluptate
													velit esse cillum dolore eu
													fugiat nulla pariatur.
													Excepteur sint occaecat
													cupidatat non proident, sunt
													in culpa qui officia
													deserunt mollit anim id est
													laborum.
												</p>
											</td>
											<td>
												<Button
													title="View details"
													link={`/investor/dashboard/offers/${item.id}/`}
													buttonClass={`action-btn bg-green-400 rounded-sm ${item.availability.replace(
														" ",
														"-"
													)}`}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</>
				) : (
					<div className="bg-white text-center h-60">
						<h5 className="h-full flex justify-center items-center text-gray-400 text-2xl">
							Loading incoming offers {""}
							<i
								className="fa fa-spinner fa-pulse fa-3x fa-fw"
								style={{ fontSize: 20 }}
							></i>
						</h5>
					</div>
				)}
			</div>
			
			{items.length === paginateState.perPage && (
				<div id="paginate-offers" className="bg-white">
					<ReactPaginate
						previousLabel={"<"}
						nextLabel={">"}
						pageCount={pages}
						containerClassName={"pagination"}
						onPageChange={(e) => handlePageClick(e)}
					/>
				</div>
			)}
		</div>
	);
}