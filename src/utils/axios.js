import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

if (localStorage.getItem("token")) {
  axios.defaults.headers.common.Authorization =
    "Bearer " + localStorage.getItem("token");
} else {
  delete axios.defaults.headers.common.Authorization;
}

export default axios;
