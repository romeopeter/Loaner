import React, { useState, useEffect, createRef } from "react";

import { useAlert } from "react-alert";

import Button from "../../Button";

export default function RequestForm({ requestFormState, showSummary }) {
	const { formState, setFormState } = requestFormState;
	// eslint-disable-next-line no-unused-vars
	const { summaryState, setSummaryState, handleModal } = showSummary;

	const secondSlideRef = createRef();
	const lastSlideRef = createRef();
	const alert = useAlert();

	const [state, setState] = useState({
		submitButtonIsDisabled: true,
		firstSlideIn: true,
		secondSlideIn: false,
		lastSlideIn: false,
		fieldNotValidated: false,
		slide1FieldsAreEmpty: false,
		slide2FieldsAreEmpty: false,
		slide3FieldsAreEmpty: false,
	});

	const [hiddenFieldTrigger, setHiddenFieldTrigger] = useState({
		dealType: "",
		offerType: "",
		customMinimumSub: false,
		isBond: false,
		showBenchmark: false,
		showCallOption: true,
	});

	/**Methods handle the slide-in and slide-out of second and third form 
		field.
	**/
	const handleSecondFormSlide = () => {
		// const checkFieldsFunc = form1Validation(formState, setState);

		/*if (checkFieldsFunc.isEmpty) {
			alert.error(checkFieldsFunc.errorMessage);
			return;
		} else {*/
		let isSlidedIn = secondSlideRef.current.classList.toggle("slide-out");

		if (isSlidedIn) {
			setState((state) => {
				return {
					...state,
					firstSlideIn: false,
					secondSlideIn: true,
				};
			});
		} else {
			setState((state) => {
				return {
					...state,
					firstSlideIn: true,
					secondSlideIn: false,
				};
			});
		}
		// }
	};

	const handleLastFormSlide = () => {

		/*if (checkFieldsFunc.isEmpty) {
			alert.error(checkFieldsFunc.errorMessage);
			return;
		} else {*/
		const isSlidedIn = lastSlideRef.current.classList.toggle("slide-out");

		if (isSlidedIn) {
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
		// }
	};

	// Handles all field chanages
	const handleChange = (e, fieldclassName) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		const multiSelectValues = []

		if (value === "BOND") {
			setHiddenFieldTrigger((state) => ({ ...state, isBond: true }));
		} else {
			setHiddenFieldTrigger((state) => ({ ...state, isBond: false }));
		}

		if (value === "floating") {
			setHiddenFieldTrigger((state) => ({
				...state,
				showBenchmark: true,
			}));
		} else {
			setHiddenFieldTrigger((state) => ({
				...state,
				showBenchmark: false,
			}));
		}

		if (e.target.type === "select-multiple") {

            for (var i = 0; i < target.options.length; i++) {
               if (target.options[i].selected) {
                    multiSelectValues.push(target.options[i].value);
               }
            }

            if (fieldclassName) {
                setFormState(state => {
                    return {
                        ...state,
                        [fieldclassName]: {
                            ...state[fieldclassName],
                            [name]: multiSelectValues
                        }
                    }
                });
            }
        } else {
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
	const handleValidation = () => {
		for (let prop in formState) {

            if (prop === "dealType" && formState[prop] === "") {
                alert.error("Deal type can not be empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "guarantor" && formState[prop] === "") {
                alert.error("Guarantor can not be empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "dealName" && formState[prop] === "") {
                alert.error("Deal name can not be empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "projectName" && formState[prop] === "") {
                alert.error("Project name can not be empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "dealOwner" && formState[prop] === "") {
                alert.error("Deal Owner field can not be empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "dealTeam" && formState[prop] === "") {
                alert.error("Deal team field can not be empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "status" && formState[prop] === "") {
                alert.error("Status field can not be empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "trancheName" && formState[prop] === "") {
                alert.error("Tranche name field can not be empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            } else if (typeof formState[prop] === "number") {
                alert.error("Tranche name can not contain number!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "useOfProceeds" && formState[prop] === "") {
                alert.error("Proceeds field is empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "taxConsideraton" && (formState[prop] === undefined || formState[prop] === "")) {
                alert.error("Tax consideration field is empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if (prop === "eligibleInvestors" && (formState[prop] === undefined || formState[prop] === "")) {
                alert.error("Eligible investors field is empty!");
                setState((state) => ({ ...state, isValidated: true }));

                return
            }

            if(typeof formState[prop] === "object" && prop === "trancheSize") {

                if (formState[prop]["currency"] === "") {
                    alert.error("Currency field is empty!");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (formState[prop]["minSubscription"] === "Choose minimum subscription") {
                    alert.error("Subscription field is empty!");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (formState[prop]["faceValue"] === "") {
                    alert.error("Face value field is empty!");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }
            }

            if(typeof formState[prop] === "object" && prop === "pricing") {
                const offerType = formState["pricing"]["offerType"];

                if (formState[prop]["dayCount"] === "") {
                    alert.error("Day count field is empty!");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (offerType["name"] === "") {
                    alert.error("Offer type field is empty!");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (offerType["fixedPrice"]["rate"] === "") {
                    alert.error("Discount rate field is empty!");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }
            }

            if (formState[prop] === "object" && prop === "rating") {
                if (formState[prop]["name"] === "") {
                    alert.error("Rating name field is empty!");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (formState[prop]["scale"] === "") {
                    alert.error("Rating scale field is empty!");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }
            }

            if(typeof formState[prop] === "object" && prop === "timing") {
                if (formState[prop]["offerStart"] === "") {
                    alert.error("Offer start field is empty");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (formState[prop]["offerEnd"] === undefined) {
                    alert.error("Offer end field is empty");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (formState[prop]["allotmentDate"] === undefined) {
                    alert.error("Allotment date field is empty");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (formState[prop]["settlementDate"] === undefined) {
                    alert.error("Settlement date field is empty");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }

                if (formState[prop]["maturityDate"] === undefined) {
                    alert.error("Maturity date field is empty");
                    setState((state) => ({ ...state, isValidated: true }));

                    return
                }
            }

            if (formState[prop] === "") {

                setState((state) => ({ ...state, isValidated: false }));
                alert.error("Please fill all fields");

                return
            }
        }

		// Trigger for showing summary tables in LoanRequest (LoanRequest.js) component
        setSummaryState(true);
	};

	const viewOfferSummary = () => {
		// Show modal
        handleModal();

        // Validate fields
        handleValidation()
	};

	/*
		These are tweaks to extend form slide parent.
		Not really the best way but needed to be done
	*/

	let firstSlideIsHidden;
    let secondSlideIsHidden;
    let secondSlideWillShow;

    let form1ErrorStyle;
    let form2ErrorStyle;
    let form3ErrorStyle;

	const formHeightstyle = {
		height: state.firstSlideIn
			? "900px"
			: state.lastSlideIn
				? "650px"
				: "1195px",
	};

	if (typeof formState === "object" && formState !== undefined) {
        firstSlideIsHidden = state.secondSlideIn === true || state.lastSlideIn === true;
        secondSlideIsHidden = state.lastSlideIn === true;
        // eslint-disable-next-line no-unused-vars
        secondSlideWillShow = state.lastSlideIn === false && (formState.dealType === "BOND" || formState.dealType === "CP");

        form1ErrorStyle = {
            border: state.slide1FieldsAreEmpty ? "2px solid #f25858" : "none",
        };
        form2ErrorStyle = {
            border: state.slide2FieldsAreEmpty ? "2px solid #f25858" : "none",
        };
        form3ErrorStyle = {
            border: state.slide3FieldsAreEmpty ? "2px solid #f25858" : "none",
        };   
    }

	/* Loan offer calculations starts */
		let discountRateValue;
		let offerFaceValueValue;
		let startDateValue;
		let EndDateValue;

		if (typeof formState === "object" && formState !== undefined) {

			discountRateValue = formState.pricing.offerType.fixedPrice.rate;
			offerFaceValueValue = formState.trancheSize.faceValue;
			startDateValue = formState.timing.offerStart;
			EndDateValue = formState.timing.offerEnd;
		}

		useEffect(() => {
			const loanOfferCalculation = (
				discountRate,
				faceValue,
				startDate,
				EndDate
			) => {
				let discountValue = "";
				let offerYield = "";

				const currentYear = new Date().getFullYear();
				const currentDate = new Date(`${currentYear}/1/1`);

				const loanStartDate = new Date(startDate);
				const loanEndDate = new Date(EndDate);

				const startDateCurrentDateDiff =
					(currentDate.getTime() - loanStartDate.getTime()) /
					(1000 * 60 * 60 * 24);
				const EndDateCurrentDateDiff =
					(currentDate.getTime() - loanEndDate.getTime()) /
					(1000 * 60 * 60 * 24);

				// Get offer discount
				const firstPart =
					discountRate * faceValue * (startDateCurrentDateDiff / 365);
				const secondPart =
					(EndDateCurrentDateDiff / 366) * discountRate * faceValue;
				const offerDiscount = firstPart + secondPart;

				// Get discount value
				discountValue = faceValue - offerDiscount;

				// Get offer yield
				offerYield =
					discountRate / (startDateCurrentDateDiff / 366) +
					EndDateCurrentDateDiff / 365 -
					1;

				// Set discount value and offer yield
				if (
					isNaN(discountValue) === false &&
					isNaN(offerYield) === false
				) {
					setFormState((state) => {

						return {
							...state,
							trancheSize: {
								...state.trancheSize,
								discountValue: Number(discountValue.toFixed(2)),
							},
							pricing: {
								...state.pricing,
								offerType: {
									...state.pricing.offerType,
									fixedPrice: {
										...state.pricing.offerType.fixedPrice,
										yield: Number(offerYield.toFixed(2)),
									},
								},
							},
						};
					});
				}
			};

			loanOfferCalculation(
				discountRateValue,
				offerFaceValueValue,
				startDateValue,
				EndDateValue
			);
		}, [
			setFormState,
			EndDateValue,
			discountRateValue,
			offerFaceValueValue,
			startDateValue,
		]);
	/* Loan offer calculations ends */

	return (
		<>
			<form
				id="loan-summary-form"
				className="h-full pb-5"
				// onSubmit={handleValidation}
				style={formHeightstyle}
			>
				<div id="loan-request-steps">
					 {/*loan request -- first slide*/}
					<div
						id="general-issuer-terms"
						className="form-slide slide-1"
						style={{
							visibility: firstSlideIsHidden
								? "hidden"
								: "visible",
						}}
					>
						<div id="terms-heading">
							<h1>New Offer</h1>
							<p className="py-2">General issuer terms</p>
						</div>

						<div className="grid grid-cols-1 gap-4">
							<div
								className="col-span-12 mt-1"
								style={form1ErrorStyle}
							>
								<select
									name="dealType"
									id="dealType"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.dealType}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
									required
								>
									<option defaultValue="">
										Select deal type
									</option>
									<option value="CP">Commercial paper</option>
									<option value="BOND">Bond</option>
								</select>
							</div>

							<div
								className="col-span-12 mt-1"
								style={form1ErrorStyle}
							>
								<input
									type="text"
									name="guarantor"
									id="guarantor"
									placeholder="Enter guarantor name"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.guarantor}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								// required
								/>
							</div>

							<div
								className="col-span-12 mt-1"
								style={form1ErrorStyle}
							>
								<input
									type="text"
									name="dealName"
									id="dealName"
									placeholder="Enter deal name"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.dealName}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								// required
								/>
							</div>

							<div
								className="col-span-12 mt-1"
								style={form1ErrorStyle}
							>
								<input
									type="text"
									name="projectName"
									id="projectName"
									placeholder="Enter project name"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.projectName}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								// required
								/>
							</div>

							<div
								className="col-span-12 mt-1"
								style={form1ErrorStyle}
							>
								<input
									type="text"
									name="dealOwner"
									id="dealOwner"
									placeholder="Enter deal owner name"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.dealOwner}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								// required
								/>
							</div>

							<div
								className="col-span-12 mt-1"
								style={form1ErrorStyle}
							>
								<input
									type="text"
									name="dealTeam"
									id="dealTeam"
									placeholder="Enter deal team name"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.dealTeam}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								// required
								/>
							</div>

							<div id="terms-heading" className="col-span-12">
								<h3 className="py-2 text-xl">Tranche Terms</h3>
							</div>

							{/*Tranche terms*/}
							<div
								id="tranche-terms"
								className="col-span-12 mt-1"
							>
								<div className="grid grid-cols-2 gap-4">
									<div
										className="col-span-2 mt-1"
										style={form1ErrorStyle}
									>
										<select
											name="status"
											id="status"
											className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
											value={formState.status}
											onChange={(e) => handleChange(e)}
										>
											<option defaultValue="">
												Select loan status
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

									<div
										className="col-span-2 mt-1"
										style={form1ErrorStyle}
									>
										<input
											type="text"
											name="trancheName"
											id="trancheName"
											placeholder="Enter tranche name"
											className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
											value={formState.trancheName}
											onChange={(e) => handleChange(e)}
										/>
									</div>
								</div>
							</div>

							<div
								id="general-terms-next-button"
								className={`col-span-12 text-right form-slide-button`}
							>
								<Button
									title="Next"
									buttonClass="bg-white rounded"
									handleClick={handleSecondFormSlide}
								/>
							</div>
						</div>
					</div>

					{/*loan request -- Second slide*/}
					<div
						className="form-slide slide-2"
						ref={secondSlideRef}
						style={{
							visibility: secondSlideIsHidden
								? "hidden"
								: "visible",
						}}
					>
						{/*Timing*/}
						<div id="terms-heading">
							<p className="py-2">Timing</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-1 mt-1">
								<input
									type="text"
									name="offerStart"
									id="offer-start"
									placeholder="Enter offer start date"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.timing.offerStart}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>

							<div className="col-span-1 mt-1">
								<input
									type="text"
									name="offerEnd"
									id="offer-end"
									placeholder="Enter Offer end data"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.timing.offerEnd}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>

							<div className="col-span-1 mt-1">
								<input
									type="text"
									name="allotmentDate"
									id="allotment-date"
									placeholder="Enter allotment date"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.timing.allotmentDate}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>

							<div className="col-span-1 mt-1">
								<input
									type="text"
									name="settlementDate"
									id="settlement-date"
									placeholder="Enter settlement date"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.timing.settlementDate}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>
						</div>

						<div className="col-span-12 mt-5">
							<input
								type="text"
								name="maturityDate"
								id="maturity-date"
								placeholder="Enter maturity date"
								className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
								value={formState.timing.maturityDate}
								onFocus={(e) => (e.target.type = "date")}
								onBlur={(e) => (e.target.type = "text")}
								onChange={(e) => handleChange(e, "timing")}
							/>
						</div>

						{/*Tranche size*/}
						<div id="tranche-size">
							<div id="terms-heading">
								<p className="py-2">Tranche size</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div
									className="col-span-2 mt-1"
									style={form2ErrorStyle}
								>
									<select
										name="currency"
										id="currency"
										className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.trancheSize.currency}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									>
										<option defaultValue="">
											Choose currency
										</option>
										<option value="NGN">NGN</option>
										<option value="USD">USD</option>
									</select>
								</div>

								<div className="col-span-1 mt-1">
									<div className="" style={form2ErrorStyle}>
										<input
											type="number"
											name="faceValue"
											id="face-value"
											placeholder="Enter face value"
											className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
											value={
												formState.trancheSize.faceValue
											}
											onChange={(e) =>
												handleChange(e, "trancheSize")
											}
										/>
									</div>
									<label
										className="error-label text-sm text-gray-300"
										htmlFor="face-value"

									>
										Value shouldn't be more than 9 digits
										and 2 decimals. e.g: 1000.01
									</label>
								</div>

								<div className="col-span-1 mt-1">
									<div className="" style={form2ErrorStyle}>
										<input
											name="discountValue"
											type="number"
											placeholder="Enter discount value"
											id="tranche-value"
											className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
											value={
												formState.trancheSize
													.discountValue
											}
											readOnly={true}
										/>
									</div>
									<label
										className="error-label text-sm text-gray-300"
										htmlFor="tranche-value"
									>
										Discount value is read only is implicity determined.
									</label>
								</div>

								{/* <div className="col-span-1 mt-1">
									<input
										type="number"
										name="par-value"
										id="par-value"
										placeholder="Enter par palue"
										className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										disabled={true}
										style={{ cursor: "not-allowed" }}
									/>
								</div> */}

								<div
									className="col-span-2 mt-1"
									style={form2ErrorStyle}
								>
									<select
										name="minSubscription"
										id="min-subscription"
										className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={
											formState.trancheSize
												.minSubscription
										}
										onChange={(e) =>
											handleMinimumSubscription(e)
										}
									>
										<option defaultValue="minSub">
											Choose minimum subscription
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

								<div className="col-span-2 mt-1">
									{hiddenFieldTrigger.customMinimumSub ? (
										<div style={form2ErrorStyle}>
											<input
												type="number"
												id="custom-min-subscription"
												name="custom-min-subscription"
												className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
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
																	e.target
																		.value,
															},
														};
													});
												}}
											/>
										</div>
									) : null}
								</div>
							</div>
						</div>

						{/*Pricing*/}
						<div id="Pricing">
							<div id="terms-heading">
								<p className="py-2">Pricing</p>
							</div>

							{/*Bond field*/}
							<div className="grid grid-cols-2 gap-4">
								{formState !== undefined && formState.dealType === "BOND" ? (
									<>
										<div className="col-span-1 mt-1">
											<div
												className=""
												style={form2ErrorStyle}
											>
												<select
													id="coupon-type"
													name="couponType"
													className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													value={
														formState.pricing
															.couponType
													}
													onChange={(e) =>
														handleChange(
															e,
															"pricing"
														)
													}
												>
													<option defaultValue="">
														Choose coupon type
													</option>
													<option value="fixed">
														Fixed
													</option>
													<option value="floating">
														Floating
													</option>
												</select>
											</div>
										</div>

										<div className="col-span-1 mt-1">
											<div
												className=""
												style={form2ErrorStyle}
											>
												<input
													type="number"
													name="Enter benchmark"
													id="benchmark"
													placeholder="Benchmark"
													className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													disabled={
														formState.pricing
															.couponType ===
															"floating"
															? false
															: true
													}
													style={{
														backgroundColor:
															formState.pricing
																.couponType ===
																"floating"
																? "#d1d5db"
																: "#888",
														cursor:
															formState.pricing
																.couponType ===
																"floating"
																? "text"
																: "not-allowed",
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
											<label
												className="error-label text-sm text-gray-300"
												htmlFor="benchmark"
											>
												Value shouldn't be more than 3
												digits e.g: 100
											</label>
										</div>
									</>
								) : null}

								<div
									className={`${formState.dealType === "BOND"
										? "col-span-1"
										: "col-span-2"
										} mt-1`}
									style={form2ErrorStyle}
								>
									<select
										name="dayCount"
										id="day-count"
										className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
										value={formState.pricing.dayCount}
										onChange={(e) =>
											handleChange(e, "pricing")
										}
									>
										<option defaultValue="">
											Choose loan day count
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

								<div
									className={`${formState.dealType === "BOND"
										? "col-span-1"
										: "col-span-2"
										} mt-1`}
									style={form2ErrorStyle}
								>
									<select
										name="offerType"
										id="offer-type"
										className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
										value={formState.pricing.offerType.name}
										onChange={(e) =>
											handleOfferTypeChange(e)
										}
									>
										<option defaultValue="">
											Choose loan offer type
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
										<div className="col-span-1 mt-1">
											<div style={form2ErrorStyle}>
												<input
													type="number"
													name="discountRate"
													id="discount-rate"
													placeholder="Enter discount rate"
													className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
													value={
														formState.pricing
															.offerType
															.fixedPrice.rate
													}
													onChange={(e) =>
														setFormState(
															(state) => {
																return {
																	...state,
																	pricing: {
																		...state.pricing,
																		offerType:
																		{
																			...state
																				.pricing
																				.offerType,
																			fixedPrice:
																			{
																				...state
																					.pricing
																					.offerType
																					.fixedPrice,
																				rate: e
																					.target
																					.value,
																			},
																		},
																	},
																};
															}
														)
													}
												/>
											</div>
											<label
												className="error-label text-sm text-gray-300"
												htmlFor="discount-rate"
											>
												Value shouldn't be more than 4
												digits e.g: 1000
											</label>
										</div>

										<div className="col-span-1 mt-1">
											<div style={form2ErrorStyle}>
												<input
													type="number"
													name="impliedYield"
													id="implied-yield"
													placeholder="Enter implied yield"
													className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
													value={
														formState.pricing
															.offerType
															.fixedPrice.yield
													}
													onChange={(e) =>
														setFormState(
															(state) => {
																return {
																	...state,
																	pricing: {
																		...state.pricing,
																		offerType:
																		{
																			...state
																				.pricing
																				.offerType,
																			fixedPrice:
																			{
																				...state
																					.pricing
																					.offerType
																					.fixedPrice,
																				yield: e
																					.target
																					.value,
																			},
																		},
																	},
																};
															}
														)
													}
												/>
											</div>
											<label
												className="error-label text-sm text-gray-300"
												htmlFor="implied-yield"
											>
												Value shouldn't be more than 4
												digits e.g: 1000
											</label>
										</div>
									</>
								) : null}

								{formState !== undefined && formState.pricing.offerType.name ===
									"book build" ? (
									<>
										<div className="col-span-1 mt-1">
											<div style={form2ErrorStyle}>
												<input
													type="number"
													name="discountRateRange"
													id="discount-rate-range"
													placeholder="Enter discount rate range"
													className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													value={
														formState.pricing
															.offerType
															.fixedPrice.rate
													}
													onChange={(e) =>
														setFormState(
															(state) => {
																return {
																	...state,
																	pricing: {
																		...state.pricing,
																		offerType:
																		{
																			...state
																				.pricing
																				.offerType,
																			fixedPrice:
																			{
																				...state
																					.pricing
																					.offerType
																					.fixedPrice,
																				rate: e
																					.target
																					.value,
																			},
																		},
																	},
																};
															}
														)
													}
												/>
											</div>
											<label
												className="error-label text-sm text-gray-300"
												htmlFor="discount-rate-range"

											>
												Value shouldn't be more than 3
												digits e.g: 100
											</label>
										</div>

										<div className="col-span-1 mt-1">
											<div style={form2ErrorStyle}>
												<input
													type="number"
													name="yield"
													id="yield"
													placeholder="Enter yield"
													className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													value={
														formState.pricing
															.offerType
															.fixedPrice.yield
													}
													readOnly={true}
												/>
											</div>
											<label
												className="error-label text-sm text-gray-300"
												htmlFor="yield"
											>
												Offer yield value is read only and is implicitly determined.
											</label>
										</div>
									</>
								) : null}

								{formState !== undefined && formState.dealType === "BOND" ? (
									<>
										<div
											className="col-span-2 mt-1"
											style={form2ErrorStyle}
										>
											<select
												id="coupon-frequency"
												name="couponFrequency"
												className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
												value={
													formState.pricing
														.couponFrequency
												}
												onChange={(e) =>
													handleChange(e, "pricing")
												}
											>
												<option defaultValue="">
													Choose coupon frequency
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
												Enter call option
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

										{hiddenFieldTrigger.showCallOption ? (
											<div
												className="col-span-2 mt-1"
												style={form2ErrorStyle}
											>
												<input
													type="text"
													name="callOption"
													id="call-option"
													className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													value={
														formState.pricing
															.callOption
													}
													placeholder="Enter call option"
													onChange={(e) =>
														handleChange(
															e,
															"pricing"
														)
													}
												/>
											</div>
										) : null}
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

					{/*Third slide*/}
					<div className="form-slide slide-3" ref={lastSlideRef}>
						<div className="grid grid-cols-1 gap-4 mt-5">
							<div className="col-span-12 mt-1">
								<input
									type="text"
									name="useOfProceeds"
									id="use-of-proceeds"
									placeholder="Enter use of proceeds"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.useOfProceeds}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className="col-span-12 mt-1">
								<input
									type="text"
									name="taxConsideration"
									id="tax-consideration"
									placeholder="Enter tax consideration"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.taxConsideration}
									onChange={(e) => handleChange(e)}
								/>
							</div>

							<div className="col-span-12 mt-1">
								<select
									name="eligibleInvestors"
									id="eligible-investor"
									className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.eligibleInvestors}
									onChange={(e) => handleChange(e)}
								>
									<option defaultValue="">
										Choose eligible investor
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
								<div className="col-span-2 mt-1">
									<label htmlFor="name" className="text-white">Choose rating name</label>
									<select
										name="name"
										id="name"
										className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
										value={formState.rating.name}
										onChange={(e) =>
											handleChange(e, "rating")
										}
										style={{ padding: "10px" }}
									>
										<option defaultValue="">---</option>
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

								<div className="col-span-2 mt-1">
								<label htmlFor="scale" className="text-white">Choose rating scale</label>
									<select
										name="scale"
										id="scale"
										className="focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
										value={formState.rating.scale}
										onChange={(e) =>
											handleChange(e, "rating")
										}
										style={{ padding: "10px" }}
									>
										<option defaultValue="">---</option>
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

								<div className="col-span-2 mt-5">
									<Button
										title="View offer summary"
										// type="submit"
										style={{
											visibility: state.lastSlideIn
												? "visible"
												: "hidden",
										}}
										buttonClass="rounded submit-loan-request-button"
										buttonDisabled={
											state.submitButtonIsDisabled
										}
										handleClick={viewOfferSummary}
									/>
								</div>
							</div>

							<div className="col-span-12 text-left mt-10 form-slide-button">
								<Button
									title="Previous"
									buttonClass="bg-white rounded"
									handleClick={handleLastFormSlide}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}