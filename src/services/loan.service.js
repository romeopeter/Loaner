import axios from "axios";

// LOAN REQUEST
const getOffers = () => {
    return axios.get("/v1/loan_request/").catch((error) => console.log(error));
};

const getOffer = (dealType, id) => {
    return axios.get(`/v1/loan_request/${dealType}/${id}`).catch((error) => error);
};

const editOffer = (dealType, id, requestData) => {
    return axios.patch(`/v1/loan_request/${dealType}/${id}/`, requestData).catch((error) => error);
};

const loanRequestCP = (data) => {
    return axios.post("/v1/loan_request/cp/", data).catch((error) => error);
};

const loanRequestBond = (data) => {
    return axios.post("/v1/loan_request/bonds/", data).catch((error) => error);
};

const loanRequestAddInvestor = (id, data) => {
    return axios
        .patch(`/v1/loan_request/add_investors/${id}/`, data)
        .catch((error) => error);
};

const loanRequestPublish = (id) => {
    return axios.get(`/v1/loan_request/${id}/publish/`).catch((error) => error);
};

// INVESTOR LIST
const saveInvestorsList = (data) => {
    return axios.post("/v1/lists/investors/", data).catch((error) => error);
};

const getInvestorsList = () => {
    return axios
        .get("/v1/lists/investors/")
        .catch((error) => console.log(error));
};

const getInvestor = (id) => {
    return axios
        .get(`/v1/list/investors/${id}/`)
        .catch((error) => console.log(error));
};

// INVESTOR CATEGORY
const getInvestorsCategories = () => {
    return axios
        .get("/v1/investor_category/")
        .catch((error) => console.log(error));
};

const createInvestorsCategories = () => {
    return axios
        .post("/v1/investor_category/")
        .catch((error) => console.log(error));
};

const getInvestorsCategory = (id) => {
    return axios
        .get(`/v1/investor_category/${id}/`)
        .catch((error) => console.log(error));
};

// INVESTOR
const getInvestorsInCategory = () => {
    return axios.get("/v1/investor/").catch((error) => console.log(error));
};

const getInvestorsInCategories = (id) => {
    return axios.get(`/v1/investor/${id}/`);
};
const getInvestorAllOffers = (id) => {
    return axios.get(`/v1/investor/${id}/loan_requests/`);
};

// INVESTOR CATEGORY ASSIGN
const mergeInvestorsInCategories = (requestsArr) => {
    return axios
        .all(requestsArr.map((request) => axios.get(request)))
        .then((responses) => responses.map((response) => response.data))
        .catch((error) => error);
};

const assignInvestorsToCategories = () => {
    return axios
        .post("/v1/investor_category_assign/")
        .catch((error) => console.log(error));
};


export {
    loanRequestCP,
    loanRequestBond,
    getOffers,
    getOffer,
    editOffer,
    loanRequestAddInvestor,
    loanRequestPublish,
};
export { saveInvestorsList, getInvestorsList, getInvestor };
export {
    getInvestorsCategories,
    createInvestorsCategories,
    getInvestorsCategory,
};
export {
    getInvestorsInCategory,
    getInvestorsInCategories,
    mergeInvestorsInCategories,
    assignInvestorsToCategories,
    getInvestorAllOffers,
};