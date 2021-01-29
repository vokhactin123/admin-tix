import React from "react";
import "./ActionFilms.scss";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgPlayListAdd } from "react-icons/cg";
import { FormControlLabel, Switch } from "@material-ui/core";

function ActionFilms(props) {
  let { handleSwitch } = props;
  return (
    <div className="wp__action">
      <a
        href="#"
        className="button pulse"
        data-toggle="modal"
        data-target="#ModalFilm"
      >
        <CgPlayListAdd />
        <span className="ml-2">Add film</span>
      </a>
      <FormControlLabel
        control={
          <Switch
            checked={props.darkMode}
            onChange={() => handleSwitch(!props.darkMode)}
            name="checkedA"
          />
        }
      />
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

export default ActionFilms;
