import React from "react";

import { Link } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function VBids() {
	const pageName = "Bids";

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
				<section id="orderbook-show-bids">
					<div id="offer">
						<h3 id="header">Rice Value Chain</h3>
						<div id="the-offer">
							<div id="go-back">
								<Link to="/client/offers">
									<i
										className="fa fa-long-arrow-left"
										aria-hidden="true"
									></i>
								</Link>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div
									id="offer-header"
									className="col-span-12 lg:col-span-4"
								>
									<img
										src={offerImage}
										alt=""
										className="w-full"
									/>
									<h3>
										Rice Value Chain ( Project Finance )
									</h3>
									<div
										id="schedule-payment"
										className="hidden md:block"
									>
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
								<p
									id="offer-description"
									className="px-5 md:px-0 col-span-12 lg:col-span-8"
								>
									Rice is the most consumed commodity. Total
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
									trillion.
								</p>
								<div
									id="loan-bids"
									className="col-span-12 lg:col-start-5 lg:col-span-8"
								>
									<table className="table-auto w-full h-auto">
										{/*<thead>
											<tr>
												<th>Name</th>
												<th>Tranche</th>
												<th>Tenor</th>
												<th>Subscription</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>*/}
										<tbody>
											<tr>
												<td>Rice value chain</td>
												<td>Tranche 1</td>
												<td>90 Days</td>
												<td>NGN 5 Billion</td>
												<td className="text-green-500">
													Bid Accepted
												</td>
												<td>
													<div className="bid-actions-btns">
														<Button
															title="Approve"
															type="button"
															buttonClass="approve-bid"
														/>
														<Button
															title="Reject"
															type="button"
															buttonClass="reject-bid"
														/>
													</div>
												</td>
											</tr>
											<tr>
												<td>Rice value chain</td>
												<td>Tranche 1</td>
												<td>90 Days</td>
												<td>NGN 5 Billion</td>
												<td className="text-yellow-500">
													Bid Placed
												</td>
												<td>
													<div className="bid-actions-btns">
														<Button
															title="Approve"
															type="button"
															buttonClass="approve-bid"
														/>
														<Button
															title="Reject"
															type="button"
															buttonClass="reject-bid"
														/>
													</div>
												</td>
											</tr>
											<tr>
												<td>Rice value chain</td>
												<td>Tranche 1</td>
												<td>90 Days</td>
												<td>NGN 5 Billion</td>
												<td className="text-green-500">
													Bid Accepted
												</td>
												<td>
													<div className="bid-actions-btns">
														<Button
															title="Approve"
															type="button"
															buttonClass="approve-bid w-full"
														/>
														<Button
															title="Reject"
															type="button"
															buttonClass="reject-bid"
														/>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div
									id="view-all-bids-btn"
									className="col-span-12 flex justify-center  lg:justify-end py-10 px-5 sm:pr-10"
								>
									<Button
										title="View list of all bids"
										type="submit"
										link="/"
										buttonClass="view-all-bids"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}