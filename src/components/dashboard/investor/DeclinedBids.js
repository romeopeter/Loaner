import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import Table from "./Table";

import offerImage from "../../../assets/images/offerImage.png";
import { getDeclinedBidsAction } from "../../../redux/bidSlice";

export default function DeclinedBids() {
	const pageName = "Declined offers";
	const dispatch = useDispatch();

	/* Pagination stars */
	const [paginateState, setPaginateState] = useState({
		list: [],
		perPage: 9,
		page: 0,
		pages: 0,
	});

	const { page, perPage, pages, list } = paginateState;
	let declindBids = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
		let page = event.selected;
		setPaginateState((state) => ({ ...state, page: page }));
	};
	/* Pagination Ends */

	const [isLoading, setisLoading] = useState(true);

	useEffect(function getapprovedBids() {
		let componentIsMounted = true;

		(async () => {
			const req = await dispatch(getDeclinedBidsAction());

			if (req.meta.requestStatus === "fulfilled") {
				if (componentIsMounted) {
					setPaginateState(state => ({
						...state,
						list: req.payload,
						pages: Math.floor(req.payload.length / 9)
					}));
					setisLoading(false);
				};
			}

			componentIsMounted = false;
		})();

		return () => componentIsMounted;

	}, [dispatch]);

	const tableColumn = useMemo(
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
		return declindBids.map(bid => {
	
		  const dealId = bid["loan_request"]["id"];
		  const dealType =
			bid["loan_request"]["deal_type"] === "Commercial Paper"
			  ? "cp"
			  : "bonds";
		  const bidName = bid["loan_request"]["deal_name"] !== undefined ? bid["loan_request"]["deal_name"] : bid["loan_request"]["tranche_name"];
	
		  return {
			name: bidName,
			description: "***",
			tableBtn: `${dealId}/${dealType.toLowerCase()}`
		  };
		});
	},[declindBids]);

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

						{isLoading ? (<div className="bg-white w-full h-auto">
							<p className="text-3xl text-center h-40 flex justify-center items-center text-gray-500">
								<i className="fa fa-spinner fa-pulse fa-3x fa-fw"
									style={{fontSize: 50}}></i>
							</p>
						</div>) : (
							<div id="table-container" className="bg-white" style={{ overflowX: "auto" }}>

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
									{declindBids.length === 0 ? (
										<div>
											<p 
											className="py-5 text-center text-3xl text-gray-400 h-40 flex justify-center items-center"
											style={{ fontSize: "1.875rem" }}
										>
											You have no declined offers
											<i class="fa fa-times ml-2" aria-hidden="true"></i>
										</p>
										</div>
									) : (
										<Table column={tableColumn} data={tableData} />
									)}	
							</div>)}

						{declindBids.length > 0 && (
							<div id="paginate-bids" className="bg-white">
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
				</section>
			</OrderbookLayout>
		</>
	);
}