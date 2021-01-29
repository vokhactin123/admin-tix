import React from "react";
import "./Sidebar.scss";
import { MdHome } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { MdMovie } from "react-icons/md";
import { SiCinema4D } from "react-icons/si";
import { IoCalendar } from "react-icons/io5";
import { RiArrowDropRightLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
function Sidebar(props) {
  return (
    <div className="menu">
      <div className="wp__logo">
        <img src="../../../images/logo.png" alt />
      </div>
      <div>
        <input type="radio" defaultChecked name="radio" id="item1" />
        <label className="menu__item" htmlFor="item1">
          <div className="menu__item--name">
            <MdHome size="1.2em" />
            <span>Dashboard</span>
          </div>
        </label>
      </div>
      <div>
        <input type="radio" name="radio" id="item2" />
        <label htmlFor="item2" className="menu__item">
          <div className="menu__item--name">
            <BsPeopleFill size="1.2em" />
            <span>Thành viên</span>
            <span className="fas fa-angle-right">
              <RiArrowDropRightLine size="2em" />
            </span>
          </div>
          <div className="menu__item--content">
            <ul>
              <li>
                <NavLink to="/Admin">Danh sách người dùng</NavLink>
              </li>
              <li>
                <NavLink to="/Admin/Profile">Thông tin người dùng</NavLink>
              </li>
              <li>
                <NavLink to="/Admin">Thông tin đặt vé</NavLink>
              </li>
            </ul>
          </div>
        </label>
      </div>
      <div>
        <input type="radio" name="radio" id="item3" />
        <label htmlFor="item3" className="menu__item">
          <div className="menu__item--name">
            <MdMovie size="1.2em" />
            <span>Phim</span>
            <span className="fas fa-angle-right">
              <RiArrowDropRightLine size="2em" />
            </span>
          </div>
          <div className="menu__item--content">
            <ul>
              <li>
                <NavLink to="/Admin/ListFilms">Danh sách phim</NavLink>
              </li>
              <li>
                <a href="#">Phim đang chiếu</a>
              </li>
              <li>
                <a href="#">Phim sắp chiếu</a>
              </li>
            </ul>
          </div>
        </label>
      </div>
      <div>
        <input type="radio" name="radio" id="item4" />
        <label htmlFor="item4" className="menu__item">
          <div className="menu__item--name">
            <SiCinema4D size="1.2em" />
            <span>Lịch chiếu</span>
            <span className="fas fa-angle-right">
              <RiArrowDropRightLine size="2em" />
            </span>
          </div>
          <div className="menu__item--content">
            <ul>
              <li>
                <NavLink to="/Admin/Showtime">Thêm lịch chiếu</NavLink>
              </li>
              <li>
                <a href="#">Danh sách rạp</a>
              </li>
              <li>
                <a href="#">Thống kê</a>
              </li>
            </ul>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Sidebar;
