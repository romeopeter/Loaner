import React, { createRef } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function InvestorOffers() {
	const pageName = "Investor offers";

	const modalContainerRef = createRef();

	const handleAcceptOffer = () => {
		modalContainerRef.current.classList.add("accept-modal");
	}

	const handleRejectOffer = () => {
		console.log(modalContainerRef.current.classList.add("reject-modal"));
	}



	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-investor-offers">
					<div
						id="loan-invest-dropdown"
						class="bg-white px-16 py-10 shadow-md flex justify-start w-full"
					>
						<Link
							to="/"
							id="home"
							className="dropdown-container mr-5"
						>
							Home
						</Link>
						<Link to="/" id="offers" className="dropdown-container">
							Offers
						</Link>
					</div>

					<div id="offer">
						<div id="the-offer">
							<div className="grid grid-cols-12 gap-4">
								<div
									id="offer-header"
									className="col-span-12 lg:col-span-4 row-start-1 row-end-3 pb-5"
								>
									<img
										src={offerImage}
										alt=""
										className="w-full pt-10"
									/>
									<h3 className="text-white">
										Rice Value Chain ( Project Finance )
									</h3>
									<div
										id="schedule-payment"
										className=""
									>
										<p className="text-white">Payment Schedule</p>
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
										<div
											id="address"
											className="bg-white shadow-lg p-5 mb-10 sm:md-0"
										>
											<span>Contact information:</span>{" "}
											<hr />
											<address>
												<p>
													<span>Address:</span> 25
													lorem ipsum road, Ipsum
													street, Lagos State
												</p>
												<p>
													<span>Phone:</span> +234 706
													192 4567
												</p>
												<p>
													<span>Email:</span>{" "}
													lorem@loremipsum.com
												</p>
											</address>
										</div>
									</div>
								</div>
								<div
									id="offer-description"
									className="px-5 md:px-0 col-span-12 lg:col-span-8 mr-5 pt-10"
								>
									<h3 className="text-green-700 text-lg font-bold pb-5">Dear Agropartner,</h3>

									<p id="description">Rice is the most consumed commodity. Total
									global rice expenditure in 2020 was $350
									billion. To put in perspective, total global
									crude oil in 2020 was just four times that
									amount at $1.3 trillion. Rice is the most
									consumed commodity. Total global rice
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
									trillion.</p>
								</div>
								<div
									id="offer-pitch"
									className="col-span-12 lg:col-start-5 lg:col-span-8 bg-blue-400 py-10 px-5 lg:mr-10"
								>
									<p>
										We are pleased to offer you the
										opportunity to partake in our rice value
										chain project for a period of 1 year at
										36% ROI per annum. Interest payment are
										made quuarterly at 9% of the capital
										amount.
									</p>
									<strong className="py-2">For example N90, 000 every quarter for a N1,000,000 investment</strong>
									<p>
										Among agricultural commodities,
										rice has the third-highest worldwide
										production, and in Nigeria it remains
										the most consumed. The country spent
										over N2 trillion on rice in 2019, which
										is over 25% of the Federal Government
										Budget.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div id="offer-table" className="mt-20">
						<div>
							<table className="table-auto w-full border-collapse border border-slate-500">
							<thead>
								<tr>
									<th></th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-black">
										<b>Issuer</b>
									</td>
									<td className="border border-black" colSpan="2">Name of client</td>
								</tr>
								<tr>
									<td className="border border-black">
										<b>Dealer</b>
									</td>
									<td className="border border-black" colSpan="2">Name of bank</td>
								</tr>
								<tr>
									<td className="border border-black">
										<b>Issue rating</b>
									</td>
									<td className="border border-black" colSpan="2">AAA (Agusto), AA (GCR)</td>
								</tr>
								<tr>
									<td className="border border-black">
										<b>Issuer rating</b>
									</td>
									<td className="border border-black">AAA (Agusto), AA (GCR)</td>
									<td className="border border-black">AAA (Agusto), / A+ (GCR)</td>
								</tr>
								<tr>
									<td className="border border-black">
										<b>Series/Tranceh</b>
									</td>
									<td className="border border-black">1</td>
									<td className="border border-black">3</td>
								</tr>
								<tr>
									<td className="border border-black">
										<b>Tenor</b>
									</td>
									<td className="border border-black">90 days</td>
									<td className="border border-black">180 days</td>
								</tr>
								<tr>
									<td className="border border-black">
										<b>Tenor (bond)</b>
									</td>
									<td className="border border-black">5 years</td>
									<td className="border border-black">7 years</td>
								</tr>
								<tr>
									<td className="border border-black">
										<b>Size</b>
									</td>
									<td className="border border-black">NGN 10 billion</td>
									<td className="border border-black">NGN 5 billion</td>
								</tr>
								<tr>
									<td className="border border-black text-red-600">
										<b>Discount Rate</b>
									</td>
									<td className="border border-black text-red-600">5.5%</td>
									<td className="border border-black text-red-600">6%</td>
								</tr>
								<tr>
									<td className="border border-black text-red-600">
										<b>Implied Yield</b>
									</td>
									<td className="border border-black text-red-600">5.75%</td>
									<td className="border border-black text-red-600">6.25%</td>
								</tr>
								<tr>
									<td className="border border-black text-red-600">
										<b>Coupon range</b>
									</td>
									<td className="border border-black text-red-600">10-10.5%</td>
									<td className="border border-black text-red-600">11-11%</td>
								</tr>
								<tr>
									<td className="border border-black text-red-600">
										<b>Offer opens</b>
									</td>
									<td className="border border-black text-red-600" colSpan="2">8 December 2021</td>
				
								</tr>
								<tr>
									<td className="border border-black text-red-600">
										<b>Offer closes</b>
									</td>
									<td className="border border-black text-red-600" colSpan="2">15 December 2021</td>
									
								</tr>
								<tr>
									<td className="border border-black text-red-600">
										<b>Allotment date</b>
									</td>
									<td className="border border-black text-red-600" colSpan="2">17 December 2021</td>
									
								</tr>
								<tr>
									<td className="border border-black text-red-600">
										<b>Settlement date</b>
									</td>
									<td className="border border-black text-red-600" colSpan="2">21 December 2021</td>
									
								</tr>
								<tr>
									<td className="border border-black text-red-600">
										<b>Maturity date</b>
									</td>
									<td className="border border-black text-red-600" colSpan="2">21 December 2022</td>
									
								</tr>
								<tr>
									<td className="border border-black">
										<b>Use of proceeds</b>
									</td>
									<td className="border border-black" colSpan="2">General corporate purposes</td>
									
								</tr>
								<tr>
									<td className="border border-black">
										<b>Minimum subscription</b>
									</td>
									<td className="border border-black" colSpan="2">NGN 5 million</td>
									
								</tr>
								<tr>
									<td className="border border-black">
										<b>Eligible investor</b>
									</td>
									<td className="border border-black" colSpan="2">Qualified institutional investors</td>
									
								</tr>
								<tr>
									<td className="border border-black">
										<b>Tax consideration</b>
									</td>
									<td className="border border-black" colSpan="2">Issued free and clear of witholdin taxes</td>
									
								</tr>
							</tbody>
						</table>
						</div>
						<div id="offer-signature" className="h-40 md:h-20 flex flex-col sm:flex-row justify-evenly">
							<Link to="/" id="view-document" className="self-center font-bold">
							  View documents {" "}
							 <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
							</Link>
							<div className="self-center">
							    <span className="block">OA</span>
								<h4 className="font-bold text-lg">Mr Olamide Jettah</h4>
							</div>
						</div>
						<div id="offer-buttons"  className="h-40 md:h-20 flex flex-col sm:flex-row justify-center">
							<Button title="Accept Offer" buttonClass="mr-0 mb-2 md:mr-2 md:mb-0 self-center bg-green-500 rounded" handleClick={() => handleAcceptOffer()} />
							<Button title="Reject offer" buttonClass="self-center bg-red-500 rounded" handleClick={() => handleRejectOffer()} />
						</div>
					</div>

					{/*Modal*/}
					<div id="offer-modal" className="h-60" ref={modalContainerRef}>
						<div id="modal-content" className="flex flex-col justify-center items-center">
							{/*<span class="close">&times;</span>*/}
							<h4 className="font-bold text-lg">Congratulations!</h4>
							<p className="py-5">Your loan has been published</p>
							<Button title="Go home" link="/investor/dashboard" buttonClass="bg-green-500" />
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}