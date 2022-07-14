/*
    Also called the assigning-invetor component/page
*/

import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { components } from "react-select";
import { useAlert } from "react-alert";

import CustomSelect from "./CustomSelect";
import OrderbookLayout from "../../OrderbookLayout";
import DocumentHead from "../../DocumentHead";
import Button from "../../Button";
import NavMenu from "../NavMenu";
import { Danger, Success } from "../../alert";
import PublishModal from "./modals/PublishModal";
import ListModal from "./modals/ListModal";

import { saveInvestorListAction } from "../../../redux/investorListSlice";
import {
    getInvestorsInCategoryAction,
    mergeInvestorsInCategoriesAction,
} from '../../../redux/investorsInCategorySlice';
import { getInvestorsCategoriesAction } from '../../../redux/investorCategorySlice';
import { AddInvestorsAction, publishOfferAction } from '../../../redux/loanSlice.js';
import { getOfferAction } from "../../../redux/loanSlice.js";

export default function PublishOffer({ children, ...props }) {
    const pageName = 'Publish offer';
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const currentUserObj = useSelector((state) => state.auth.user);
    const investorsInCategory = useSelector((state) => state.investorsInCategory.investors);
    const investorCategories = useSelector((state) => state.investorsCategories.categories);
    const currentOfferObj = localStorage.getItem("CURRENT_OFFER");

    const currentOffer = currentOfferObj !== null ? JSON.parse(currentOfferObj) : null;

    const [state, setState] = useState({
        investorSelected: null,
        categoryCheckbox: [],
        saveAsOpen: false,
        saveAsComing: false,
        favouriteListName: '',
        favouriteListDescription: '',
        menuIsOpen: false,
    });
    const [investorCatCount, setInvestorCatCount] = useState(5);
    const [categoriesIds, setCategoriesIds] = useState([]);
    const [feedBack, setFeedBack] = useState({
        investorsNotAssigned: '',
        offerNotCreated: '',
        loanIsPublished: '',
        statusNotSet: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const [publishModal, showPublishModal] = useState(false);

    const [saveListModal, showSaveListModal] = useState(false);

    useEffect(() => {
        if (currentOffer === null || currentOffer.id !== params.id) {
            dispatch(getOfferAction({ id: params.id, dealType: params.dealType }));
        }
    }, [dispatch, currentOffer, params])

    useEffect(() => {
        // Get all investors categories
        dispatch(getInvestorsCategoriesAction());

        // Get investors in category
        dispatch(getInvestorsInCategoryAction());

        // Position window at the top
        window.scroll(0, 0);
    }, [dispatch]);

    useEffect(() => {
        // Get categories ID
        (function () {
            const IDs =
                state.categoryCheckbox.length > 0
                    ? state.categoryCheckbox.map((category) => {
                        return Number(category.split('_')[1]);
                    })
                    : [];

            setCategoriesIds((state) => [...IDs]);
        })();

    }, [state.categoryCheckbox]);

    useEffect(() => {
        // Self-invoke function to generate requests based on investor category clicked
        (function () {
            const multiInvestors = categoriesIds.map((id, index) => {
                const API_URL = 'https://order-book-online.herokuapp.com/v1/investor_category';
                return `${API_URL}/${id !== undefined && id}/?display_investors=True`;
            });
            dispatch(mergeInvestorsInCategoriesAction(multiInvestors));
        })()
    }, [categoriesIds, dispatch]);

    const handleInvestorChange = (selected) => {
        setState((state) => {
            return {
                ...state,
                investorSelected: selected,
            };
        });
    };

    const handleCheckbox = (e) => {
        const target = e.target;
        const name = e.target.name;
        const value = e.target.value;

        if (target.type === 'checkbox') {
            if (name === 'saveAsOpen' || name === 'saveAsComing') {
                setState((state) => ({ ...state, [name]: target.checked }));
            }

            if (name === 'categoryCheckbox') {
                setState((state) => ({
                    ...state,
                    [name]: [...state[name], value],
                }));
            }
        } else {
            if (name === 'saveAsOpen' || name === 'saveAsComing') {
                setState((state) => ({ ...state, [name]: !target.checked }));
            }

            if (name === 'categoryCheckbox') {
                if (state[name] !== null && state[name].length > 0) {
                    const result = state[name].filter((data) => data !== value);
                    setState((state) => ({ ...state, [name]: result }));

                    return;
                }

                setState((state) => ({ ...state, [name]: [] }));
            }
        }
    };

    /*Save list as favourite*/
    const saveFavouriteList = () => {

        // const clientInvestorsList = {};
        const serverInvestorsList = {};

        if (state.favouriteListName === '') {
            alert.error('List must have a title');
        } else {
            // Investors list sent to server to save
            const investorsIds = investorsInCategory.map((investor) => investor.id);

            let availability;

            if (state.saveAsOpen) availability = 'open';
            if (state.saveAsComing) availability = 'coming soon';

            serverInvestorsList.name = state.favouriteListName;
            serverInvestorsList.descripption = state.favouriteListDescription;
            serverInvestorsList.investor_ids = investorsIds;
            serverInvestorsList.status = availability;
            serverInvestorsList.user = currentUserObj.user.id;

            dispatch(saveInvestorListAction(serverInvestorsList)).then(() => {
                alert.success('List created');
            });

            // Removes save list modal
            // removeFavouriteListModal();
        }
    };

    // Assign and Publish investors
    const assignInvestors = async (loanOfferId) => {
        const investorsValue = state.investorSelected;
        let availability;

        if (state.saveAsOpen) availability = 'open';
        if (state.saveAsComing) availability = 'coming soon';

        if (investorsValue === null) {
            setFeedBack((state) => ({
                ...state,
                investorsNotAssigned: "Can't publish offer. Investors not assigned!",
            }));
            return;
        } else if (availability === undefined) {
            setFeedBack((state) => ({
                ...state,
                statusNotSet: "Cant't Publish offer. Offer is not saved as opened or comming soon!",
            }));

            return;
        } else if (loanOfferId === undefined || loanOfferId === null) {
            setFeedBack((state) => ({
                ...state,
                offerNotCreated: "Can't assign investors to nonexistent offer!",
            }));
            return;
        } else {
            const investorsId = investorsInCategory.map((investor) => investor.id);
            let componentIsMounted = true;

            const data = {
                investor_ids: investorsId,
                availability: availability,
            };

            // Assign investors
            await dispatch(AddInvestorsAction({ loanOfferId, data }));

            // Publish offers
            const publish = await dispatch(publishOfferAction(loanOfferId));

            if (publish.meta.requestStatus === "fulfilled") {
                console.log("Loan published!");

                // Show publish modal
                if (componentIsMounted) showPublishModal(true);
            }

            componentIsMounted = false;

            setFeedBack((state) => ({
                investorsNotAssigned: '',
                offerNotCreated: '',
                loanIsPublished: '',
                statusNotSet: '',
            }));

            return () => componentIsMounted;
        }
    };

    // Publish offer
    const publishOffer = () => {
        setIsLoading(true);

        if (currentOffer !== null) {
            const { id } = currentOffer;

            // assign loan to investor
            assignInvestors(id);

            return;
        }
    }

    //Remove list modal trigger
    const removeFavouriteListModal = () => {
        showSaveListModal(false)
    };

    /* React-select customization start */
    const allOption = {
        label: 'Select all',
        value: '*',
    };

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <input type='checkbox' checked={props.isSelected} className='rounded' onChange={() => null} />{' '}
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

        return <components.ValueContainer {...props}>{toBeRendered}</components.ValueContainer>;
    };

    const MultiValue = (props) => {
        let labelToBeDisplayed = `${props.data.label}, `;

        if (props.data.label === allOption.label) {
            labelToBeDisplayed = 'All investors selected';
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
    /* React-select customization ends */

    // Captialize first letter of alphabets characters
    const capFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Get current offer id and deal type
    let id; let dealType;
    if (currentOffer !== null) {
        id = currentOffer.id;
        dealType = currentOffer.dealType;
    }

    return (
        <>
            <DocumentHead title={pageName} />
            <OrderbookLayout PageNav={NavMenu}>
                <div
                    id="loan-invest-dropdown"
                    className="bg-white px-16 py-10 shadow-md flex items-start"
                >
                    <div id="loan" className="dropdown-container underline mr-5">
                        <Link to={`/broker/dashboard/loan-offer-draft/${id}/${dealType}/`}>View offer</Link>
                    </div>
                    <span className="mr-5">|</span>
                    <div id="investor" className="dropdown-container underline">
                        <Link to={`/broker/dashboard/edit-loan-offer/${id}`}>Edit offer</Link>
                    </div>
                </div>
                <div id='orderbook-publish-offer'>
                    <div id='offer-publication'>
                        <div id='offer' className='mb-5'>
                            <div className='flex flex-col justify-center items-center text-white'>
                                {/*Feeback placement*/}
                                {feedBack.offerNotCreated !== '' ? <Danger message={feedBack.offerNotCreated} /> : null}
                                {feedBack.investorsNotAssigned !== '' ? (
                                    <Danger message={feedBack.investorsNotAssigned} />
                                ) : null}
                                {feedBack.statusNotSet !== '' ? <Danger message={feedBack.statusNotSet} /> : null}
                                {/*{serverError.message.messageTyoe !== "network_error" ? (
                                    <Danger
                                        message={serverError.message.detail}
                                    />
                                ):null}*/}
                                {feedBack.loanIsPublished !== '' ? (
                                    <Success message={feedBack.loanIsPublished} />
                                ) : null}
                            </div>
                            <h3 className='text-3xl font-bold text-white mb-5'>Select investors</h3>
                            <div id='the-offer' className='flex justify-center items-center p-5'>
                                <div className='grid grid-cols-12 gap-4 w-full '>
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
                                    <div className='col-span-12 sm:col-span-12'>
                                        <div id='select-category'>
                                            <span id='cat-title' className='font-bold text-xl'>
                                                Select category:
                                            </span>
                                            <div id='categories' className='flex justify-start flex-wrap'>
                                                {investorCategories.length > 0
                                                    ? investorCategories.map((category, index) => {
                                                        if (index <= investorCatCount) {
                                                            return (
                                                                <div
                                                                    key={category.id}
                                                                    className='checkboxes category-checkbox'
                                                                >
                                                                    <input
                                                                        type='checkbox'
                                                                        name='categoryCheckbox'
                                                                        value={`${category.name}_${category.id}`}
                                                                        onChange={(e) => handleCheckbox(e)}
                                                                        className='mr-2 rounded'
                                                                    />
                                                                    <label htmlFor='category-checkbox'>
                                                                        {capFirstLetter(category.name).replace(
                                                                            '-',
                                                                            ' & '
                                                                        )}
                                                                    </label>
                                                                </div>
                                                            );
                                                        }

                                                        return null
                                                    })
                                                    : null}
                                                {investorCatCount <= 5 ? (
                                                    <Button
                                                        title='view more'
                                                        buttonClass='view-more font-bold'
                                                        handleClick={() =>
                                                            setInvestorCatCount(investorCategories.length)
                                                        }
                                                    />
                                                ) : (<Button
                                                    title="view less"
                                                    buttonClass="view-more font-bold"
                                                    handleClick={() =>
                                                        setInvestorCatCount(5)
                                                    }
                                                />)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='col-span-2 my-5'>
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
                                    placeholder='Select investors'
                                    onChange={(e) => handleInvestorChange(e)}
                                    allowSelectAll={true}
                                    value={state.investorSelected}
                                />
                            </div>
                        </div>

                        <div
                            id='save-as-checkboxes'
                            className='grid grid-cols-2 gap-4'

                        >
                            <div className='col-span-2 sm:col-span-1 checkboxes'>
                                <input
                                    type='checkbox'
                                    id='sava-as-open'
                                    name='saveAsOpen'
                                    value={state.saveAsOpen}
                                    onChange={(e) => handleCheckbox(e)}
                                    className='mr-2 rounded focus:ring-0'
                                />
                                <label
                                    htmlFor='sava-as-open'
                                    className='text-white text-xl'>
                                    Mark as now open
                                </label>
                            </div>

                            <div className='col-span-2 sm:col-span-1 text-right checkboxes'>
                                <input
                                    type='checkbox'
                                    id='save-as-now-coming'
                                    name='saveAsComing'
                                    value={state.saveAsComing}
                                    onChange={(e) => handleCheckbox(e)}
                                    className='mr-2 rounded focus:ring-0'
                                />
                                <label
                                    htmlFor="save-as-now-coming"
                                    className="text-white text-xl"
                                >
                                    Mark as coming soon
                                </label>
                            </div>
                        </div>
                    </div>
                    <div
                        id='offer-button'
                        className='col-span-12 py-10 px-5 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-end'
                    >
                        <Button
                            title='Save list as favourite'
                            type='submit'
                            buttonClass='save-list bg-gray-400 mb-5 sm:mb-0 sm:mr-5 py-5 text-center'
                            handleClick={() => showSaveListModal(true)}
                        />

                        <Button
                            title='Publish loan'
                            type='submit'
                            buttonClass='publish-loan bg-green-700 py-5 text-center mr-5'
                            handleClick={publishOffer}
                        >
                            Publish <i className={`${isLoading && "fa fa-spinner fa-pulse fa-1x fa-fw"}`}></i>
                        </Button>
                    </div>

                    {/*Save list modal*/}
                    <ListModal
                        listState={{ state, setState }}
                        className={saveListModal ? "accept-modal" : ""}
                        saveListFunc={saveFavouriteList}
                        removeModal={removeFavouriteListModal}
                    />

                    {/*Publish succesful Modal*/}
                    <PublishModal className={publishModal ? "accept-modal" : ""} />
                </div>
            </OrderbookLayout>
        </>
    );
}
