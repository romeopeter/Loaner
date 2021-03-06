import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signUpAsync } from "../../redux/authSlice";

import DocumentHead from "../DocumentHead";
import Button from "../Button";
import Form from "./Form";
import { useAlert } from "react-alert";
import {Danger} from "../alert"

import phoneLady from "../../assets/images/phoneLady.jpg";
import setBgImage from "../../utils/setBgImage";

export default function Register() {
	const pageName = "Register";

	const [form, setForm] = useState({
		title: "",
		firstName: "",
		lastName: "",
		emailAddress: "",
		role: "",
		dateOfBirth: "",
		organization: "",
		password: "",
		confirmPassword: "",
		isLoading: false,
		registerContainerIsExtended: false,
	});

	const [formError, setFormError] = useState({
		emailAddress: "",
		password: "",
		passwordMismatch: "",
		minPasswordChars: "",
		emptyFields: "",
	});

	// Check login state
	const { isLoggedIn, user } = useSelector((state) => state.auth);

	// Server message
	const { message: serverMessage } = useSelector(
		(state) => state.message.server
	);

	// State for react-phone-number plugin used for international phone numbers
	const [phoneNumber, setPhoneNumber] = useState(undefined);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Alerts
	const alert = useAlert();

	const handleSubmit = (e) => {
		e.preventDefault();

		setForm((state) => {
			return {
				...state,
				isLoading: true,
			};
		});

		// Form state controlled inputes
		const {
			emailAddress,
			role,
			title,
			firstName,
			lastName,
			organization,
			password,
			confirmPassword,
		} = form;

		const phone_number = phoneNumber;

		const data = {
			email: emailAddress,
			role,
			title,
			// date_of_birth: dateOfBirth,
			first_name: firstName,
			last_name: lastName,
			phone_number,
			organization,
			password,
			confirm_password: confirmPassword,
		};

		if (form.password !== "" && form.password.length < 6) {
			setForm((state) => ({ ...state, isLoading: false }));
			alert.show("Password is too short");
			return;
		}

		if (
			form.confirmPassword !== "" &&
			form.confirmPassword !== form.password
		) {
			setForm((state) => ({ ...state, isLoading: false }));
			alert.error("Password does not match!");
			return;
		}

		// Redux async call
		dispatch(signUpAsync(data)).then((response) => {
			if (typeof response ==="object" && response.status === 201) {
				const userType = response.data.groups[0];

				if (
					userType.name === "Client" ||
					userType.name === "Broker" ||
					userType.name === "Investor"
				) {
					navigate("/login");
				}
			} else {
				serverMessage && alert.show(serverMessage);
				setForm((state) => ({ ...state, isLoading: false }));
			}
		});
	};

	if (isLoggedIn && typeof user === "object")
		return <Navigate to="/" replace />;


	// Auth request responses
	const [networkError, emailConflict] = ["network_error", "Email_Conflict"];

	let networkErrorMessage = null;
	let emailConflictMessage = null;

	if (typeof serverMessage === "object") {
		if (serverMessage.messageType === networkError) {
			networkErrorMessage = serverMessage.detail;
		}

		if (serverMessage.messageType === emailConflict) {
			emailConflictMessage = serverMessage.detail;
		}
	}

	const AlertComponent = () => (
		<>
			<div className="mb-5">
				{networkErrorMessage !== null ?(<Danger message={networkErrorMessage} />):null}
			</div>
			
			<div className="mb-5">
				{emailConflictMessage !== null ?(<Danger message={emailConflictMessage} />):null}
			</div>
		</>
	)

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
								Orderbook Online
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
									{/*Request error messages*/}
									<AlertComponent />

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
										style={{
											height: form.registerContainerIsExtended
												? "auto"
												: "300px",
										}}
									>
										<Form
											formState={{ form, setForm }}
											phoneNumberState={{
												phoneNumber,
												setPhoneNumber,
											}}
											setFormErrorState={{
												formError,
												setFormError,
											}}
										/>
									</div>

									<div className="col-span-12 mt-1">
										<Button
											type="submit"
											buttonClass="register-button auth-button"
											buttonDisabled={
												!form.termsAndConditionsIsChecked
													? true
													: ""
											}
										>
											Sign up{" "}
											{form.isLoading ? (
												<i
													className="fa fa-spinner fa-pulse fa-3x fa-fw"
													style={{ fontSize: 20 }}
												></i>
											) : null}
										</Button>
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