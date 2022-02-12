import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Link} from "react-router-dom";

import ReactPaginate from "react-paginate";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function Offers() {
	const pageName = "Offers";

	const dispatch = useDispatch();
	const offers = useSelector((state) => state.loan.offers);

	// Mock offer data
	const [mockData, setMockData] = useState([
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Pea value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Bean value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Cocoa value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Yam value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Carrot value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},

		{
			offerTitle: "Corn value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Okra value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Potatoe value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Apple value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Lettuce value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Cabbage value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
		{
			offerTitle: "Rice value chain (Project Finance)",
			offerImageURL: "https://cloudinary/jdfd-34-zf-3423/slfjnsjfnsd",
			offerDescription:
				"Rice is the most consumed commodity. Total global rice expenditure in 2020 was $350 billion. To put in perspective, totoal global crude oil in 2020 was just four times that amount at $1.3 trillion.",
		},
	]);

	/*useEffect(() => {
		return () => {
			effect
		};
	}, [input])*/
	
	// Parameters
	const eachPage = 6;

	const [paginateState, setPaginateState] = useState({
		list: mockData.length > 0 && mockData,
		perPage: eachPage,
		page: 0,
		pages: Math.floor(offers.length / eachPage)
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
						<i className="fa fa-caret-down mr-5" aria-hidden="true"></i>
						<div id="load-dropdown"></div>
					</div>
					<div id="investor" className="dropdown-container">
						Investor{" "}
						<i className="fa fa-caret-down" aria-hidden="true"></i>
						<div id="investor-dropdown"></div>
					</div>
				</div>
				<section id="orderbook-offers">
					<div id="offers">
						<h3 id="header">My offers</h3>

						<div id="the-offers">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center place-content-center gap-20">
								{offers.length > 0 && offers.map((offer) => (
									<div
										id={offer.id}
										className="offer"
									>
										<div className="offer-title">
											<img
												src={offerImage}
												alt=""
												className="offer-image"
											/>
											<h3 className="title">
												{offer.deal_name}
											</h3>
										</div>
										<p className="offer-description">
											{offer.deal_name}
										</p>
										<div className="offer-button">
											<Button
												title="Edit draft"
												link="/client/offers/offer/edit"
												buttonClass="h-2 p-2 bg-grey"
											/>
											<Button
												title="Publish"
												link="/client/offers/offer/publish"
												buttonClass="h-2 p-2 bg-white"
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/*<div id="paginate-offers">
						<ReactPaginate previousLabel={'<'} nextLabel={'>'} pageCount={pages} containerClassName={'pagination'} onPageChange={(e) => handlePageClick(e)} />
					</div>*/}
				</section>
			</OrderbookLayout>
		</>
	);
}