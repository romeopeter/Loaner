import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";

import { getBidAction } from "../../../redux/bidSlice";
import { getInvestorAllOffersAction } from "../../../redux/investorSlice";
import { uploadPaymentAction } from "../../../redux/paymentSlice";
import { Danger } from "../../alert";

import offerImage from "../../../assets/images/offerImage.png";
import accepted from "./icons/accepted.png";

export default function BidApproved() {
  const pageName = "Bid Approved";

  const currentUserObj = useSelector((state) => state.auth.user);
  const allBidsStatus = useSelector((state) => state.bid.allBidsStatus);
  const urlParams = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: investorId } = currentUserObj.user["investor_details"];
  const [offer, setOffer] = useState(null);
  const [bid, setBid] = useState(null);
  const [fileState, setFileState] = useState({
    fileName: null,
    fileSize: null,
    fileURL: null,
    fileIsUploading: false,
    fileIsUploaded: false,
    formatIsWrong: false,
    formatErrorMessage: "File format is wrong. Expected is JPEG or PNG.",
  });

  useEffect(
    function investorOffers() {
      let componentIsMounted = true;

      (async function () {
        const req = await dispatch(getInvestorAllOffersAction(investorId));

        if (req.meta.requestStatus === "fulfilled") {
          // Match offer id with url id parameter
          const approvedOffer = req.payload.find(
            (offer) => offer.id === Number(urlParams.offerId)
          );

          // Update component state
          if (componentIsMounted) setOffer(approvedOffer);
        }
      })();

      return () => (componentIsMounted = false);
    },
    [investorId, urlParams.offerId, dispatch]
  );

  useEffect(
    function getBid() {
      let componentIsMounted = true;
      if (allBidsStatus !== null) {
        const offerId = urlParams.offerId;

        allBidsStatus.forEach((bid) => {
          if (bid !== undefined && bid.length > 0) {
            const offerBid = bid[0];

            if (componentIsMounted) {
              const bidMatchedOffer =
                offerBid["loan_request"]["id"] === Number(offerId);
              if (bidMatchedOffer) setBid(offerBid);

              console.log(bid);
            }
          }
        });
      } else {
        (async function () {
          const req = await dispatch(getBidAction(urlParams.offerId));

          if (req.meta.requestStatus === "fulfilled") {
            const offerBid = req.payload[0];

            if (componentIsMounted) setBid(offerBid);
          }
        })();
      }

      return () => (componentIsMounted = false);
    },
    [dispatch, urlParams.offerId, allBidsStatus]
  );

  const handleFileUpload = async (e) => {

    const popFile = e.target.files["0"];

    const updateFileState = (updatedState) => {
      setFileState((states) => ({ ...states, ...updatedState }));
    };

    if (popFile !== undefined) {
      const popFileName = popFile.name;
      const popfileSize = popFile.size;

      const popFileFormat = popFileName.split(".")[1];

      if (
        popFileFormat !== "jpg" &&
        popFileFormat !== "pdf" &&
        popFileFormat !== "jpeg"
      ) {
        updateFileState({ formatIsWrong: true });
      } else {
        const popFileUrl = URL.createObjectURL(popFile);
        const bidAmount = bid !== null && bid["amount"];
        // const bidStatus = bid !== null && bid["current_status"];
        const bidId = bid !== null && bid.id;

        updateFileState({
          fileName: popFileName,
          fileSize: popfileSize,
          fileURL: popFileUrl,
          formatIsWrong: false,
          fileIsUploaded: true,
        });

        // Send data
        const reqData = {
          pop_file_name: popFileName,
          pop_file_url: popFileUrl.split("blob:")[1],
          amount: bidAmount,
          // status: bidStatus,
          bid: bidId,
        };

        const req = await dispatch(uploadPaymentAction(reqData));
        const reqFulfilled = req.meta.requestStatus;
        const paymentStatus = req.payload.payment.status;

        if (reqFulfilled === "fulfilled" && paymentStatus !== null) {
          URL.revokeObjectURL(popFile);

          // Redirect to BAPaymentProof component
          navigate(`/investor/dashboard/${urlParams.offerId}/payment-proof`);
        }
      }
    }
  };

  if (bid !== null && bid.payment.status !== null) {
    // Redirect to BAPaymentProof component
    navigate(`/investor/dashboard/${urlParams.offerId}/payment-proof`);
  }

  if (offer !== null) {
    return (
      <>
        <DocumentHead title={pageName} />
        <OrderbookLayout PageNav={NavMenu}>
          <section id="orderbook-bid-approved" className="bg-gray-800 sm:p-20">
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
                <div id="bid" className="mb-5">
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
                    {offer.deal_name}.
                  </h3>

                  <div id="upload-area block">
                    <p
                      id="offer-description"
                      className="text-green-700 pb-5 font-bold"
                    >
                      Your bid with {offer.deal_name} has been approved, click
                      below to upload your payment proof.
                    </p>
                    <div className="flex flex-col justify-center items-center">
                      <label
                        htmlFor="upload-payment"
                        id="upload-label"
                        className="font-bold py-2 px-10 bg-gray-300 cursor-pointer text-center"
                      >
                        <input
                          type="file"
                          id="upload-payment"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e)}
                        />
                        Select file to upload
                      </label>
                      <small className="text-center text-blue-500 p-2">
                        File should be either jpeg or pdf.
                      </small>
                      {fileState.formatIsWrong ? (
                        <Danger message={fileState.formatErrorMessage} />
                      ) : null}
                    </div>
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
    <div className="flex items-center justify-center" style={{height: "100vh"}}>
      <p className="text-center text-gray-400 font-medium text-3xl">
        Loading... {" "}
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </p>
    </div>
  );
}
