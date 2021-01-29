import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ShowtimeStatistical.scss";
import { FetchInfoFilmById } from "../../../redux/actions/showtimeAction";
import { FetchInfoCinemaByClick } from "../../../redux/actions/showtimeAction";
import { makeStyles } from "@material-ui/core/styles";
import format from "date-format";
const useStyles = makeStyles({
  styleTypograp: {
    fontSize: "14px",
  },
  styleReleaseDate: {
    marginLeft: "10px",
  },
});
function ShowtimeStatistical(props) {
  const classes = useStyles();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchInfoFilmById(props.maPhim));
  }, [props.maPhim]);
  let listLogo = useSelector((state) => {
    return state.showtimeReducer.listLogoByFilm;
  });
  let listCinemaBrand = useSelector((state) => {
    return state.showtimeReducer.listCinemaBrandHasFilm;
  });
  function handleChangeInFoStatic(data) {
    dispatch(FetchInfoCinemaByClick(data));
  }
  function renderLogoCinema() {
    if (listLogo.length > 0) {
      return listLogo.map((item, index) => {
        return (
          <li
            key={index}
            className="logo__item"
            onClick={() => handleChangeInFoStatic(item.maHeThongRap)}
          >
            <img src={item.logo} alt="logo" width="50px" />
          </li>
        );
      });
    } else {
      return <p className="text-center">Chưa có thông tin rạp!</p>;
    }
  }

  let releaseDate = useSelector((state) => {
    return state.showtimeReducer?.infoFilmSelected?.ngayKhoiChieu;
  });
  function renderListCinemaBrand() {
    if (listCinemaBrand.length > 0) {
      return listCinemaBrand.map((item, index) => {
        return (
          <li key={index}>
            <Typography className={classes.styleTypograp}>{item}</Typography>
          </li>
        );
      });
    }
  }
  return (
    <React.Fragment>
      <ul className="wp__statisticalCinema">
        <li className="listStaticCinema">
          <Grid container>
            <Grid item md={4} className="wp__titleStatis">
              <Typography variant="body1">Cinema System</Typography>
            </Grid>
            <Grid item md={8} className="wp__contentStatis">
              <ul className="list__logo">{renderLogoCinema()}</ul>
            </Grid>
          </Grid>
        </li>

        <li className="listStaticCinema">
          <Grid container>
            <Grid item md={4} className="wp__titleStatis">
              <Typography variant="body1">Ngày khởi chiếu</Typography>
            </Grid>
            <Grid item md={8} className="wp__contentStatis">
              <Typography className={classes.styleReleaseDate}>
                {format("dd/MM/yyyy", new Date(releaseDate))}
              </Typography>
            </Grid>
          </Grid>
        </li>

        <li className="listStaticCinema">
          <Grid container>
            <Grid item md={4} className="wp__titleStatis">
              <Typography variant="body1">Cụm Rạp</Typography>
            </Grid>
            <Grid item md={8} className="wp__contentStatis">
              {listCinemaBrand.length > 0 ? (
                <ol className="list__cinemabrand">{renderListCinemaBrand()}</ol>
              ) : (
                <p style={{ marginLeft: "10px" }}>
                  vui lòng chọn hệ thống cần xem!
                </p>
              )}
            </Grid>
          </Grid>
        </li>
      </ul>
      <p style={{ color: "#a9a6a6" }}>
        Thống kê chung của một phim, chi tiết vui lòng xem bên dưới!
      </p>
    </React.Fragment>
  );
}

export default ShowtimeStatistical;
