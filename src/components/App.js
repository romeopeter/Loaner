import { useDispatch } from "react-redux";
import axios from "axios";

import AppRoutes from "./AppRoutes";
import AppErrorBoundary from "./AppErrorBoundary";

import { signOutAsync } from "../redux/authSlice";
import {setClientMessage} from "../redux/messageSlice.js";

function App() {
  const userObj = JSON.parse(localStorage.getItem("USER"));
  const dispatch = useDispatch();

  // Set default endpoint URL and Authorization key
  axios.defaults.baseURL = "https://order-book-online.herokuapp.com/";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = undefined;

  if (userObj !== null && userObj !== false) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userObj.tokens.access}`;

  // Interceptor checks response for expire on invalid token
  const requestsInterceptor = axios.interceptors.response.use(
    () => {},
    function (error) {
        const response = error.response;

        if (response.status === 401 && response.statusText === "Unauthorized") {
            const message = dispatch(
                setClientMessage({
                    status: 401,
                    messageType: "token_not_valid",
                    message: "Unauthorized: Token is invalid or expired",
                    detail: "Login token is expired. Please sign in",
                })
            );

            const messageObj = typeof message.payload === "object" && message.payload

            if (messageObj !== false) {
                if (messageObj.messageType !== undefined && messageObj.messageType === "token_not_valid") {
                    // Sign user out
                    dispatch(signOutAsync());
                    
                    // Redirect login page
                    // navigate("/login");
                }
            }
        }
    }
  );

    // Remove interceptors
  axios.interceptors.response.eject(requestsInterceptor)

  return (
    <AppErrorBoundary>
      <AppRoutes />
    </AppErrorBoundary>
  );
}

export default App;
