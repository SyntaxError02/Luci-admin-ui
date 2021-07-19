import { GET_USERS, UPDATE_USER } from "../action";
import { asyncActions } from "../utils/AsyncUtils";
import axios from "../utils/axios";

export const getUsers = (dispatch, page) => {
  dispatch(asyncActions(GET_USERS).loading(true));
  return axios({
    method: "get",
    url: `users?page=${page}`,
  })
    .then((response) => {
      dispatch(asyncActions(GET_USERS).loading(false));
      if (response.status === 200) {
        const { data } = response;
        dispatch(asyncActions(GET_USERS).success(data.rows));
        dispatch(asyncActions(GET_USERS).loading(false));
        return data;
      }
    })
    .catch((error) => {
      dispatch(asyncActions(GET_USERS).loading(false));
      dispatch(asyncActions(GET_USERS).failure(true, error.response));
      return error.response;
    });
};

export const updateUser = (dispatch, id, payload) => {
  dispatch(asyncActions(UPDATE_USER).loading(true));
  return axios({
    method: "patch",
    url: `users/${id}`,
    data: payload,
  })
    .then((response) => {
      dispatch(asyncActions(UPDATE_USER).loading(false));
      if (response.status === 200) {
        const { data } = response;
        dispatch(asyncActions(UPDATE_USER).success(data));
        dispatch(asyncActions(UPDATE_USER).loading(false));
      }
      return response.data;
    })
    .catch((error) => {
      dispatch(asyncActions(UPDATE_USER).loading(false));
      dispatch(asyncActions(UPDATE_USER).failure(true, error.response));
      return error.response;
    });
};
