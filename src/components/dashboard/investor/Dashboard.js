import React, { createRef, useState } from "react";

import { Link, useNavigate, Navigate } from "react-router-dom";

import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

import setBgImage from "../../../utils/setBgImage";
import headerBanner from "../../../assets/images/headerBanner.png";
import { offers } from "../../../fake-backend/investor/offers";

export default function AllOffers() {
	const pageName = "Investor";

	// Parameters
	const eachPage = 9;

	const [paginateState, setPaginateState] = useState({
		list: offers.length > 0 && offers,
		perPage: eachPage,
		page: 0,
		pages: Math.floor(offers.length / eachPage),
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
				<section id="orderbook-investor-dashboard">
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
						<Link to="/investor/offers/offer" id="offers" className="dropdown-container">
							Offers
						</Link>
					</div>
					<div
						id="orderbook-dashboard-intro"
						style={setBgImage(headerBanner)}
					>
						<h1>Hello, Ola</h1>
						<h3>Welcome to your dashboard</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation
						</p>
						<Button
							title="Update my profile"
							buttonClass="update-profile-cta"
						/>
					</div>
					<div
						id="user-quick-action"
						className="flex flex-row justify-evenly h-20 w-full"
					>
						<div className="actions action-1 border-r border-black">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/offers">My offers</Link>
							</h2>
						</div>
						<div className="actions action-2 border-r border-black">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/sucessful-bids">Successful offers</Link>
							</h2>
						</div>
						<div className="actions action-3">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/bids/declined">Decline offers</Link>
							</h2>
						</div>
					</div>
					<div id="offer-status" className="w-full">
						<div id="title" className="pb-2 pt-5">
							<h3>My Offers</h3>
						</div>
						<table className="table-auto w-full">
							<thead>
								<tr>
									<th>Name</th>
									<th>Tranche</th>
									<th>Tenor</th>
									<th>Size</th>
									<th>Status</th>
								</tr>
							</thead>

							{items.map((item, index) => (
								<tbody key={index}>
									<tr>
										<td className="offer-status-name">
											<input type="checkbox" name="checkbox" className="checkbox mr-2 rounded" />
											<span>{item.name}</span>
										</td>
										<td>{item.tranche}</td>
										<td>{item.tenor}</td>
										<td>{item.size}</td>
										<td>
											<Button title={item.status} buttonClass="bg-gray-500 rounded-md" />
										</td>
									</tr>
								</tbody>
							))}
						</table>
						
						<hr className="border-1 border-white mt-10" />

						{/*Pagination*/}
						<div id="paginate-offer-status">
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