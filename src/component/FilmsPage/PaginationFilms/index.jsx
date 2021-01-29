import React from "react";
import { useSelector } from "react-redux";
import PaginationFilmItem from "../PaginationFilmItem";
import "./PaginationFilms.scss";
function PaginationFilms(props) {
  let currentPage = useSelector((state) => {
    return state.filmReducer.currentPagination;
  });
  let infoFilm = useSelector((state) => {
    return state.filmReducer.infoFilm;
  });
  function renderPagination() {
    console.log(currentPage);
    console.log(infoFilm?.totalCount);
    console.log(infoFilm?.totalPages);
    if (infoFilm?.totalPages <= 10) {
      let arrPagination = [];
      for (let i = 1; i <= infoFilm.totalPages; i++) {
        arrPagination.push(
          <PaginationFilmItem item={i} key={i + "Pagination"} />
        );
      }
      return arrPagination;
    }
  }
  return (
    <div className="paginationFilm">
      <ul className="pagination">
        <div>
          <li>
            <a href="#0">&lt;</a>
          </li>
          {renderPagination()}
          <li>
            <a href="#0">&gt;</a>
          </li>
        </div>
      </ul>
    </div>
  );
}
export default PaginationFilms;
