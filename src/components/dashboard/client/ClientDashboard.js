import React, { useEffect, useState, useCallback, memo } from "react";
import { Link, Navigate } from "react-router-dom";
import { getOffersAction } from "../../../redux/loanSlice";
import { useDispatch, useSelector } from "react-redux";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

import setBgImage from "../../../utils/setBgImage";
import headerBanner from "../../../assets/images/headerBanner.png";
import offerImage from "../../../assets/images/offerImage.png";
import createList from "../../../assets/images/createList.png";
import createOffer from "../../../assets/images/createOffer.png";
import offersIcon from "../../../assets/images/offersIcon.png";
import allLoans from "../../../assets/images/allLoans.png";
import approvedLoans from "../../../assets/images/approvedLoans.png";
import declineLoans from "../../../assets/images/declineLoans.png";

const OffersComp = memo(({ offers, handleChange, offerStatus }) => {
  // Keep track of offers based on status
  const publishedOfferIndex = [];
  const draftedOfferIndex = [];

  if (offers === null) {
    return (
      <>
        <div className="text-gray-300 text-center h-50 flex items-center justify-center" style={{height: 450}}>
          <i className="fa fa-spinner fa-pulse fa-1x fa-fw" style={{fontSize: 50}}></i>
        </div>
      </>
    );
  }

  if (offers.length === 0) {
    return (
      <>
        <p className="text-gray-300 text-center text-3xl">You have no offers</p>
      </>
    );
  }

  if (offers.length > 0) {
    return (
      <>
        <div
          id="offer-header"
          className="flex flex-col md:flex-row justify-between pb-10"
        >
          <h3 className="font-bold mb-10 md:mb-0">My offers</h3>
          <div id="sort-by">
            <label htmlFor="sort-offer" className="font-bold">
              Sort by:
            </label>{" "}
            <select
              name="sort-offer"
              id="sort-offer"
              className="font-bold p-2"
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="open">Published</option>
              <option value="coming soon">Draft</option>
            </select>
          </div>
        </div>
        <div id="the-offers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center place-content-center gap-10">
            {offers.map((offer, index) => {
              if (offerStatus === "all") {
                return (
                  <div className="offer" id="offer-1" key={offer.id}>
                    <div className="offer-title">
                      <img className="offer-image" src={offerImage} alt="" />
                      <h3 className="title">{offer.deal_name}</h3>
                    </div>
                    <p className="offer-description">{offer.deal_name}</p>
                    <div className="offer-button">
                       {offer["availability"] === "open" && (
                           <Button
                           title="View offer"
                           link={`/client/offers/offer/${offer["id"]}/${offer[
                             "deal_type"
                           ].toLowerCase()}`}
                           type="button"
                           buttonClass="p-2 bg-white"
                           style={{ width: "100%" }}
                         />
                       )}

                        {offer["availability"] === "coming soon" && (
                            <>
                                <Button
                                title="Edit draft"
                                link={`/client/offers/offer/edit/${offer.id}/${offer[
                                    "deal_type"
                                ].toLowerCase()}`}
                                type="button"
                                buttonClass="p-2 bg-grey"
                                />
                                <Button
                                title="Publish"
                                link={`/client/offers/offer/publish/${
                                    offer.id
                                }/${offer["deal_type"].toLowerCase()}`}
                                type="button"
                                buttonClass="p-2 bg-white"
                                />
                            </>
                        )}
                    </div>

                  </div>
                );
              }

              if (offerStatus === "open" && offer["availability"] === "open") {
                publishedOfferIndex.push(index);

                if (publishedOfferIndex.length < 10) {
                  return (
                    <div className="offer" id="offer-1" key={offer.id}>
                      <div className="offer-title">
                        <img className="offer-image" src={offerImage} alt="" />
                        <h3 className="title">{offer.deal_name}</h3>
                      </div>
                      <p className="offer-description">{offer.deal_name}</p>
                      <div className="offer-button">
                        <Button
                          title="View offer"
                          link={`/client/offers/offer/${offer["id"]}/${offer[
                            "deal_type"
                          ].toLowerCase()}`}
                          type="button"
                          buttonClass="p-2 bg-white"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  );
                }
              }

              if (
                offerStatus === "coming soon" &&
                offer["availability"] === "coming soon"
              ) {
                draftedOfferIndex.push(index);

                if (draftedOfferIndex.length < 10) {
                  return (
                    <div className="offer" id="offer-1" key={offer.id}>
                      <div className="offer-title">
                        <img className="offer-image" src={offerImage} alt="" />
                        <h3 className="title">{offer.deal_name}</h3>
                      </div>
                      <p className="offer-description">{offer.deal_name}</p>
                      <div className="offer-button">
                        <Button
                          title="Edit draft"
                          link={`/client/offers/offer/edit/${offer.id}/${offer[
                            "deal_type"
                          ].toLowerCase()}`}
                          type="button"
                          buttonClass="p-2 bg-grey"
                        />
                        <Button
                          title="Publish"
                          link={`/client/offers/offer/publish/${
                            offer.id
                          }/${offer["deal_type"].toLowerCase()}`}
                          type="button"
                          buttonClass="p-2 bg-white"
                        />
                      </div>
                    </div>
                  );
                }
              }

              return null;
            })}
          </div>

          <div id="view-more" className="text-right">
            <Link to="/client/offers" className="text-white text-lg font-bold">
              View more
            </Link>{" "}
            <i
              className="fa fa-long-arrow-right text-white"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </>
    );
  }
})

