import swal from "sweetalert";
import axios from "axios";
function getFilmPagination(page) {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP11&soTrang=${page}&soPhanTuTrenTrang=5`,
      data: null,
    })
      .then((ress) => {
        dispatch(getFilmSuccess(ress.data));
        console.log(ress.data);
      })
      .catch((err) => {
        dispatch(getFilmFailed(err));
        console.log(err);
      });
  };
}
function getFilmSuccess(data) {
  return {
    type: "GET_FILM_SUCCESS",
    payload: data,
  };
}
function getFilmFailed(err) {
  return {
    type: "GET_FILM_FAILED",
    payload: err,
  };
}
export { getFilmPagination };
function handleChangePageRequest(data) {
  return {
    type: "CHANGE_PAGE_REQUEST",
    payload: data,
  };
}
export { handleChangePageRequest };
function handleAddFilmRequest(data) {
  return (dispatch) => {
    axios({
      method: "POST",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      data: data,
    })
      .then((ress) => {
        console.log(ress.data);
        dispatch(handleAddFilmSuccessRedux(ress.data));
        swal(
          "click the button!",
          "Thêm phim thành công!",
          "success"
        ).then((rs) => {});
      })
      .catch((err) => {
        swal("", `${err.response.data}`, "warning");
        console.log(err.response.data);
      });
  };
}
function handleAddFilmSuccessRedux(data) {
  return {
    type: "ADD_FILM_SUCCESS_REDUX",
    payload: data,
  };
}
function handleAddFilmFailed(err) {
  return {
    type: "ADD_FILM_FAILED",
    payload: err,
  };
}
export { handleAddFilmRequest };
function handleDeleteFilmRequest(data) {
  return (dispatch) => {
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    axios({
      method: "DELETE",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${data}`,
      data: data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((ress) => {
        console.log(data);
        dispatch(deleteFilmSuccess(data));
        swal("", "DELETE FILM SUCCESSFULLY", "success");
      })
      .catch((err) => {
        swal("", `${err.response?.data}`, "warning");
        console.log(err.response?.data);
      });
  };
}
function deleteFilmSuccess(data) {
  return {
    type: "DELETE_FILM_SUCCESSFULLY",
    payload: data,
  };
}
export { handleDeleteFilmRequest };
function getInfoFilm(data) {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${data}`,
      data: null,
    })
      .then((ress) => {
        console.log(ress.data);
        dispatch(getInfoFilmSuccess(ress.data));
      })
      .catch((err) => {
        // swal("", `${err.response?.data}`, "warning");
        // console.log(err.response?.data);
        dispatch(getInfoFilmFailed(err));
      });
  };
}
function getInfoFilmSuccess(data) {
  return {
    type: "GET_DETAIL_SUCCESS",
    payload: data,
  };
}
function getInfoFilmFailed(err) {
  return {
    type: "GET_DETAIL_FAILED",
    payload: err,
  };
}
export { getInfoFilm };
function getFilmByID(data) {
  return {
    type: "GET_FILM_BY_ID",
    payload: data,
  };
}
export { getFilmByID };
function handleUpdateFilmRequest(data, history) {
  return (dispatch) => {
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    axios({
      method: "POST",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
      data: data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((ress) => {
        console.log(ress.data);
        swal("Good job!", `EDIT FILM SUCCESSFULLY`, "success").then((next) => {
          history.goBack();
        });
        // dispatch(getInfoFilmSuccess(ress.data));
      })
      .catch((err) => {
        swal("", `${err.response?.data}`, "warning");
        // console.log(err.response?.data);
        // dispatch(getInfoFilmFailed(err));
      });
  };
}
export { handleUpdateFilmRequest };
