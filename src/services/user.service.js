import axios from 'axios';

import authHeader from './authHeader';

const API_URL = 'https://order-book-online.herokuapp.com';

const getUsers = () => {
    return axios.get(`${API_URL}/api/v1/users/`, { headers: authHeader });
};

const getUser = (id) => {
    return axios.get(`${API_URL}/api/v1/users/${id}`, { headers: authHeader });
};

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/api/v1/users/${id}`, { headers: authHeader });
};

export { getUsers, getUser, deleteUser };
