import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import { getOfferAction } from "../../../redux/loanSlice.js";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function EditOffer() {
	const pageName = "Offer"

	const params = useParams();
	const dispatch = useDispatch();

	const [currentOffer, setCurrentOffer] = useState(null);
	const [tenure, setTenure] = useState(null);

	useEffect(function getLoanOffer() {
		(async () => {
			const req = await dispatch(getOfferAction({ id: params.id, dealType: params.dealType }));

			if (req.meta.requestStatus === "fulfilled") {
				const payload = req.payload !== undefined && req.payload;
				setCurrentOffer(payload);
			}
		})()
	}, [dispatch, params.id, params.dealType]);

	const calculateLoanTenure = (startDate, EndDate) => {
		let tenure = "";
	
		const loanStartDate = new Date(startDate);
		const loanEndDate = new Date(EndDate);
	
		const timeDifference = loanEndDate.getTime() - loanStartDate.getTime();
		const daysDiffernce = timeDifference / (1000 * 60 * 60 * 24);
		tenure = daysDiffernce;
	
		/*
		End date can't be the same as start date.
		If the the difference is days is 0 then loan end date is set to
		the same time as loan start date
		*/
		if (tenure === 0 || tenure < 0) return "***";
	
		return isNaN(tenure) === false && tenure;
	};

	useEffect(() => {
		// Calculate tenure
		if (currentOffer !== null) {
			const offerStart = currentOffer["tranche_id"]['timing']['offer_start'];
			const offerEnd = currentOffer["tranche_id"]['timing']['offer_end'];

			// Update state
			setTenure(calculateLoanTenure(offerStart, offerEnd));
		}
	}, [currentOffer])

	const amount  = currentOffer !== null && currentOffer["tranche_id"]["size"]["minimum_subscription"]["amount"];
	const loanAmount = Math.round(amount);
	const loanSize = loanAmount;


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
									<i className="fa fa-long-arrow-left" aria-hidden="true"></i>
								</Link>
							</div>

							{currentOffer !== null ? (
								<div className="grid grid-cols-12 gap-4">
									<div id="offer-header" className="col-span-12 lg:col-span-4">
										<img src={offerImage} alt="" className="w-full" />
										<h3>
											{/* Rice Value Chain ( Project Finance ) */}
											{currentOffer["deal_name"]}
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
										perspective, totol global crude oil in 2020
										was just four times that amount at $1.3
										trillion. Rice is the most consumed
										commodity. Total global rice expenditure in
										2020 was $350 billion. To put in
										perspective, totoal global crude oil in 2020
										was just four times that amount at $1.3
										trillion. Rice is the most consumed
										commodity.
									</p>
									<div id="loan-edit" className="col-span-12 lg:col-start-5 lg:col-span-8">
										<form onSubmit={() => console.log("submit trigger")} className="mt-10 sm:mt-0">
											<div className="grid grid-cols-12 gap-4 p-4 border-t-2 border-grey-200 pt-5">
												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="name">Name</label>
													<input type="text" id="name" name="name" defaultValue={currentOffer["deal_owner"]} className="bg-gray-300 border-none w-full" />
												</div>

												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="offer-type">Type of offer</label>
													<select name="offerType" id="offer-type" className="bg-gray-300 border-none w-full p-2">
														<option value="CP">Commercial paper</option>
														<option value="BOND">Bond</option>
													</select>
												</div>

												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="loan-amount">Loan amount</label>
													<input type="text" id="loan-amount" name="loanAmount" defaultValue={loanAmount} className="bg-gray-300 border-none w-full" />
												</div>

												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="tranche">Tranche</label>
													<input type="text" id="loan-amount" name="tranche" defaultValue={currentOffer["tranche_id"]["name"]} className="bg-gray-300 border-none w-full" />
												</div>

												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="tenor">Tenor</label>
													<input type="text" id="loan-amount" name="tenor" defaultValue={tenure} className="bg-gray-300 border-none w-full" />
												</div>

												<div className="col-span-12 grid grid-cols-12 gap-4 border-t-2 border-grey-200 pt-5">
													<div className="col-span-12 sm:col-span-3">
														<lable htmlFor="size">Size</lable>
														<input type="text" name="size" id="size" defaultValue={loanSize} className="bg-gray-300 border-none w-full" />
													</div>

													<div className="col-span-12 sm:col-span-3">
														<label htmlFor="offer-open">Offer opens</label>
														<input type="text" id="offer-opens" name="offerOpens" defaultValue={currentOffer['tranche_id']['timing']["offer_start"]} className="bg-gray-300 border-none w-full" />
													</div>

													<div className="col-span-12 sm:col-span-3">
														<lable htmlFor="offer-closes">Offer closes</lable>
														<input type="text" id="offer-closes" name="offerCloses" defaultValue={currentOffer['tranche_id']['timing']["offer_end"]} className="bg-gray-300 border-none w-full" />
													</div>

													<div className="col-span-12 sm:col-span-3">
														<lable htmlFor="settlement-date">Settlement date</lable>
														<input type="text" id="settlement-date" name="settlementDate" defaultValue={currentOffer['tranche_id']['timing']["settlement_date"]} className="bg-gray-300 border-none w-full" />
													</div>
												</div>
											</div>
										</form>
									</div>

									<div id="offer-button" className="col-span-12 flex justify-center  lg:justify-end py-10 px-5 sm:pr-10">
										<Button title="Save edit" type="submit" link="/" buttonClass="edit-draft" />
										<Button title="Detailed edit" link="/client/offers/offer/publish" buttonClass="save-edit text-black" />
									</div>
								</div>
							) : (
								<p className="text-gray-500 text-2xl text-center pb-10">
									Loading offers {" "}
									<i
										className="fa fa-spinner fa-pulse fa-3x fa-fw"
										style={{ fontSize: 20 }}
									></i>
								</p>
							)}
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	)
}