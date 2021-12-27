import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import OrderbookLayout from "../OrderbookLayout";
import DocumentHead from "../DocumentHead";
import Button from "../Button"

import setBgImage from '../../utils/setBgImage'
import headerBanner from "../../assets/images/headerBanner.png"

export default function Dashboard() {
	const pageName = "Dashboard";

	const { user: currentUser } = useSelector((state) => state.auth.user);

	if (!currentUser) {
		<Navigate repalce to="login" />
	}

	const pageNav = (
		<div id="dashboard-nav">
			<nav id="orderbook-nav">
				<div id="orderbook-logo">
					<span>Orderbook Online</span>
				</div>
				<div id="burger-toggle" className="icon">&#9776;</div>
				<div id="nav-menu">
					<ul id="nav-menu-list" className="">
						<li className="nav-menu-item">
							<Link to="/">Deals{" "}<i class="fa fa-caret-down" aria-hidden="true"></i></Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Analysis{" "}<i class="fa fa-caret-down" aria-hidden="true"></i></Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Admin</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Recent</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Help</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/">Privacy</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/register">Terms of Use</Link>
						</li>
						<li className="nav-menu-item">
							<Link to="/register" className="text-bold">Log out</Link>
						</li>
					</ul>
					{/*<div id="profile" className="">
						<div id="profile-image">
							<img src="" alt="" />
							{" "}<i class="fa fa-caret-down text-white" aria-hidden="true"></i>
						</div>
					</div>*/}
				</div>
			</nav>
		</div>
	);

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout pageNav={pageNav}>
				<section id="dashboard-intro-container">
					<div id="loan-invest-dropdown" class="bg-white px-16 py-5">
						<div id="loan">
							Load{" "}<i class="fa fa-caret-down" aria-hidden="true"></i>
							<div id="load-dropdown"></div>
						</div>
						<div id="investor">
							Investor{" "}<i class="fa fa-caret-down" aria-hidden="true"></i><div id="investor-dropdown"></div>
						</div>
					</div>
					<div id="welcome" style={setBgImage(headerBanner)}>
						<h1>Hello, {currentUser.first_name}</h1>
						<h3>Welcome to your dashboard</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing 
						elit, sed do eiusmod tempor incididunt ut labore et 
						dolore magna aliqua. Ut enim ad minim veniam, 
						quis nostrud exercitation</p>
						<Button title="Update your profile" buttonClass="update-profile-cta" />
					</div>
				</section>
			</OrderbookLayout>
		</>
	);
}