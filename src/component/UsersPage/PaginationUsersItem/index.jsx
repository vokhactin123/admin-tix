import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPage } from "../../../redux/actions/usersAction";
function PaginationUsersItem(props) {
  let { item } = props;
  let current = useSelector((state) => {
    return state.userReducer.currentPagination;
  });
  let dispatch = useDispatch();
  function handleChangeCurrentPage() {
    dispatch(changeCurrentPage(item));
  }
  return (
    <li onClick={handleChangeCurrentPage}>
      <a className={current === item ? `active` : ""} href="#0">
        {item}
      </a>
    </li>
  );
}

export default PaginationUsersItem;
