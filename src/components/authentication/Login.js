import React, { useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { signInAction } from "../../redux/authSlice";
import DocumentHead from "../DocumentHead";
import Button from "../Button";
import {Danger, Success, Info} from "../alert"

import setBgImage from "../../utils/setBgImage";
import phoneLady from "../../assets/images/phoneLady.jpg";

export default function Login() {
	const pageName = "Login";

	const navigate = useNavigate();
	const { state } = useLocation();
	const alert = useAlert();
	const dispatch = useDispatch();

	const { isLoggedIn } = useSelector((state) => state.auth);
	const serverMessage = useSelector((state) => state.message.server);

	// const {client: clientMessage}  = useSelector(state => state.message);
	const clientMessage = JSON.parse(localStorage.getItem("ORDERBOOK_EXPIRED_TOKEN"));

	const [form, setForm] = useState({
		emailAddress: "",
		password: "",
		isChecked: false,
		isLoading: false,
		userType: null,
	});

	// Server message variables
	const [acountCreated, noActiveAccount, networkError] = ["account_created", "no_active_account", "network_error"];
	let networkErrorMessage = null;
	let confirmEmailMessage = null;
	let noUserMessage = null;
	let tokenExpired = null;

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
	
	const { emailAddress, password } = form;

	const handleSubmit = async (e) => {
		e !== null && e.preventDefault();

		setForm((state) => {
			return {
				...state,
				isLoading: true,
			};
		});

		const data = { email: emailAddress, password };

		for (let props in data) {
			if (data[props] === "" || data[props] === null) {
				// setForm((state) => ({...state, isLoading: false}));
				alert.error("Please fill all fields");
				return;
			}
		}

		// Dispatch redux sign-in action
		const req = await dispatch(signInAction(data));

		if (req.meta.requestStatus === "fulfilled") {
			const { user } = JSON.parse(localStorage.getItem("USER"));

			// Cleared stored expired token
			localStorage.removeItem("ORDERBOOK_EXPIRED_TOKEN");

			if (user !== undefined && "groups" in user) {
				const userType = user.groups[0].name;

				// Acess store and check user role
				if (userType === "Client") {
					navigate(state?.path || "/client/dashboard");
				}

				if (userType === "Broker") {
					navigate(state?.path || "/broker/dashboard");
				}

				if (userType === "Investor") {
					navigate(state?.path || "/investor/dashboard");
				}
			}

			navigate("/login");
		}

		if (serverMessage.messageType === networkError) {
			setForm(state => ({...state, isLoading: false}));
			return;
		}
	};

	if (typeof serverMessage === "object") {
		if (serverMessage.messageType === acountCreated) confirmEmailMessage = serverMessage.detail;
		if (serverMessage.messageType === noActiveAccount) noUserMessage = serverMessage.detail;
		if (serverMessage.messageType === networkError) {
			networkErrorMessage = serverMessage.detail;
		}
	}

	if (clientMessage !== null && typeof clientMessage === "object") {
		if (clientMessage.messageType === "token_not_valid") {
			tokenExpired = clientMessage.detail;
		}
	}

	// If user logged in.
	const currentUserObj = JSON.parse(localStorage.getItem("USER"));
	if (currentUserObj !== null && typeof currentUserObj === "object") {
		const {user} = currentUserObj;

		const userType = user.groups[0].name;

		// Rediret if already logged in
		if (isLoggedIn && typeof user === "object") {
			return <Navigate replace to={`/${userType.toLowerCase()}/dashboard`} />
		};
	}

	// Shows alerts from server and client
	const AlertComponent = () => (
		<>
			<div className="mb-5">
				{networkErrorMessage !== null ?(<Danger message={networkErrorMessage} />):null}
			</div>
			<div className="mb-5">
				{confirmEmailMessage !== null ?(<Success message={confirmEmailMessage} />):null}
			</div>
			<div className="mb-5">
				{tokenExpired !== null ?(<Danger message={tokenExpired} />):null}
			</div>
			<div className="mb-5">
				{noUserMessage !== null ?(<Info message={noUserMessage} />):null}
			</div>
		</>
	)

	return (
		<>
			<DocumentHead title={pageName} />
			<section id="orderbook-login" className="orderbook-authentication">
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
								id="login-title"
								className="bg-white px-6 mb-3 self-start flex items-center justify-center shadow-md orderbook-icon"
							>
								Orderbook Online
							</div>
							<h1 className="shadow-sm">
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
						<form
							className="h-full"
							onSubmit={(e) => handleSubmit(e)}
						>
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
										Welcome back
									</h2>
									<p className="mt-1 text-sm text-gray-600">
										Log into your account
									</p>
								</div>
								<div className="grid grid-cols-2 gap-5">
									<div className="col-span-6 sm:col-span-4">
										<input
											type="text"
											name="emailAddress"
											id="email-address"
											autoComplete="email"
											placeholder="Email"
											className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
											required
											onChange={(e) => handleChange(e)}
										/>
									</div>

									<div className="col-span-6 sm:col-span-4">
										<input
											type="password"
											name="password"
											id="password"
											autoComplete="password"
											placeholder="Password"
											className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
											required
											onChange={(e) => handleChange(e)}
										/>
									</div>

									<div className="col-span-6 sm:col-span-4">
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													type="checkbox"
													name="isChecked"
													id="persist-login"
													className="focus:ring-white h-4 w-4 text-indigo-600 border-black rounded"
													onChange={(e) =>
														handleChange(e)
													}
												/>
											</div>
											<div className="ml-3 text-sm">
												<label
													htmlFor="persist-login"
													className="font-medium text-black"
												>
													Keep me logged in
												</label>
											</div>
										</div>
									</div>

									<div className="col-span-6 sm:col-span-4 mt-1 flex items-end">
										<Link
											to="#"
											id="forgot-password"
											className="w-full"
										>
											Forgot password?
										</Link>
									</div>

									<div className="col-span-6 sm:col-span-4 mt-1">
										<Button
											type="submit"
											buttonClass="login-button auth-button"
										>
											Login{" "}
											{
											
											form.isLoading ? (
												<i
													className="fa fa-spinner fa-pulse fa-3x fa-fw"
													style={{ fontSize: 20 }}
												></i>
											) : null}
										</Button>
									</div>

									<div
										id="dont-have-account"
										className="col-span-6 sm:col-span-4 mt-1 text-center account-signal"
									>
										<span>Don't have an account yet?</span>{" "}
										<Link to="/register">Sign up</Link>
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