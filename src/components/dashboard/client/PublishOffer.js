import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { components, selectInstance } from "react-select";
import { useAlert } from "react-alert";

import CustomSelect from "./CustomSelect";
import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import offerImage from "../../../assets/images/offerImage.png";

export default function PublishOffer({children, ...props}) {
	const pageName = "Publish offer";

	const modalContainerRef = createRef();
	const alert = useAlert();

	const [state, setState] = useState({
		investorSelected: null,
		categoryCheckbox: [],
		saveAsOpen: false,
		saveAsComing: false,
		favouriteListName: "",
		favouriteListDescription: ""
	});

	const [categoriesTrigger, setCategoriesTrigger] = useState(5);
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

	const handleInvestorChange = (selected) => {
	    setState(state => {
	    	return {
	    		...state,
	    		investorSelected: selected
	    	}
	    })
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.checked) {
			if (name === "saveAsOpen" || name === "saveAsComing") {
				setState(state => ({...state, [name]: e.target.checked}));
			}

			if (name === "categoryCheckbox") {
				setState(state => ({...state, [name]: [...state[name], value]}))
			}
		} else {
			if (name === "saveAsOpen" || name === "saveAsComing") {
				setState(state => ({...state, [name]: !e.target.checked}));
			}

			if (name === "categoryCheckbox") {
				if (state[name] !== null && state[name].length > 0) {
					const result = state[name].filter(data => data !== value);
					setState(state => ({...state, [name]: result}));

					return
				}

				setState(state => ({...state, [name]: []}))
			}
		}
	}

	const FavouriteListModal = () => {
		modalContainerRef.current.classList.add("accept-modal");
	};

	const removeFavouriteListModal = () => {
		modalContainerRef.current.classList.remove("accept-modal");
	};

	const selectAllInvestors = (e) => {
		
		if (e.target.checked) {
			console.log("Selects all investor");
		}
	};

	const listAsFavourite = {
		listName: "",
		listDescription: "",
		listItems: {
			categories: [],
			investors: [],
		},
		saveAsOpen: state.saveAsOpen ? state.saveAsOpen : state.saveAsOpen,
		saveAsComing: state.saveAsComing ? state.saveAsComing : state.saveAsComing
	};


	const investorValues = state.investorSelected;
	const categoryValues = state.categoryCheckbox;

	if (investorValues !== null) {
		// const [{value: selectedInvestor}] = investorValue;

		listAsFavourite.listItems = {
			...listAsFavourite.listItems,
			investors: investorValues
		}
	}

	if (categoryValues !== null) {
		listAsFavourite.listItems = {
			...listAsFavourite.listItems,
			categories: categoryValues
		}
	}

	const saveFavouriteList = () => {
		if (state.favouriteListName === "") {
			alert.error("List must have a title")
			return
		}

		listAsFavourite.listName = state.favouriteListName;
		listAsFavourite.listDescription = state.favouriteListDescription;

		const favouriteList = JSON.stringify(listAsFavourite);

		window.localStorage.setItem("FAVOURITE_lIST", favouriteList);

		alert.success("List created");

		removeFavouriteListModal();
	}

	/* React-select customization start */
	const Option = (props) => {
		return (
			<div>
			<components.Option {...props}>
				<input
					type="checkbox"
					checked={props.isSelected}
					className="rounded"
					onChange={() => null}
				/>{" "}
				<label>{props.label}</label>
			</components.Option>
			</div>
		);
	};

	const allOption = {
		label: "Select all",
		value: "*"
	}

	const ValueContainer = ({ children, ...props }) => {
		const currentValues = props.getValue();
	  	let toBeRendered = children;

	  	if (currentValues.some(val => val.value === allOption.value)) {
	    	toBeRendered = [[children[0][0]], children[1]];
	  	}

	  	return (
		    <components.ValueContainer {...props}>
		      {toBeRendered}
		    </components.ValueContainer>
	  	);
	};

	const MultiValue = (props) => {
		let labelToBeDisplayed = `${props.data.label}, `;

		if (props.data.label === allOption.label) {
			labelToBeDisplayed = "All investors selected";
		}

		return (
			<components.MultiValue {...props}>
				<span>{labelToBeDisplayed}</span>
			</components.MultiValue>
		);
	}
	/* React-select customization ends */

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
									{/*<div
										id="select-all-investors"
										className="checkboxes col-span-12 sm:col-span-3 border-r border-white sm:border-black"
									>
										<input
											type="checkbox"
											name="categoryCheckbox"
											className="mr-2 rounded"
											onChange={(e) => selectAllInvestors(e)}
										/>
										<label htmlFor="select-all-investors">
											Select all investors
										</label>
									</div>*/}
									<div className="col-span-12 sm:col-span-12">
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
																				name="categoryCheckbox"
																				value={
																					category.name
																				}
																				onChange={(e) => handleChange(e)}
																				className="mr-2 rounded"
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
							<div className="col-span-2 mb-5">
								<CustomSelect
									options={investorOptions}
									isMulti
									closeMenuOnSelect={false}
									hideSelectedOptions={false}
									components={{Option, MultiValue, ValueContainer}}
									placeholder="Select investors"
									onChange={(e) => handleInvestorChange(e)}
									allowSelectAll={true}
									value={state.investorSelected}
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
									name="savaAsOpen"
									onChange={(e) => handleChange(e)}
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
									name="saveAsComing"
									onChange={(e) => handleChange(e)}
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
							handleClick={FavouriteListModal}
						/>

						<Button
							title="Publish loan"
							type="submit"
							buttonClass="publish-loan bg-green-700 py-5 text-center mr-5"
						/>
					</div>

					{/*Modal*/}
					<div
						id="save-list-modal"
						className="h-60"
						ref={modalContainerRef}
					>
						<div
							id="modal-content"
							className=""
						>
							<h4 className="font-bold text-2xl self-start my-5">
								New list
							</h4>

							<div className="grid grid-cols-2 gap-4 mb-10">
								<div className="col-span-2">
									<input type="text" name="favouriteListName" value={state.favouriteListName} onChange={(e) => setState(state => ({...state, [e.target.name]: e.target.value}))} placeholder="Title" className="w-full border-l-0 border-t-0 border-r-0 focus:border-white" />
								</div>
								<div className="col-span-2">
									<input type="text" name="favouriteListDescription" value={state.favouriteListDescription} onChange={(e) => setState(state => ({...state, [e.target.name]: e.target.value}))} placeholder="Description (optional)" className="w-full border-l-0 border-t-0 border-r-0 focus:border-white" />
								</div>
							</div>
							
							<div id="modal-buttons" className="flex justify-end pr-5">
								<Button
									title="Cancel"
									buttonClass="cancel mr-5"
									handleClick={removeFavouriteListModal}
							    />

							    <Button
									title="Create"
									buttonClass="create"
									handleClick={saveFavouriteList}
							    />
							</div>
						</div>
					</div>
				</div>
			</OrderbookLayout>
		</>
	);
}