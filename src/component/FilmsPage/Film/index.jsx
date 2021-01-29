import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdDetails } from "react-icons/md";
import format from "date-format";
import "./Film.scss";
import { useDispatch } from "react-redux";
import { handleDeleteFilmRequest } from "../../../redux/actions/filmAction";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory } from "react-router-dom";
import { getInfoFilm } from "../../../redux/actions/filmAction";
import { getFilmByID } from "../../../redux/actions/filmAction";
function Film(props) {
  let { item } = props;
  let history = useHistory();
  let dispatch = useDispatch();
  function handleDeleteFilm() {
    dispatch(handleDeleteFilmRequest(parseInt(item.maPhim)));
  }
  const useStyles = makeStyles({
    changeColor: {
      color: props.darkMode ? "white" : "#000",
    },
  });
  function handleRedirectDetail() {
    // history.push("/Admin/DetailFilm");
    dispatch(getInfoFilm(item.maPhim));
  }
  function handleRedirectEdit() {
    dispatch(getFilmByID(item.maPhim));
  }
  const classes = useStyles();
  let string = "http://movie0706.cybersoft.edu.vn/hinhanh/";
  return (
    <tr>
      <td className={classes.changeColor} scope="row">
        {item?.maPhim}
      </td>
      <td className={classes.changeColor}>{item?.tenPhim}</td>
      <td className={classes.changeColor}>
        <a className="wp__thumb">
          <img
            style={{ height: "100px" }}
            src={
              item?.hinhAnh.search(string)
                ? string + item?.hinhAnh
                : item?.hinhAnh
            }
            alt="anh"
          />
        </a>
      </td>
      <td className={classes.changeColor}>
        {format("yyyy/MM/dd", new Date(item.ngayKhoiChieu))}
      </td>
      <td>
        <a
          onClick={handleDeleteFilm}
          href="#delete"
          className="button buttonDel pulse"
          //   onClick={handleDeleteUser}
        >
          <MdDelete size="1.3em" />
        </a>
        <NavLink
          to={`/Admin/EditFilm/${item?.maPhim}`}
          className="button buttonUp pulse"
          onClick={handleRedirectEdit}
        >
          <AiFillEdit size="1.3em" color="white" />
        </NavLink>
        <NavLink
          to={`/Admin/DetailFilm/${item?.maPhim}`}
          className="button buttonDetail pulse"
          onClick={handleRedirectDetail}
        >
          <MdDetails size="1.3em" color="white" />
        </NavLink>
      </td>
    </tr>
  );
}

export default Film;
