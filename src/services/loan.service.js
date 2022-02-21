import axios from "axios";

// Get loan request

const getOffers = () => {
	return axios
		.get("/api/v1/loan_request/")
		.catch((error) => console.log(error));
};

const loanRequestCP = (data) => {
	return axios.post("/api/v1/loan_request/cp/", data).catch((error) => error);
};

const loanRequestBond = (data) => {
	return axios
		.post("/api/v1/loan_request/bonds/", data)
		.catch((error) => error);
};

// Investor list endpoints
const saveInvestorsList = (data) => {
	return axios.post("/v1/lists/investor", data).catch((error) => error);
};

const getInvestorsList = () => {
	return axios
		.get("/v1/lists/investor/")
		.catch((error) => console.log(error));
};

const getInvestor = (id) => {
	return axios
		.get(`/v1/list/investor/${id}/`)
		.catch((error) => console.log(error));
};

// Investors category
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

// Assigning investors to categories and getting investors
const getInvestorsInCategory = () => {
	return axios.get("/v1/investor/").catch((error) => console.log(error));
};

const getInvestorsInCategories = (id) => {
	return axios.get(`/v1/investor/${id}`);
};

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

export { loanRequestCP, loanRequestBond, getOffers };
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
};