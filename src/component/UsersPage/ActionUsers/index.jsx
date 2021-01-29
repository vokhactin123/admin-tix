import React from "react";
import "./ActionUsers.scss";
import { AiOutlineUserAdd } from "react-icons/ai";
function ActionUsers(props) {
  return (
    <div className="wp__action">
      <a
        href="#"
        className="button pulse"
        data-toggle="modal"
        data-target="#addUser"
      >
        <AiOutlineUserAdd />
        <span className="ml-2">Add user</span>
      </a>
      <div className="flexbox">
        <div className="searchUser">
          <div>
            <input type="text" placeholder="Search . . ." required />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionUsers;
