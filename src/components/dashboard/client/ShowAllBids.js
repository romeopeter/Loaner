import React from "react";

import { Link } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

// Mock data
import { allBids } from "../../../fake-backend/client/allBids";

export default function ShowAllBids() {
	const pageName = "Show all bids";

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout>
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
				<section id="orderbook-show-all-bids">
					<h3 id="loan-offer" className="text-white text-3xl">Rice value chain</h3>
					<div className="bg-gray-300 h-10"></div>
					<div id="all-loans-bid" className="bg-white px-10">
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
								{allBids.length > 0 ? (
									allBids.map((bid) => (
										<tr>
											<td>{bid.dealName}</td>
											<td>{bid.tranche}</td>
											<td>{bid.tenure}</td>
											<td>{bid.amount}</td>
											{bid.status === "Bid placed"?(
												<td className="text-yellow-500">{bid.status}</td>
											):(<td className="text-green-500">{bid.status}</td>)}
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
									))
								) : (
									<p>Loading...</p>
								)}
							</tbody>
						</table>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}