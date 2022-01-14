import React, { useState, createRef } from "react";
import {useSelector, useDispatch} from "react-redux";

import OrderbookLayout from "../../OrderbookLayout";
import RequestForm from "./RequestForm";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";
import Button from "../../Button";

export default function LoanRequest() {
	const pageName = "Loan request";

	const [formState, setFormState] = useState({
		generalTerms: {
			dealType: "",
			// issuer: "",
			guarantor: "",
			dealName: "",
			projectName: "",
			dealOwner: "",
			dealTeam: "",
		},
		status: "",
		trancheName: "",
		trancheSize: {
			currency: "NGN",
			value: "",
			parValue: 1000,
			minSubscription: "",
		},
		pricing: {
			dayCount: "",
			offerType: {
				name: "",
				bookBuild: "",
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

	const { user } = JSON.parse(localStorage.getItem("USER"));

	const userFullName = `${user.first_name} ${user.last_name}`;

	const requestContainerRef = createRef();

	const handleModal = () => {
		requestContainerRef.current.classList.toggle("modal");
	};

	const handleSubmit = () => {
		const data = {
			deal_type: formState.generalTerms.dealType,
			// issuer: formState.generalTerms.issuer,
			guarantor: formState.generalTerms.guarantor,
			deal_name: formState.generalTerms.dealName,
			project_name: formState.generalTerms.projectName,
			deal_owner: formState.generalTerms.dealOwner,
			deal_team: formState.generalTerms.dealTeam,
			status: formState.status,
			tranche_name: formState.trancheName,
			tranche_size: {
				currency: formState.trancheSize.currency,
				value: formState.trancheSize.value,
				per_value: formState.trancheSize.parValue,
				min_subscription: formState.trancheSize.minSubscription,
			},
			pricing: {
				day_count: formState.pricing.dayCount,
				offer_type: {
					name: formState.pricing.offerType.name,
					book_build: formState.pricing.offerType.bookBuild,
				},
			},
			timing: {
				offer_start: formState.timing.offerStart,
				offer_end: formState.timing.offerEnd,
				allotment_date: formState.timing.allotmentDate,
				settlement_date: formState.timing.settlementDate,
				maturity_date: formState.timing.maturityDate,
			},
			use_of_proceeds: formState.useOfProceeds,
			tax_consideration: formState.taxConsideration,
			eligible_investors: formState.eligibleInvestors,
			rating: {
				name: formState.rating.name,
				scale: formState.rating.scale,
			},
		};

		console.log(data);
	}

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
								showSummary={{ summaryState, setSummaryState, handleModal }}
							/>
						</div>
						<div
							id="loan-summary"
							className="bg-white loan-request-flex-item modal-content"
						>
							{!summaryState ? (
								<div id="summary-intro" className="mt-20 ml-20">
									<h2 className="text-2xl font-bold mb-5">
										Loan offer Summary
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
										Loan offer Summary
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
														{formState.generalTerms
															.dealType !== "" &&
															formState
																.generalTerms
																.dealType}
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<small>Loan amount</small>
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
											handleClick={() => handleSubmit()}
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