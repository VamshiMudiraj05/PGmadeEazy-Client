// src/reducers/AuthReducer.jsx

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        userType: action.payload.userType // Assuming your user object has userType
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userType: null
      };
    default:
      return state;
  }
};

export default AuthReducer;
