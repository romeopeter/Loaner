import React, { createRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";

import { signOutAsync } from "../../redux/authSlice";

import profileLady from "../../assets/images/profileLady.png";
import UBALogo from "../../assets/images/UBALogo.png";

export default function NavMenu() {
	/*Dashboard navigation*/
	let navMenuRef = createRef();

	const respondsiveNav = () => {
		navMenuRef.current.classList.toggle("responsive-nav-menu");
	};

	const dispatch = useDispatch();
	const navigate = useNavigate()

	const handleSignOut = () => {
		dispatch(signOutAsync())

		navigate("/");

		// Reload page after loging out
		window.location.reload()
	}

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
					<ul id="nav-menu-list" className="" ref={navMenuRef}>
						<li
							id="deals"
							className="nav-menu-item"
							style={{ color: "white", cursor: "pointer" }}
						>
							Deals{" "}
							<i
								className="fa fa-caret-down"
								aria-hidden="true"
							></i>
							<div
								id="deals-dropdown"
								className="shadow-md hidden rounded"
							>
								<Link to="">Current deals</Link>
								<Link to="/">Archive deals</Link>
								<Link to="/">Create deal - single tranche</Link>
								<Link to="/">
									Create deal - multiple tranche
								</Link>
							</div>
						</li>
						<li className="nav-menu-item">
							<Link to="/">
								Analysis{" "}
								<i
									class="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</Link>
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
						<li
							id="user-profile-menu-item"
							className="nav-menu-item text-white font-bold"
							style={{ cursor: "pointer" }}
						>
							<hr className="md:hidden" id="horizontal-divider" />

							<div id="profile-container" className="">
								<div id="profile">
									<img
										src={profileLady}
										id="profile-photo"
										alt=""
										className="round-lg"
									/>{" "}
									<i
										class="fa fa-caret-down text-white"
										aria-hidden="true"
									></i>
									<div id="profile-menu-nav" className="bg-white shadow-md rounded">
										<div id="profile" className="menu-nav-container">
											<Link to="/user/client/profile">Profile</Link>
											<Link to="/user/client/edit-profile">Edit Profile</Link>
										</div>
										<hr className="hidden md:block" />
										<div id="account" className="menu-nav-container">
											<Link to="/user/client/account-settings">Account Settings</Link>
											<span onClick={() => handleSignOut()}>Sign out</span>
										</div>
									</div>
								</div>
								<img
									src={UBALogo}
									id="bank-photo"
									className="round-lg"
								/>{" "}
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}