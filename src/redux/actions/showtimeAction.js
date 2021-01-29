import axios from "axios";
import swal from "sweetalert";
function getListFilmRequest() {
  return (dispatch) => {
    axios({
      method: "GET",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP11",
      data: null,
    })
      .then((ress) => {
        dispatch(getListFilmSuccess(ress.data));
        console.log(ress.data);
      })
      .catch((err) => {
        dispatch(getListFilmFailed(err));
        console.log(err);
      });
  };
}
function getListFilmSuccess(data) {
  return {
    type: "GET_LIST_FILM_SUCCESS",
    payload: data,
  };
}
function getListFilmFailed(err) {
  return {
    type: "GET_LIST_FILM_FAILED",
    payload: err,
  };
}
export { getListFilmRequest };
function getListCinemaRequest() {
  return (dispatch) => {
    axios({
      method: "GET",
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      data: null,
    })
      .then((ress) => {
        dispatch(getListCinemaSuccess(ress.data));
        console.log(ress.data);
      })
      .catch((err) => {
        dispatch(getListCinemaFailed(err));
        console.log(err);
      });
  };
}
function getListCinemaSuccess(data) {
  return {
    type: "GET_LIST_CINAMA_SUCCESS",
    payload: data,
  };
}
function getListCinemaFailed(err) {
  return {
    type: "GET_LIST_CINEMA_FAILED",
    payload: err,
  };
}
export { getListCinemaRequest };
function getListCinemaBrandById(data) {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${data}`,
      data: null,
    })
      .then((ress) => {
        dispatch(getListCinemaBrandSuccess(ress.data));
        console.log(ress.data);
      })
      .catch((err) => {
        dispatch(getListCinemaBrandFailed(err));
        console.log(err);
      });
  };
}
function getListCinemaBrandSuccess(data) {
  return {
    type: "GET_CINEMA_BRAND_SUCCESS",
    payload: data,
  };
}
function getListCinemaBrandFailed(err) {
  return {
    type: "GET_CINEMA_BRAND_FAILED",
    payload: err,
  };
}
export { getListCinemaBrandById };
function getListCinemaRoomNumberById(data) {
  return {
    type: "GET_CINEMA_ROOM",
    payload: data,
  };
}
export { getListCinemaRoomNumberById };
function handleCreateShowTime(data, maPhim) {
  return (dispatch) => {
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    console.log(data);
    axios({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
      data: data,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((ress) => {
        console.log(ress.data);
        swal("Good job!", `${ress.data}`, "success").then(() => {
          dispatch(FetchInfoFilmById(maPhim));
        });
      })
      .catch((err) => {
        swal("click the button!", `${err.response.data}`, "warning");
      });
  };
}
export { handleCreateShowTime };
function FetchInfoFilmById(data) {
  return (dispatch) => {
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    axios({
      method: "GET",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${data}`,
      data: null,
      headers: {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      },
    })
      .then((ress) => {
        console.log(ress.data);
        dispatch(fetchFilmSuccess(ress.data));
      })
      .catch((err) => {
        dispatch(fetchFilmFailed(err));
      });
  };
}
function fetchFilmSuccess(data) {
  return {
    type: "FETCH_FILM_SUCCESS",
    payload: data,
  };
}
function fetchFilmFailed(err) {
  return {
    type: "FETCH_FILM_FAILED",
    payload: err,
  };
}
export { FetchInfoFilmById };
function handleFilmSelected(data) {
  return {
    type: "GET_ID_FILM",
    payload: data,
  };
}
export { handleFilmSelected };
function FetchInfoCinemaByClick(data) {
  return {
    type: "GET_INFO_FILM_BY_ID_LOGO",
    payload: data,
  };
}
export { FetchInfoCinemaByClick };
function resetCinemaInfo() {
  return {
    type: "RESET_CINEMA_INFO",
  };
}
export { resetCinemaInfo };
function getBrandSelected(maCumRap) {
  return {
    type: "GET_BRAND_SELECTED",
    payload: maCumRap,
  };
}
export { getBrandSelected };
