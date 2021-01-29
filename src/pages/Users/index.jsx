import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionUsers from "../../component/UsersPage/ActionUsers";
import ListUsers from "../../component/UsersPage/ListUsers";
import ModalUsers from "../../component/UsersPage/ModalUsers";
import PaginationUsers from "../../component/UsersPage/PaginationUsers";
import { getListUserPagination } from "../../redux/actions/usersAction";
import "./Users.scss";
function Users(props) {
  let dispatch = useDispatch();
  let currentPage = useSelector((state) => {
    return state.userReducer.currentPagination;
  });
  useEffect(() => {
    dispatch(getListUserPagination(currentPage));
  }, [currentPage]);
  return (
    <div className="wp__list__user">
      <ActionUsers />
      <ListUsers />
      <PaginationUsers />
      <ModalUsers />
    </div>
  );
}

export default Users;
