const initialState = {
  statusLogin: false,
  errorName: null,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOGIN_SUCCESS": {
      return { ...state, statusLogin: action.payload, errorName: null };
    }
    case "GET_LOGIN_FAILED": {
      return { ...state, errorName: action.payload };
    }
    default:
      return { ...state };
  }
};
export default loginReducer;
