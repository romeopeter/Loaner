import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { signInAction } from "../../redux/authSlice";
import DocumentHead from "../DocumentHead";
import Button from "../Button";

import setBgImage from "../../utils/setBgImage";
import phoneLady from "../../assets/images/phoneLady.jpg";

export default function Login() {
	const pageName = "Login";

	const navigate = useNavigate();
	const { state } = useLocation();
	const alert = useAlert();
	const dispatch = useDispatch();

	const { isLoggedIn, user } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message.server);

	const [form, setForm] = useState({
		emailAddress: "",
		password: "",
		isChecked: false,
		isLoading: false,
		userType: null,
	});

	// Custom side-effect hook
	const useLogin = (callback) => {
		useEffect(() => {
			if(callback) {
				const IntervalId = setInterval(callback, 1000);
			};
		}, [])
	}

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
	const authState = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		if (e !== null && typeof e === "object") e.preventDefault();

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
		dispatch(signInAction(data)).then(() => {
			const { user } = JSON.parse(localStorage.getItem("USER"));



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
		});
	};

	// Auth request responses
	const [acountCreated, noActiveAccount, networkError] = ["account_created", "no_active_account", "network_error"];

	let networkErrorMessage = null;
	let confirmEmailMessage = null;
	let noUserMessage = null;

	if (typeof message === "object") {
		if (message.messageType === acountCreated) confirmEmailMessage = message.detail;
		if (message.messageType === noActiveAccount) noUserMessage = message.detail;
		if (message.messageType === networkError) {
			networkErrorMessage = message.detail;

			/*setForm((state) => {
				return {
					...state,
					isLoading: false,
				};
			});*/
		}
	}

	// If already logged in.
	const currentUserObj = JSON.parse(localStorage.getItem("USER"));
	if (currentUserObj !== null && typeof currentUserObj === "object") {
		const {user} = currentUserObj;

		const role = user.groups[0].name;

		// Rediret if already logged in
		if (isLoggedIn && typeof user === "object") {
			return <Navigate replace to={`/${role.toLowerCase()}/dashboard`} />
		};
	}

	const ErrorComoponent = () => (
		<>
			<div className="mb-5">
				{networkErrorMessage !== null ?(
					<div className="text-black text-center bg-red-100 p-2 rounded border border-1 border-red-400">
						{networkErrorMessage}
					</div>
				):null}
			</div>
			<div className="mb-5">
				{confirmEmailMessage !== null ?(
					<div className="text-black text-center bg-green-100 p-2 rounded border border-1 border-green-400">
						{confirmEmailMessage}
					</div>
				):null}
			</div>
			<div className="mb-5">
				{noUserMessage !== null ?(
					<div className="text-black text-center bg-red-100 p-2 rounded border border-1 border-red-400">
						{noUserMessage}
					</div>
				):null}
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
								Orderbook
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
									<ErrorComoponent />
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
											{form.isLoading ? (
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