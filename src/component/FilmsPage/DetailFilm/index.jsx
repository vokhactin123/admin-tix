import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./DetailFilm.scss";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import format from "date-format";
import { useParams } from "react-router-dom";
import { getInfoFilm } from "../../../redux/actions/filmAction";
const useStyles = makeStyles({
  styleBtn: {
    "&:focus": {
      outline: "none",
      border: "none",
    },
  },
  resetSpacing: {
    margin: "0",
    padding: "0",
  },
  marginBottom: {
    marginBottom: "50px",
  },
  marginTop: {
    marginTop: "30px",
  },
  marginBottomGrid: {
    marginBottom: "-10px",
  },
  marginDes: {
    marginTop: "30px",
    paddingLeft: "50px",
    borderLeft: "1px solid #e8e7e7",
  },
});
function DetailFilm(props) {
  const classes = useStyles();
  let { id } = useParams();
  let dispatch = useDispatch();
  let detail = useSelector((state) => {
    return state.filmReducer.detailFilm;
  });
  useEffect(() => {
    dispatch(getInfoFilm(id));
  }, [id]);
  const color_theme = JSON.parse(localStorage.getItem("color_theme"));
  const [darkMode, setDarkMode] = useState(color_theme);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const whiteTheme = createMuiTheme({});
  return (
    <ThemeProvider theme={darkMode ? darkTheme : whiteTheme}>
      <Paper className="wp__films">
        <Container>
          <Grid container direction="column" className={classes.resetSpacing}>
            <Grid
              container
              item
              md={12}
              justify="space-between"
              className={classes.marginBottom}
            >
              <Button
                variant="contained"
                color="secondary"
                className={classes.styleBtn}
              >
                UPDATE
              </Button>
            </Grid>
            <Grid container item md={12}>
              <Grid item md={4} className="admin__detailFilm">
                <div className="wrapper__thumb">
                  <a className="wp__thumb" href="#">
                    <img src={detail?.hinhAnh} alt="anh" />
                  </a>
                  <div className="overlay"></div>
                  <div className="btn__showFilm">
                    <img src="../../../../images/play-video.png" alt="anh" />
                  </div>
                </div>
              </Grid>
              <Grid item container md={8}>
                <Grid item container md={5} className={classes.marginTop}>
                  <Grid item md={12} className={classes.marginBottomGrid}>
                    <Typography
                      variant="body1"
                      component="body1"
                      display="block"
                    >
                      tên phim: {detail?.tenPhim}
                    </Typography>
                  </Grid>

                  <Grid item md={12} className={classes.marginBottomGrid}>
                    <Typography
                      variant="body1"
                      component="body1"
                      display="block"
                    >
                      bí danh: {detail?.biDanh}
                    </Typography>
                  </Grid>

                  <Grid item md={12} className={classes.marginBottomGrid}>
                    <Typography
                      variant="body1"
                      component="body1"
                      display="block"
                    >
                      thời lượng: 120 phút
                    </Typography>
                  </Grid>

                  <Grid item md={12} className={classes.marginBottomGrid}>
                    <Typography
                      variant="body1"
                      component="body1"
                      display="block"
                    >
                      ngày khởi chiếu:
                      {format("yyyy/MM/dd", new Date(detail?.ngayKhoiChieu))}
                    </Typography>
                  </Grid>
                  <Grid item md={12} className={classes.marginBottomGrid}>
                    <Typography
                      variant="body1"
                      component="body1"
                      display="block"
                    >
                      đánh giá: {detail?.danhGia}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item md={7} className={classes.marginDes}>
                  <Typography variant="body1" component="body1" display="block">
                    mô tả: {detail?.moTa}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}

export default DetailFilm;
