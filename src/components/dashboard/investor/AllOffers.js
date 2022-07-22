import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";

import { getInvestorAllOffersAction } from "../../../redux/investorSlice";

import ShowAllIncomingOffers from "./ShowAllIncomingOffers";
import ShowAllOpenedOffers from "./ShowAllOpenedOffers";

export default function InvestorDashboard() {
  const pageName = "Investor";

  const dispatch = useDispatch();
  const allOffers = useSelector((state) => state.investor.allOffers);
  const currentUserObj = useSelector((state) => state.auth.user);

  const { user: currentUser } = currentUserObj;
  const { id: investorId } = currentUser["investor_details"];

  const [openOffers, setOpenOffers] = useState([]);
  const [incomingOffers, setIncomingOffers] = useState([]);
  const [offerStatus, setOfferStatus] = useState("open");

  useEffect(() => {
	let componentIsMounted = true;

    if (allOffers !== null && allOffers !== false) {
      allOffers.forEach((offer) => {
        if (offer.availability === "open") {
          // setOfferStatus("open");
          if (componentIsMounted) setOpenOffers(prevState => [...prevState, offer]);
        }

        if (offer.availability === "coming soon") {
          // setOfferStatus("coming soon");
          if (componentIsMounted) setIncomingOffers(prevState => [...prevState, offer]);
        }
      });
    } else {

      (async function () {
        const req = await dispatch(getInvestorAllOffersAction(investorId));

        if (req.meta.requestStatus === "fulfilled") {
          req.payload.forEach((offer) => {
            if (offer.availability === "open") {
              if (componentIsMounted) setOpenOffers(prevState => [...prevState, offer]);
            }

            if (offer.availability === "coming soon") {
              if (componentIsMounted) setIncomingOffers(prevState => [...prevState, offer]);
            }
          });
        }
      })();
    }

	return () => componentIsMounted;
  }, [dispatch, investorId, allOffers]);

  return (
    <>
      <DocumentHead title={pageName} />
      <OrderbookLayout PageNav={NavMenu}>
        <div
          id="loan-invest-dropdown"
          class="bg-white px-16 py-10 shadow-md flex justify-start w-full"
        >
          <Link
            to="/investor/dashboard"
            id="offers"
            className="dropdown-container mr-5 underline"
          >
            Dashboard
          </Link>
          {/* <Link
            to="/investor/offers"
            id="home"
            className="dropdown-container mr-5 underline"
          >
            Offers
          </Link>
          <Link to="/" id="offers" className="dropdown-container">
            Payment
          </Link> */}
        </div>
        <section id="orderbook-investor-all-offers">
          <div id="offers">
            <div
              id="offer-tabs"
              className="flex flex-row justify-center sm:justify-start items-center h-20 px-5"
            >
              <h3
                className="header cursor-pointer text-md sm:text-2xl text-center sm:text-left w-full md:w-60 pt-2 mx-0"
                onClick={() => setOfferStatus("open")}
              >
                <span
                  className={
                    offerStatus === "open" ? "text-white" : "text-gray-400"
                  }
                >
                  Open offers
                </span>
              </h3>
              <h3
                className="header cursor-pointer text-md sm:text-2xl text-center sm:text-left w-full md:w-60 mx-0"
                onClick={() => setOfferStatus("coming soon")}
              >
                <span
                  className={
                    offerStatus === "coming soon"
                      ? "text-white"
                      : "text-gray-400"
                  }
                >
                  Incoming offers
                </span>
              </h3>
            </div>
            {offerStatus === "open" && (
              <ShowAllOpenedOffers openOffers={openOffers} />
            )}
            {offerStatus === "coming soon" && (
              <ShowAllIncomingOffers incomingOffers={incomingOffers} />
            )}
          </div>
        </section>
      </OrderbookLayout>
    </>
  );
}
