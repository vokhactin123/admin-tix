import React from "react";
import "./ListUsers.scss";

import { useSelector } from "react-redux";
import User from "../User";
function ListUsers(props) {
  let listUsers = useSelector((state) => {
    return state.userReducer.listUsers;
  });
  function renderListUser() {
    if (listUsers.length > 0) {
      return listUsers.map((item, index) => {
        return <User item={item} key={index} />;
      });
    }
  }
  return (
    <table className="table table-bordered text-center table__list__user">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Password</th>
          <th scope="col">Email</th>
          <th scope="col">Phone number</th>
          <th scope="col">Type</th>
          <th scope="col">Fullname</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>{renderListUser()}</tbody>
    </table>
  );
}

export default ListUsers;
