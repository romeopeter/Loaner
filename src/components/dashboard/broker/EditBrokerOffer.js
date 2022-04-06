import React, { useState, createRef, useRef, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";

import OrderbookLayout from "../../OrderbookLayout";
import OfferForm from "./OfferForm";
import DocumentHead from "../../DocumentHead";
import NavMenu from "../NavMenu";

import Button from "../../Button";

import { setServerMessage } from "../../../redux/messageSlice";

import { cp, bond } from "../loan-request-data/requestData";

import {
    CPLoanOfferAction,
    bondLoanOfferAction,
    getOfferAction,
    editOfferActon,
} from "../../../redux/loanSlice";

import ShowLoanSummary from "./modals/ShowLoanSummary";

export default function EditBrokerOffer() {
    const pageName = "Loan request";

    const { user } = JSON.parse(localStorage.getItem("USER"));

    const userFullName = `${user.first_name} ${user.last_name}`;

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const requestContainerRef = createRef();
    const componentMounted = useRef(true);

    const OfferIsUpdated = useSelector((state) => state.loan.currentOffer);
    const serverError = useSelector((state) => state.message.server.message);

    const [summaryState, setSummaryState] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [formState, setFormState] = useState({
        dealType: "",
        // issuer: "",
        guarantor: "",
        dealName: "",
        projectName: "",
        dealOwner: "",
        dealTeam: "",
        status: "",
        trancheName: "",
        trancheSize: {
            currency: "NGN",
            value: "",
            faceValue: "",
            discountValue: "",
            parValue: 1000,
            minSubscription: "",
        },
        pricing: {
            dayCount: "",
            couponType: "",
            benchmark: "",
            couponFrequency: "",
            callOption: "",
            offerType: {
                name: "",
                fixedPrice: {
                    rate: "", // Can be discount rate or rate range
                    yield: "", // Can be implied yield or yield type
                },
            },
        },
        timing: {
            offerStart: "",
            offerEnd: "",
            allotmentDate: "",
            settlementDate: "",
            maturityDate: "",
        },
        useOfProceeds: "",
        taxConsideration: "",
        eligibleInvestors: "",
        rating: {
            name: "",
            scale: "",
        },
    });

    const handleSubmit = async () => {
        const { user: currentUser } = JSON.parse(localStorage.getItem("USER"));

        for (let prop in formState) {
            if (formState[prop] === "") {
                alert.error("Empty field");
                return;
            }
        }

        if (formState.dealType === "CP") {
            const req = await dispatch(
                CPLoanOfferAction(cp(formState, currentUser))
            );

            if (componentMounted.current) setIsLoading(true);

            if (req.meta.requestStatus === "fulfilled") {
                // Loan is created, Navigate to publish page
                navigate("/broker/dashboard/loan-offer/select-investor");
            } else {
                if (componentMounted.current) setIsLoading(false);

                if (serverError) alert(serverError.detail);

                return;
            }

            if (serverError.messageType === "network_error") {
                if (componentMounted.current) setIsLoading(false);

                alert(serverError.detail);

                return;
            }
        }

        if (formState.dealType === "BOND") {
            const req = await dispatch(
                bondLoanOfferAction(bond(formState, currentUser))
            );

            if (componentMounted.current) setIsLoading(true);

            if (req.meta.requestStatus === "fulfilled") {
                // Loan is created, Navigate to publish page
                navigate("/broker/dashboard/loan-offer/select-investor");
            } else {
                if (componentMounted.current) setIsLoading(false);

                if (serverError) alert(serverError.detail);

                return;
            }

            if (serverError.messageType === "network_error") {
                if (componentMounted.current) setIsLoading(false);

                alert(serverError.detail);

                return;
            }
        }
    };

    useEffect(() => {
        (async function () {
            const req = await dispatch(
                getOfferAction({
                    id: params.id,
                    dealType: params.dealType.toLowerCase(),
                })
            );

            // correct logic for checking status

            if (req.meta.requestStatus === "fulfilled") {
                console.log("Request successful");

                console.log(req.payload);

                // Store in component form state
                setFormState((state) => {
                    if (req.payload !== undefined && typeof req.payload === "object") {
                        const payload = req.payload;
                        
                        return {
                            ...state,
                            dealType: payload["deal_type"],
                            dealName: payload["deal_name"],
                            dealOwner: payload["deal_owner"],
                            dealTeam: payload['deal_team'],
                            guarantor: payload['guarantor'],
                        }
                        
                    } else {
                        console.log("Network problem")
                    }
                });
            }
        })();
    }, [dispatch, params.id, params.dealType]);

    const CalculateLoanTenure = (startDate, EndDate) => {
        let tenure = "";

        const currentDate = new Date();
        const loanStartDate = new Date(startDate);
        const loanEndDate = new Date(EndDate);

        // Start Date cant be before the current year
        /*if (loanStartDate.getTime() === currentDate.getFullYear()) {
            alert.error("Loan start year must be the current year");

            return
        }*/

        /*
         Get loan tenure. Time difference is calculated and divided by 
         number of miliseconds in a day to get day difference which
         becomes the tenure
        */
        const timeDifference = loanEndDate.getTime() - loanStartDate.getTime();
        const daysDiffernce = timeDifference / (1000 * 60 * 60 * 24);
        tenure = daysDiffernce;

        /*
         End date can't be the same as start date.
         If the the difference is days is 0 then loan end date is set to
         the same time as loan start date
         */
        if (tenure === 0 || tenure < 0) {
            alert.error(
                "End date can not be the same as or less than start date!"
            );

            return "***";
        }

        return isNaN(tenure) === false && tenure;
    };

    const handleModal = () => {
        setShowModal(true);
    };

    // Dropdown
    const [isOpen, setOpen] = useState({ client: false, investor: false });

    const toggleDropdownClient = () => {
        if (isOpen.client) {
            setOpen({ ...isOpen, client: false });
            return;
        }

        setOpen({ investor: false, client: true });
    };

    const toggleDropdownInvestor = () => {
        if (isOpen.investor) {
            setOpen({ ...isOpen, investor: false });
            return;
        }

        setOpen({ client: false, investor: true });
    };

    return (
        <>
            <DocumentHead title={pageName} />
            <OrderbookLayout PageNav={NavMenu}>
                <section id="orderbook-loan-request">
                    <div className=" bg-white px-16 py-10 shadow-md flex justify-start">
                        <div className="dropdownbroker">
                            <div
                                className="dropdownbroker-header"
                                onClick={toggleDropdownClient}
                            >
                                <h2 className="mr-2">Clients</h2>
                                <i
                                    className={`fa fa-caret-down ${
                                        isOpen.client && "open"
                                    }`}
                                ></i>
                            </div>
                            <div
                                className={`dropdownbroker-body ${
                                    isOpen.client && "open"
                                }`}
                            >
                                <Link
                                    to="/broker/dashboard/new-client"
                                    className="dropdownbroker-item "
                                >
                                    New Client{" "}
                                </Link>
                                <Link
                                    to="/broker/dashboard/allclients"
                                    className="dropdownbroker-item "
                                >
                                    Manage Clients{" "}
                                </Link>
                            </div>
                        </div>
                        <div className="dropdownbroker">
                            <div
                                className="dropdownbroker-header"
                                onClick={toggleDropdownInvestor}
                            >
                                <h2 className="mr-2">Investors</h2>
                                <i
                                    className={`fa fa-caret-down ${
                                        isOpen.investor && "open"
                                    }`}
                                ></i>
                            </div>
                            <div
                                className={`dropdownbroker-body ${
                                    isOpen.investor && "open"
                                }`}
                            >
                                <Link
                                    to="/broker/dashboard/uploadInvestor"
                                    className="dropdownbroker-item "
                                >
                                    Upload Investors{" "}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        id="loan-request-container"
                        className=""
                        ref={requestContainerRef}
                    >
                        <div
                            id="request-loan-form"
                            className="loan-request-flex-item"
                        >
                            <OfferForm
                                requestFormState={{ formState, setFormState }}
                                showSummary={{
                                    summaryState,
                                    setSummaryState,
                                    handleModal,
                                }}
                            />
                        </div>
                        <div
                            id="loan-summary"
                            className="bg-white loan-request-flex-item modal-content"
                        >
                            {!summaryState ? (
                                <div id="summary-intro" className="mt-20 ml-20">
                                    <h2 className="text-2xl font-bold mb-5">
                                        Loan Offer Summary
                                    </h2>
                                    <p className="font-bold">
                                        View your loan summary here.
                                    </p>
                                </div>
                            ) : (
                                <div id="summary-table" className="mt-20 mx-10">
                                    <span
                                        class="md:hidden modal-close"
                                        onClick={() =>
                                            requestContainerRef.current.classList.remove(
                                                "modal"
                                            )
                                        }
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
                                                    <span>
                                                        {userFullName &&
                                                            userFullName}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <small>Type of offer</small>
                                                    <span>
                                                        {formState.dealType !==
                                                            "" &&
                                                            formState.dealType ===
                                                                "CP" &&
                                                            "Commercial paper"}
                                                        {formState.dealType !==
                                                            "" &&
                                                            formState.dealType ===
                                                                "BOND" &&
                                                            "Bond"}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <small>Loan amount</small>
                                                    <span>
                                                        {
                                                            formState
                                                                .trancheSize
                                                                .currency
                                                        }{" "}
                                                        {formState.trancheSize
                                                            .minSubscription !==
                                                            "" &&
                                                            formState
                                                                .trancheSize
                                                                .minSubscription}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <small>Tranche</small>
                                                    <span>
                                                        {formState.trancheName !==
                                                            "" &&
                                                            formState.trancheName}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <small>Tenor</small>
                                                    <span>
                                                        {CalculateLoanTenure(
                                                            formState.timing
                                                                .offerStart,
                                                            formState.timing
                                                                .offerEnd
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <small>Size</small>
                                                    <span>
                                                        {formState.trancheSize
                                                            .minSubscription !==
                                                            "" &&
                                                            formState
                                                                .trancheSize
                                                                .minSubscription}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr id="summary-dates-row">
                                                <td className="border-r border-black">
                                                    <small>Offer opens</small>
                                                    <span>
                                                        {formState.timing
                                                            .offerStart !==
                                                            "" &&
                                                            formState.timing
                                                                .offerStart}
                                                    </span>
                                                </td>
                                                <td className="border-r border-black">
                                                    <small>Offer closes</small>
                                                    <span>
                                                        {formState.timing
                                                            .offerEnd !== "" &&
                                                            formState.timing
                                                                .offerEnd}
                                                    </span>
                                                </td>
                                                <td>
                                                    <small>
                                                        Settlement date
                                                    </small>
                                                    <span>
                                                        {formState.timing
                                                            .settlementDate !==
                                                            "" &&
                                                            formState.timing
                                                                .settlementDate}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div
                                        id="loan-summary-buttons"
                                        className="my-10"
                                    >
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
                            )}
                        </div>
                    </div>

                    {/*Put modal here*/}
                    {showModal && (
                        <ShowLoanSummary
                            formState={formState}
                            modal={{ showModal, setShowModal }}
                            handleSubmit={handleSubmit}
                            CalculateLoanTenure={CalculateLoanTenure}
                        />
                    )}
                </section>
            </OrderbookLayout>
        </>
    );
}