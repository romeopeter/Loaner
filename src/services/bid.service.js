import axios from "axios";

const getBids = () => {
    return axios.get("/v1/bids/").catch(error => error);
};

const getBid = (id) => {
    return axios.get(`/v1/bids/?loan_request_id=${id}`).catch(error => error);
};

const createBid = (data) => {
    console.log(data);
    return axios.post("/v1/bids/", data).catch(error => error);
};

const updateBids = (id) => {
    return axios
        .put(`/v1/payments/${id}/`)
        .catch(error => error);
};

const getapprovedBids = () => {
    return axios.get("/v1/bids/?status=approved").catch(err => err);
}

const getDeclinedBids = () => {
    return axios.get("/v1/bids/?status=declined").catch(err => err);
}

const getAllOffersStatus = (requestsArr) => {
    return axios.all(requestsArr.map(req => axios.get(req)))
    .then(responses => responses.map(res => res.data)).catch(error => error);
}

export { 
    getBids, 
    getBid, 
    createBid, 
    updateBids, 
    getapprovedBids, 
    getDeclinedBids, 
    getAllOffersStatus 
}; 