import React, { createRef, useState } from "react";

import { Link } from "react-router-dom";

import { default as ReactSelect, components } from "react-select";

import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function PublishOffer() {
	const pageName = "Publish offer";

	const modalContainerRef = createRef();

	const categories = [
		{ id: 1, name: "Ethics" },
		{ id: 2, name: "Agriculture & Food" },
		{ id: 3, name: "Healthcare" },
		{ id: 4, name: "Beverages & Alchohol" },
		{ id: 5, name: "Agriculture & Food" },
		{ id: 6, name: "Beverages & Alchohol" },
		{ id: 7, name: "Ethics" },
		{ id: 8, name: "Healthcare" },
		{ id: 9, name: "Beverages & Alchohol" },
		{ id: 10, name: "Agriculture & Food" },
		{ id: 11, name: "Ethics" },
		{ id: 12, name: "Healthcare" },
	];

	const [investorCategory, setInvestorCategory] = useState([
		{id: 1, ethics: ["durward reynolds", "Kenton Towne", "therese wunsch"]},
		{id: 2, agricultureAndFood: ["tobi lekan", "john uche", "mary thomas"]},
		{id: 3, healthcare: ["john doe", "jane doe", "kenton towne", "tobi lekan"]},
		{id: 4, beverages: ["katelyn rohan", "aisha yussuf", "benedict kessler"]},
		{id: 5, BeveragesAndAlchohol: [
			"durward reynolds",
			"mary thomas",
			"aisha yussuf",
		]}
	]);

	const [categoriesTrigger, setCategoriesTrigger] = useState(5);

	const [favouriteList, setFavouriteList] = useState({
		categories: ["Agriculture & Food", "Ethics"],
		investors: [],
	});

	const selectAllInvestors = () => {};
	const selectInvestorsInCategory = () => {};

	const saveList = (e) => {
		const inputType = e.target.type;
		const value = e.target.value;
		const categories = favouriteList.categories;
		const investors = favouriteList.investors;

		if (inputType === "checkbox") {
			const isChecked = e.target.checked;

			if (isChecked) {
				categories.length > 0 &&
					categories.forEach((category, index) => {
						if (value === category) console.log(true);
						else console.log(false);
					});

				/*setFavouriteList(state => {
					
				});*/
			}
		}

		if (inputType === "select-multiple") {
			console.log(inputType);
		}
	};

	/*const = handleChange = (selected) => {
	    this.setState({
	      optionSelected: selected
	    });
	};*/

	const InvestorOptionsComponent = (props) => {
		return (
			<div>
				<components.Option {...props}>
					<input
						type="checkbox"
						checked={props.isSelected}
						onChange={() => null}
					/>{" "}
					<label>{props.label}</label>
				</components.Option>
			</div>
		);
	};

	const investorOptions = [
		{ value: "durward reynolds", label: "Durward Reynolds" },
		{ value: "kenton towne", label: "Kenton Towne" },
		{ value: "therese wunsch", label: "Therese Wunsch" },
		{ value: "benedict kessler", label: "Benedict Kessler" },
		{ value: "john doe", label: "John Doe" },
		{ value: "mary doe", label: "Mary Doe" },
		{ value: "tobi lekan", label: "Tobi Lekan" },
		{ value: "john uche", label: "John Uche" },
		{ value: "katelyn rohan", label: "Katelyn Rohan" },
		{ value: "aisha yussuf", label: "Aisha Yussuf" },
		{ value: "mary thomas", label: "Mary Thomas" },
		{ value: "edward paul", label: "Edward Paul" },
	];

	const handlePublish = () => {
		modalContainerRef.current.classList.add("accept-modal");
	};

	return (
		<>
			<DocumentHead title={pageName} />
			<OrderbookLayout PageNav={NavMenu}>
				<div
					id="loan-invest-dropdown"
					class="bg-white px-16 py-10 shadow-md flex justify-start"
				>
					<div id="loan" className="dropdown-container">
						Loans{" "}
						<i
							className="fa fa-caret-down mr-5"
							aria-hidden="true"
						></i>
						<div id="load-dropdown"></div>
					</div>
					<div id="investor" className="dropdown-container">
						Investor{" "}
						<i className="fa fa-caret-down" aria-hidden="true"></i>
						<div id="investor-dropdown"></div>
					</div>
				</div>
				<div id="orderbook-publish-offer">
					<div id="offer-publication">
						<div id="offer" className="mb-5">
							<h3 className="text-3xl font-bold text-white mb-5">
								Select investors
							</h3>
							<div
								id="the-offer"
								className="flex justify-center items-center p-5"
							>
								<div className="grid grid-cols-12 gap-4 w-full ">
									<div
										id="select-all-investors"
										className="checkboxes col-span-12 sm:col-span-3 border-r border-white sm:border-black"
									>
										<input
											type="checkbox"
											name="categoryCheckbox"
											className="mr-2 rounded"
										/>
										<label htmlFor="select-all-investors">
											Select all investors
										</label>
									</div>
									<div className="col-span-12 sm:col-span-9">
										<div id="select-category">
											<span
												id="cat-title"
												className="font-bold text-xl"
											>
												Select category:
											</span>
											<div
												id="categories"
												className="flex justify-start flex-wrap"
											>
												{categories.length > 0
													? categories.map(
															(
																category,
																index
															) => {
																if (
																	index + 1 <=
																	categoriesTrigger
																) {
																	return (
																		<div
																			key={
																				category.id
																			}
																			className="checkboxes category-checkbox"
																		>
																			<input
																				type="checkbox"
																				name="category-checkbox"
																				value={
																					category.name
																				}
																				className="mr-2 rounded"
																				onClick={(
																					e
																				) =>
																					saveList(
																						e
																					)
																				}
																			/>
																			<label htmlFor="category-checkbox">
																				{
																					category.name
																				}
																			</label>
																		</div>
																	);
																}
															}
													  )
													: null}
												{categoriesTrigger <= 5 ? (
													<Button
														title="view more"
														buttonClass="view-more font-bold"
														handleClick={() =>
															setCategoriesTrigger(
																categories.length
															)
														}
													/>
												) : null}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-2 sm:col-span-1">
								{/*<select
									name="select-investors"
									id="select-investors"
									className="mt-1 focus:ring-white block w-full sm:text-sm bg-white border-none p-5 mb-5 focus:outline-none form-field"
									// onClick={(e) => e.target.setAttribute("multiple", "")}
									multiple
									onChange={(e) => saveList(e)}
								>
									<option defaultValue="Select investors" style={{backgroundColor: "lightgrey"}}>
										Select category
									</option>
									{people.length > 0 ? people.map(person => (<option key={person.id} value={person.name}>{person.name}</option>)) : null}

								</select>*/}

								<ReactSelect
									options={investorOptions}
									isMulti
									closeMenuOnSelect={false}
									hideSelectedOptions={false}
									components={{
										InvestorOptionsComponent,
									}}
									onChange={(e) => console.log(e)}
									allowSelectAll={true}
									// value={this.state.optionSelected}
								/>
							</div>
						</div>

						<div
							id="save-as-checkboxes"
							className="grid grid-cols-2 gap-4"
						>
							<div className="col-span-2 sm:col-span-1 checkboxes">
								<input
									type="checkbox"
									id="sava-as-open"
									name="sava-as-open"
									className="mr-2 rounded focus:ring-0"
								/>
								<label
									htmlFor="sava-as-open"
									className="text-white text-xl"
								>
									Do you want to save and send as now open
								</label>
							</div>

							<div className="col-span-2 sm:col-span-1 checkboxes">
								<input
									type="checkbox"
									id="save-as-now-coming"
									name="save-as-now-coming"
									className="mr-2 rounded focus:ring-0"
								/>
								<label
									htmlFor="save-as-now-coming"
									className="text-white text-xl"
								>
									Do you want to save and send as now coming
								</label>
							</div>
						</div>
					</div>
					<div
						id="offer-button"
						className="col-span-12 py-10 px-5 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-end"
					>
						<Button
							title="Save list as favourite"
							type="submit"
							buttonClass="save-list bg-gray-400 mb-5 sm:mb-0 sm:mr-5 py-5 text-center"
							handleClick={handlePublish}
						/>

						<Button
							title="Publish loan"
							type="submit"
							buttonClass="publish-loan bg-green-700 py-5 text-center mr-5"
							handleClick={handlePublish}
						/>
					</div>

					{/*Modal*/}
					<div
						id="offer-modal"
						className="h-60"
						ref={modalContainerRef}
					>
						<div
							id="modal-content"
							className="flex flex-col justify-center items-center"
						>
							<h4 className="font-bold text-lg">
								Congratulations!
							</h4>
							<p className="py-5">Your loan has been published</p>
							<Button
								title="Go home"
								link="/client/offers"
								buttonClass="bg-green-500"
							/>
						</div>
					</div>
				</div>
			</OrderbookLayout>
		</>
	);
}