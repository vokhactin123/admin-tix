import axios from "axios";
import swal from "sweetalert";
function handleLogin(data, history) {
  return (dispatch) => {
    axios({
      method: "post",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: data,
    })
      .then((ress) => {
        console.log(ress.data.maLoaiNguoiDung);
        if (ress.data.maLoaiNguoiDung === "QuanTri") {
          localStorage.setItem("userAdmin", JSON.stringify(ress.data));
          history.push("/Admin");
          dispatch(handleLoginSuccess(true));
        } else {
          swal("", "You don't have permission!", "warning");
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoginFailed(err.response?.data));
        console.log(err.response);
      });
  };
}
function handleLoginSuccess(data) {
  return {
    type: "GET_LOGIN_SUCCESS",
    payload: data,
  };
}
function handleLoginFailed(data) {
  return {
    type: "GET_LOGIN_FAILED",
    payload: data,
  };
}
export { handleLogin };
