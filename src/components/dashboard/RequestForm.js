import React, { useState, createRef } from "react";
import Button from "../Button";

export default function RequestForm() {
	const [formState, setFormState] = useState({
		generalTerms: {
			dealType: "",
			issuer: "",
			guarantor: "",
			dealName: "",
			projectName: "",
			dealOwner: "",
			dealTeam: "",
		},
		trancheTerms: {
			status: "",
			trancheName: "",
		},
		trancheSize: {
			currency: "NGN",
			perValue: "",
		},
		pricing: {
			dayCount: "",
			offerType: "",
		},
		timing: {
			offerStart: "",
			offerEnd: "",
			allotmentDate: "",
			settlementDate: "",
			maturityDate: "",
			useOfProceeds: "",
			taxConsideration: "",
			eligibleInvestors: "",
			rating: "",
		},
	});

	const [state, setState] = useState({
		submitButtonIsDisabled: true,
		secondSlideIn: false,
		lastSideIn: false,
	});

	const secondSlideRef = createRef();
	const lastSlideSlideRef = createRef();

	/**Handles the slide-in and slide-out of the second form 
		field set (slide-2)
	**/
	const handleSecondFormSlideIn = () => {
		const isSlidedIn = secondSlideRef.current.classList.toggle("slide-out");

		if (isSlidedIn) {
			setState(state => {
				return {
					...state,
					secondSlideIn: true
				}
			})
		}
	}

	const handleSecondFormSlideOut = () => {
		secondSlideRef.current.classList.remove("slide-out");
		setState(state => {
			return {
				...state,
				secondSlideIn: false
			}
		})
	}


	/**Handles the slide-in and slide-out of the last form 
		field set (slide-3)
	**/
	const handleLastFormSlideIn = () => {
		const isSlidedIn = lastSlideSlideRef.current.classList.toggle("slide-out");

		if (isSlidedIn) {
			setState(state => {
				return {
					...state,
					submitButtonIsDisabled: false,
					lastSideIn: true
				}
			})
		}
	}
	const handleLastFormSlideOut = () => {
		lastSlideSlideRef.current.classList.remove("slide-out");
		setState(state => {
			return {
				...state,
				submitButtonIsDisabled: true,
				lastSideIn: false
			}
		})
	}


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

			console.log(formState[fieldClass]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<>
			<form id="loan-summary-form" className="h-full pb-5" onSubmit={handleSubmit}>

				<div id="loan-request-steps">

					{/*loan request -- 1st step*/}
					<div id="general-issuer-terms" className="form-slide slide-1">
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
									value={formState.value}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								>
									<option defaultValue="Deal type">
										Deal type
									</option>
								</select>
							</div>

							<div className="col-span-12">
								<select
									name="issuer"
									id="issuer"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.value}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								>
									<option defaultValue="Client/issue">
										Client/issue
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
									value={formState.value}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								/>
							</div>
							<div className="col-span-12">
								<input
									type="text"
									name="dealName"
									id="dealName"
									placeholder="Deal name"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.value}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								/>
							</div>
							<div className="col-span-12">
								<input
									type="text"
									name="projectName"
									id="projectName"
									placeholder="Project name"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.value}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								/>
							</div>

							<div className="col-span-12">
								<input
									type="text"
									name="dealOwner"
									id="dealOwner"
									placeholder="Deal owner"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.value}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								/>
							</div>

							<div className="col-span-12">
								<input
									type="text"
									name="dealTeam"
									id="dealTeam"
									placeholder="Deal team"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.value}
									onChange={(e) =>
										handleChange(e, "generalTerms")
									}
								/>
							</div>

							<div
								id="general-terms-next-button"
								className={`col-span-12 text-right form-slide-button ${state.secondSlideIn && "hidden"}`}
							>
								<Button
									title="Next"
									buttonClass="bg-white rounded"
									slide={handleSecondFormSlideIn}
								/>
							</div>
						</div>
					</div>

					{/*loan request -- 2nd step*/}
					<div className="form-slide slide-2" ref={secondSlideRef}>
						{/*Tranche terms*/}
						<div id="tranche-terms">
							<div id="terms-heading">
								<p className="py-2">Tranche terms</p>
							</div>

							<div className="grid grid-cols-1 gap-4">
								<div className="col-span-12">
									<input
										type="text"
										name="status"
										id="status"
										placeholder="status"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.value}
										onChange={(e) =>
											handleChange(e, "trancheTerms")
										}
									/>
								</div>
								<div className="col-span-12">
									<input
										type="text"
										name="status"
										id="trancheName"
										placeholder="Tranche name"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.value}
										onChange={(e) =>
											handleChange(e, "trancheTerms")
										}
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
										value={formState.value}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									>
										<option defaultValue="">Currency</option>
									</select>
								</div>
								<div className="col-span-1">
									<select
										name="value"
										id="tranche-value"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.value}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									>
										<option defaultValue="">Value</option>
									</select>
								</div>
								<div className="col-span-1">
									<input
										type="text"
										name="par-value"
										id="par-value"
										placeholder="Par value"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.value}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									/>
								</div>
								<div className="col-span-1">
									<select
										name="par-value"
										id="par-value"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.value}
										onChange={(e) =>
											handleChange(e, "trancheSize")
										}
									>
										<option defaultValue="">
											Min subscription
										</option>
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
										value={formState.value}
										onChange={(e) => handleChange(e, "pricing")}
									>
										<option defaultValue="">Day Count</option>
									</select>
								</div>

								<div className="col-span-12">
									<select
										name="offerType"
										id="offer-type"
										className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
										value={formState.value}
										onChange={(e) => handleChange(e, "pricing")}
									>
										<option defaultValue="">Offer type</option>
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
								slide={handleSecondFormSlideOut}

							/>

							<Button
								title="Next"
								buttonClass="bg-white rounded next"
								slide={handleLastFormSlideIn}
							/>
						</div>
					</div>

					{/*loan request -- 3rd step*/}
					<div className="form-slide slide-3" ref={lastSlideSlideRef}>
						<div id="terms-heading">
							{/*<h1>New Offer</h1>*/}
							<p className="py-2">Tranche Terms</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-1">
								<input
									type="text"
									name="offerStart"
									id="offer-start"
									placeholder="offer start"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field general-issuer-terms"
									value={formState.value}
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
									value={formState.value}
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
									value={formState.value}
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
									value={formState.value}
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
									value={formState.value}
									onFocus={(e) => (e.target.type = "date")}
									onBlur={(e) => (e.target.type = "text")}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>
							<div className="col-span-12">
								<input
									type="text"
									name="useOfProceeds"
									id="use-of-proceeds"
									placeholder="Use of proceeds"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.value}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>
							<div className="col-span-12">
								<input
									type="text"
									name="taxConsideration"
									id="tax-consideration"
									placeholder="Tax consideration"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.value}
									onChange={(e) => handleChange(e, "timing")}
								/>
							</div>

							<div className="col-span-12">
								<select
									name="eligibleInvestors"
									id="eligible-investor"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.value}
									onChange={(e) => handleChange(e, "timing")}
								>
									<option defaultValue="">
										Eligible investor
									</option>
								</select>
							</div>
							<div className="col-span-12">
								<select
									name="rating"
									id="rating"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field timing"
									value={formState.value}
									onChange={(e) => handleChange(e, "timing")}
								>
									<option defaultValue="">Rating</option>
								</select>
							</div>

							<div className="col-span-12 text-left form-slide-button">
								<Button
									title="Previous"
									buttonClass="bg-white rounded"
									slide={handleLastFormSlideOut}
								/>
							</div>
						</div>
					</div>
				</div>

				<Button
					title="View summary"
					type="submit"
					buttonClass="rounded submit-loan-request-button"
					buttonDisabled={state.submitButtonIsDisabled}
				/>
			</form>
		</>
	);
}