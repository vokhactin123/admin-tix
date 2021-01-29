import React from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteUserByUsername } from "../../../redux/actions/usersAction";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import { getUserByUsername } from "../../../redux/actions/usersAction";
function User(props) {
  let dispatch = useDispatch();
  let { item } = props;
  const handleDeleteUser = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUserByUsername(item.taiKhoan));
      }
    });
  };
  const handleRedirect = () => {
    dispatch(getUserByUsername(item.taiKhoan));
  };
  return (
    <tr>
      <td scope="row">{item.taiKhoan}</td>
      <td>{item.matKhau}</td>
      <td>{item.email}</td>
      <td>{item.soDt}</td>
      <td>{item.maLoaiNguoiDung}</td>
      <td>{item.hoTen}</td>
      <td>
        <a
          href="#delete"
          className="button buttonDel pulse"
          onClick={handleDeleteUser}
        >
          <MdDelete size="1.3em" />
        </a>
        <NavLink
          to="/Admin/Update"
          className="button buttonUp pulse"
          onClick={handleRedirect}
        >
          <AiFillEdit size="1.3em" />
        </NavLink>
      </td>
    </tr>
  );
}

export default User;
