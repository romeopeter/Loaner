import axios from "axios";

/*Authentication requests*/
const signUpRequest = (data) => {
  return axios.post("v1/registration/sign_up/", data).catch((error) => {
    return error;
  });
};

const signInRequest = (data) => {
  return axios.post("/v1/registration/sign_in/", data).catch((error) => error);
};

export { signUpRequest, signInRequest };
