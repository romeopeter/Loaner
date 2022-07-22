import React, { createRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signOutAsync } from "../../redux/authSlice";

import profileLady from "../../assets/images/profileLady.png";
// import UBALogo from "../../assets/images/UBALogo.png";

export default function NavMenu() {
  // const [showDropdown, setshowDropdown] = useState(false);

  // Dashboard nav reference
  let navMenuRef = createRef();

    // Current user object from local storage
    const currentUserObj = JSON.parse(localStorage.getItem("USER"));

    const responsiveNav = () => {
        const navMenuClassList = navMenuRef.current.classList;

        if (navMenuClassList.contains("hidden")) {
            navMenuClassList.remove("hidden");
            navMenuClassList.add("block");
        } else {
            navMenuClassList.remove("block");
            navMenuClassList.add("hidden");
        }
    };

    const showSubNav = (e) => {
        const dropdownElement = e.target.nextElementSibling.classList;

        if (dropdownElement.contains("hidden")) {
            dropdownElement.remove("hidden");
            dropdownElement.add("block");
        } else {
            dropdownElement.remove("block");
            dropdownElement.add("hidden");
        }
    }

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <>
        <nav id="orderbook-nav">
            <div id="orderbook-logo" className="">
                <Link to="/">
                    <span>Orderbook Online</span>
                </Link>
            </div>
            <div id="nav-menu">
                <ul id="nav-menu-list" className="" ref={navMenuRef}>
                    <li
                    id="deals"
                    className="nav-menu-item dropdown"
                    style={{ color: "white", cursor: "pointer" }}
                    >
                    <div>
                        Deals <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                    <div id="deals-dropdown" className="shadow-md rounded">
                        <Link to={`/client/offers`}>All offers</Link>
                        <Link to={`/client/offers`}>Successful offers</Link>
                        <Link to={`/client/offers`}>Failed offers</Link>
                        <Link to={`/client/offers`}>Accepted offers</Link>
                    </div>
                    </li>
                    <li
                        id="help"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                    <div>
                        Help <i className="fa fa-caret-down" aria-hidden="true"></i>
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
                        {/* <i className='fa fa-caret-down text-white' aria-hidden='true'></i> */}
                        <div
                            id="profile-menu-nav"
                            className="bg-white shadow-md rounded"
                        >
                            <div id="profile" className="menu-nav-container">
                            <Link to={`/${role}/dashboard`}>Dashboard</Link>
                            {/*<Link to='/profile'>Profile</Link>*/}
                            <Link to="/client/new-loan">Create loan offer</Link>
                            </div>
                            <hr className="hidden md:block" />
                            <div id="account" className="menu-nav-container">
                            <Link to="/account-settings">Account Settings</Link>
                            <span onClick={() => handleSignOut()}>Sign out</span>
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
            </div>

            {/* Menu burger toggler */}
            <div id='burger-toggle' className='icon text-white text-2xl hidden cursor-pointer' onClick={() => responsiveNav()}>
                &#9776;
            </div>
        </nav>

        {/* Mobile navigation */}
        <div id="orderbook-mobile-nav" className="hidden" ref={navMenuRef}>
                <ul id="nav-menu-list" className="">
                    <li
                        id="deals"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                        <div className="dropdown-header" onClick={(e) => showSubNav(e)}>
                        Deals <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <ul id="deals-dropdown" className="sub-dropdown hidden deals-dropdown">
                            <li className="dropdown-item">
                                <Link to={`/broker/dashboard/all-offers/`}>All offers</Link>
                            </li>
                            <li className="dropdown-item">
                                    <Link to={`/broker/dashboard/all-offers/`}>
                                        Successful offers
                                    </Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/broker/dashboard/all-offers/`}>
                                    Failed offers
                                </Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/broker/dashboard/all-offers/`}>
                                    Accepted offers
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        id="help"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                        <div className="dropdown-header" onClick={(e) => showSubNav(e)}>
                            Help <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <ul id="help-dropdown" className="sub-dropdown hidden">
                            <li className="dropdown-item">
                                <Link to={`/${role}/faq`}>FAQ</Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/${role}/contact-us`}>Contact us</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-menu-item dropdown-header">
                        <Link to={`/${role}/privacy-policy`} className="dropdown-header">Privacy</Link>
                    </li>
                    <li className="nav-menu-item dropdown-header">
                        <Link to={`/${role}/terms-of-use`} className="dropdown-header">Terms of Use</Link>
                    </li>
                    <li
                        id="user-profile-menu-item"
                        className="nav-menu-item text-white font-bold dropdown"
                        style={{ cursor: "pointer" }}
                    >
                        <div id="user-profile-header" className="dropdown-header flex justify-center" onClick={(e) => showSubNav(e)}>
                            Profile
                            <i className='fa fa-caret-down' aria-hidden='true'></i>
                            {/* <img
                                src={profileLady}
                                id="profile-photo"
                                alt=""
                                className="rounded-lg"
                            />{" "}  */}
                        </div>

                        <ul id="profile-dropdown" className="sub-dropdown hidden">
                            <div id="profile" className="menu-nav-container">
                                <li className="dropdown-item"><Link to={`/${role}/dashboard`}>Dashboard</Link></li>
                                <li className="dropdown-item">
                                    <Link to={`/${role}/dashboard/create-offer`}>
                                        Create loan offer
                                    </Link>
                                </li>
                            </div>
                            <div id="account" className="menu-nav-container">
                                <li className="dropdown-item">
                                    <Link to="/account-settings">Account Settings</Link>
                                </li>
                                <li className="dropdown-item">
                                    <span onClick={() => handleSignOut()}>Sign out</span>
                                </li>
                            </div>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
      );
    }

    return null;
  };

  const BrokerDashboardNav = () => {

    if (role === "Broker") {
      return (
        <>
           <nav id="orderbook-nav">
                <div id="orderbook-logo" className="">
                    <Link to="/">
                        <span>Orderbook Online</span>
                    </Link>
                </div>
                <div id="nav-menu">
                <ul id="nav-menu-list" className="" ref={navMenuRef}>
                <li
                    id="deals"
                    className="nav-menu-item dropdown"
                    style={{ color: "white", cursor: "pointer" }}
                >
                    <div>
                    Deals <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                    <div id="deals-dropdown" className="shadow-md rounded">
                    <Link to={`/broker/dashboard/all-offers/`}>All offers</Link>
                    <Link to={`/broker/dashboard/all-offers/`}>
                        Successful offers
                    </Link>
                    <Link to={`/broker/dashboard/all-offers/`}>
                        Failed offers
                    </Link>
                    <Link to={`/broker/dashboard/all-offers/`}>
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
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                    <div id="analysis-dropdown" className="shadow-md rounded">
                    <Link to={`/${role !== undefined && role}/saved-report`}>
                        Saved report
                    </Link>
                    <Link to={`/${role !== undefined && role}/create-report`}>
                        Create report
                    </Link>
                    <Link to={`/${role !== undefined && role}/search`}>
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
                    Help <i className="fa fa-caret-down" aria-hidden="true"></i>
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
                        {/* <i className='fa fa-caret-down text-white' aria-hidden='true'></i> */}
                        <div
                        id="profile-menu-nav"
                        className="bg-white shadow-md rounded"
                        >
                        <div id="profile" className="menu-nav-container">
                            <Link to={`/${role}/dashboard`}>Dashboard</Link>
                            <Link to={`/${role}/dashboard/create-offer`}>
                            Create loan offer
                            </Link>
                        </div>
                        <hr className="hidden md:block" />
                        <div id="account" className="menu-nav-container">
                            <Link to="/account-settings">Account Settings</Link>
                            <span onClick={() => handleSignOut()}>Sign out</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </li>
                </ul>
                </div>

                {/* Menu burger toggler */}
                <div id='burger-toggle' className='icon text-white text-2xl hidden cursor-pointer' onClick={() => responsiveNav()}>
                    &#9776;
                </div>
            </nav>

            {/* Mobile navlist */}
            <div id="orderbook-mobile-nav" className="hidden" ref={navMenuRef}>
                <ul id="nav-menu-list" className="">
                    <li
                        id="deals"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                        <div className="dropdown-header" onClick={(e) => showSubNav(e)}>
                        Deals <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <ul id="deals-dropdown" className="sub-dropdown hidden deals-dropdown">
                            <li className="dropdown-item">
                                <Link to={`/broker/dashboard/all-offers/`}>All offers</Link>
                            </li>
                            <li className="dropdown-item">
                                    <Link to={`/broker/dashboard/all-offers/`}>
                                        Successful offers
                                    </Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/broker/dashboard/all-offers/`}>
                                    Failed offers
                                </Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/broker/dashboard/all-offers/`}>
                                    Accepted offers
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        id="analysis-dropdown"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                        <div className="dropdown-header" onClick={(e) => showSubNav(e)}>
                            Analysis{" "}
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <ul id="analysis-dropdown" className="sub-dropdown hidden">
                            <li className="dropdown-item">
                                <Link to={`/${role !== undefined && role}/saved-report`}>
                                    Saved report
                                </Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/${role !== undefined && role}/create-report`}>
                                    Create report
                                </Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/${role !== undefined && role}/search`}>
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        id="help"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                        <div className="dropdown-header" onClick={(e) => showSubNav(e)}>
                            Help <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <ul id="help-dropdown" className="sub-dropdown hidden">
                            <li className="dropdown-item">
                                <Link to={`/${role}/faq`}>FAQ</Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/${role}/contact-us`}>Contact us</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-menu-item dropdown-header">
                        <Link to={`/${role}/privacy-policy`} className="dropdown-header">Privacy</Link>
                    </li>
                    <li className="nav-menu-item dropdown-header">
                        <Link to={`/${role}/terms-of-use`} className="dropdown-header">Terms of Use</Link>
                    </li>
                    <li
                        id="user-profile-menu-item"
                        className="nav-menu-item text-white font-bold dropdown"
                        style={{ cursor: "pointer" }}
                    >
                        <div id="user-profile-header" className="dropdown-header flex justify-center" onClick={(e) => showSubNav(e)}>
                            Profile
                            <i className='fa fa-caret-down' aria-hidden='true'></i>
                            {/* <img
                                src={profileLady}
                                id="profile-photo"
                                alt=""
                                className="rounded-lg"
                            />{" "}  */}
                        </div>

                        <ul id="profile-dropdown" className="sub-dropdown hidden">
                            <div id="profile" className="menu-nav-container">
                                <li className="dropdown-item"><Link to={`/${role}/dashboard`}>Dashboard</Link></li>
                                <li className="dropdown-item">
                                    <Link to={`/${role}/dashboard/create-offer`}>
                                        Create loan offer
                                    </Link>
                                </li>
                            </div>
                            <div id="account" className="menu-nav-container">
                                <li className="dropdown-item">
                                    <Link to="/account-settings">Account Settings</Link>
                                </li>
                                <li className="dropdown-item">
                                    <span onClick={() => handleSignOut()}>Sign out</span>
                                </li>
                            </div>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
      );
    }

    return null;
  };

  const InvestorDashboardNav = () => {
    if (role === "Investor") {
      return (
          <>
            <nav id="orderbook-nav">
                <div id="orderbook-logo" className="">
                    <Link to="/">
                        <span>Orderbook Online</span>
                    </Link>
                </div>
                <div id="nav-menu">
                <ul id="nav-menu-list" ref={navMenuRef}>
                    <li
                        id="analysis-dropdown"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                    <div>
                        Analysis <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                    <div id="analysis-dropdown" className="shadow-md rounded">
                        <Link to={`/${role !== undefined && role}/saved-report`}>
                        Saved report
                        </Link>
                        <Link to={`/${role !== undefined && role}/create-report`}>
                        Create report
                        </Link>
                        <Link to={`/${role !== undefined && role}/search`}>Search</Link>
                    </div>
                    </li>
                    <li
                        id="help"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                    <div>
                        Help <i className="fa fa-caret-down" aria-hidden="true"></i>
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
                        {/* <i className='fa fa-caret-down text-white' aria-hidden='true'></i> */}
                        <div
                            id="profile-menu-nav"
                            className="bg-white shadow-md rounded"
                        >
                            <div id="profile" className="menu-nav-container">
                            <Link to={`/${role}/dashboard`}>Dashboard</Link>
                            </div>
                            <div id="account" className="menu-nav-container">
                            <Link to="/account-settings">Account Settings</Link>
                            <span onClick={() => handleSignOut()}>Sign out</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </li>
                </ul>
                </div>

                {/* Menu burger toggler */}
                <div id='burger-toggle' className='icon text-white text-2xl hidden cursor-pointer' onClick={() => responsiveNav()}>
                    &#9776;
                </div>
            </nav>

            {/* Mobile navlist */}
            <div id="orderbook-mobile-nav" className="hidden" ref={navMenuRef}>
                <ul id="nav-menu-list" className="">
                    <li
                        id="analysis-dropdown"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                        <div className="dropdown-header" onClick={(e) => showSubNav(e)}>
                            Analysis{" "}
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <ul id="analysis-dropdown" className="sub-dropdown hidden">
                            <li className="dropdown-item">
                                <Link to={`/${role !== undefined && role}/saved-report`}>
                                    Saved report
                                </Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/${role !== undefined && role}/create-report`}>
                                    Create report
                                </Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/${role !== undefined && role}/search`}>
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        id="help"
                        className="nav-menu-item dropdown"
                        style={{ color: "white", cursor: "pointer" }}
                    >
                        <div className="dropdown-header" onClick={(e) => showSubNav(e)}>
                            Help <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <ul id="help-dropdown" className="sub-dropdown hidden">
                            <li className="dropdown-item">
                                <Link to={`/${role}/faq`}>FAQ</Link>
                            </li>
                            <li className="dropdown-item">
                                <Link to={`/${role}/contact-us`}>Contact us</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-menu-item dropdown-header">
                        <Link to={`/${role}/privacy-policy`} className="dropdown-header">Privacy</Link>
                    </li>
                    <li className="nav-menu-item dropdown-header">
                        <Link to={`/${role}/terms-of-use`} className="dropdown-header">Terms of Use</Link>
                    </li>
                    <li
                        id="user-profile-menu-item"
                        className="nav-menu-item text-white font-bold dropdown"
                        style={{ cursor: "pointer" }}
                    >
                        <div id="user-profile-header" className="dropdown-header flex justify-center" onClick={(e) => showSubNav(e)}>
                            Profile
                            <i className='fa fa-caret-down' aria-hidden='true'></i>
                            {/* <img
                                src={profileLady}
                                id="profile-photo"
                                alt=""
                                className="rounded-lg"
                            />{" "}  */}
                        </div>

                        <ul id="profile-dropdown" className="sub-dropdown hidden">
                            <div id="profile" className="menu-nav-container">
                                <li className="dropdown-item"><Link to={`/${role}/dashboard`}>Dashboard</Link></li>
                                <li className="dropdown-item">
                                    <Link to={`/${role}/dashboard`}>
                                        Dashboard
                                    </Link>
                                </li>
                            </div>
                            <div id="account" className="menu-nav-container">
                                <li className="dropdown-item">
                                    <Link to="/account-settings">Account Settings</Link>
                                </li>
                                <li className="dropdown-item">
                                    <span onClick={() => handleSignOut()}>Sign out</span>
                                </li>
                            </div>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
      );
    }

    return null;
  };

  const AdminDashboardNav = () => {
    if (role === "Admin") {
      return (
        <nav id="orderbook-nav">
            <div id="orderbook-logo" className="">
                <Link to="/">
                    <span>Orderbook Online</span>
                </Link>
            </div>

            <div id="nav-menu">
                <ul id="nav-menu-list" className="" ref={navMenuRef}>
                    <li
                    id="deals"
                    className="nav-menu-item dropdown"
                    style={{ color: "white", cursor: "pointer" }}
                    >
                    <div>
                        Deals <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                    <div id="deals-dropdown" className="shadow-md rounded">
                        <Link to={`/current-deals`}>Current deals</Link>
                        <Link to={`/archived-deals`}>Archived deals</Link>
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
                        Analysis <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                    <div id="analysis-dropdown" className="shadow-md rounded">
                        <Link to={`/${role !== undefined && role}/saved-report`}>
                        Saved report
                        </Link>
                        <Link to={`/${role !== undefined && role}/create-report`}>
                        Create report
                        </Link>
                        <Link to={`/${role !== undefined && role}/search`}>Search</Link>
                    </div>
                    </li>
                    <li
                    id="admin"
                    className="nav-menu-item dropdown"
                    style={{ color: "white", cursor: "pointer" }}
                    >
                    <div>
                        Admin <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                    <div id="admin-dropdown" className="shadow-md rounded">
                        <Link to={`/${role}/companies`}>Companies</Link>
                        <Link to={`/${role}/currencies`}>Currencies</Link>
                        <Link to={`/${role}/deal-and-tranche`}>Deal/Tranche</Link>
                        <Link to={`/${role}/profile-settings`}>Personal Settings</Link>
                    </div>
                    </li>
                    <li
                    id="help"
                    className="nav-menu-item dropdown"
                    style={{ color: "white", cursor: "pointer" }}
                    >
                    <div>
                        Help <i className="fa fa-caret-down" aria-hidden="true"></i>
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
                        {/* <i className='fa fa-caret-down text-white' aria-hidden='true'></i> */}
                        <div
                            id="profile-menu-nav"
                            className="bg-white shadow-md rounded"
                        >
                            <div id="profile" className="menu-nav-container">
                            <Link to={`/${role}/dashboard`}>Dashboard</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to={`/${role}/new-loan`}>Create loan offer</Link>
                            </div>
                            <hr className="hidden md:block" />
                            <div id="account" className="menu-nav-container">
                            <Link to="/user/client/account-settings">
                                Account Settings
                            </Link>
                            <span onClick={() => handleSignOut()}>Sign out</span>
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
            </div>
        </nav>
      );
    }

    return null;
  };

  return (
    <div id="dashboard-nav">
        <ClientDashboardNav />
        <BrokerDashboardNav />
        <InvestorDashboardNav />
        <AdminDashboardNav />
    </div>
  );
}
