import React, {createRef} from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

import setBgImage from "../../../utils/setBgImage";
import headerBanner from "../../../assets/images/headerBanner.png";

export default function InvestorDashboard() {
	const pageName = "Investor"

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-investor-dashboard">
					<div
						id="loan-invest-dropdown"
						class="bg-white px-16 py-10 shadow-md flex justify-start w-full"
					>
						<Link to="/investor/dashboard" id="home" className="dropdown-container mr-5">
							Home
						</Link>
						<Link to="/" id="offers" className="dropdown-container">
							Offers
						</Link>
					</div>
					<div id="orderbook-dashboard-intro" style={setBgImage(headerBanner)}>
						<h1>Hello, Ola</h1>
						<h3>Welcome to your dashboard</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation
						</p>
						<Button
							title="Update your profile"
							buttonClass="update-profile-cta"
						/>
					</div>
					<div
						id="user-quick-action"
						className="flex flex-row justify-evenly h-20 w-full"
					>
						<div className="actions action-1 border-r border-black">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/offers">My offers</Link>
							</h2>
						</div>
						<div className="actions action-2 border-r border-black">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/bids">Successful offers</Link>
							</h2>
						</div>
						<div className="actions action-3">
							<h2 className="font-bold">
								<i
									className="fa fa-thumbs-o-up"
									aria-hidden="true"
								></i>	

								<Link to="/investor/bids/declined">Decline offers</Link>
							</h2>
						</div>
					</div>

					<div id="notifications-container">
						<h3 className="text-3xl text-white font-bold pl-5 py-10">Notification</h3>
						<div className="flex flex-col md:flex-row md:pr-5">
							<div id="notifications" className="pb-10">
								<div className="notification notification-1">
									<div className="badge">A</div>
									<div>
										<Link to="/investor/offers/offer">
											Rice value chain ( Project Finance ) sent you an offer view more
											{" "}
											<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
										</Link>
										<small>
											1 day ago
										</small>
									</div>
								</div>
								<div className="notification notification-1">
									<div className="badge">A</div>
									<div>
										<Link to="/">
											Rice value chain ( Project Finance ) sent you an offer view more
											{" "}
											<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
										</Link>
										<small>
											1 day ago
										</small>
									</div>
								</div>
								<div className="notification notification-1">
									<div className="badge">A</div>
									<div>
										<Link to="/">
											Rice value chain ( Project Finance ) sent you an offer view more
											{" "} 
											<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
										</Link>
										<small>
											1 day ago
										</small>
									</div>
								</div>
								<div className="notification notification-1">
									<div className="badge">A</div>
									<div>
										<Link to="/">
											Rice value chain ( Project Finance ) sent you an offer view more
											{" "}
											<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
										</Link>
										<small>
											1 day ago
										</small>
									</div>
								</div>
							</div>
							<div id="blank-space" className="bg-white hidden md:block">
							</div>
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	)
}