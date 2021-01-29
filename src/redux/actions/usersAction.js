import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
function getListUserPagination(page) {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=7`,
      data: null,
    })
      .then((ress) => {
        dispatch(getListUserPaginationSuccess(ress.data));
      })
      .catch((err) => {
        console.log(err.response?.data);

        dispatch(getListUserPaginationFailed(err));
      });
  };
}
function getListUserPaginationSuccess(data) {
  return {
    type: "GET_LIST_USER_SUCCESS",
    payload: data,
  };
}
function getListUserPaginationFailed(err) {
  return {
    type: "GET_LIST_USER_FAILED",
    payload: err,
  };
}
export { getListUserPagination };
function changeCurrentPage(data) {
  return {
    type: "CHANGE_CURRENT_PAGE",
    payload: data,
  };
}
export { changeCurrentPage };
function addNewUser(data, reset) {
  return (dispatch) => {
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    axios({
      method: "POST",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      data: data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((ress) => {
        dispatch(addNewUserSuccess(ress.data));
        console.log(ress.data);
        swal("ADD SUCCESSFULLY!", "click button to close!", "success");
      })
      .catch((err) => {
        console.log(err.response.data);
        swal("", `${err.response.data}`, "warning");
        dispatch(addNewUserFailed(err.response.data));
      });
  };
}
function addNewUserSuccess(data) {
  return {
    type: "ADD_USER_SUCCESS",
    payload: data,
  };
}
function addNewUserFailed(err) {
  return {
    type: "ADD_USER_FAILED",
    payload: err,
  };
}
export { addNewUser };
function deleteUserByUsername(data) {
  return (dispatch) => {
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    axios({
      method: "DELETE",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${data}`,
      data: data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((ress) => {
        dispatch(deleteUserSuccess(data));
        swal("DELETE SUCCESSFULLY!", "click button to close!", "success");
      })
      .catch((err) => {
        console.log(err.response.data);
        swal("", `${err.response.data}`, "warning");
      });
  };
}
function deleteUserSuccess(data) {
  return {
    type: "DELETE_USER_SUCCESS",
    payload: data,
  };
}
function deleteUserFailed(err) {
  return {
    type: "DELETE_USER_FAILED",
    payload: err,
  };
}
export { deleteUserByUsername };
function getUserByUsername(data) {
  return {
    type: "GET_USER_BY_USERNAME",
    payload: data,
  };
}
export { getUserByUsername };
function updateUser(data, history) {
  return (dispatch) => {
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    axios({
      method: "PUT",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data: data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((ress) => {
        console.log(ress.data);
        swal("", "UPDATE USER SUCCESS", "success").then(() => {
          history.goBack();
        });
      })
      .catch((err) => {
        console.log(err.response?.data);
        swal("", `${err.response?.data}`, "warning");
      });
  };
}
export { updateUser };
function getInfoAdminCurrently(data) {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${data}`,
      data: null,
    })
      .then((ress) => {
        console.log(ress.data);
        dispatch(getUserCurrentlySuccess(ress.data, data));
      })
      .catch((err) => {
        dispatch(getUserCurrentlyFailed(err));
        console.log(err);
      });
  };
}
function getUserCurrentlySuccess(data1, data2) {
  return {
    type: "GET_CURRENT_USER_SUCCESS",
    payload1: data1,
    payload2: data2,
  };
}
function getUserCurrentlyFailed(err) {
  return {
    type: "GET_CURRENT_USER_FAILED",
    payload: err,
  };
}
export { getInfoAdminCurrently };
