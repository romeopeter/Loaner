import React, { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signOutAsync } from "../../redux/authSlice";

import profileLady from "../../assets/images/profileLady.png";
// import UBALogo from "../../assets/images/UBALogo.png";

export default function NavMenu() {
	const [showDropdown, setshowDropdown] = useState(false);

	// Dashboard nav reference
	let navMenuRef = createRef();

	// Current user object from local storage
	const currentUserObj = JSON.parse(localStorage.getItem("USER"));

	const respondsiveNav = () => {
		navMenuRef.current.classList.toggle("responsive-nav-menu");
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDropdown = (e) => {
		console.log(e.target.name);
	};

	const handleSignOut = () => {
		dispatch(signOutAsync());
		navigate("/");
	};

	// Get user role
	let role;
	if (typeof currentUserObj === "object" && currentUserObj !== null) {
		const { user } = currentUserObj;
		if ("groups" in user) role = user.groups[0].name;
	}

	const ClientDashboardNav = () => {
		if (role === "Client") {
			return (
				<ul id="nav-menu-list" className="" ref={navMenuRef}>
				<li
					id="deals"
					className="nav-menu-item dropdown"
					style={{ color: "white", cursor: "pointer" }}
				>
					<div>
						Deals{" "}
						<i className="fa fa-caret-down" aria-hidden="true"></i>
					</div>
					<div id="deals-dropdown" className="shadow-md rounded">
						<Link to={`/current-deals`}>All offers</Link>
						<Link to={`/archived-deals`}>Successful offers</Link>
						<Link to={`/single-tranche-deal`}>
							Failed offers
						</Link>
						<Link to={`/multiple-tranche-deal`}>
							Accepted offers
						</Link>
					</div>
				</li>
				<li
					id="help"
					className="nav-menu-item dropdown"
					style={{ color: "white", cursor: "pointer" }}
				>
					<div>
						Help{" "}
						<i className="fa fa-caret-down" aria-hidden="true"></i>
					</div>
					<div id="help-dropdown" className="shadow-md rounded">
						<Link to={`/${role}/faq`}>FAQ</Link>
						<Link to={`/${role}/contact-us`}>Contact us</Link>
					</div>
				</li>
				<li className="nav-menu-item">
					<Link to={`/${role}/privacy-policy`}>Privacy</Link>
				</li>
				<li className="nav-menu-item">
					<Link to={`/${role}/terms-of-use`}>Terms of Use</Link>
				</li>
				<li
					id="user-profile-menu-item"
					className="nav-menu-item text-white font-bold dropdown"
					style={{ cursor: "pointer" }}
				>
					<hr className="md:hidden" id="horizontal-divider" />

					<div id="profile-container" className="">
						<div id="profile-dropdown">
							<img
								src={profileLady}
								id="profile-photo"
								alt=""
								className="round-lg"
							/>{" "}
							<i
								className="fa fa-caret-down text-white"
								aria-hidden="true"
							></i>
							<div
								id="profile-menu-nav"
								className="bg-white shadow-md rounded"
							>
								<div
									id="profile"
									className="menu-nav-container"
								>
									<Link to={`/${role}/dashboard`}>
										Dashboard
									</Link>
									<Link to="/profile">Profile</Link>
									<Link to="/client/new-loan">
										Create loan offer
									</Link>
								</div>
								<hr className="hidden md:block" />
								<div
									id="account"
									className="menu-nav-container"
								>
									<Link to="/user/client/account-settings">
										Account Settings
									</Link>
									<span onClick={() => handleSignOut()}>
										Sign out
									</span>
								</div>
							</div>
						</div>
						{/*<img
							src={UBALogo}
							id="bank-photo"
							className="round-lg"
						/>{" "}*/}
					</div>
				</li>
			</ul>
			)
		}

		return null;
	};

	const BrokerDashboardNav = () => {
		if (role === "Broker") {
			return (
					<ul id="nav-menu-list" className="" ref={navMenuRef}>
						<li
							id="deals"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Deals{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="deals-dropdown"
								className="shadow-md rounded"
							>
								<Link to={`/current-deals`}>All offers</Link>
								<Link to={`/archived-deals`}>
									Successful offers
								</Link>
								<Link to={`/single-tranche-deal`}>
									Failed offers
								</Link>
								<Link to={`/multiple-tranche-deal`}>
									Accepted offers
								</Link>
							</div>
						</li>
						<li
							id="analysis-dropdown"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Analysis{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="analysis-dropdown"
								className="shadow-md rounded"
							>
								<Link
									to={`/${
										role !== undefined && role
									}/saved-report`}
								>
									Saved report
								</Link>
								<Link
									to={`/${
										role !== undefined && role
									}/create-report`}
								>
									Create report
								</Link>
								<Link
									to={`/${role !== undefined && role}/search`}
								>
									Search
								</Link>
							</div>
						</li>
						<li
							id="help"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Help{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="help-dropdown"
								className="shadow-md rounded"
							>
								<Link to={`/${role}/faq`}>FAQ</Link>
								<Link to={`/${role}/contact-us`}>
									Contact us
								</Link>
							</div>
						</li>
						<li className="nav-menu-item">
							<Link to={`/${role}/privacy-policy`}>Privacy</Link>
						</li>
						<li className="nav-menu-item">
							<Link to={`/${role}/terms-of-use`}>
								Terms of Use
							</Link>
						</li>
						<li
							id="user-profile-menu-item"
							className="nav-menu-item text-white font-bold dropdown"
							style={{ cursor: "pointer" }}
						>
							<hr className="md:hidden" id="horizontal-divider" />

							<div id="profile-container" className="">
								<div id="profile-dropdown">
									<img
										src={profileLady}
										id="profile-photo"
										alt=""
										className="round-lg"
									/>{" "}
									<i
										className="fa fa-caret-down text-white"
										aria-hidden="true"
									></i>
									<div
										id="profile-menu-nav"
										className="bg-white shadow-md rounded"
									>
										<div
											id="profile"
											className="menu-nav-container"
										>
											<Link to={`/${role}/dashboard`}>
												Dashboard
											</Link>
											<Link to="/profile">Profile</Link>
											<Link to={`/${role}/new-loan`}>
												Create loan offer
											</Link>
										</div>
										<hr className="hidden md:block" />
										<div
											id="account"
											className="menu-nav-container"
										>
											<Link to="/user/client/account-settings">
												Account Settings
											</Link>
											<span
												onClick={() => handleSignOut()}
											>
												Sign out
											</span>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
			);
		}

		return null;
	};

	const InvestorDashboardNav = () => {
		if (role === "Investor") {
			return (
					<ul id="nav-menu-list" ref={navMenuRef}>
						<li
							id="analysis-dropdown"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Analysis{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="analysis-dropdown"
								className="shadow-md rounded"
							>
								<Link
									to={`/${
										role !== undefined && role
									}/saved-report`}
								>
									Saved report
								</Link>
								<Link
									to={`/${
										role !== undefined && role
									}/create-report`}
								>
									Create report
								</Link>
								<Link
									to={`/${role !== undefined && role}/search`}
								>
									Search
								</Link>
							</div>
						</li>
						<li
							id="help"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Help{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="help-dropdown"
								className="shadow-md rounded"
							>
								<Link to={`/${role}/faq`}>FAQ</Link>
								<Link to={`/${role}/contact-us`}>
									Contact us
								</Link>
							</div>
						</li>
						<li className="nav-menu-item">
							<Link to={`/${role}/privacy-policy`}>Privacy</Link>
						</li>
						<li className="nav-menu-item">
							<Link to={`/${role}/terms-of-use`}>
								Terms of Use
							</Link>
						</li>
						<li
							id="user-profile-menu-item"
							className="nav-menu-item text-white font-bold dropdown"
							style={{ cursor: "pointer" }}
						>
							<hr className="md:hidden" id="horizontal-divider" />

							<div id="profile-container" className="">
								<div id="profile-dropdown">
									<img
										src={profileLady}
										id="profile-photo"
										alt=""
										className="round-lg"
									/>{" "}
									<i
										className="fa fa-caret-down text-white"
										aria-hidden="true"
									></i>
									<div
										id="profile-menu-nav"
										className="bg-white shadow-md rounded"
									>
										<div
											id="profile"
											className="menu-nav-container"
										>
											<Link to={`/${role}/dashboard`}>
												Dashboard
											</Link>
										</div>
										<div
											id="account"
											className="menu-nav-container"
										>
											<Link to="/user/client/account-settings">
												Account Settings
											</Link>
											<span
												onClick={() => handleSignOut()}
											>
												Sign out
											</span>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
			);
		}

		return null;
	};

	const AdminDashboardNav = () => {
		if (role === "Admin") {
			return (
					<ul id="nav-menu-list" className="" ref={navMenuRef}>
						<li
							id="deals"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Deals{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="deals-dropdown"
								className="shadow-md rounded"
							>
								<Link to={`/current-deals`}>Current deals</Link>
								<Link to={`/archived-deals`}>
									Archived deals
								</Link>
								<Link to={`/single-tranche-deal`}>
									Create deal - single tranche
								</Link>
								<Link to={`/multiple-tranche-deal`}>
									Create deal - multiple tranche
								</Link>
							</div>
						</li>
						<li
							id="analysis-dropdown"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Analysis{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="analysis-dropdown"
								className="shadow-md rounded"
							>
								<Link
									to={`/${
										role !== undefined && role
									}/saved-report`}
								>
									Saved report
								</Link>
								<Link
									to={`/${
										role !== undefined && role
									}/create-report`}
								>
									Create report
								</Link>
								<Link
									to={`/${role !== undefined && role}/search`}
								>
									Search
								</Link>
							</div>
						</li>
						<li
							id="admin"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Admin{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="admin-dropdown"
								className="shadow-md rounded"
							>
								<Link to={`/${role}/companies`}>Companies</Link>
								<Link to={`/${role}/currencies`}>
									Currencies
								</Link>
								<Link to={`/${role}/deal-and-tranche`}>
									Deal/Tranche
								</Link>
								<Link to={`/${role}/profile-settings`}>
									Personal Settings
								</Link>
							</div>
						</li>
						<li
							id="help"
							className="nav-menu-item dropdown"
							style={{ color: "white", cursor: "pointer" }}
						>
							<div>
								Help{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</div>
							<div
								id="help-dropdown"
								className="shadow-md rounded"
							>
								<Link to={`/${role}/faq`}>FAQ</Link>
								<Link to={`/${role}/contact-us`}>
									Contact us
								</Link>
							</div>
						</li>
						<li className="nav-menu-item">
							<Link to={`/${role}/privacy-policy`}>Privacy</Link>
						</li>
						<li className="nav-menu-item">
							<Link to={`/${role}/terms-of-use`}>
								Terms of Use
							</Link>
						</li>
						<li
							id="user-profile-menu-item"
							className="nav-menu-item text-white font-bold dropdown"
							style={{ cursor: "pointer" }}
						>
							<hr className="md:hidden" id="horizontal-divider" />

							<div id="profile-container" className="">
								<div id="profile-dropdown">
									<img
										src={profileLady}
										id="profile-photo"
										alt=""
										className="round-lg"
									/>{" "}
									<i
										className="fa fa-caret-down text-white"
										aria-hidden="true"
									></i>
									<div
										id="profile-menu-nav"
										className="bg-white shadow-md rounded"
									>
										<div
											id="profile"
											className="menu-nav-container"
										>
											<Link to={`/${role}/dashboard`}>
												Dashboard
											</Link>
											<Link to="/profile">Profile</Link>
											<Link to={`/${role}/new-loan`}>
												Create loan offer
											</Link>
										</div>
										<hr className="hidden md:block" />
										<div
											id="account"
											className="menu-nav-container"
										>
											<Link to="/user/client/account-settings">
												Account Settings
											</Link>
											<span
												onClick={() => handleSignOut()}
											>
												Sign out
											</span>
										</div>
									</div>
								</div>
								{/*<img
									src={UBALogo}
									id="bank-photo"
									className="round-lg"
								/>{" "}*/}
							</div>
						</li>
					</ul>
			);
		}

		return null;
	};

	return (
		<div id="dashboard-nav">
			<nav id="orderbook-nav">
				<div id="orderbook-logo" className="">
					<Link to="/">
						<span>Orderbook Online</span>
					</Link>
				</div>
				<div
					id="burger-toggle"
					className="icon"
					onClick={() => respondsiveNav()}
				>
					&#9776;
				</div>
				<div id="nav-menu">
					<ClientDashboardNav />
					<BrokerDashboardNav />
					<InvestorDashboardNav />
					<AdminDashboardNav />
				</div>
			</nav>
		</div>
	);
}