import React from "react";

import { Link } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function PublishOffer() {
	const pageName = "Publish offer";

	const handleSubmit = (e) => {
		e.preventDefault()

		console.log("submit trigger")
	}

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
				<div id="orderbook-publish-offer">
					<div id="offer-publication">
						<div id="offer">
							<h3 id="header">My offers</h3>
							<div id="the-offer">
								<div id="go-back">
									<Link to="/client/offers/offer/edit">
										<i
											className="fa fa-long-arrow-left"
											aria-hidden="true"
										></i>
									</Link>
								</div>
								<form id="form" className="px-5" onSubmit={(e) => handleSubmit(e)}>
									<div className="grid grid-cols-12 gap-4">
										<div className="col-span-12">
											<h3 className="text-2xl font-bold">Select investors</h3>
										</div>

										<div className="col-span-12 sm:col-span-6">
											<select
												name="selectCategory"
												id="select-category"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 border-none p-5 mb-5 form-field"
											>
												<option defaultValue="Select category">Select category</option>
											</select>
											<div className="checkboxes">
												<input type="checkbox" name="categoryCheckbox" className="mr-2 rounded" />
												<label htmlFor="category-checkbox">Do you want to save and send as now open</label>
											</div>
										</div>
										<div className="col-span-12 sm:col-span-6">
											<select
												name="selectInvestor"
												id="select-investor"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 border-none p-5 mb-5 form-field"
											>
												<option defaultValue="Select investor">Select investor</option>
											</select>
											<div className="checkboxes">
												<input type="checkbox" name="investorCheckbox" className="mr-2 rounded" />
												<label htmlFor="investor-checkbox">Do you want to save and send as coming soon</label>
											</div>
										</div>
										<div
											id="offer-button"
											className="col-span-12 my-5"
										>
											<Button
												title="Save edit"
												type="submit"
												buttonClass="edit-draft bg-green-600"
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</OrderbookLayout>
		</>
	);
}