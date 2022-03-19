import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Link, useParams } from "react-router-dom";
import Button from "../../Button";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";
import {getAllOffersStatusAction} from "../../../redux/bidSlice";
import { getInvestorAllOffersAction } from "../../../redux/investorSlice";
import { Danger } from "../../alert";


import offerImage from "../../../assets/images/offerImage.png";
import accepted from "./icons/accepted.png";


export default function BidApproved() {
	const pageName = "Bid Approved";

	const currentUserObj = useSelector((state) => state.auth.user);
	const allOffers = useSelector(state => state.investor.allOffers);
	const allBidsStatus = useSelector(state => state.bid.allBidsStatus);
	const urlParams = useParams();
	const dispatch = useDispatch()
	const {id: investorId} = currentUserObj.user["investor_details"];

	const [offer, setOffer] = useState(null);
	const [bid, setBid] = useState(null);
	const [fileState, setFileState] = useState({
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
	}, [allOffers])

	useEffect(function getBid() {
		if (allOffers !== null && allBidsStatus !== null) {

			allOffers.forEach((_, offerIndex) => {
				const bids = allBidsStatus[offerIndex][0]

				if (bids !== undefined && bids["owner"]["id"] === investorId) {
				}
			});
		}
	});

	const handleFileUpload = (e) => {
		const popFile = e.target.files["0"];

		const updateFileState = (updatedState) => {
			setFileState(states => ({...states, ...updatedState}));
		}

		if (popFile !== undefined) {

			const popFileName = popFile.name;
			const popfileSize = popFile.size;

			const popFileFormat = popFileName.split(".")[1];

			if (popFileFormat !== "jpg" && popFileFormat !== "pdf") {
				updateFileState({formatIsWrong: true})
			} else {
				// updateFileState({formatIsWrong: false, fileIsUploaded: true});
				const popFileUrl = URL.createObjectURL(popFile)
				const amount = offer["tranche_id"]["size"]["minimum_subscription"]["amount"];

				// Send data
				const reqData = {
					pop_file_name: popFileName,
					pop_fifle_url: popFileUrl,
					amount: amount,
					status: "",
					bid: 0
				}

				console.log(reqData);
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

										<div id="upload-area" className={!fileState.fileIsUploaded ? "block": "hidden"}>
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
										<div id="upload-success" className={fileState.fileIsUploaded ? "block": "hidden"}>
											<p className="text-center text-green-700 mb-5">Your file has been successfully uploaded.</p>

											<div className="flex flex-col sm:flex-row justify-evenly items-center">
												{/*White background, black borders*/}
												<Button title="View offers" link="/investor/dashboard/offers" buttonClass="view-offers font-bold rounded sm:mb-0 mb-5" />

												{/*Green background, white text*/}
												<Button title="Go home" link="/investor/dashboard" buttonClass="go-home w-full font-bold rounded" />
											</div>
										</div>
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