import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

import offerImage from "../../../assets/images/offerImage.png";

export default function InvestorBids() {
	const pageName = "Bids";

	const mockData = [
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "Rice Value Chain",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
		{
			bidName: "TribeModern Realty Transactions",
			bidImage: "https://stockaru/skfd34-dfksdf-/ifksndfk3.jpg",
			bidDescription:
				"A real estate transaction is the process whereby rights in a unit of property (or designated real estate) is transferred between two or more parties, e.g. in case of conveyance one party being the seller(s) and the other being the buyer(s).",
		},
	];

	const eachPage = 9;

	const [paginateState, setPaginateState] = useState({
		list: mockData.length > 0 && mockData,
		perPage: eachPage,
		page: 0,
		pages: Math.floor(mockData.length / eachPage)
	})

	const {page, perPage, pages, list} = paginateState;
	let items = list.slice(page * perPage, (page + 1) * perPage);

	const handlePageClick = (event) => {
	 let page = event.selected;
	 setPaginateState(state => ({...state, page: page}));
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
						<i
							className="fa fa-caret-down mr-5"
							aria-hidden="true"
						></i>
						<div id="load-dropdown"></div>
					</div>
					<div id="investor" className="dropdown-container">
						Investor{" "}
						<i className="fa fa-caret-down" aria-hidden="true"></i>
						<div id="investor-dropdown"></div>
					</div>
				</div>
				<section id="orderbook-investor-bids">
					<div id="bids">
						<h3 id="header">Succesful offers</h3>
						<div style={{ overflowX: "auto" }}>
							<table className="bg-white table-auto w-full">
								<tbody>
									{
										items.map((item, index) => {
											return (<tr key={index}>
												<td className="bid-name">
													<input type="checkbox" name="checkbox" className="checkbox rounded" />
													<img src={offerImage} alt=""  className="rounded h-10 w-10" />
													<span>{item.bidName}</span>
												</td>
												<td>
													<p>{item.bidDescription}</p>
												</td>
												<td>
													<Button title="View details" buttonClass="bg-green-600 hover:bg-white hover:shadow" />
												</td>
											</tr>);
										})
									}
								</tbody>
							</table>
						</div>
						<div id="paginate-bids" className="bg-white">
							<ReactPaginate previousLabel={'<'} nextLabel={'>'} pageCount={pages} containerClassName={'pagination'} onPageChange={(e) => handlePageClick(e)} />
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}