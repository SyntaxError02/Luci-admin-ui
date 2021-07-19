import React, { createContext, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import UserReducer from "./reducers/UserReducer";

export const initialState = {
  user: {},
};

export const Context = createContext(initialState);

export const Provider = ({ children }) => {
  const [rootReducerCombined, initialStateCombined] = combineReducers({
    User: [UserReducer, initialState.user],
  });

  const [state, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined
  );
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
