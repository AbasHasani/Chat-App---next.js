import React, { createContext, useContext, useReducer } from "react";
interface StateType {
  user: User | {};
  imageURL: string;
}
interface User {
  name: string;
  room: string;
}
const initialState: StateType = {
  user: {},
  imageURL: "",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "NEW_USER":
      return {
        ...state,
        user: { name: action.payload.name, room: action.payload.room },
      };
    case "ADD_AVATART":
      return { ...state, imageURL: action.payload };
    default:
      return state;
  }
};

//@ts-ignore
export const StateContext = createContext();
export function StateProvider({ children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
