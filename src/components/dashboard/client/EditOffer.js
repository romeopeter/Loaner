import React from "react";

import { Link } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function EditOffer() {
	const pageName = "Offer"

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
								<p id="offer-description" className="px-5 md:px-0 col-span-12 lg:col-span-8">
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
								<div id="loan-edit" className="col-span-12 lg:col-start-5 lg:col-span-8">
									<form onSubmit={() => console.log("submit trigger")}>
										<div className="grid grid-cols-12 gap-4 p-4 border-t-2 border-black pt-5">
											<div className="col-span-3">
												<label htmlFor="name">Name</label>
												<input type="text" id="name" name="name" defaultValue="Attah Olamide" className="bg-gray-300 border-none w-full" />
											</div>

											<div className="col-span-3">
												<label htmlFor="offer-type">Type of offer</label>
												<select name="offerType" id="offer-type" className="bg-gray-300 border-none w-full">
													<option defaultValue="Commercial paper">Commercial paper</option>
													<option value="Bond">Bond</option>
												</select>
											</div>

											<div className="col-span-3">
												<label htmlFor="loan-amount">Loan amount</label>
												<input type="text" id="loan-amount" name="loanAmount" defaultValue="NGN 5 billion" className="bg-gray-300 border-none w-full" />
											</div>

											<div className="col-span-3">
												<label htmlFor="tranche">Tranche</label>
												<input type="text" id="loan-amount" name="tranche" defaultValue="Tranche 1" className="bg-gray-300 border-none w-full" />
											</div>

											<div className="col-span-3">
												<label htmlFor="tenor">Tenor</label>
												<input type="text" id="loan-amount" name="tenor" defaultValue="180 days" className="bg-gray-300 border-none w-full" />
											</div>

											<div className="col-span-12 grid grid-cols-12 gap-4 border-t-2 border-black pt-5">
												<div className="col-span-3">
													<lable htmlFor="size">Size</lable>
													<input type="text" name="size" id="size" defaultValue="NGN 5 billion" className="bg-gray-300 border-none w-full" />
												</div>

												<div className="col-span-3">
													<label htmlFor="offer-open">Offer opens</label>
													<input type="text" id="offer-opens" name="offerOpens" defaultValue="15/01/2022" className="bg-gray-300 border-none w-full" />
												</div>

												<div className="col-span-3">
													<lable htmlFor="offer-closes">Offer closes</lable>
													<input type="text" id="offer-closes" name="offerCloses" defaultValue="25/01/2022" className="bg-gray-300 border-none w-full" />
												</div>
												
												<div className="col-span-3">
													<lable htmlFor="settlement-date">Settlement date</lable>
													<input type="text" id="settlement-date" name="settlementDate" defaultValue="0/02/2022" className="bg-gray-300 border-none w-full" />
												</div>
											</div>
										</div>
									</form>
								</div>
								<div id="offer-button" className="col-span-12 flex justify-center  lg:justify-end py-10 px-5 sm:pr-10">
									<Button title="Save edit" type="submit" link="/" buttonClass="edit-draft"/>
									<Button title="Detailed edit" buttonClass="save-edit"/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	)
}