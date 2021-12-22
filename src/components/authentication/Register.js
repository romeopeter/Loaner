import React, { useState, createRef } from "react";
import { Link } from "react-router-dom";
import OrderbookLayout from "../OrderbookLayout";
import DocumentHead from "../DocumentHead";
import Button from "../Button";
import phoneLady from "../../assets/images/phoneLady.jpg";
import setBgImage from "../../utils/setBgImage";

export default function Register() {
	const pageName = "Regsiter";

	const [form, setForm] = useState({
		title: "",
		firstName: "",
		LastName: "",
		emailAddress: "",
		buttonIsDisabled: true,
		phoneNumber: "",
		dateOfBirth: "",
		organization: "",
		password: "",
		confirmPassword: "",
		isChecked: false,
		finalFormIsSlidedIn: false,
	});

	// Form steps slide through
	let finalFormStepRef = createRef();

	let slideFinalFormIn = () => {
		finalFormStepRef.current.style.left = "0px";
		finalFormStepRef.current.style.visibility = "visible";
		finalFormStepRef.current.style.transition = "all 200ms ease-in";

		setForm((state) => {
			return {
				...state,
				finalFormIsSlidedIn: true,
			};
		});
	};

	let slideFinalFormOut = () => {
		finalFormStepRef.current.style.left = "700px";
		finalFormStepRef.current.style.visibility = "hidden";
		finalFormStepRef.current.style.transition = "all 200ms ease-in";

		setForm((state) => {
			return {
				...state,
				finalFormIsSlidedIn: false,
			};
		});
	};

	return (
		<>
			<DocumentHead title={pageName} />

			<section
				id="orderbook-registration"
				className="orderbook-authentication"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 h-full">
					<div
						id="intro-background"
						className="hidden md:block"
						style={setBgImage && setBgImage(phoneLady)}
					>
						<div
							id="login-intro"
							className="flex flex-col items-center auth-intro"
						>
							<div
								id="register-title"
								className="bg-white px-6 mb-3 self-start flex items-center justify-center shadow-md orderbook-icon"
							>
								Orderbook
							</div>
							<h1 className="text-shadow-lg">
								Welcome to your go to financial platform
							</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
								Ut enim ad minim veniam, quis nostrud
								exercitation.
							</p>
						</div>
						<div id="overlay"></div>
					</div>

					<div id="orderbook-form">
						<form className="h-full">
							<div className="pt-20 pb-10 px-12">
								<h1 id="orderbook-home" className="text-center mb-10 leading-6 md:hidden">
									<Link to="/" className="text-gray-400">Orderbook Online</Link>
								</h1>
								<div className="px-4 sm:px-0 mb-3">

									<h2 className="text-lg font-medium leading-6 pb-3 sm:pb-2">
										Nice to meet you,
									</h2>
									<p className="mt-1 text-sm text-gray-600">
										create an account to start using
										Orderbook
									</p>
								</div>

								<div className="grid grid-cols-1 gap-5">
									<div
										id="registration-steps"
										className="col-span-12"
									>
										{/*Registration -- First step*/}
										<div
											id="first-step-fields"
											className="col-span-12 grid grid-cols-1 gap-4"
										>
											<div className="col-span-12">
												<select
													id="title"
													name="title"
													autoComplete="title"
													className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
												>
													<option value="">
														Please choose
													</option>

													<option value="Mr">
														Mr
													</option>
													<option value="Miss">
														Miss
													</option>
													<option value="Mrs">
														Mrs
													</option>
													<option value="Ms">
														Ms
													</option>

													<option value="Dr">
														Dr
													</option>
													<option value="Other">
														Other
													</option>
												</select>
											</div>

											<div className="col-span-12 grid grid-cols-2 gap-4">
												{/*Fix grid*/}
												<div className="col-span-1">
													<input
														type="text"
														name="first-name"
														id="first-name"
														autoComplete="first-name"
														placeholder="First name"
														className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													/>
												</div>

												{/*fix grid*/}
												<div className="col-span-1">
													<input
														type="text"
														name="last-name"
														id="last-name"
														autoComplete="last-name"
														placeholder="Last name"
														className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													/>
												</div>
											</div>

											<div className="col-span-12">
												<input
													type="text"
													name="email-address"
													id="email-address"
													autoComplete="email"
													placeholder="Email address"
													className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													required
												/>
											</div>

											<div className="col-span-12 text-right">
												<span
													id="next-field-button"
													className={`form-slide-button ${
														form.finalFormIsSlidedIn
															? "hidden"
															: ""
													}`}
													onClick={() =>
														slideFinalFormIn()
													}
												>
													Next{" "}
													<i
														className="fa fa-long-arrow-right"
														aria-hidden="true"
													></i>
												</span>
											</div>
										</div>

										{/*Registration -- Final step*/}
										<div
											id="final-step-fields"
											className="grid gap-4"
											ref={finalFormStepRef}
										>
											<div className="col-span-12">
												<input
													type="tel"
													name="phone-number"
													id="phone-number"
													pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
													autoComplete="phone-number"
													placeholder="Phone number"
													className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													required
												/>
											</div>

											<div className="col-span-12">
												<input
													type="text"
													id="data-of-birth"
													name="date-of-birth"
													autoComplete="date-of-birth"
													placeholder="Date of birth (MM/DD/YYYY)"
													className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
													onFocus={(e) =>
														(e.target.type =
															"date")
													}
													onBlur={(e) =>
														(e.target.type =
															"text")
													}
												/>
											</div>

											<div className="col-span-12">
												<input
													type="text"
													id="organization"
													name="organization"
													autoComplete="organization"
													placeholder="Organization/Company"
													className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
												/>
											</div>

											<div className="col-span-12 grid grid-cols-2 gap-4">
												<div className="col-span-1">
													<input
														type="password"
														id="password"
														name="password"
														autoComplete="password"
														placeholder="Password"
														className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
														required
													/>
												</div>

												<div className="col-span-1">
													<input
														type="password"
														id="confirm-password"
														name="confirm-password"
														autoComplete="confirm-password"
														placeholder="Confirm password"
														className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
														required
													/>
												</div>
											</div>

											<div className="col-span-12 text-left">
												<span
													id="previous-field-button"
													className="form-slide-button"
													onClick={() =>
														slideFinalFormOut()
													}
												>
													<i
														className="fa fa-long-arrow-left"
														aria-hidden="true"
													></i>{" "}
													Previous
												</span>
											</div>
										</div>
									</div>

									<div className="col-span-12">
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													id="terms-and-conditions"
													name="terms-and-conditions"
													type="checkbox"
													className="focus:ring-white h-4 w-4 text-indigo-600 border-black rounded"
													required
												/>
											</div>
											<div className="ml-3 text-sm">
												<label
													htmlFor="terms-and-conditions"
													className="font-medium text-black"
												>
													By signing up, you agree
													to
												</label>{" "}
												<Link to="/">
													Orderbook’s Terms of Use
													& Privacy Policy
												</Link>
											</div>
										</div>
									</div>

									<div className="col-span-12 mt-1">
										<Button
											type="submit"
											title="Sign up"
											buttonClass="register-button auth-button"
											buttonDisabled={
												form.buttonIsDisabled
													? true
													: ""
											}
										/>
									</div>

									<div
										id="login-existing-account"
										className="col-span-12 mt-1 account-signal"
									>
										<div className="text-center">
											Already have an account?{" "}
											<Link to="/login">Log in</Link>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}