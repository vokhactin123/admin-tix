const initialState = {
  currentPagination: 1,
  listFilms: [],
  infoFilm: null,
  detailFilm: null,
  filmSelected: null,
};
const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FILM_SUCCESS": {
      console.log(action.payload);
      let newArrFilms = [...action.payload.items];
      let newCurrentPage = action.payload.currentPage;
      let info = { ...action.payload };
      return {
        ...state,
        currentPagination: newCurrentPage,
        listFilms: newArrFilms,
        infoFilm: info,
      };
    }
    case "ADD_FILM_SUCCESS_REDUX": {
      console.log(action.payload);
      let newFilm = {
        maPhim: action.payload.maPhim,
        tenPhim: action.payload.tenPhim,
        biDanh: action.payload.biDanh,
        trailer: action.payload.trailer,
        hinhAnh: action.payload.hinhAnh,
        moTa: action.payload.moTa,
        ngayKhoiChieu: action.payload.ngayKhoiChieu,
        maNhom: action.payload.maNhom,
        danhGia: action.payload.danhGia,
      };
      let newFilmClone = { ...newFilm };
      state.listFilms.push(newFilmClone);
      let newList = [...state.listFilms];
      return { ...state, listFilms: newList };
    }
    case "CHANGE_PAGE_REQUEST": {
      return { ...state, currentPagination: action.payload };
    }
    case "DELETE_FILM_SUCCESSFULLY": {
      console.log(action.payload);
      let newArrFilm = state.listFilms.filter((item) => {
        return item.maPhim !== action.payload;
      });
      return { ...state, listFilms: newArrFilm };
    }
    case "GET_DETAIL_SUCCESS": {
      let newDetail = { ...action.payload };
      return { ...state, detailFilm: newDetail };
    }
    case "GET_FILM_BY_ID": {
      let filmSelected = state.listFilms.filter((item) => {
        return item.maPhim === action.payload;
      });
      filmSelected = filmSelected[0];
      return { ...state, filmSelected };
    }
    default:
      return { ...state };
  }
};
export default filmReducer;