export default function ClientDashboard() {
  const pageName = "Dashboard";

  const dispatch = useDispatch();
  const currentUserObj = useSelector((state) => state.auth);
  const authUser = currentUserObj.user;
  const authToken = authUser.tokens;
  const offers = useSelector((state) => state.loan.offers);
  const { user: currentUser } = authUser;
  const [offerStatus, setOfferStatus] = useState("all");

  useEffect(
    function getAllOffers() {
      if (authToken.access !== null && authToken.access !== undefined) {
        dispatch(getOffersAction());
      }

      // Scroll windows to the top
      window.scroll(0, 0);
    },
    [dispatch, authToken.access]
  );

  const handleOfferStatusChange = useCallback((e) => {
    const value = e.target.value === "" ? null : e.target.value;
    // Update offer status
    setOfferStatus(value);
  },[])

  if (!currentUser) {
    return <Navigate replace to="login" />;
  }

  return (
    <>
      <DocumentHead title={pageName} />
      <OrderbookLayout PageNav={NavMenu}>
        <section id="dashboard-intro-container">
          <div
            id="dashboard-dropdown"
            className="bg-white px-16 py-10 shadow-md flex justify-start"
          >
            <div id="loan" className="dropdown-container">
              <div>
                Offers{" "}
                <i className="fa fa-caret-down mr-5" aria-hidden="true"></i>
              </div>
              <div id="loan-dropdown" className="shadow-md rounded bg-white">
                <Link to="#">All offers</Link>
                <Link to="#">Publised offers</Link>
                <Link to="#">Drafts</Link>
              </div>
            </div>
            {/* <div id="investor" className="dropdown-container">
                            Investor <i className="fa fa-caret-down" aria-hidden="true"></i>
                            <div id="investor-dropdown"></div>
                        </div> */}
          </div>
          <div id="orderbook-dashboard-intro" style={setBgImage(headerBanner)}>
            <h1>Hello, {currentUser.first_name}</h1>
            <h3>Welcome to your dashboard</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation
            </p>
            <Button
              title="Update my profile"
              link="/profile"
              buttonClass="update-profile-cta"
            />
          </div>
          <div
            id="client-user-quick-action"
            className="flex flex-col sm:flex-row justify-around items-stretch sm:items-center h-20"
          >
            <div className="actions action-1 border-r border-black">
              <Link to="/client/new-loan">
                <h2 className="font-bold">
                  <div className="action-icon-container">
                    <img src={createOffer} alt="" />
                  </div>
                  Create new offer
                </h2>
              </Link>
            </div>
            <div className="actions action-2 border-r border-black">
              <Link to="/client/dashboard">
                <h2 className="font-bold">
                  <div className="action-icon-container">
                    <img src={createList} alt="" />
                  </div>
                  Create new list
                </h2>
              </Link>
            </div>
            <div className="actions action-3">
              <Link to="/client/offers">
                <h2 className="font-bold">
                  <div className="action-icon-container">
                    {/**find offersIcon image */}
                    <img src={offersIcon} alt="" />
                  </div>
                  My offers
                </h2>
              </Link>
            </div>
          </div>
          <div
            id="account-overview"
            className="flex justify-around flex-col md:flex-row"
          >
            <div
              id="overview-title"
              className="flex justify-center items-center px-5 pt-5 md:p-2"
            >
              <h3>Account Overview</h3>
            </div>
            <div
              id="account"
              className="flex flex-col sm:flex-row justify-around items-stretch sm:items-center sm:w-full"
            >
              <div id="all-loan" className="loan-count">
                <Link to="#">
                  <div className="account-icon-container">
                    <img src={allLoans} alt="" />
                  </div>
                  <p>
                    10 <br />
                    All loans
                  </p>
                </Link>
              </div>
              <div id="approved-loan" className="loan-count">
                <Link to="#">
                  <div className="account-icon-container">
                    <img src={approvedLoans} alt="" />
                  </div>
                  <p>
                    5 <br />
                    Approved loans
                  </p>
                </Link>
              </div>
              <div id="declined-loan" className="loan-count">
                <Link to="#">
                  <div className="account-icon-container">
                    <img src={declineLoans} alt="" />
                  </div>
                  <p>
                    10 <br />
                    Declined
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div id="offers" className="bg-black p-14">
            <OffersComp
              offers={offers}
              handleChange={handleOfferStatusChange}
              offerStatus={offerStatus}
            />
          </div>
        </section>
      </OrderbookLayout>
    </>
  );
}
