import React, { createRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import { Danger, Info } from "../../alert";

import { getInvestorAllOffersAction } from "../../../redux/investorSlice";
import { createBidAction } from "../../../redux/bidSlice";

import offerImage from "../../../assets/images/offerImage.png";
import BidAccepted from "./modals/BidAccepted";
import BidRejected from "./modals/BidRejected";

export default function SingleOffer() {
	const pageName = "Investor offers";

	const currentUserObj = useSelector((state) => state.auth.user);

	const params = useParams();
	const offerId = params.offerId;
	const dispatch = useDispatch();

	const { user: currentUser } = currentUserObj;
	const { tokens: userTokens } = currentUserObj;
	const { id: investorId } = currentUser["investor_details"];

	// Acces all loan
	const allLoanOffers = useSelector(function getAllOffers(state) {
		return state.investor.allOffers;
	});

	// Component state to hold opened loan offer
	const [offer, setOffer] = useState(null);

	const [state, setState] = useState({
		bidValue: "",
		tcCheckbox: false,
		showBidFields: false,
		showIcon: false,
	});

	const [modalState, setModalState] = useState({
		bidIsAccepted: false,
		bidIsRejected: false,
	});

	const [formError, setFormError] = useState({
		bidValueMessage: "",
		amountExceeded: "Amounted entered exceeds expectations",
		tcNotCheckedMessage: "",
	});

	useEffect(() => {
		if (allLoanOffers === null) {
			async function fetchLoanOffer() {
				const req = await dispatch(
					getInvestorAllOffersAction(investorId)
				);

				if (req.meta.requestStatus === "fulfilled") {
					// Find loan offer with the same id as url parameter id
					const loanOffer = req.payload.find(
						(offer) => offer.id === Number(offerId)
					);

					// Update coponent state with opened loan offer
					setOffer(loanOffer);
				}
			}
			fetchLoanOffer();
		} else {
			// Find loan offer with the same id as url parameter id
			const loanOffer = allLoanOffers.find(
				(offer) => offer.id === Number(offerId)
			);

			// Update coponent state with opened loan offer
			setOffer(loanOffer);
		}
	}, [offerId]);

	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		const value =
			target.type === "checkbox" ? target.checked : target.value;

		setState((state) => ({ ...state, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const setError = (error) => {
			setFormError((state) => ({ ...state, ...error }));
		};

		const updateState = (state) => {
			setState((state) => ({ ...state, ...state }));
		};

		if (state.bidValue === "") {
			setTimeout(
				() => setError({ bidValueMessage: "Please fill bid field" }),
				800
			);
			return;
		} else {
			// updateState({bidValue: state.bidValue});
			setError({ bidValueMessage: "" });
		}

		if (state.tcCheckbox === false) {
			setTimeout(
				() =>
					setError({
						tcNotCheckedMessage:
							"Please click check box and agree to bid terms",
					}),
				800
			);
			return;
		} else {
			setError({ tcNotCheckedMessage: "" });

			const reqData = {
				amount: state.bidValue,
				owner: investorId,
				loan_request: offer !== null && offer.id,
			};

			const req = await dispatch(createBidAction(reqData));

			if (req.meta.requestStatus === "pending") {
				console.log("Bid has been place but pending");
			}

			if (req.meta.requestStatus === "rejected") {
				console.log("Bid is rejected");
			}

			if (req.meta.requestStatus === "fulfilled") {
				console.log("Bid is succcesful");

				// Show modal for Accepted offer
				setModalState((state) => ({ ...state, bidIsAccepted: true }));
			}
		}
	};

	const handleRejectOffer = () => {
		if (state.showBidFields) {
			setState((state) => ({
				...state,
				showBidFields: false,
			}));
		}

		// Show Icon for rejected user
		setState((state) => ({
			...state,
			showIcon: true,
		}));

		// Show modal for rejected offer
		setModalState((state) => ({ ...state, bidIsRejected: true }));
	};

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-open-offer">
					<div
						id="loan-invest-dropdown"
						class="bg-white px-16 py-10 shadow-md flex justify-start w-full"
					>
						<Link
							to="/investor/dashboard"
							id="home"
							className="dropdown-container mr-5 underline"
						>
							View offers
						</Link>
						{/*<Link
							to="/investor/offers/offer"
							id="offers"
							className="dropdown-container"
						>
							Offers
						</Link>*/}
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
									<div id="schedule-payment" className="">
										<p className="text-white">
											Payment Schedule
										</p>
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
									<h3 className="text-green-700 text-lg font-bold pb-5">
										Dear Agropartner,
									</h3>

									<p id="description">
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										total global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
										Rice is the most consumed commodity.
										Total global rice expenditure in 2020
										was $350 billion. To put in perspective,
										totoal global crude oil in 2020 was just
										four times that amount at $1.3 trillion.
									</p>
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
									<strong className="py-2">
										For example N90, 000 every quarter for a
										N1,000,000 investment
									</strong>
									<p>
										Among agricultural commodities, rice has
										the third-highest worldwide production,
										and in Nigeria it remains the most
										consumed. The country spent over N2
										trillion on rice in 2019, which is over
										25% of the Federal Government Budget.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div id="offer-table" className="mt-20">
						<div>
							
								{offer === null ? (
									<p className="text-center text-3xl font-bold">Loading...</p>
								) : (
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
												<td
													className="border border-black"
													colSpan="2"
												>
													{offer.deal_owner}
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Dealer</b>
												</td>
												<td
													className="border border-black"
													colSpan="2"
												>
													Name of bank
													{/*****/}
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Issue rating</b>
												</td>
												<td
													className="border border-black"
													colSpan="2"
												>
													{offer.tranche_id.ratings.scale}{" "}
													({offer.tranche_id.ratings.name}
													)
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Issuer rating</b>
												</td>
												<td className="border border-black">
													AAA (Agusto), AA (GCR)
													{/*****/}
												</td>
												<td className="border border-black">
													AAA (Agusto), / A+ (GCR)
													{/*****/}
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Series/Tranche</b>
												</td>
												<td className="border border-black">
													1
													{/*****/}
												</td>
												<td className="border border-black">
													3
													{/*****/}
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Tenor</b>
												</td>
												<td className="border border-black">
													90 days
													{/*****/}
												</td>
												<td className="border border-black">
													180 days
													{/*****/}
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Tenor (bond)</b>
												</td>
												<td className="border border-black">
													5 years
													{/*****/}
												</td>
												<td className="border border-black">
													7 years
													{/*****/}
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Size</b>
												</td>
												<td className="border border-black">
													{/*NGN 10 billion*/}
													{
														offer.tranche_id.size
															.currency
													}{" "}
													{
														offer.tranche_id.size
															.minimum_subscription.amount
													}
												</td>
												<td className="border border-black">
													NGN 5 billion
													{/*****/}
												</td>
											</tr>
											<tr>
												<td className="border border-black text-red-600">
													<b>Discount Rate</b>
												</td>
												<td className="border border-black text-red-600">
													5.5%
												</td>
												<td className="border border-black text-red-600">
													6%
												</td>
											</tr>
											<tr>
												<td className="border border-black text-red-600">
													<b>Implied Yield</b>
												</td>
												<td className="border border-black text-red-600">
													5.75%
												</td>
												<td className="border border-black text-red-600">
													6.25%
												</td>
											</tr>
											<tr>
												<td className="border border-black text-red-600">
													<b>Coupon range</b>
												</td>
												<td className="border border-black text-red-600">
													10-10.5%
												</td>
												<td className="border border-black text-red-600">
													11-11%
												</td>
											</tr>
											<tr>
												<td className="border border-black text-red-600">
													<b>Offer opens</b>
												</td>
												<td
													className="border border-black text-red-600"
													colSpan="2"
												>
													8 December 2021
												</td>
											</tr>
											<tr>
												<td className="border border-black text-red-600">
													<b>Offer closes</b>
												</td>
												<td
													className="border border-black text-red-600"
													colSpan="2"
												>
													15 December 2021
												</td>
											</tr>
											<tr>
												<td className="border border-black text-red-600">
													<b>Allotment date</b>
												</td>
												<td
													className="border border-black text-red-600"
													colSpan="2"
												>
													17 December 2021
												</td>
											</tr>
											<tr>
												<td className="border border-black text-red-600">
													<b>Settlement date</b>
												</td>
												<td
													className="border border-black text-red-600"
													colSpan="2"
												>
													21 December 2021
												</td>
											</tr>
											<tr>
												<td className="border border-black text-red-600">
													<b>Maturity date</b>
												</td>
												<td
													className="border border-black text-red-600"
													colSpan="2"
												>
													21 December 2022
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Use of proceeds</b>
												</td>
												<td
													className="border border-black"
													colSpan="2"
												>
													General corporate purposes
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Minimum subscription</b>
												</td>
												<td
													className="border border-black"
													colSpan="2"
												>
													NGN 5 million
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Eligible investor</b>
												</td>
												<td
													className="border border-black"
													colSpan="2"
												>
													Qualified institutional
													investors
												</td>
											</tr>
											<tr>
												<td className="border border-black">
													<b>Tax consideration</b>
												</td>
												<td
													className="border border-black"
													colSpan="2"
												>
													Issued free and clear of
													witholdin taxes
												</td>
											</tr>
										</tbody>
									</table>
								)}
						</div>
						<div
							id="offer-signature"
							className="h-40 md:h-20 flex flex-col sm:flex-row justify-evenly"
						>
							{/*<Link
								to="/"
								id="view-document"
								className="self-center font-bold"
							>
								View documents{" "}
								<i
									class="fa fa-long-arrow-right"
									aria-hidden="true"
								></i>
							</Link>*/}
							<div className="self-center">
								<span className="block">OA</span>
								<h4 className="font-bold text-lg">
									Mr Olamide Jettah
								</h4>
							</div>
						</div>
						<div
							id="offer-btns"
							className="h-40 md:h-20 flex flex-col sm:flex-row justify-center"
						>
							<Button
								title="Place your bid"
								buttonClass="mr-0 mb-2 md:mr-5 md:mb-0 self-center rounded place-bid"
								handleClick={() =>
									setState((state) => ({
										...state,
										showBidFields: true,
									}))
								}
							/>
							<Button
								title="Reject offer"
								buttonClass={`self-center ${
									state.showBidFields
										? "bg-red-300"
										: "bg-red-500"
								} rounded reject-offer`}
								handleClick={() => handleRejectOffer()}
							/>
						</div>
					</div>

					{/*Place bid*/}
					{state.showBidFields && (
						<div
							id="place-bid"
							className="flex flex-col items-center justify-center"
						>
							{formError.tcNotCheckedMessage !== "" && (
								<Info message={formError.tcNotCheckedMessage} />
							)}
							{formError.bidValueMessage !== "" && (
								<Danger message={formError.bidValueMessage} />
							)}
							<h3 className="text-center font-bold text-xl py-5">
								Input your offer:
							</h3>
							<div id="bid-fields" className="pb-5">
								<form onSubmit={(e) => handleSubmit(e)}>
									<div className="">
										<input
											type="number"
											name="bidValue"
											placeholder="Enter amount"
											id="bid-value"
											value={state.bidValue}
											className="w-full sm:text-sm border-2 border-black focus:ring-black focus:border-black block shadow-sm"
											onChange={(e) => handleChange(e)}
										/>
									</div>
									<div id="offer-terms" className="py-5">
										<label htmlFor="terms-of-offer">
											<input
												type="checkbox"
												name="tcCheckbox"
												id="terms-of-offer"
												value={state.tcCheckbox}
												className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
												onChange={(e) =>
													handleChange(e)
												}
											/>{" "}
											I have agreed to the terms of this
											offer
										</label>
									</div>
									<div
										id="bid-action-btns"
										className="flex flex-col sm:flex-row justify-evenly"
									>
										{/*<Button
											title="Edit Offer"
											buttonClass="mr-0 mb-2 md:mr-5 md:mb-0 border-2 self-center rounded edit-offer"
										/>*/}
										<Button
											title="Submit bid"
											type="submit"
											buttonClass="mr-0 mb-2 md:mr-5 md:mb-0 self-center rounded publish-offer"
										/>
									</div>
								</form>
							</div>
						</div>
					)}

					{/*Show all modals*/}
					{modalState.bidIsAccepted && (<BidAccepted />)}
					{modalState.bidIsRejected && (<BidRejected />)}
				</section>
			</OrderbookLayout>
		</>
	);
}