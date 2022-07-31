/* eslint-disable no-unreachable */
/*Reducer function and initialization state for 'Payment' component.
This is abstracted because of complex state structure.*/ 

const paymentStateInit = {
    dataState: { // dataState
        isLoading: true,
        error: undefined
    },
    bidPayment: [], // paymentData
    approvedBids: [],
    currentPage: 1, // Pagination
    modal: {
        modal: false, // ModalState
        paymentModal: false,
        successState: undefined,
        data: undefined
    },
    notification: {
        isLoading: undefined,
        dataApproved: undefined,
        dataRejected: undefined
    },
    markedBids: [], // checkedBids
    markedBidsActionFilter: { // selecfilter
        value: undefined,
        modal: false,
        isLoading: undefined
    },
    markedPaymentsViewFilter: "Filter payment"
}

function paymentStateReducer(state, action) {
    switch (action.type) {
        case "BID_PAYMENT":
            return {
               ...state,
               bidPayment: action.payload 
            }
            break;
        case "APPROVED_BIDS":
            return {
                ...state,
                approvedBids: action.payload
            }
            break;
        case "DATA_STATE":
            return {
                ...state,
                dataState: action.payload
            }
            break;
        case "CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
            break;
        case "SET_PAYMENT_NOTIFICATION":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    isLoading: action.payload
                }
            }
            break;
        case "MARKED_BIDS":
            return {
                ...state,
                markedBids: action.payload
            }
            break;
        case "MARKED_BIDS_ACTION_FILTER":
            return {
                ...state,
                markedBidsActionFilter: {
                    ...state.markedBidsActionFilter,
                }
            }
            break;
        case "MARKED_BIDS_ACTION_FILTER_MODIFIED":
            return {
                ...state,
                markedBidsActionFilter: {
                    ...state.markedBidsActionFilter,
                    modal: action.payload.modal ? true : false,
                    successState: action.payload.successState ? true : false,
                    value: action.payload.value ? action.payload.value : undefined
                }
            }
            break;
        case "MARKED_PAYMENT_VIEW_FILTER":
            return {
                ...state,
                markedPaymentsViewFilter: action.payload,
            }
            break;
        case "OPEN_PAYMENT_MODAL":
            return {
                ...state,
                modal: {
                    ...state.modal,
                    paymentModal: true,
                    data: action.payload
                }
            }
            break;
        case "CLOSE_PAYMENT_MODAL":
            return {
                ...state,
                modal: {
                    ...state.modal,
                    paymentModal: false
                }
            }
            break;
        case "OPEN_APPROVED_MODAL":
            return {
                ...state,
                modal: {
                    ...state.modal,
                    modal: true,
                    successState: true,
                    paymentModal: false,
                }
            }
            break;
        case "OPEN_NOTIFICATION_APPROVED_MODAL":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    dataApproved: action.payload
                }
            }
            break;
        case "OPEN_REJECTED_MODAL":
            return {
                ...state,
                modal: {
                    ...state.modal,
                    modal: true,
                    successState: false,
                    paymentModal: false,
                }
            }
            break;
        case "OPEN_NOTIFICATION_REJECTED_MODAL":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    dataRejected: action.payload
                }
            }
            break;
        case "CLOSE_MODAL":
            return {
                ...state,
                modal: {
                    ...state.modal,
                    modal: false,
                }
            }
            break;
        case "CLOSE_NOTIFICATION_MODAL":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    isLoading: undefined,
                }
            }
            break;
        default:
            throw new Error();
    }
}

export {paymentStateInit, paymentStateReducer}