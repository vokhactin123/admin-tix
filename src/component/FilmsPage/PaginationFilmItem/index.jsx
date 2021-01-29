import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PaginationFilmItem.scss";
import { handleChangePageRequest } from "../../../redux/actions/filmAction";
function PaginationFilmItem(props) {
  let dispatch = useDispatch();
  let current = useSelector((state) => {
    return state.filmReducer.currentPagination;
  });
  let { item } = props;
  function handleChangePage() {
    dispatch(handleChangePageRequest(item));
  }
  return (
    <li onClick={handleChangePage}>
      <a className={current === item ? `active` : ""} href="#0">
        {item}
      </a>
    </li>
  );
}

export default PaginationFilmItem;
