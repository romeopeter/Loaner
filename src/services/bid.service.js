import axios from "axios";

const getBids = () => {
    return axios.get("/v1/bids/").catch((error) => console.log(error));
};

const getBid = (id) => {
    return axios.get(`/v1/bids/${id}`).catch((error) => console.log(error));
};

const createBid = (data) => {
    return axios.post("/v1/bids/", data).catch((error) => console.log(error));
};

const updateBids = (id) => {
    return axios
        .put(`/v1/payments/${id}/`)
        .catch((error) => console.log(error));
};

const getAllOffersStatus = (requestsArr) => {
    return axios.all(requestsArr.map(req => axios.get(req)))
    .then(responses => responses.map(res => res.data)).catch(error => error);
}

export { getBids, getBid, createBid, updateBids, getAllOffersStatus };