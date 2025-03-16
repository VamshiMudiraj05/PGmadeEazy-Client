import { useReducer, useEffect } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "./AuthState";
import AuthReducer from "../reducers/AuthReducer";

// Load initial state from localStorage if available
const loadInitialState = () => {
  try {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return savedUser ? {
      isAuthenticated: true,
      user: savedUser,
      userType: savedUser.userType
    } : {
      isAuthenticated: false,
      user: null,
      userType: null
    };
  } catch {
    return {
      isAuthenticated: false,
      user: null,
      userType: null
    };
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, loadInitialState());

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
