import React from "react";

import { Link } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function ShowOffer() {
	const pageName = "Offer";

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
				<section id="orderbook-show-offer">
					<div id="offer">
						<h3 id="header">My offers</h3>
						<div id="the-offer">
							<div id="go-back">
								<Link to="/client/offers">
									<i class="fa fa-long-arrow-left" aria-hidden="true"></i>
								</Link>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div id="offer-header" className="col-span-12 lg:col-span-4">
									<img src={offerImage} alt="" className="w-full" />
									<h3>
										Rice Value Chain ( Project Finance )
									</h3>
									<div id="schedule-payment" className="hidden md:block">
										<p>Payment Schedule</p>
										<div className="grid grid-cols-12 gap-4">
											<div className="col-span-6">
												Sep 2022 - 9%
											</div>
											<div className="col-span-6">
												Dec 2022 - 9%
											</div>
											<div className="col-span-12">
												Mar 2022 - 9%
											</div>
											<div className="col-span-12">
												Jun 2022 - 9% + 100% Capital
											</div>
										</div>
										<div id="address">
											<span>Contact information:</span> <hr />

											<address>
												<p><span>Address:</span> 25 lorem ipsum road, Ipsum street, 
												Lagos State</p>
												<p><span>Phone:</span> +234 706 192 4567</p>
												<p><span>Email:</span> lorem@loremipsum.com</p>
											</address>
										</div>
										
									</div>
								</div>
								<p id="offer-description" className="px-5 md:px-0 col-span-12 lg:col-span-8 px-10 sm:px-10">
									Rice is the most consumed commodity. Total
									global rice expenditure in 2020 was $350
									billion. To put in perspective, total
									global crude oil in 2020 was just four times
									that amount at $1.3 trillion. Rice is the
									most consumed commodity. Total global rice
									expenditure in 2020 was $350 billion. To put
									in perspective, totoal global crude oil in
									2020 was just four times that amount at $1.3
									trillion. Rice is the most consumed
									commodity. Total global rice expenditure in
									2020 was $350 billion. To put in
									perspective, totoal global crude oil in 2020
									was just four times that amount at $1.3
									trillion. Rice is the most consumed
									commodity. Total global rice expenditure in
									2020 was $350 billion. To put in
									perspective, totoal global crude oil in 2020
									was just four times that amount at $1.3
									trillion. Rice is the most consumed
									commodity. Total global rice expenditure in
									2020 was $350 billion. To put in
									perspective, totoal global crude oil in 2020
									was just four times that amount at $1.3
									trillion. Rice is the most consumed
									commodity. Total global rice expenditure in
									2020 was $350 billion. To put in
									perspective, totoal global crude oil in 2020
									was just four times that amount at $1.3
									trillion. Rice is the most consumed
									commodity. Total global rice expenditure in
									2020 was $350 billion. To put in
									perspective, totoal global crude oil in 2020
									was just four times that amount at $1.3
									trillion. Rice is the most consumed
									commodity. Total global rice expenditure in
									2020 was $350 billion. To put in
									perspective, totoal global crude oil in 2020
									was just four times that amount at $1.3
									trillion. Rice is the most consumed
									commodity. Total global rice expenditure in
									2020 was $350 billion. To put in
									perspective, totoal global crude oil in 2020
									was just four times that amount at $1.3
									trillion.
								</p>
								<div id="loan-summary" className="col-span-12 lg:col-start-5 lg:col-span-8 mt-10 sm:mt-0">
									<table className="table-auto w-full h-auto">
										<thead></thead>
										<tbody>
											<tr>
												<td>
													<small>Name</small>
													<span>Olamide Attah</span>
												</td>
												<td>
													<small>Type of offer</small>
													<span>Commercial paper</span>
												</td>
												<td>
													<small>Loan amount</small>
													<span>NGN 5 Billion</span>
												</td>
												<td>
													<small>Tranche</small>
													<span>Tranche 1</span>
												</td>
												<td>
													<small>Tenor</small>
													<span>180 Days</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Size</small>
													<span>NGN 5 Billion</span>
												</td>
												<td>
													<small>Offer opens</small>
													<span>15/01/2022</span>
												</td>
												<td>
													<small>Offer closes</small>
													<span>25/01/2022</span>
												</td>
												<td>
													<small>Settlement Date</small>
													<span>10/02/2022</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="offer-button" className="col-span-12 flex justify-center  lg:justify-end py-10 px-5 sm:pr-10">
									<Button title="Edit draft" link="/client/offers/offer/edit" buttonClass="edit-draft"/>
									<Button title="Save edit" buttonClass="save-edit"/>
									<Button title="Next" buttonClass="next"/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}