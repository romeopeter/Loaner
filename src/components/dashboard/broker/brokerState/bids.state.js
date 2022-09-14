const paymentStateInit = {
    dataState: { // dataState
        isLoading: true,
        error: undefined
    },
    loanOffer: null,
    bids: [], // bidsData
    markedBids: [], // CheckedBids
    currentPage: 1,
    disagreeModal: {
        modal: false,
        isLoading: undefined,
        error: undefined,
    },
    editModal: {modal: false},
    deleteModal: {
        modal: false,
        isLoading: undefined,
        error: undefined,
    },
    markedBidsAction: { // Select filter one
        value: undefined,
        modal: false,
        isLoading: undefined,
    },
    notification: {
        isLoading: undefined,
        dataApproved: undefined,
        dataRejected: undefined,
        dataDisagree: undefined,
        dataEditted: undefined,
    }
};

function paymentStateReducer(state, action) {
    switch (action.type) {
        case "SET_DATA_STATE":
            break;
        case "SET_BIDS":
            break;
        case "SET_MARKED_BIDS":
            break;
        case "SET_DISAGREE_MODAL":
            break;
        case "SET_EDIT_MODAL":
            break;
        case "SET_DELETE_MODAL":
            break;
        case "SET_MARKED_BIDS_MODAL":
            break;
        case "SET_NOTIFICATION":
            break;
        default:
            throw new Error();
    }
}