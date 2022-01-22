import React, { useState, createRef } from "react";
// import Alert from "@mui/material/Alert";

import Button from "../../Button";

export default function RequestForm({ requestFormState, showSummary }) {
	const { formState, setFormState } = requestFormState;
	const { summaryState, setSummaryState, handleModal } = showSummary;

	const [state, setState] = useState({
		submitButtonIsDisabled: true,
		secondSlideIn: false,
		lastSideIn: false,
		isValidated: true,
		emptyFields: "",
	});

	const secondSlideRef = createRef();
	const lastSlideSlideRef = createRef();

	/**Handles the slide-in and slide-out of the second form 
		field set (slide-2)
	**/
	const handleSecondFormSlideIn = () => {
		const isSlidedIn = secondSlideRef.current.classList.toggle("slide-out");

		if (isSlidedIn) {
			setState((state) => {
				return {
					...state,
					secondSlideIn: true,
				};
			});
		}
	};

	const handleSecondFormSlideOut = () => {
		secondSlideRef.current.classList.remove("slide-out");
		setState((state) => {
			return {
				...state,
				secondSlideIn: false,
			};
		});
	};

	/**Handles the slide-in and slide-out of the last form 
		field set (slide-3)
	**/
	const handleLastFormSlideIn = () => {
		const isSlidedIn =
			lastSlideSlideRef.current.classList.toggle("slide-out");

		if (isSlidedIn) {
			setState((state) => {
				return {
					...state,
					submitButtonIsDisabled: false,
					lastSideIn: true,
				};
			});
		}
	};

	const handleLastFormSlideOut = () => {
		lastSlideSlideRef.current.classList.remove("slide-out");
		setState((state) => {
			return {
				...state,
				submitButtonIsDisabled: true,
				lastSideIn: false,
			};
		});
	};

	const handleChange = (e, fieldClass) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		if (fieldClass) {
			setFormState((state) => {
				return {
					...state,
					[fieldClass]: {
						...state[fieldClass],
						[name]: value,
					},
				};
			});
		}

		setFormState((state) => {
			return {
				...state,
				[name]: value,
			};
		});
	};

	const handleValidation = (e) => {
		e.preventDefault();

		for (let props in formState.generalTerms) {
			if (
				formState.generalTerms[props] === "" ||
				formState.generalTerms[props] === null
			) {
				setState((state) => ({ ...state, isValidated: false }));
				setState((state) => ({
					...state,
					emptyFields: "Please fill in the fields",
				}));

				return;
			}
		}

		// Trigger for showing tables in LoanRequest component
		setSummaryState(true);
	};

	return (
		<>
			<form
				id="loan-summary-form"
				className="h-full pb-5"
				onSubmit={handleValidation}
			>
				<div id="loan-request-steps">
					{/*loan request -- 1st step*/}
					<div
						id="general-issuer-terms"
						className="form-slide slide-1"
					>
						<div id="terms-heading">
							<h1>New Offer</h1>
							<p className="py-2">General issuer terms</p>
						</div>

						<div className="grid grid-cols-1 gap-4">
							<div className="col-span-12">
								<select
									name="dealType"
									id="dealType"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.generalTerms.dealType}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									// required
								>
									<option defaultValue="">
										Select deal type
									</option>
									<option value="Commercial paper">
										Commercial paper
									</option>
									<option value="Bond">Bond</option>
								</select>
							</div>

							<div className="col-span-12">
								<select
									name="issuer"
									id="issuer"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									disabled={true}
									style={{ cursor: "not-allowed" }}
									/*value={formState.generalTerms.issuer}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}*/
									// required
								>
									<option defaultValue="Client/issue">
										Client/issuer
									</option>
								</select>
							</div>

							<div className="col-span-12">
								<input
									type="text"
									name="guarantor"
									id="guarantor"
									placeholder="Guarantor"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.generalTerms.guarantor}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									// required
								/>
							</div>
							<div className="col-span-12">
								<input
									type="text"
									name="dealName"
									id="dealName"
									placeholder="Deal name"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.generalTerms.dealName}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									// required
								/>
							</div>
							<div className="col-span-12">
								<input
									type="text"
									name="projectName"
									id="projectName"
									placeholder="Project name"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.generalTerms.projectName}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									// required
								/>
							</div>

							<div className="col-span-12">
								<input
									type="text"
									name="dealOwner"
									id="dealOwner"
									placeholder="Deal owner"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.generalTerms.dealOwner}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									// required
								/>
							</div>

							<div className="col-span-12">
								<input
									type="text"
									name="dealTeam"
									id="dealTeam"
									placeholder="Deal team"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.generalTerms.dealTeam}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									// required
								/>
							</div>

							<div
								id="general-terms-next-button"
								className={`col-span-12 text-right form-slide-button ${
									state.secondSlideIn && "hidden"
								}`}
							>
								<Button
									title="Next"
									buttonClass="bg-white rounded"
									handleClick={handleSecondFormSlideIn}
								/>
							</div>
						</div>
					</div>

					{/*loan request -- 2nd step*/}
					<div className="form-slide slide-2" ref={secondSlideRef}>
						<div id="terms-heading">
							<h3 className="py-2 text-xl">Tranche Terms</h3>
						</div>

						{/*Tranche terms*/}
						<div id="tranche-terms">
							<div className="grid grid-cols-1 gap-4">
								<div className="col-span-12">
									<select
										name="status"
										id="status"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
										value={formState.status}
										onChange={(e) => handleChange(e)}
									>
										<option defaultValue="">
											Select status
										</option>
										<option value="draft">Draft</option>
										<option value="invitation">
											Invitation
										</option>
										<option value="pre-market">
											Pre-market
										</option>
										<option value="announced">
											Announced
										</option>
										<option value="allocated">
											Books closed
										</option>
										<option value="archived">
											Archived
										</option>
									</select>
								</div>
								<div className="col-span-12">
									<input
										type="text"
										name="trancheName"
										id="trancheName"
										placeholder="Tranche name"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
										value={formState.trancheName}
										onChange={(e) => handleChange(e)}
									/>
								</div>
							</div>
						</div>

						{/*Tranche size*/}
						<div id="tranche-size">
							<div id="terms-heading">
								<p className="py-2">Tranche size</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1">
									<select
										name="currency"
										id="currency"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.trancheSize.currency}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									>
										<option defaultValue="">
											Currency
										</option>
										<option value="NGN">NGN</option>
										<option value="USD">USD</option>
									</select>
								</div>
								<div className="col-span-1">
									<select
										name="value"
										id="tranche-value"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.trancheSize.value}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									>
										<option defaultValue="">Value</option>
										<option value="face-value">
											Face value
										</option>
										<option value="discount-value">
											Discount value
										</option>
									</select>
								</div>
								<div className="col-span-1">
									<input
										type="text"
										name="par-value"
										id="par-value"
										placeholder="Par value"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										disabled={true}
										style={{ cursor: "not-allowed" }}
									/>
								</div>
								<div className="col-span-1">
									<select
										name="minSubscription"
										id="min-subscription"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={
											formState.trancheSize
												.minSubscription
										}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									>
										<option defaultValue="">
											Min subscription
										</option>
										<option value="500,000">
											NGN 500,000
										</option>
										<option value="10,000,000">
											NGN 10,000,000
										</option>
										<option value="25,000,000">
											NGN 25,000,000
										</option>
										<option value="other">Other</option>

										<option value="line">
											____________________________________________
										</option>

										<option value="100,000">
											USD 100,000
										</option>
										<option value="200,000">
											USD 200,000
										</option>
										<option value="500,000">
											USD 500,000
										</option>
										<option value="1,000,000">
											USD 1,000,000
										</option>
										<option value="other">Other</option>
									</select>
								</div>
							</div>
						</div>

						{/*Pricing*/}
						<div id="Pricing">
							<div id="terms-heading">
								<p className="py-2">pricing</p>
							</div>

							<div className="grid grid-cols-1 gap-4">
								<div className="col-span-12">
									<select
										name="dayCount"
										id="day-count"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.pricing.dayCount}
										onChange={(e) =>
											handleChange(e, "pricing")
										}
									>
										<option defaultValue="">
											Day Count
										</option>
										<option value="actual/actual">
											Actual / Actual
										</option>
										<option value="30/360">30 / 360</option>
										<option value="actual/360">
											Actual / 360
										</option>
										<option value="actual/365">
											Actual / 365
										</option>
									</select>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 mt-5">
								<div className="col-span-1">
									<select
										name="fixedPrice"
										id="fixed-price"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.pricing.offerType.name}
										onChange={(e) =>
											setFormState((state) => {
												return {
													...state,
													pricing: {
														...state.pricing,
														offerType: {
															...state.pricing
																.offerType,
															name: e.target
																.value,
														},
													},
												};
											})
										}
									>
										<option defaultValue="">
											Fixed price (offer type)
										</option>
										<option value="discount-rate">
											Discount rate
										</option>
										<option value="implied-yield">
											Implied yield
										</option>
									</select>
								</div>

								<div className="col-span-1">
									<select
										name="bookBuild"
										id="buildType"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
										value={
											formState.pricing.offerType
												.bookBuild
										}
										onChange={(e) =>
											setFormState((state) => {
												return {
													...state,
													pricing: {
														...state.pricing,
														offerType: {
															...state.pricing
																.offerType,
															bookBuild:
																e.target.value,
														},
													},
												};
											})
										}
									>
										<option defaultValue="">
											Book build (offer type)
										</option>
										<option value="discount-rate-range">
											Discount rate range
										</option>
										<option value="yield">Yield</option>
									</select>
								</div>
							</div>
						</div>

						<div
							id="form-slide-control"
							className="form-slide-button mt-5 mb-5 flex justify-between"
						>
							<Button
								title="Previous"
								buttonClass="bg-white rounded previous"
								handleClick={handleSecondFormSlideOut}
							/>

							<Button
								title="Next"
								buttonClass="bg-white rounded next"
								handleClick={handleLastFormSlideIn}
							/>
						</div>
					</div>

					{/*loan request -- 3rd step*/}
					<div className="form-slide slide-3" ref={lastSlideSlideRef}>
						<div id="terms-heading">
							<p className="py-2">Timing</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-1">
								<input
									type="text"
									name="offerStart"
									id="offer-start"
									placeholder="offer start"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.timing.offerStart}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>
							<div className="col-span-1">
								<input
									type="text"
									name="offerEnd"
									id="offer-end"
									placeholder="Offer end"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.timing.offerEnd}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>
							<div className="col-span-1">
								<input
									type="text"
									name="allotmentDate"
									id="allotment-date"
									placeholder="Allotment date"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.timing.allotmentDate}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>
							<div className="col-span-1">
								<input
									type="text"
									name="settlementDate"
									id="settlement-date"
									placeholder="Settlement date"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.timing.settlementDate}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 gap-4 mt-5">
							<div className="col-span-12">
								<input
									type="text"
									name="maturityDate"
									id="maturity-date"
									placeholder="Maturity date"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.timing.maturityDate}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>
							<hr className="border-1 border-gray-500 col-span-12" />
							<div className="col-span-12">
								<input
									type="text"
									name="useOfProceeds"
									id="use-of-proceeds"
									placeholder="Use of proceeds"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.useOfProceeds}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className="col-span-12">
								<input
									type="text"
									name="taxConsideration"
									id="tax-consideration"
									placeholder="Tax consideration"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.taxConsideration}
									onChange={(e) => handleChange(e)}
								/>
							</div>

							<div className="col-span-12">
								<select
									name="eligibleInvestors"
									id="eligible-investor"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.eligibleInvestors}
									onChange={(e) => handleChange(e)}
								>
									<option defaultValue="">
										Eligible investor
									</option>
									<option value="all">All</option>
									<option value="retail-investor-only">
										Retail investors only
									</option>
									<option value="qualified-institutional-investors-only">
										Qualified institutional investor only
									</option>
								</select>
							</div>
						</div>

						{/*Rating*/}
						<div id="rating">
							<div id="terms-heading">
								<p className="py-2">Ratings</p>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1">
									<select
										name="name"
										id="name"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
										value={formState.rating.name}
										onChange={(e) =>
											handleChange(e, "rating")
										}
									>
										<option defaultValue="">Name</option>
										<option value="agusto">Agusto</option>
										<option value="gcr">GCR</option>
										<option value="fitch">Fitch</option>
										<option value="moody's">Moody's</option>
										<option value="standard-and-poors">
											Standard & Poors
										</option>
										<option value="datapro">DataPro</option>
									</select>
								</div>

								<div className="col-span-1">
									<select
										name="scale"
										id="scale"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
										value={formState.rating.scale}
										onChange={(e) =>
											handleChange(e, "rating")
										}
									>
										<option defaultValue="">Scale</option>
										<option value="AAA">AAA</option>
										<option value="AA">AA</option>
										<option value="A">A</option>
										<option value="BBB">BBB</option>
										<option value="BB">BB</option>
										<option value="B">B</option>
										<option value="CCC">CCC</option>
										<option value="CC">CC</option>
										<option value="C">C</option>
									</select>
								</div>
							</div>

							<div className="col-span-12 text-left mt-5 form-slide-button">
								<Button
									title="Previous"
									buttonClass="bg-white rounded"
									handleClick={handleLastFormSlideOut}
								/>
							</div>
						</div>
					</div>
				</div>

				<Button
					title="View summary"
					type="submit"
					buttonClass="rounded submit-loan-request-button mt-20"
					buttonDisabled={state.submitButtonIsDisabled}
					handleClick={summaryState ? handleModal : undefined}
				/>

				{/*{state.emptyFields !== "" ? (
					<div className="mt-5">
						<Alert severity="error" variant="filled">
							{state.emptyFields}!
						</Alert>
					</div>
				) : ("")}*/}
			</form>
		</>
	);
}