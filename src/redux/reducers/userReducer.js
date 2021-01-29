import { InvertColorsOff } from "@material-ui/icons";
import { act } from "react-dom/test-utils";

const initialState = {
  currentPagination: 1,
  listUsers: [],
  infoPagination: null,
  status: true,
  userSelected: null,
  currentlyUser: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_USER_SUCCESS": {
      let info = { ...action.payload };
      let listUsers = [...action.payload.items];
      console.log(listUsers);
      let currentPage = action.payload.currentPage;
      return {
        ...state,
        listUsers,
        currentPagination: currentPage,
        infoPagination: info,
      };
    }
    case "CHANGE_CURRENT_PAGE": {
      console.log(action.payload);
      return { ...state, currentPagination: action.payload };
    }
    case "DELETE_USER_SUCCESS": {
      console.log(action.payload);
      let newArrUser = state.listUsers.filter((item) => {
        return item.taiKhoan !== action.payload;
      });
      return { ...state, listUsers: newArrUser };
    }
    case "GET_USER_BY_USERNAME": {
      console.log(action.payload);
      console.log(state.listUsers);
      console.log(state.currentlyUser);
      let userSelected = state.listUsers.filter((item) => {
        return item.taiKhoan === action.payload;
      });
      if (userSelected.length > 0) {
        userSelected = userSelected[0];
      }
      if (userSelected.length === 0) {
        if (state.currentlyUser) {
          console.log(state.currentlyUser);
          let info = {
            taiKhoan: state.currentlyUser.taiKhoan,
            matKhau: state.currentlyUser.matKhau,
            email: state.currentlyUser.email,
            soDt: state.currentlyUser.soDt,
            maNhom: "GP01",
            maLoaiNguoiDung: state.currentlyUser.maLoaiNguoiDung,
            hoTen: state.currentlyUser.hoTen,
          };
          let newInfo = { ...info };

          userSelected = newInfo;
          console.log(userSelected);
        }
      }
      return { ...state, userSelected };
    }
    case "GET_CURRENT_USER_SUCCESS": {
      console.log(action.payload);
      action.payload1 = action.payload1.filter((item) => {
        return item.taiKhoan === action.payload2;
      });
      let newInfo;
      if (action.payload1.length > 0) {
        newInfo = { ...action.payload1[0] };
      }

      return { ...state, currentlyUser: newInfo };
    }
    default:
      return { ...state };
  }
};
export default userReducer;
