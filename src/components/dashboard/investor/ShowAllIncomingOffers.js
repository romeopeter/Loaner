import React, { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import Button from "../../Button";
import Table from "./Table";

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
	}, [incomingOffers]);

	const { page, perPage, pages, list } = paginateState;
	let items = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState((state) => ({ ...state, page: page }));
	};

	const tableColumns = useMemo(
		() => [
			{
			  Header: "Name",
			  accessor: "name",
			},
			{
			  Header: "Description",
			  accessor: "description",
			},
			{
			  Header: "TableBtn",
			  accessor: "tableBtn",
			},
		],
		[]
	  );
	
	const tableData = useMemo(() => {
		return incomingOffers.map((offer) => {
			return {
				name: offer["deal_name"],
				description: "***",
				tableBtn: `${offer.id}/${offer["deal_type"].toLowerCase()}`
			};
		});
	},[incomingOffers]);

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
						
						{incomingOffers.length > 0 && <Table columns={tableColumns} data={tableData} />}
					</>
				) : (
					<div className="bg-white text-center h-60">
						<h5 className="h-full flex justify-center items-center text-gray-400 text-2xl">
							<i
								className="fa fa-spinner fa-pulse fa-3x fa-fw"
								style={{ fontSize: 40 }}
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