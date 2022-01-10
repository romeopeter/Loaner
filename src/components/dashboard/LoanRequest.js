import React, { useState } from "react";
import NavMenu from "./NavMenu";
import RequestForm from "./RequestForm";
import OrderbookLayout from "../OrderbookLayout";
import DocumentHead from "../DocumentHead";
import Button from "../Button";

export default function NewLoan() {
	const pageName = "Loan request";

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-loan-request">
					<div
						id="loan-invest-dropdown"
						className="bg-white px-16 py-5 shadow-md flex justify-start"
					>
						<div id="loan" className="dropdown-container mr-5">
							Load{" "}
							<i
								className="fa fa-caret-down"
								aria-hidden="true"
							></i>
							<div id="load-dropdown"></div>
						</div>
						<div id="investor" className="dropdown-container">
							Investor{" "}
							<i
								className="fa fa-caret-down"
								aria-hidden="true"
							></i>
							<div id="investor-dropdown"></div>
						</div>
					</div>
					<div id="loan-request-container" className="">
						<div
							id="request-loan-form"
							className="loan-request-flex-item"
						>
							<RequestForm />
						</div>
						<div
							id="loan-summary"
							className="bg-white loan-request-flex-item"
						>
							{false ? (
								<div id="summary-intro" className="mt-20 ml-40">
									<h2 className="text-2xl font-bold mb-5">
										Loan offer Summary
									</h2>
									<p className="font-bold">
										View your loan summary here.
									</p>
								</div>
							) : (
								<div id="summary-table" className="mt-20 mx-10">
									<h2 className="text-2xl font-bold mb-5">
										Loan offer Summary
									</h2>
									<table className="table-auto w-full h-auto">
										<thead>
											<tr>
												<th></th>
											    <th></th>
											    <th></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<small>Name</small>
													<span>Olaminde Attah</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Type of offer</small>
													<span>
														Commercial paper
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Loan amount</small>
													<span>NGN 5 billion</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Tranche</small>
													<span>Tranche 1</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Tenor</small>
													<span>180 days</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Size</small>
													<span>NGN 5 billion</span>
												</td>
											</tr>
											<tr id="summary-dates-row">
												<td className="border-r border-black">
													<small>Offer opens</small>
													<span>15/01/2022</span>
												</td>
												<td className="border-r border-black">
													<small>Offer closes</small>
													<span>25/01/2022</span>
												</td>
												<td>
													<small>
														Settlement date
													</small>
													<span>10/02/2022</span>
												</td>
											</tr>
										</tbody>
									</table>

									<div
										id="loan-summary-buttons"
										className="my-10"
									>
										<div className="grid grid-cols-2 gap-3 mt-5 mb-5">
											<Button
												type="button"
												title="Save as draft"
												buttonClass="col-span-1 bg-gray-400 rounded"
											/>
											<Button
												type="button"
												title="Share"
												buttonClass="col-span-1 rounded bg-blue-600 rounded share"
											/>
										</div>
										<Button
											type="button"
											title="Publish"
											buttonClass="w-full bg-green-600 rounded"
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}