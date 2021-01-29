import React from "react";
import "./MenuHeader.scss";
import { RiFileUserFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";

function MenuHeader(props) {
  let status = useSelector((state) => {
    return state.loginReducer.statusLogin;
  });
  const user = JSON.parse(localStorage.getItem("userAdmin"));
  return (
    <div className="menu-container">
      <nav className="nav__header">
        <ul className="menu__toggle">
          <li className="dropdown dropdown-10">
            <span className="mr-1">{user || status ? user.taiKhoan : ""}</span>
            <i className="fa fa-angle-down" />
            <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-10">
              <li className="dropdown_item-1">
                <RiFileUserFill />
                <span className="ml-1">Profile</span>
              </li>
              <li className="dropdown_item-2">
                <a>
                  <FiLogOut />
                  <span className="ml-1">Logout</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuHeader;
