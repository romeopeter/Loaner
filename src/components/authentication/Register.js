import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import { signUpAsync } from "../../redux/authSlice";

import DocumentHead from "../DocumentHead";
import Button from "../Button";

import phoneLady from "../../assets/images/phoneLady.jpg";
import setBgImage from "../../utils/setBgImage";

export default function Register() {
	const pageName = "Regsiter";

	const [form, setForm] = useState({
		title: "",
		firstName: "",
		lastName: "",
		emailAddress: "",
		phoneNumber: "",
		dateOfBirth: "",
		organization: "",
		password: "",
		confirmPassword: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { message } = useSelector((state) => state.message);

	const required = (value) => {
		if (!value) {
			return (
				<span className="text-red-400" role="alert">
					This field is required!
				</span>
			);
		}
	};

	const verifyPassword = (value) => {
		if (value.length < 3 || value.length > 20) {
			return (
				<span className="text-red-400">
					The username must be between 3 and 20 characters.
				</span>
			);
		}
	};

	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		const value =
			target.type === "checkbox" ? target.checked : target.value;

		setForm((state) => {
			return {
				...state,
				[name]: value,
			};
		});
	};

	// Input from form state
	const {
		emailAddress,
		title,
		dateOfBirth,
		firstName,
		lastName,
		organization,
		password,
		confirmPassword,
	} = form;

	const handleSubmit = (e) => {
		e.preventDefault();

		// Redux async call
		dispatch(
			signUpAsync({
				email: emailAddress,
				title,
				date_of_birth: dateOfBirth,
				first_name: firstName,
				last_name: lastName,
				organization,
				password,
				confirm_password: confirmPassword,
			})
		).then(() => {
			// Navigat to login
			navigate("/dashboard");
		});
	};

	{
		message && console.log(message);
	}

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
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation.
							</p>
						</div>
						<div id="overlay"></div>
					</div>

					<div id="orderbook-form">
						<form className="h-full" onSubmit={handleSubmit}>
							<div className="pt-20 pb-10 px-12">
								<h1
									id="orderbook-home"
									className="text-center mb-10 leading-6 md:hidden"
								>
									<Link to="/" className="text-gray-400">
										Orderbook Online
									</Link>
								</h1>
								<div className="px-4 sm:px-0 mb-3">
									<h2 className="text-lg font-medium leading-6 pb-3 sm:pb-2">
										Nice to meet you.
									</h2>
									<p className="mt-1 text-sm text-gray-600">
										Create an account to start using
										Orderbook
									</p>
								</div>

								<div className="grid grid-cols-1 gap-5">
									<div
										id="registration-steps"
										className="col-span-12"
									>
										<Form formState={{ form, setForm }} />
									</div>

									<div className="col-span-12">
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													id="terms-and-conditions"
													name="termsAndConditionsIsChecked"
													type="checkbox"
													className="focus:ring-white h-4 w-4 text-indigo-600 border-black rounded"
													required
													onChange={(e) =>
														handleChange(e)
													}
												/>
											</div>
											<div className="ml-3 text-sm">
												<label
													htmlFor="terms-and-conditions"
													className="font-medium text-black"
												>
													By signing up, you agree to
												</label>{" "}
												<Link to="/">
													Orderbook’s Terms of Use &
													Privacy Policy
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
												!form.termsAndConditionsIsChecked
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