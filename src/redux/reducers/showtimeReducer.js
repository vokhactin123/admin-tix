const initialState = {
  listFilm: [],
  idFilm: null,
  infoFilmSelected: null,
  listCinemaSys: [],
  cinemaBrand: [],
  listCinemaRoom: [],
  listLogoByFilm: [],
  listCinemaBrandHasFilm: [],
  listShowtimeOneFilm: [],
};
const showtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_FILM_SUCCESS": {
      // console.log(action.payload);
      let newListFilm = [...action.payload];
      return { ...state, listFilm: newListFilm };
    }
    case "GET_ID_FILM": {
      return { ...state, idFilm: action.payload };
    }
    case "GET_LIST_CINAMA_SUCCESS": {
      let newListCinemaSys = [...action.payload];
      return { ...state, listCinemaSys: newListCinemaSys };
    }
    case "GET_CINEMA_BRAND_SUCCESS": {
      let newListCinemaBrand = [...action.payload];
      return { ...state, cinemaBrand: newListCinemaBrand };
    }
    case "GET_CINEMA_ROOM": {
      let listRoomCinema = state.cinemaBrand.filter((item) => {
        return action.payload === item.maCumRap;
      })[0].danhSachRap;
      let newListCinemaRoom = [...listRoomCinema];
      return { ...state, listCinemaRoom: newListCinemaRoom };
    }
    case "FETCH_FILM_SUCCESS": {
      let newInfoFilm = { ...action.payload };
      let listLogo = action.payload.heThongRapChieu.map((item) => ({
        maHeThongRap: item.maHeThongRap,
        logo: item.logo,
      }));
      listLogo.filter((item, index) => listLogo.indexOf(item) === index);
      let newListLogo = [...listLogo];
      return {
        ...state,
        listLogoByFilm: newListLogo,
        infoFilmSelected: newInfoFilm,
      };
    }
    case "GET_INFO_FILM_BY_ID_LOGO": {
      let ListSameCinemaBrand = state.infoFilmSelected.heThongRapChieu?.filter(
        (item) => {
          return item.maHeThongRap === action.payload;
        }
      )[0]?.cumRapChieu;
      let listCine = [...ListSameCinemaBrand].map((item, index) => {
        return item.tenCumRap;
      });
      console.log(listCine);
      return {
        ...state,
        listCinemaBrandHasFilm: listCine,
      };
    }
    case "RESET_CINEMA_INFO": {
      // state.listCinemaBrand = [];
      state.listShowtimeOneFilm = [];
      return { ...state };
    }
    case "GET_BRAND_SELECTED": {
      let cumRap = state.cinemaBrand.filter((item) => {
        return item.maCumRap === action.payload;
      });
      let tenCumRap = cumRap[0].tenCumRap;
      state.listCinemaBrandHasFilm.push(tenCumRap);
      let newList = [...state.listCinemaBrandHasFilm];
      return {
        ...state,
        listCinemaBrandHasFilm: newList,
      };
    }
    default:
      return { ...state };
  }
};
export default showtimeReducer;
