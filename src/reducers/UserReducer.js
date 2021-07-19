import { GET_USERS, UPDATE_USER } from "../action";
import { initialState } from "../store";
import { asyncActionName } from "../utils/AsyncUtils";

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case asyncActionName(GET_USERS).loading:
      return { ...state, loading: payload };
    case asyncActionName(GET_USERS).success:
      return {
        ...state,
        users: payload,
        success: true,
      };
    case asyncActionName(GET_USERS).failure:
      return {
        ...state,
        error: payload.status,
        success: false,
      };
    case asyncActionName(UPDATE_USER).loading:
      return { ...state, loading: payload };
    case asyncActionName(UPDATE_USER).success:
      return {
        ...state,
        user: payload,
        success: true,
      };
    case asyncActionName(UPDATE_USER).failure:
      return {
        ...state,
        error: payload.status,
        success: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
