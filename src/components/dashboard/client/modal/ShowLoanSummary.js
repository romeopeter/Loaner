import React from "react";

import Button from "../../../Button";

export default function ShowLoanSummary({
	formState,
	handleSubmit,
	userFullName,
	isLoading,
	modal
}) {

	const {showModal, setShowModal} = modal;

	const hideModal = () => {
		if (showModal) setShowModal(false);
	}

	return (
		<div id="loan-summary-modal" className="px-5">
			<div id="loan-summary" className="modal-content bg-white">
				<div id="summary-table" className="mt-20 mx-10">
					<span
						class="md:hidden modal-close"
						onClick={hideModal}
					>
						&times;
					</span>
					<h2 className="text-md text-center sm:text-left sm:text-2xl font-bold mb-5">
						Loan Offer Summary
					</h2>
					<table className="table-fixed w-full h-auto">
						<thead>
							<tr>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<small>Name</small>
									<span>{userFullName && userFullName}</span>
								</td>
							</tr>
							<tr>
								<td>
									<small>Type of offer</small>
									<span>
										{formState.dealType !== "" &&
											formState.dealType === "CP" &&
											"Commercial paper"}
										{formState.dealType !== "" &&
											formState.dealType === "BOND" &&
											"Bond"}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<small>Loan amount</small>
									<span>
										{formState.trancheSize.currency}{" "}
										{formState.trancheSize
											.minSubscription !== "" &&
											formState.trancheSize
												.minSubscription}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<small>Tranche</small>
									<span>
										{formState.trancheName !== "" &&
											formState.trancheName}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<small>Tenor</small>
									<span>180 days</span>
								</td>
							</tr>
							<tr>
								<td>
									<small>Size</small>
									<span>
										{formState.trancheSize
											.minSubscription !== "" &&
											formState.trancheSize
												.minSubscription}
									</span>
								</td>
							</tr>
							<tr id="summary-dates-row">
								<td className="border-r border-black">
									<small>Offer opens</small>
									<span>
										{formState.timing.offerStart !== "" &&
											formState.timing.offerStart}
									</span>
								</td>
								<td className="border-r border-black">
									<small>Offer closes</small>
									<span>
										{formState.timing.offerEnd !== "" &&
											formState.timing.offerEnd}
									</span>
								</td>
								<td>
									<small>Settlement date</small>
									<span>
										{formState.timing.settlementDate !==
											"" &&
											formState.timing.settlementDate}
									</span>
								</td>
							</tr>
						</tbody>
					</table>

					<div id="loan-summary-buttons" className="my-10">
						<div className="grid grid-cols-2 gap-3 mt-5 mb-5">
							<Button
								type="button"
								title="Save as draft"
								buttonClass="col-span-2 bg-gray-400 rounded"
							/>
						</div>
						<Button
							type="submit"
							buttonClass="w-full bg-green-600 rounded"
							handleClick={() => handleSubmit()}
						>
							Create loan{" "}
							{isLoading ? (
								<i
									className="fa fa-spinner fa-pulse fa-3x fa-fw"
									style={{ fontSize: 20 }}
								></i>
							) : null}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}