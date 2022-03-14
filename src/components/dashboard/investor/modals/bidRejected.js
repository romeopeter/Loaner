import React from "react";
import rejected from "../icons/rejected.png";

export default function bidRejected() {

	return (
		<div id="offer-modal" className="h-60 reject-modal">
			<div
				id="modal-content"
				className="flex flex-col justify-center items-center"
			>
				<div
					className={"rejected-icon  bg-white border border-black rounded-full flex justify-center items-center mb-2"}
					style={{ width: "4rem", height: "4rem" }}
				>
					<img
						src={rejected}
						alt="rejected-icon-mark"
						style={{ width: "2rem", height: "2rem" }}
						className={!state.showIcon ? "hidden" : "block"}
					/>
				</div>
				<h4 className="font-bold text-lg" style={{ color: "#ef4444" }}>
					Offer Rejected
				</h4>
				<p className="py-5 text-center" style={{ paddingLeft: "10px" }}>
					We hope you find better offers that suit you. Thank you for
					your time
				</p>
				<Button
					title="View offers"
					link="/investor/dashboard"
					buttonClass="bg-green-500 rounded"
				/>
			</div>
		</div>
	);
}