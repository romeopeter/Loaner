import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Button from "../../Button";

import offerImage from "../../../assets/images/offerImage.png";

export default function ShowAllOpenedOffers({ openOffers }) {

	// Pagination
	const [paginateState, setPaginateState] = useState({
		list: [],
		perPage: 9,
		page: 0,
		pages: 0,
	});

	useEffect(() => {
		if (openOffers !== null) {
			setPaginateState({
				list: openOffers,
				perPage: 9,
				page: 0,
				pages: Math.floor(openOffers.length / 9)
			});
		}
	}, [])

	const { page, perPage, pages, list } = paginateState;
	let items = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState((state) => ({ ...state, page: page }));
	};

	return (
		<>
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
										<span>{item.bidName}</span>
									</td>
									<td>
										<p>{item.bidDescription}</p>
									</td>
									<td>
										<Button
											title="View details"
											buttonClass={`action-btn ${item.availability.replace(
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
		</>
	);
}