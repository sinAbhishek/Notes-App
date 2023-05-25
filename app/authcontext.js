"use client";

const { createContext, useReducer, useEffect } = require("react");

const INTIAL_STATE = { uid: JSON.parse(localStorage.getItem("uid")) || null };

const Authreducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("hit");
      return { uid: action.payload };

    case "LOGOUT":
      return { uid: null };

    default:
      return state;
  }
};

export const Authcontext = createContext(INTIAL_STATE);
export const AuthcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Authreducer, INTIAL_STATE);
  useEffect(() => {
    localStorage.setItem("uid", JSON.stringify(state.uid));
  }, [state.uid]);
  return (
    <Authcontext.Provider value={{ uid: state.uid, dispatch }}>
      {children}
    </Authcontext.Provider>
  );
};
