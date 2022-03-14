import React from "react";

export default function bidAccepted() {

	return (
		<div id="offer-modal" className="h-60 accept-modal">
			<div
				id="modal-content"
				className="flex flex-col justify-center items-center"
			>
				{/*<div
					className="accepted-icon bg-white border border-black rounded-full flex justify-center items-center mb-2"
					style={{ width: "4rem", height: "4rem" }}
				>
					<img
						src={rejected}
						alt="rejected-icon-mark"
						style={{ width: "2rem", height: "2rem" }}
						className={!state.showIcon ? "hidden" : "block"}
					/>
				</div>*/}
				<h4 className="font-bold text-lg">Congratulations!</h4>
				<p className="py-5 text-center" style={{ paddingLeft: "10px" }}>
					Your bid has been placed
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