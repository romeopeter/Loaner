import axios from 'axios';

// LOAN REQUEST
const getOffers = () => {
    return axios.get('/v1/loan_request/').catch((error) => console.log(error));
};

const loanRequestCP = (data) => {
    return axios.post('/v1/loan_request/cp/', data).catch((error) => error);
};

const loanRequestBond = (data) => {
    return axios.post('/v1/loan_request/bonds/', data).catch((error) => error);
};
// BULK INVESTORS
const uploadBulkInvestors = (data) => {
    return axios.post('v1/registration/sign_up/in_bulk/', data).catch((error) => error);
};

// INVESTOR LIST
const saveInvestorsList = (data) => {
    return axios.post('/v1/lists/investors/', data).catch((error) => error);
};

const getInvestorsList = () => {
    return axios.get('/v1/lists/investors/').catch((error) => console.log(error));
};

const getInvestor = (id) => {
    return axios.get(`/v1/list/investors/${id}/`).catch((error) => console.log(error));
};

// INVESTOR cATEGORY
const getInvestorsCategories = () => {
    return axios.get('/v1/investor_category/').catch((error) => console.log(error));
};

const createInvestorsCategories = () => {
    return axios.post('/v1/investor_category/').catch((error) => console.log(error));
};

const getInvestorsCategory = (id) => {
    return axios.get(`/v1/investor_category/${id}/`).catch((error) => console.log(error));
};

// INVESTOR
const getInvestorsInCategory = () => {
    return axios.get('/v1/investor/').catch((error) => console.log(error));
};

const getInvestorsInCategories = (id) => {
    return axios.get(`/v1/investor/${id}`);
};

// INVESTOR CATEGORY ASSIGN
const mergeInvestorsInCategories = (requestsArr) => {
    return axios
        .all(requestsArr.map((request) => axios.get(request)))
        .then((responses) => responses.map((response) => response.data))
        .catch((error) => error);
};

const assignInvestorsToCategories = () => {
    return axios.post('/v1/investor_category_assign/').catch((error) => console.log(error));
};

export { loanRequestCP, loanRequestBond, getOffers };
export { saveInvestorsList, getInvestorsList, getInvestor, uploadBulkInvestors };
export { getInvestorsCategories, createInvestorsCategories, getInvestorsCategory };
export { getInvestorsInCategory, getInvestorsInCategories, mergeInvestorsInCategories, assignInvestorsToCategories };
