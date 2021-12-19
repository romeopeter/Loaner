import React from "react";
import {Link} from "react-router-dom";

import OrderbookLayout from "../OrderbookLayout";
import DocumentHead from "../DocumentHead";
import Button from "../Button";
import setBgImage from "../../utils/setBgImage";
import phoneLady from "../../assets/images/phoneLady.jpg";

export default function Login() {
	const page = "Login";

	return (
		<>
			<DocumentHead title={page} />
			<OrderbookLayout>
				<section id="orderbook-login">
					<div className="grid grid-cols-1 md:grid-cols-2 h-full">
						<div
							id="intro-background"
							className="hidden md:block"
							style={setBgImage(phoneLady)}
						>
							<div
								id="login-intro"
								className="flex flex-col items-center"
							>
								<div id="intro-title" className="bg-white px-6 mb-3 self-start flex items-center justify-center">
									Orderbook
								</div>
								<h1>
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
							{/*<div id="overlay"></div>*/}
						</div>

						<div id="orderbook-form">
							<form className="h-full">
								<div className="pt-20 pb-10 px-12">
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
													className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300"
												/>
											</div>

											<div className="col-span-6 sm:col-span-4">
												<input
													type="password"
													name="password"
													id="password"
													autoComplete="password"
													placeholder="password"
													className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300"
												/>
											</div>

											<div className="col-span-6 sm:col-span-4">
												<div className="flex items-start">
													<div className="flex items-center h-5">
														<input
															id="persist-login"
															name="persist-login"
															type="checkbox"
															className="focus:ring-white h-4 w-4 text-indigo-600 border-black rounded"
														/>
													</div>
													<div className="ml-3 text-sm">
							                          <label htmlFor="persist-login" className="font-medium text-black">
							                            keep me logged in
							                          </label>
							                        </div>
						                        </div>
											</div>

											<div className="col-span-6 sm:col-span-4 mt-1 flex items-end">
												<Link to="#" id="forgot-password" className="w-full">Forgot password?</Link>
											</div>

											<div className="col-span-6 sm:col-span-4 mt-1">
												<Button link="#" title="Login" buttonClass="login-button" />
											</div>

											<div id="sign-up" className="col-span-6 sm:col-span-4 mt-1 text-center">
												<span>Don't have an account yet?</span>{" "}<Link to="/">Sign up</Link>
											</div>
										</div>
								</div>
							</form>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}