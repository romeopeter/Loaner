import React, { useState, createRef, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OrderbookLayout from "../../OrderbookLayout";
import RequestForm from "./RequestForm";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";

import Button from "../../Button";

import { setServerMessage } from "../../../redux/messageSlice";

import {cp, bond} from "../loan-request-data/requestData"

import { CPLoanOfferAction, bondLoanOfferAction} from "../../../redux/loanSlice";

export default function LoanRequest() {
	const pageName = "Loan request";

	const currentOfferIsUpdated = useSelector(state => state.loan.currentOffer)
	const serverError = useSelector(state => state.message.server.message);

	const [formState, setFormState] = useState({
		dealType: "",
		// issuer: "",
		guarantor: "",
		dealName: "",
		projectName: "",
		dealOwner: "",
		dealTeam: "",
		status: "",
		trancheName: "",
		trancheSize: {
			currency: "NGN",
			value: "",
			faceValue: "",
			discountValue:"",
			parValue: 1000,
			minSubscription: "",
		},
		pricing: {
			dayCount: "",
			couponType: "",
			benchmark: "",
			couponFrequency: "",
			callOption:"",
			offerType: {
				name: "",
				fixedPrice: {
					rate: "", // Can be discount rate or rate range
					yield: "", // Can be implied yield or yield type
				}
			},
		},
		timing: {
			offerStart: "",
			offerEnd: "",
			allotmentDate: "",
			settlementDate: "",
			maturityDate: "",
		},
		useOfProceeds: "",
		taxConsideration: "",
		eligibleInvestors: "",
		rating: {
			name: "",
			scale: "",
		},
	});

	const [summaryState, setSummaryState] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const { user } = JSON.parse(localStorage.getItem("USER"));

	const userFullName = `${user.first_name} ${user.last_name}`;

	const dispatch = useDispatch();
	const navigate = useNavigate()
	const requestContainerRef = createRef();
	const componentMounted = useRef(true);

	const handleModal = () => {
		requestContainerRef.current.classList.toggle("modal");
	};

	const handleSubmit = async () => {
		const {user: currentUser} = JSON.parse(localStorage.getItem("USER"));

		if (formState.dealType === "CP") {
			const req = await dispatch(CPLoanOfferAction(cp(formState, currentUser)));

			if (componentMounted.current) setIsLoading(true);


			if (req.meta.requestStatus === "fulfilled") {

				if (componentMounted.current) setIsLoading(false);

				// Loan is created, Navigate to publish page
                navigate("/client/offers/offer/publish");
            } else {
            	if (componentMounted.current) setIsLoading(false);

            	if (serverError) alert(serverError.detail);

            	return
            }

            if (serverError.messageType === "network_error") {
            	if (componentMounted.current) setIsLoading(false);
            	
                setIsLoading(false);

                alert(serverError.detail);

                return
            }
		}

		if (formState.dealType === "BOND") {
			const req = await dispatch(bondLoanOfferAction(bond(formState, currentUser)));

			if (componentMounted.current) setIsLoading(true);
			
			if (req.meta.requestStatus === "fulfilled") {

				if (componentMounted.current) setIsLoading(false);
                
                // Loan is created, Navigate to publish page
                navigate("/client/offers/offer/publish");
            } else {
            	if (componentMounted.current) setIsLoading(false);

            	if (serverError) alert(serverError.detail);

            	return
            }

            if (serverError.messageType === "network_error") {
            	if (componentMounted.current) setIsLoading(false);

                setIsLoading(false);

                alert(serverError.detail);

                return
            }
		}
	};

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-loan-request">
					<div
						id="loan-invest-dropdown"
						className="bg-white px-16 py-10 shadow-md flex justify-start"
					>
						<div id="loan" className="dropdown-container mr-5">
							Loan{" "}
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
					<div
						id="loan-request-container"
						className=""
						ref={requestContainerRef}
					>
						<div
							id="request-loan-form"
							className="loan-request-flex-item"
						>
							<RequestForm
								requestFormState={{ formState, setFormState }}
								showSummary={{
									summaryState,
									setSummaryState,
									handleModal,
								}}
							/>
						</div>
						<div
							id="loan-summary"
							className="bg-white loan-request-flex-item modal-content"
						>
							{!summaryState ? (
								<div id="summary-intro" className="mt-20 ml-20">
									<h2 className="text-2xl font-bold mb-5">
										Loan Offer Summary
									</h2>
									<p className="font-bold">
										View your loan summary here.
									</p>
								</div>
							) : (
								<div id="summary-table" className="mt-20 mx-10">
									<span
										class="md:hidden modal-close"
										onClick={() =>
											requestContainerRef.current.classList.remove(
												"modal"
											)
										}
									>
										&times;
									</span>
									<h2 className="text-md text-center sm:text-left sm:text-2xl font-bold mb-5">
										Loan Offer Summary
									</h2>
									<table className="table-fixed w-full h-auto">
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
													<span>
														{userFullName &&
															userFullName}
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Type of offer</small>
													<span>
														{(formState.dealType !== "" && formState.dealType === "CP") && "Commercial paper"}
														{(formState.dealType !== "" && formState.dealType === "BOND") && "Bond"}
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Loan amount</small>
													<span>
														{formState.trancheSize.currency}{" "}
														{formState.trancheSize
															.minSubscription !==
															"" &&
															formState
																.trancheSize
																.minSubscription
														}
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Tranche</small>
													<span>
														{formState.trancheName !==
															"" &&
															formState.trancheName}
													</span>
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
													<span>
														{formState.trancheSize
															.minSubscription !==
															"" &&
															formState
																.trancheSize
																.minSubscription}
													</span>
												</td>
											</tr>
											<tr id="summary-dates-row">
												<td className="border-r border-black">
													<small>Offer opens</small>
													<span>
														{formState.timing
															.offerStart !==
															"" &&
															formState.timing
																.offerStart}
													</span>
												</td>
												<td className="border-r border-black">
													<small>Offer closes</small>
													<span>
														{formState.timing
															.offerEnd !== "" &&
															formState.timing
																.offerEnd}
													</span>
												</td>
												<td>
													<small>
														Settlement date
													</small>
													<span>
														{formState.timing
															.settlementDate !==
															"" &&
															formState.timing
																.settlementDate}
													</span>
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
												buttonClass="col-span-2 bg-gray-400 rounded"
											/>
										</div>
										<Button
											type="submit"
											buttonClass="w-full bg-green-600 rounded"
											handleClick={() => handleSubmit()}
										>
											Create loan{" "}
											{isLoading ? (
												<i
													className="fa fa-spinner fa-pulse fa-3x fa-fw"
													style={{ fontSize: 20 }}
												></i>
											) : null}
										</Button>
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