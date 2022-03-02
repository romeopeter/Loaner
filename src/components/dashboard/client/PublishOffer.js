/*
	Also called the assigning-invetor component/page
*/

import React, { createRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { useAlert } from "react-alert";

import CustomSelect from "./CustomSelect";
import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";

import {
	getInvestorsInCategoryAction,
	mergeInvestorsInCategoriesAction,
} from "../../../redux/investorsInCategorySlice";

import { getInvestorsCategoriesAction } from "../../../redux/investorCategorySlice";

import {
	AddInvestorsAction,
	publishOfferAction,
} from "../../../redux/loanSlice.js";

import { saveInvestorListAction } from "../../../redux/investorListSlice";

import { Danger, Info } from "../../alert";

export default function PublishOffer({ children, ...props }) {
	const pageName = "Publish offer";

	const saveListModalRef = createRef();
	const publishSuccessModalRef = createRef();
	const alert = useAlert();
	const dispatch = useDispatch();

	const currentUserObj = useSelector((state) => state.auth.user);
	const investorsInCategory = useSelector(
		(state) => state.investorsInCategory.investors
	);
	const investorCategories = useSelector(
		(state) => state.investorsCategories.categories
	);

	const [state, setState] = useState({
		investorSelected: null,
		categoryCheckbox: [],
		saveAsOpen: false,
		saveAsComing: false,
		favouriteListName: "",
		favouriteListDescription: "",
		menuIsOpen: false,
	});
	const [favouriteList, setFavouriteList] = useState([]);
	const [investorCatCount, setInvestorCatCount] = useState(5);
	const [categoriesIds, setCategoriesIds] = useState([]);
	const [feedBack, setFeedBack] = useState({
		investorsNotAssigned: "",
		offerNotCreated: "",
	});

	useEffect(() => {
		// Save favourite list after state update
		const LISTS = favouriteList.length > 0 && JSON.stringify(favouriteList);
		localStorage.setItem("FAVOURITE_LISTS", LISTS);
	}, [favouriteList]);

	useEffect(() => {
		// Get all investors categories
		dispatch(getInvestorsCategoriesAction());
		dispatch(getInvestorsInCategoryAction());
	}, [dispatch]);

	useEffect(() => {
		// Invoke function to get all categories IDs
		getCategoriesIds();
	}, [state.categoryCheckbox]);

	useEffect(() => {
		// Invoke function to generate request based on categories clicked
		genMultiInvestorsRequests();
	}, [categoriesIds]);

	const handleInvestorChange = (selected) => {
		setState((state) => {
			return {
				...state,
				investorSelected: selected,
			};
		});
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.checked) {
			if (name === "saveAsOpen" || name === "saveAsComing") {
				setState((state) => ({ ...state, [name]: e.target.checked }));
			}

			if (name === "categoryCheckbox") {
				setState((state) => ({
					...state,
					[name]: [...state[name], value],
				}));
			}
		} else {
			if (name === "saveAsOpen" || name === "saveAsComing") {
				setState((state) => ({ ...state, [name]: !e.target.checked }));
			}

			if (name === "categoryCheckbox") {
				if (state[name] !== null && state[name].length > 0) {
					const result = state[name].filter((data) => data !== value);
					setState((state) => ({ ...state, [name]: result }));

					return;
				}

				setState((state) => ({ ...state, [name]: [] }));
			}
		}
	};

	// Save list modal trigger
	const FavouriteListModal = () => {
		saveListModalRef.current.classList.add("accept-modal");
	};
	const removeFavouriteListModal = () => {
		saveListModalRef.current.classList.remove("accept-modal");
	};

	// Publish successful modal trigger
	const publishSuccessModal = () => {
		publishSuccessModalRef.current.classList.add("accept-modal");
	};

	/*Save list as favourite*/
	const saveFavouriteList = () => {
		const investorValues = state.investorSelected;
		const categoryValues = state.categoryCheckbox;

		// const clientInvestorsList = {};
		const serverInvestorsList = {};

		if (state.favouriteListName === "") {
			alert.error("List must have a title");
		} else {
			// Investors list sent to server to save
			const investorsIds = investorsInCategory.map(
				(investor) => investor.id
			);
			const status = state.saveAsOpen
				? "open"
				: state.saveAsComing
				? "incoming"
				: "open";

			serverInvestorsList.name = state.favouriteListName;
			serverInvestorsList.descripption = state.favouriteListDescription;
			serverInvestorsList.investor_ids = investorsIds;
			serverInvestorsList.status = status;
			serverInvestorsList.user = currentUserObj.user.id;

			/*Investors lists to saved in client starts*/
			/*clientInvestorsList.listName = state.favouriteListName;
				clientInvestorsList.descripption = state.favouriteListDescription;
				clientInvestorsList.listItems = {};

				if (investorValues !== null) {
					clientInvestorsList.listItems.investors = state.investorSelected;
				}

				if (categoryValues !== null) {
					clientInvestorsList.listItems.categories = state.categoryCheckbox;
				}

				clientInvestorsList.saveAsOpen =
					state.saveAsOpen === false
						? !state.saveAsOpen
						: state.saveAsOpen;
				clientInvestorsList.saveAsComing =
					state.saveAsComing === false
						? !state.saveAsComing
						: state.saveAsComing;*/
			/*Investors lists to saved in client ends*/

			dispatch(saveInvestorListAction(serverInvestorsList)).then(() => {
				/*setFavouriteList((state) => {
					return [...state, clientInvestorsList];
				});*/

				alert.success("List created");
			});

			// Removes save list modal
			removeFavouriteListModal();
		}
	};

	// Assign and Publish investors
	const assignAndPublishInvestors = (loanOfferId) => {
		const investorsValue = state.investorSelected;
		const status = state.saveAsOpen
			? "open"
			: state.saveAsComing
			? "incoming"
			: "open";

		if (investorsValue === null) {
			// alert.error("Can't publish. Investors not assigned");
			setFeedBack((state) => ({
				...state,
				investorsNotAssigned:
					"Can't publish offer. Investors not assigned!",
			}));
			return;
		} else if (loanOfferId === undefined || loanOfferId === null) {
			// alert.error("Can't assign investors to non existant loan. Create a list instead");
			setFeedBack((state) => ({
				...state,
				offerNotCreated: "Can't assign investors to nonexistent offer!",
			}));
			return;
		} else {
			const investorsId = investorsValue.map(
				(investor) => investor.value
			);

			const data = {
				investor_ids: investorsId,
				availability: status,
			};

			// Assign investors
			dispatch(AddInvestorsAction(loanOfferId, data)).then(() => {
				// Publish offers
				dispatch(publishOfferAction(loanOfferId));
			});
		}

		// Show modal
		publishSuccessModal();
	};

	// Get categories ID
	const getCategoriesIds = () => {
		const IDs =
			state.categoryCheckbox.length > 0
				? state.categoryCheckbox.map((category) => {
						return Number(category.split("_")[1]);
				  })
				: [];

		setCategoriesIds((state) => [...IDs]);
	};

	/* React-select customization start */
	const allOption = {
		label: "Select all",
		value: "*",
	};

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

	const ValueContainer = ({ children, ...props }) => {
		const currentValues = props.getValue();
		let toBeRendered = children;

		if (currentValues.some((val) => val.value === allOption.value)) {
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
	};

	const loadAllInvestorsOptionsFunc = () => {
		if (investorsInCategory.length > 0) {
			return investorsInCategory.map((investor) => {
				const label = `${investor.user.first_name} ${investor.user.last_name}`;
				const value = investor.user.id;
				return { value, label };
			});
		}

		return [];
	};

	const loadInvestorsOptions = loadAllInvestorsOptionsFunc();

	// Generate multi request
	const genMultiInvestorsRequests = () => {
		const multiRequests = categoriesIds.map((id, index) => {
			const API_URL =
				"https://order-book-online.herokuapp.com/v1/investor_category";
			return `${API_URL}/${
				id !== undefined && id
			}/?display_investors=True`;
		});
		dispatch(mergeInvestorsInCategoriesAction(multiRequests));
	};
	/* React-select customization ends */

	// Captialize first letter of alphabets characters
	const capFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
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
							<div className="flex justify-center items-center text-white">
								{/*Feeback placement*/}
								{feedBack.offerNotCreated !== "" && (
									<Danger
										message={feedBack.offerNotCreated}
									/>
								)}
								{feedBack.investorsNotAssigned !== "" && (
									<Danger
										message={feedBack.investorsNotAssigned}
									/>
								)}
							</div>
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
												{investorCategories.length > 0
													? investorCategories.map(
															(
																category,
																index
															) => {
																if (
																	index <=
																	investorCatCount
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
																				value={`${category.name}_${category.id}`}
																				onChange={(
																					e
																				) =>
																					handleChange(
																						e
																					)
																				}
																				className="mr-2 rounded"
																			/>
																			<label htmlFor="category-checkbox">
																				{capFirstLetter(
																					category.name
																				).replace(
																					"-",
																					" & "
																				)}
																			</label>
																		</div>
																	);
																}
															}
													  )
													: null}
												{investorCatCount <= 5 ? (
													<Button
														title="view more"
														buttonClass="view-more font-bold"
														handleClick={() =>
															setInvestorCatCount(
																investorCategories.length
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
									options={loadInvestorsOptions}
									isMulti
									closeMenuOnSelect={false}
									hideSelectedOptions={false}
									components={{
										Option,
										MultiValue,
										ValueContainer,
									}}
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
							handleClick={assignAndPublishInvestors}
						/>
					</div>

					{/*Save list modal*/}
					<div
						id="save-list-modal"
						className="h-60"
						ref={saveListModalRef}
					>
						<div id="modal-content" className="">
							<h4 className="font-bold text-2xl self-start my-5">
								New list
							</h4>

							<div className="grid grid-cols-2 gap-4 mb-10">
								<div className="col-span-2">
									<input
										type="text"
										name="favouriteListName"
										value={state.favouriteListName}
										onChange={(e) =>
											setState((state) => ({
												...state,
												[e.target.name]: e.target.value,
											}))
										}
										placeholder="Title"
										className="w-full border-l-0 border-t-0 border-r-0 focus:border-white"
									/>
								</div>
								<div className="col-span-2">
									<input
										type="text"
										name="favouriteListDescription"
										value={state.favouriteListDescription}
										onChange={(e) =>
											setState((state) => ({
												...state,
												[e.target.name]: e.target.value,
											}))
										}
										placeholder="Description (optional)"
										className="w-full border-l-0 border-t-0 border-r-0 focus:border-white"
									/>
								</div>
							</div>

							<div
								id="modal-buttons"
								className="flex justify-end pr-5"
							>
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

					{/*Publish succesful Modal*/}
					<div
						id="publish-success-modal"
						className="h-40"
						ref={publishSuccessModalRef}
					>
						<div id="modal-content" className="">
							<h4 className="font-bold text-2xl text-center my-5">
								Congratulations
							</h4>

							<p
								className="text-center mb-5 font-bold"
								id="message"
							>
								Your loan offer has been published
							</p>

							<div
								id="modal-buttons"
								className="flex justify-center pr-5"
							>
								<Button
									title="View orders"
									link="/client/offers/"
									buttonClass="view-orders mr-5"
								/>

								<Button
									title="Go home"
									link="/"
									buttonClass="go-home create"
								/>
							</div>
						</div>
					</div>
				</div>
			</OrderbookLayout>
		</>
	);
}