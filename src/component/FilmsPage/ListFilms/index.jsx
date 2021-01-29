import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Film from "../Film";
import "./ListFilms.scss";
import { getFilmPagination } from "../../../redux/actions/filmAction";
function ListFilms(props) {
  let listFilms = useSelector((state) => {
    return state.filmReducer.listFilms;
  });
  console.log(listFilms);
  let page = useSelector((state) => {
    return state.filmReducer.currentPagination;
  });
  let itemEachPage = useSelector((state) => {
    return state.filmReducer.infoFilm?.count;
  });
  let emptyItem = 5 * 124 - itemEachPage * 124;
  console.log(emptyItem);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilmPagination(page));
  }, [page]);
  function renderListFilms() {
    return listFilms.map((item, index) => {
      return <Film item={item} key={index} darkMode={props.darkMode} />;
    });
  }
  return (
    <div>
      <table className="table table-bordered table--fixed">
        <thead>
          <tr>
            <th>codeFilm</th>
            <th>nameFilm</th>
            <th>image</th>
            <th>showTime</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>{renderListFilms()}</tbody>
      </table>
      <div style={{ height: `${emptyItem}px` }}></div>
    </div>
  );
}

export default ListFilms;
