import React, { useState, createRef } from "react";

import Button from "../../Button";

export default function OfferForm({ requestFormState, showSummary }) {
	const { formState, setFormState } = requestFormState;
	const { summaryState, setSummaryState, handleModal } = showSummary;

	const secondSlideRef = createRef();
	const lastSlideSlideRef = createRef();

	const [state, setState] = useState({
		submitButtonIsDisabled: true,
		secondSlideIn: false,
		lastSlideIn: false,
		isValidated: true,
		emptyFields: "",
	});

	const [hiddenFieldTrigger, setHiddenFieldTrigger] = useState({
		dealType: "",
		offerType: "",
		customMinimumSub: false,
		isBond: false,
		showBenchmark: false,
		showCallOption: true,
	});

	/**Handles the slide-in and slide-out of second and third form 
		field.
	**/
	const handleSecondFormSlide = () => {
		secondSlideRef.current.classList.toggle("slide-out");
		const isToggled = secondSlideRef.current.classList.contains("slide-out");

		if (isToggled) {
			setState((state) => {
				return {
					...state,
					secondSlideIn: true,
				};
			});
		} else {
			setState((state) => {
				return {
					...state,
					secondSlideIn: false,
				};
			});
		}
	};

	const handleLastFormSlide = () => {
		lastSlideSlideRef.current.classList.toggle("slide-out");
		const isToggled = lastSlideSlideRef.current.classList.contains("slide-out");

		if (isToggled) {
			setState((state) => {
				return {
					...state,
					submitButtonIsDisabled: false,
					lastSlideIn: true,
					secondSlideIn: false,
				};
			});
		} else {
			setState((state) => {
				return {
					...state,
					submitButtonIsDisabled: true,
					lastSlideIn: false,
				};
			});
		}
	};

	// Handles all field chanages
	const handleChange = (e, fieldclassName) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		if (value === "BOND") {
			setHiddenFieldTrigger((state) => ({ ...state, isBond: true }));
		} else {
			setHiddenFieldTrigger((state) => ({ ...state, isBond: false }));
		}

		if (value === "floating") {
			setHiddenFieldTrigger(state => ({...state, showBenchmark: true}))
		} else {
			setHiddenFieldTrigger(state => ({...state, showBenchmark: false}))
		}

		if (fieldclassName) {
			setFormState((state) => {
				return {
					...state,
					[fieldclassName]: {
						...state[fieldclassName],
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

	// Custom field change methods for offer-type field
	const handleOfferTypeChange = (e) => {
		setFormState((state) => {
			return {
				...state,
				pricing: {
					...state.pricing,
					offerType: {
						...state.pricing.offerType,
						name: e.target.value,
					},
				},
			};
		});

		// set in state to trigger offer type fields to show
		setHiddenFieldTrigger((state) => {
			return {
				...state,
				offerType: e.target.value,
			};
		});
	};

	// Custom field change methods for minimum-subscription field
	const handleMinimumSubscription = (e) => {
		if (e.target.value === "other") {
			// set in state to trigger offer type fields to show
			setHiddenFieldTrigger((state) => {
				return {
					...state,
					customMinimumSub: true,
				};
			});
		} else {
			setFormState((state) => {
				return {
					...state,
					trancheSize: {
						...state.trancheSize,
						minSubscription: e.target.value,
					},
				};
			});

			// set in state to trigger offer type fields to show
			setHiddenFieldTrigger((state) => {
				return {
					...state,
					customMinimumSub: false,
				};
			});
		}
	};

	// Form fields validation
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

		// Trigger for showing summary tables in LoanRequest (LoanRequest.js) component
		setSummaryState(true);
	};

	/*
	These are tweaks to extend form slide parent hide.
	Not really the best way but needed to be done
	*/
	const formHeightIsExtended =
		state.secondSlideIn === true && formState.dealType === "BOND";
	const secondSlideWillHide =
		state.lastSlideIn === true && formState.dealType === "BOND";
	const secondSlideWillShow =
		state.lastSlideIn === false && formState.dealType === "BOND";

	return (
		<div>
			<form
				id="loan-summary-form"
				className="h-full pb-5"
				onSubmit={handleValidation}
				style={{
					height:
						formHeightIsExtended | secondSlideWillShow
							? "1080px"
							: "auto",
				}}
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
									value={formState.dealType}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									// required
								>
									<option defaultValue="">
										Select deal type
									</option>
									<option value="CP">Commercial paper</option>
									<option value="BOND">Bond</option>
								</select>
							</div>

							{/*<div className="col-span-12">
								<select
									name="issuer"
									id="issuer"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									disabled={true}
									style={{ cursor: "not-allowed" }}
									// required
								>
									<option defaultValue="Client/issue">
										Client/issuer
									</option>
								</select>
							</div>*/}

							<div className="col-span-12">
								<input
									type="text"
									name="guarantor"
									id="guarantor"
									placeholder="Guarantor"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.guarantor}
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
									value={formState.dealName}
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
									value={formState.projectName}
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
									value={formState.dealOwner}
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
									value={formState.dealTeam}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									// required
								/>
							</div>

							<div
								id="general-terms-next-button"
								className={`col-span-12 text-right form-slide-button ${
									state.secondSlideIn ? "hidden" : "visible"
								}`}
							>
								<Button
									title="Next"
									buttonClass="bg-white rounded"
									handleClick={handleSecondFormSlide}
								/>
							</div>
						</div>
					</div>

					{/*loan request -- 2nd step*/}
					<div
						className="form-slide slide-2"
						ref={secondSlideRef}
						style={{
							visibility: secondSlideWillHide
								? "hidden"
								: secondSlideWillShow
								? "visible"
								: "auto",
						}}
					>
						<div id="terms-heading">
							<h3 className="py-2 text-xl">Tranche Terms</h3>
						</div>

						{/*Tranche terms*/}
						<div id="tranche-terms">
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-2">
									<select
										name="status"
										id="status"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
										value={formState.status}
										onChange={(e) => handleChange(e)}
									>
										<option defaultValue="">Status</option>
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

								<div className="col-span-2">
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
								<div className="col-span-2">
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
									<input
										type="number"
										name="faceValue"
										id="face-value"
										placeholder="Face value"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.trancheSize.faceValue}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									/>
								</div>
								<div className="col-span-1">
									<input
										name="discountValue"
										type="number"
										placeholder="Discount value"
										id="tranche-value"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={
											formState.trancheSize.discountValue
										}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									/>
								</div>
								<div className="col-span-1">
									<input
										type="number"
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
											handleMinimumSubscription(e)
										}
									>
										<option defaultValue="">
											Min subscription
										</option>
										<option value="5000000">
											NGN 5,000,000
										</option>
										<option value="10000000">
											NGN 10,000,000
										</option>
										<option value="25000000">
											NGN 25,000,000
										</option>
										<option value="100000">
											USD 100,000
										</option>
										<option value="200000">
											USD 200,000
										</option>
										<option value="500000">
											USD 500,000
										</option>
										<option value="1000000">
											USD 1,000,000
										</option>
										<option value="other">Other</option>
									</select>
								</div>

								<div className="col-span-2">
									{hiddenFieldTrigger.customMinimumSub ? (
										<input
											type="number"
											id="custom-min-subscription"
											name="custom-min-subscription"
											className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
											value={
												formState.trancheSize
													.minSubscription
											}
											placeholder="Enter minimum subscription"
											min="200000"
											max="10000000000"
											onChange={(e) => {
												setFormState((state) => {
													return {
														...state,
														trancheSize: {
															...state.trancheSize,
															minSubscription:
																e.target.value,
														},
													};
												});
											}}
										/>
									) : null}
								</div>
							</div>
						</div>

						{/*Pricing*/}
						<div id="Pricing">
							<div id="terms-heading">
								<p className="py-2">Pricing</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								{formState.dealType === "BOND" ? (
									<>
										<div className="col-span-1">
											<select
												id="coupon-type"
												name="couponType"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
												value={
													formState.pricing.couponType
												}
												onChange={(e) =>
													handleChange(e, "pricing")
												}
											>
												<option defaultValue="">
													Coupon Type
												</option>
												<option value="fixed">
													Fixed
												</option>
												<option value="floating">
													Floating
												</option>
											</select>
										</div>


										<div className="col-span-1">
											<input
												type="number"
												name="benchmark"
												id="benchmark"
												placeholder="Benchmark"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
												disabled={formState.pricing.couponType === "floating" ? false : true}
												style={{
													backgroundColor: formState.pricing.couponType === "floating" ? "#d1d5db" : "#888",
													cursor:  formState.pricing.couponType === "floating" ? "text":"not-allowed",
												}}
												value={
													formState.pricing
														.benchmark
												}
												onChange={(e) =>
													handleChange(
														e,
														"pricing"
													)
												}
											/>
										</div>
									</>
								) : null}

								<div className="col-span-1">
									<select
										name="dayCount"
										id="day-count"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
										value={formState.pricing.dayCount}
										onChange={(e) =>
											handleChange(e, "pricing")
										}
									>
										<option defaultValue="">
											Day Count
										</option>
										<option value="actual / actual">
											Actual / Actual
										</option>
										<option value="30/360">30 / 360</option>
										<option value="actual / 360">
											Actual / 360
										</option>
										<option value="actual / 365">
											Actual / 365
										</option>
									</select>
								</div>
								<div className="col-span-1">
									<select
										name="offerType"
										id="offer-type"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
										value={formState.pricing.offerType.name}
										onChange={(e) =>
											handleOfferTypeChange(e)
										}
									>
										<option defaultValue="">
											Offer type
										</option>
										<option value="fixed price">
											Fixed price
										</option>
										<option value="book build">
											Book build
										</option>
									</select>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 mt-5">
								{formState.pricing.offerType.name ===
								"fixed price" ? (
									<>
										<div className="col-span-1">
											<input
												type="number"
												name="discountRate"
												id="discount-rate"
												placeholder="Discount rate"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
												value={
													formState.pricing.offerType
														.fixedPrice.rate
												}
												onChange={(e) =>
													setFormState((state) => {
														return {
															...state,
															pricing: {
																...state.pricing,
																offerType: {
																	...state
																		.pricing
																		.offerType,
																	fixedPrice:
																		{
																			...state
																				.pricing
																				.offerType
																				.fixedPrice,
																			rate: e.target.value,
																		},
																},
															},
														};
													})
												}
											/>
										</div>
										<div className="col-span-1">
											<input
												type="number"
												name="impliedYield"
												id="implied-yield"
												placeholder="Implied yield"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
												value={
													formState.pricing.offerType
														.fixedPrice.yield
												}
												onChange={(e) =>
													setFormState((state) => {
														return {
															...state,
															pricing: {
																...state.pricing,
																offerType: {
																	...state
																		.pricing
																		.offerType,
																	fixedPrice:
																		{
																			...state
																				.pricing
																				.offerType
																				.fixedPrice,
																			yield: e.target.value,
																		},
																},
															},
														};
													})
												}
											/>
										</div>
									</>
								) : null}

								{formState.pricing.offerType.name ===
								"book build" ? (
									<>
										<div className="col-span-1">
											<input
												type="number"
												name="discountRateRange"
												id="discount-rate-range"
												placeholder="Discount rate range"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
												value={
													formState.pricing.offerType
														.fixedPrice.rate
												}
												onChange={(e) =>
													setFormState((state) => {
														return {
															...state,
															pricing: {
																...state.pricing,
																offerType: {
																	...state
																		.pricing
																		.offerType,
																	fixedPrice:
																		{
																			...state
																				.pricing
																				.offerType
																				.fixedPrice,
																			rate: e.target.value,
																		},
																},
															},
														};
													})
												}
											/>
										</div>
										<div className="col-span-1">
											<input
												type="number"
												name="yield"
												id="yield"
												placeholder="Yield"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
												value={
													formState.pricing.offerType
														.fixedPrice.yield
												}
												onChange={(e) =>
													setFormState((state) => {
														return {
															...state,
															pricing: {
																...state.pricing,
																offerType: {
																	...state
																		.pricing
																		.offerType,
																	fixedPrice:
																		{
																			...state
																				.pricing
																				.offerType
																				.fixedPrice,
																			yield: e.target.value,
																		},
																},
															},
														};
													})
												}
											/>
										</div>
									</>
								) : null}

								{formState.dealType === "BOND" ? (
									<>
										<div className="col-span-2">
											<select
												id="coupon-frequency"
												name="couponFrequency"
												className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
												value={
													formState.pricing
														.couponFrequency
												}
												onChange={(e) =>
													handleChange(e, "pricing")
												}
											>
												<option defaultValue="">
													Coupon frequency
												</option>
												<option value="monthly">
													Monthly
												</option>
												<option value="quaterly">
													Quaterly
												</option>
												<option value="semi annually">
													Semi Annually
												</option>
											</select>
										</div>

										<div className="col-span-2">
											<h5 className="font-md text-white mb-2">
												Call option
											</h5>
											<div className="flex justify-start text-white">
												<div className="form-check mr-2">
													<label htmlFor="call-option-yes">
														Yes
													</label>{" "}
													<input
														type="radio"
														name="call-option-yes"
														id="call-option-yes"
														className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none cursor-pointer"
														checked={
															hiddenFieldTrigger.showCallOption
														}
														value="yes"
														onChange={(e) => {
															setHiddenFieldTrigger(
																(state) => {
																	return {
																		...state,
																		showCallOption: true,
																	};
																}
															);
														}}
													/>
												</div>

												<div className="form-check">
													<label htmlFor="call-option-no">
														No
													</label>{" "}
													<input
														type="radio"
														name="call-option-no"
														id="call-option-no"
														className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none cursor-pointer"
														checked={
															!hiddenFieldTrigger.showCallOption
														}
														value="no"
														onChange={(e) => {
															setHiddenFieldTrigger(
																(state) => {
																	return {
																		...state,
																		showCallOption: false,
																	};
																}
															);
														}}
													/>
												</div>
											</div>
										</div>

										<div className="col-span-2">
											{hiddenFieldTrigger.showCallOption ? (
												<input
													type="text"
													name="callOption"
													id="call-option"
													className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													value={
														formState.pricing
															.callOption
													}
													placeholder="Call option"
													onChange={(e) =>
														handleChange(
															e,
															"pricing"
														)
													}
												/>
											) : null}
										</div>
									</>
								) : null}
							</div>
						</div>

						<div
							id="form-slide-control"
							className="form-slide-button mt-5 mb-5 flex justify-between"
						>
							<Button
								title="Previous"
								buttonClass="bg-white rounded previous"
								handleClick={handleSecondFormSlide}
							/>

							<Button
								title="Next"
								buttonClass="bg-white rounded next"
								handleClick={handleLastFormSlide}
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

						<div className="grid grid-cols-1 gap-4 mt-5">
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
								<div className="col-span-2">
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

								<div className="col-span-2">
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
									handleClick={handleLastFormSlide}
								/>
							</div>
						</div>
					</div>
				</div>

				<Button
					title="View summary"
					type="submit"
					style={{
						marginTop: "15rem",
						visibility: state.lastSlideIn?"visible":"hidden"
					}}
					buttonClass="rounded submit-loan-request-button mt-20"
					buttonDisabled={state.submitButtonIsDisabled}
					handleClick={summaryState ? handleModal : undefined}
				/>
			</form>
		</div>
	)
}