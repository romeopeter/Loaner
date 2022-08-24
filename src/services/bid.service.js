import axios from "axios";

const getBids = () => {
  return axios.get("/v1/bids/").catch((error) => error);
};

const getBid = (id) => {
  return axios.get(`/v1/bids/?loan_request_id=${id}`);
};

const createBid = (data) => {
  return axios.post("/v1/bids/", data);
};

const updateBids = (id) => {
  return axios.put(`/v1/payments/${id}/`).catch((error) => error);
};

const getapprovedBids = () => {
  return axios.get("/v1/bids/?status=approved").catch((err) => err);
};

const getapprovedBid = (id) => {
  return axios.get(`/v1/bids/?loan_request=${id}&status=approved`);
};

const getDeclinedBids = () => {
  return axios.get("/v1/bids/?status=declined").catch((err) => err);
};

const getAllOffersStatus = (requestsArr) => {
  return axios
    .all(requestsArr.map((req) => axios.get(req)))
    .then((responses) => responses.map((res) => res.data))
    .catch((error) => error);
};

const rejectManualListingBids = (requestArr, rejectedMessage) => {
  return axios
    .all(requestArr.map((req) => axios.patch(req,rejectedMessage)))
    .then((responses) => responses.map((res) => console.log(res)));
};

export {
  getBids,
  getBid,
  createBid,
  updateBids,
  getapprovedBid,
  getapprovedBids,
  getDeclinedBids,
  getAllOffersStatus,
  rejectManualListingBids,
};
