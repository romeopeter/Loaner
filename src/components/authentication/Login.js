import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useLocation } from "react-redux";

import useAuth from "./useAuth";
import { signInAction } from "../../redux/authSlice";

import DocumentHead from "../DocumentHead";
import Button from "../Button";

import setBgImage from "../../utils/setBgImage";
import phoneLady from "../../assets/images/phoneLady.jpg";

export default function Login() {
	const pageName = "Login";

	const [form, setForm] = useState({
		emailAddress: "",
		password: "",
		isChecked: false,
	});

	const { signIn } = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {state} = useLocation();

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

		console.log(form);
	};

	// Input from form state
	const { emailAddress, password } = form;

	const handleSubmit = (e) => {
		e.preventDefault();

		// Callback is Redux hook dispatching sign-in action (Login requst)
		const cb = dispatch(signInAction({ emailAddress, password }));

		// signIn is useAuth hook's method for signing user in and redirecting to dashboard
		signIn(cb).then(() => {
			navigate(state?.path || "/dashboard");
		});
	};

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
							onSubmit={handleSubmit}
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
											name="email-address"
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
													name="persist-login"
													id="persist-login"
													className="focus:ring-white h-4 w-4 text-indigo-600 border-black rounded"
													required
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
													keep me logged in
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
											title="Login"
											buttonClass="login-button auth-button"
										/>
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