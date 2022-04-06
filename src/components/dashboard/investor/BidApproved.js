import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Link, useParams } from "react-router-dom";
import Button from "../../Button";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";
import {getAllOffersStatusAction, getBidAction} from "../../../redux/bidSlice";
import { getInvestorAllOffersAction } from "../../../redux/investorSlice";
import { uploadPaymentAction } from "../../../redux/paymentSlice";
import { Danger } from "../../alert";


import offerImage from "../../../assets/images/offerImage.png";
import accepted from "./icons/accepted.png";


export default function BidApproved() {
	const pageName = "Bid Approved";

	const currentUserObj = useSelector((state) => state.auth.user);
	const allOffers = useSelector(state => state.investor.allOffers);
	const allBidsStatus = useSelector(state => state.bid.allBidsStatus);
	const popFileDetails = JSON.parse(localStorage.getItem("INVESTOR_BID_POP_FILE"));
	const urlParams = useParams();
	const dispatch = useDispatch();
	const {id: investorId} = currentUserObj.user["investor_details"];

	const [offer, setOffer] = useState(null);
	const [bid, setBid] = useState(null);
	const [fileState, setFileState] = useState({
		fileName: null,
		fileSize: null,
		fileURL: null,
		fileIsUploading: false,
		fileIsUploaded: false,
		formatIsWrong: false,
		formatErrorMessage: "File format is wrong. Expected is JPEG or PNG."
	})

	useEffect(() => {
		if (allOffers === null) {
			(async function() {
				const req = await dispatch(
					getInvestorAllOffersAction(investorId)
				);

				if (req.meta.requestStatus === "fulfilled") {
					// Find loan offer with the same id as url parameter id
					const approvedOffer = req.payload.find(
						(offer) => offer.id === Number(urlParams.offerId)
					);

					// Update coponent state
					setOffer(approvedOffer);
				}
			})();
		} else {
			const approvedOffer = allOffers.find(offer => offer.id === Number(urlParams.offerId));

			if (approvedOffer !== undefined) setOffer(approvedOffer);
		}
	}, [allOffers,investorId,urlParams.offerId,dispatch])

	useEffect(function getBid() {
		let isSubscribed = true;
		if (allBidsStatus !== null) {

			const offerId = urlParams.offerId;

			allBidsStatus.forEach(bid => {

				if (bid !== undefined && bid.length > 0) {
					const offerBid = bid[0];
					const bidMatchedOffer = offerBid["loan_request"]["id"] === Number(offerId);

					if (bidMatchedOffer) setBid(offerBid);
				}
			})
		} else {
			(async function() {
				const req = await dispatch(getBidAction(urlParams.offerId));

				if (req.meta.requestStatus === "fulfilled") {

					const offerBid = req.payload[0];

					if(isSubscribed) setBid(offerBid);
				}
			})()
		}

		return () => isSubscribed = false;

	},[dispatch, urlParams.offerId]);

	const handleFileUpload = async (e) => {
		const popFile = e.target.files["0"];

		const updateFileState = (updatedState) => {
			setFileState(states => ({...states, ...updatedState}));
		}

		if (popFile !== undefined) {

			const popFileName = popFile.name;
			const popfileSize = popFile.size;

			const popFileFormat = popFileName.split(".")[1];

			if (popFileFormat !== "jpg" && popFileFormat !== "pdf" && popFileFormat !== "jpeg") {
				updateFileState({formatIsWrong: true})
			} else {
				
				const popFileUrl = URL.createObjectURL(popFile);
				// const bidAmount = offer["tranche_id"]["size"]["minimum_subscription"]["amount"];
				const bidAmount = bid !== null && bid["amount"];
				const bidStatus = bid !== null && bid["current_status"];
				const bidId = bid !== null && bid.id;

				updateFileState({
					fileName: popFileName,
					fileSize: popfileSize,
					fileURL: popFileUrl,
					formatIsWrong: false, 
					fileIsUploaded: true
				});

				// Send data
				const reqData = {
					pop_file_name: popFileName,
					pop_file_url: popFileUrl.split("blob:")[1],
					amount: bidAmount,
					status: bidStatus,
					bid: bidId
				}

				const dataIsSent = await dispatch(uploadPaymentAction(reqData));

				if (dataIsSent.meta.requestStatus === "fulfilled") {
					URL.revokeObjectURL(popFile)

					// Save files details to browser
					const popFileIsStored = localStorage.setItem(
						"INVESTOR_BID_POP_FILE", 
						JSON.stringify({popFileName, popfileSize, popFileUrl})
					);

					// Refreshe page to show POP confirmation update
					if (popFileIsStored) window.location.reload();
				};
			}
		}
	}

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<section id="orderbook-bid-approved" className="bg-gray-800 sm:p-20">
					<h2 id="offer-title" className="text-white font-bold mb-10 text-2xl pt-5 pl-5 sm:pt-0 sm:pl-0 sm:text-3xl">{offer !== null && offer.deal_name}</h2>
					<div className="bg-white" id="bid-container">
						<div id="go-back-arrow" className="bg-gray-300 mb-5">
							<Link to="/investor/dashboard" className="flex justify-center items-center">
								<i className="fa fa-long-arrow-left" aria-hidden="true"></i>
							</Link>
						</div>
						<div id="inner-bid-container" className="flex flex-col justify-center items-center p-5 sm:p-0">
							{offer === null ? (<p>Loading...</p>):(
								<>
									<div id="bid" className="mb-5">
										<div id="img-container">
											<img src={offerImage} alt="" className="w-full"/>
											<div className="overlay">
												<div id="tick-icon" className="bg-white h-20 w-20 rounded-full flex justify-center items-center">
													<img src={accepted} alt="accepted-tick-marked" />
												</div>
											</div>
										</div>
										<h3 className="text-2xl underline text-center py-5 font-bold">{offer.deal_name}.</h3>

										<div id="upload-area" className={bid !== null && bid["payment_status"] === null ? "block": "hidden"}>
											<p id="offer-description" className="text-green-700 pb-5 font-bold">
											Your bid with {offer.deal_name} has been approved, 
											click below to upload your payment proof.
											</p>
											<div className="flex flex-col justify-center items-center">
												<label htmlFor="upload-payment" id="upload-label" className="font-bold py-2 px-10 bg-gray-300 cursor-pointer text-center">
													<input type="file" id="upload-payment" className="hidden" onChange={(e) => handleFileUpload(e)} />
													Select file to upload
												</label>
												<small className="text-center text-blue-500 p-2">File should be either jpeg or pdf</small>
												{fileState.formatIsWrong ? (<Danger message={fileState.formatErrorMessage} />): null}
											</div>
										</div>
										{(bid !== null && bid["payment_status"] !== null) ? (
											<div id="upload-success">
												<p className="text-center text-green-700 mb-5">Your file has been successfully uploaded.</p>

												{/*Show uploaded file*/}
												<div id="show-pop-file" className="my-10">
													<ul>
														<li className="border-t-2 pt-2 mb-5">
															<div className="flex justify-evenly">
																<strong className="font-bold text-gray-700">Deal Name</strong>
																<strong className="font-bold text-gray-700">File Name</strong>
																<strong className="font-bold text-gray-700">Payment Status</strong>
															</div>
														</li>
														<li className="border-b-2 pb-2">
															<div className="flex justify-evenly">
																<span className="text-left text-gray-400">{offer !== null && offer["deal_name"]}</span>
																<span className="text-left text-gray-400" style={{textOverflowX: "auto"}}>{popFileDetails !== null && popFileDetails.popFileName}</span>
																<>
																	{bid["payment_status"] === "rejected" && (
																		<Button 
																			title="Not approved" 
																			buttonClass="bg-red-400 rounded-md text-center payment-not-approved" 
																			buttonDisabled={true}
																		/>
																	)}
																	
																	{bid["payment_status"] === "approved" && (
																		<Button 
																			title="Approved" 
																			link={`/investor/dashboard/offers/${urlParams.offerId}/payment-detail`} buttonClass="bg-green-400 text-center rounded-md payment-approved"
																		/>
																	)}

																	{bid["payment_status"] === "pending" && (
																		<Button 
																			title="Pending" 
																			buttonClass="bg-yellow-400 text-center rounded-md payment-pending"
																		/>
																	)}
																</>
															</div>
														</li>
													</ul>
												</div>

												<div className="flex flex-col sm:flex-row justify-evenly items-center">
													{/*White background, black borders*/}
													<Button title="View offers" link="/investor/dashboard/offers" buttonClass="view-offers font-bold rounded sm:mb-0 mb-5" />

													{/*Green background, white text*/}
													<Button title="Go home" link="/investor/dashboard" buttonClass="go-home w-full font-bold rounded" />
												</div>
											</div>
										):null}
									</div>
								</>
							)}	
						</div>
					</div>
				</section>
			</OrderbookLayout>
		</>
	)
}