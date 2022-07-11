import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
// import { Info, Danger } from "../../alert.js";
import offerImage from "../../../assets/images/offerImage.png";

import {
	getOfferAction,
	editOfferAction
} from "../../../redux/loanSlice.js";

export default function EditOffer() {
	const pageName = "Edit loan offer"

	const params = useParams();
	const dispatch = useDispatch();

	const [currentOffer, setCurrentOffer] = useState(null);
	const [tenure, setTenure] = useState(null);
	const [updatedOffer, setUpdatedOffer] = useState({
		dealType: "",
		dealName: "",
		dealOwner: "",
		trancheName: "",
		trancheSize: {
			minSubscription: "",
		},
		timing: {
			offerStart: "",
			offerEnd: "",
			settlementDate: "",
		},
	});

	useEffect(function getLoanOffer() {
		(async () => {
			const req = await dispatch(getOfferAction({ id: params.id, dealType: params.dealType }));

			if (req.meta.requestStatus === "fulfilled") {
				const payload = req.payload !== undefined && req.payload;

				setCurrentOffer(payload);

				setUpdatedOffer(state => ({
					...state,
					dealType: payload["deal_type"],
					dealName: payload["deal_name"],
					dealOwner: payload["deal_owner"],
					trancheName: payload["tranche_id"]["name"],
					trancheSize: {
						...state.trancheSize,
						minSubscription: payload["tranche_id"]["size"]["minimum_subscription"]["amount"]
					},
					timing: {
						...state.timing,
						offerStart: payload['tranche_id']['timing']["offer_start"],
						offerEnd: payload['tranche_id']['timing']["offer_end"],
						settlementDate: payload['tranche_id']['timing']["settlement_date"],
					}
				}));
			}
		})()
	}, [dispatch, params.id, params.dealType]);

	useEffect(function calcTenure() {
		if (updatedOffer !== null) {
			const offerStart = updatedOffer.timing.offerStart;
			const offerEnd = updatedOffer.timing.offerEnd;

			// Update state
			setTenure(calculateLoanTenure(offerStart, offerEnd));
		}
	}, [updatedOffer])

	const onChangeHandler = (e) => {
		e.preventDefault();

		const name = e.target.name;
		const value = e.target.value;

		setUpdatedOffer(state => {

			if (name === "loanAmount") {
				return {
					...state,
					trancheSize: {
						minSubscription: value
					}
				}
			}

			if (
				name === "offerOpens" ||
				name === "offerCloses" ||
				name === "settlementDate") {
				return {
					...state,
					timing: {
						[name]: value
					}
				}
			}

			return { ...state, [name]: value }
		});
	}

	const submitUpdatedOfferHandler = (e) => {

		const requestData = {
			deal_type: updatedOffer.dealType,
			deal_name: updatedOffer.dealName,
			deal_owner: updatedOffer.dealOwner,
			tranche_id: {
				size: {
					minimum_subscription: {
						amount: updatedOffer.trancheSize.minSubscription,
					}
				},
				timing: {
					offer_start: updatedOffer.timing.offerStart,
					offer_end: updatedOffer.timing.offerEnd,
					settlement_date: updatedOffer.timing.settlementDate,
				},
				name: updatedOffer.trancheName
			}
		};

		if (requestData.dealType === "CP") {
			const req = dispatch(editOfferAction(currentOffer["deal_type"], currentOffer["id"], requestData));

			if (req.meta.requestStatus === "fulfilled") {
				window.scroll(0, 0);
				// Update state with alert message: "CP loan offer updated"
			}
		}

		if (requestData.dealType === "BOND") {
			const req = dispatch(editOfferAction(currentOffer["deal_type"], currentOffer["id"], requestData));

			if (req.meta.requestStatus === "fulfilled") {
				window.scroll(0, 0);
				// Update state with alert message: "Bond loan offer updated"
			}
		}
	}

	const amount = updatedOffer !== null && Math.round(updatedOffer.trancheSize.minSubscription);

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<div
					id="loan-invest-dropdown"
					className="bg-white px-16 py-10 shadow-md flex justify-start"
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
								<Link to="/client/dashboard">
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
										<form className="mt-10 sm:mt-0">
											<div className="grid grid-cols-12 gap-4 p-4 border-t-2 border-grey-200 pt-5">
												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="name">Deal owner</label>
													<input type="text" id="dealOwner" name="dealOwner" defaultValue={updatedOffer.dealOwner} className="bg-gray-300 border-none w-full" placeholder={currentOffer["deal_owner"]} onChange={onChangeHandler} />
												</div>

												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="offer-type">Type of offer</label>
													<select name="dealType" id="offer-type" className="bg-gray-300 border-none w-full p-2" onChange={onChangeHandler}>
														<option value="CP">Commercial paper</option>
														<option value="BOND">Bond</option>
													</select>
												</div>

												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="loan-amount">Loan amount</label>
													<input type="number" id="loan-amount" name="loanAmount" defaultValue={amount} className="bg-gray-300 border-none w-full" placeholder={amount} onChange={onChangeHandler} />
												</div>

												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="tranche">Tranche</label>
													<input type="text" id="loan-amount" name="trancheName" defaultValue={updatedOffer.trancheName} placeholder={updatedOffer.trancheName} className="bg-gray-300 border-none w-full" onChange={onChangeHandler} />
												</div>

												<div className="col-span-12 sm:col-span-3">
													<label htmlFor="tenor">Tenor <small>(read-only)</small></label>
													<input type="text" id="loan-amount" name="tenor" defaultValue={tenure} readOnly={true} className="bg-gray-300 border-none w-full" onChange={onChangeHandler} />
												</div>

												<div className="col-span-12 grid grid-cols-12 gap-4 border-t-2 border-grey-200 pt-5">
													<div className="col-span-12 sm:col-span-3">
														<label htmlFor="size">Size <small>(read-only)</small></label>
														<input type="number" name="size" id="size" defaultValue={amount} readOnly={true} className="bg-gray-300 border-none w-full" />
													</div>

													<div className="col-span-12 sm:col-span-3">
														<label htmlFor="offer-open">Offer opens</label>
														<input type="date" id="offer-opens" name="offerStart" defaultValue={updatedOffer.timing.offerStart} className="bg-gray-300 border-none w-full" placeholder={updatedOffer.timing.offerStart} onChange={onChangeHandler} />
													</div>

													<div className="col-span-12 sm:col-span-3">
														<label htmlFor="offer-closes">Offer closes</label>
														<input type="date" id="offer-closes" name="offerEnd" defaultValue={updatedOffer.timing.offerEnd} placeholder={updatedOffer.timing.offerEnd} className="bg-gray-300 border-none w-full" onChange={onChangeHandler} />
													</div>

													<div className="col-span-12 sm:col-span-3">
														<label htmlFor="settlement-date">Settlement date</label>
														<input type="date" id="settlement-date" name="settlementDate" defaultValue={updatedOffer.timing.offerEnd} placeholder={updatedOffer.timing.offerEnd} className="bg-gray-300 border-none w-full" onChange={onChangeHandler} />
													</div>
												</div>
											</div>
										</form>
									</div>

									<div id="offer-button" className="col-span-12 flex justify-center  lg:justify-end py-10 px-5 sm:pr-10">
										<Button
											title="Save edit"
											type="submit"
											handleClick={submitUpdatedOfferHandler}
											buttonClass="edit-draft text-black"
										/>

										<Button
											title="Detailed edit"
											link={`/client/offers/offer/full-edit/${currentOffer["id"]}/${currentOffer["deal_type"].toLowerCase()}`}
											buttonClass="save-edit text-white"
										/>
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

export const calculateLoanTenure = (startDate, EndDate) => {
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