import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getBidAction } from "../../../redux/bidSlice";
import { getInvestorAllOffersAction } from "../../../redux/investorSlice";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";
import accepted from "./icons/accepted.png";

export default function BAProofPyament() {
  const pageName = "Payment proof";

  const dispatch = useDispatch();
  const params = useParams();
  const currentUserObj = useSelector((state) => state.auth.user);

  const [bid, setBid] = useState(null);
  const [offer, setOffer] = useState(null);
  const { id: investorId } = currentUserObj.user["investor_details"];

  useEffect(
    function getBid() {
      let componentIsMounted = true;

      (async function () {
        const req = await dispatch(getBidAction(params.offerId));

        if (req.meta.requestStatus === "fulfilled") {
          const offerBid = req.payload[0];

          if (componentIsMounted) setBid(offerBid);
        }
      })();

      return () => (componentIsMounted = false);
    },
    [dispatch, params.offerId]
  );

  useEffect(
    function investorOffers() {
      let componentIsMounted = true;

      (async function () {
        const req = await dispatch(getInvestorAllOffersAction(investorId));

        if (req.meta.requestStatus === "fulfilled") {
          // Match offer id with url id parameter
          const approvedOffer = req.payload.find(
            (offer) => offer.id === Number(params.offerId)
          );

          // Update component state
          if (componentIsMounted) setOffer(approvedOffer);
        }
      })();

      return () => (componentIsMounted = false);
    },
    [investorId, params.offerId, dispatch]
  );

  if (bid !== null) {
    // Proof of payment details
    const paymentStatus = bid["payment"]["status"];
    const proofOfPayment = bid["payment"]["proof_of_payment"][0];
    const popFileName = proofOfPayment["file_name"];

    return (
      <>
        <DocumentHead title={pageName} />
        <OrderbookLayout PageNav={NavMenu}>
          <section
            id="orderbook-bid-payment-proof"
            className="bg-gray-800 sm:p-20"
          >
            <h2
              id="offer-title"
              className="text-white font-bold mb-10 text-2xl pt-5 pl-5 sm:pt-0 sm:pl-0 sm:text-3xl"
            >
              {offer !== null && offer.deal_name}
            </h2>
            <div className="bg-white" id="bid-container">
              <div id="go-back-arrow" className="bg-gray-300 mb-5">
                <Link
                  to="/investor/dashboard"
                  className="flex justify-center items-center"
                >
                  <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                </Link>
              </div>
              <div
                id="inner-bid-container"
                className="flex flex-col justify-center items-center p-5 sm:p-0"
              >
                <div id="bid" className="m-5">
                  <div id="img-container">
                    <img src={offerImage} alt="" className="w-full" />
                    <div className="overlay">
                      <div
                        id="tick-icon"
                        className="bg-white h-20 w-20 rounded-full flex justify-center items-center"
                      >
                        <img src={accepted} alt="accepted-tick-marked" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl underline text-center py-5 font-bold">
                    {offer !== null && offer["deal_name"]}.
                  </h3>
                  <p
                    id="offer-description"
                    className="text-black text-center pb-5 font-bold"
                  >
                    Your file has been successfully uploaded
                  </p>

                  <div id="show-pop-file" className="my-10">
                    <ul>
                      <li className="border-t-2 pt-2 mb-5">
                        <div className="flex justify-evenly">
                          <strong className="font-bold text-gray-700">
                            Deal Name
                          </strong>
                          <strong className="font-bold text-gray-700">
                            File Name
                          </strong>
                          <strong className="font-bold text-gray-700">
                            Payment Status
                          </strong>
                        </div>
                      </li>
                      <li className="border-b-2 pb-2">
                        <div className="flex justify-evenly">
                          <span className="text-left text-gray-400">
                            {offer !== null && offer["deal_name"]}
                          </span>
                          <span
                            className="text-left text-gray-400"
                            style={{ textOverflowX: "auto" }}
                          >
                            {popFileName}
                          </span>
                          <>
                            {paymentStatus === "rejected" && (
                              <Button
                                title="Not approved"
                                buttonClass="bg-red-400 rounded text-center payment-not-approved"
                                buttonDisabled={true}
                              />
                            )}

                            {paymentStatus === "approved" && (
                              <Button
                                title="Approved"
                                link={`/investor/dashboard/offers/${params.offerId}/payment-detail`}
                                buttonClass="bg-green-400 text-center rounded payment-approved"
                              />
                            )}

                            {paymentStatus === "pending" && (
                              <Button
                                title="Pending"
                                buttonClass="bg-yellow-400 text-center rounded payment-pending"
                              />
                            )}
                          </>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div
                    id="action-btns"
                    className="flex flex-col sm:flex-row justify-evenly items-center"
                  >
                    <Button
                      title="View offer"
                      link={`/investor/dashboard/offers/${
                        offer !== null && offer["id"]
                      }/${offer !== null && offer["deal_type"].toLowerCase()}`}
                      buttonClass="view-offer sm:mb-0 mb-5 rounded"
                    />
                    <Button
                      title="Go home"
                      link="/investor/dashboard"
                      buttonClass="go-home w-full font-bold rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </OrderbookLayout>
      </>
    );
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "100vh" }}
    >
      <p className="text-center text-gray-400 font-medium text-3xl">
        Loading <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </p>
    </div>
  );
}
