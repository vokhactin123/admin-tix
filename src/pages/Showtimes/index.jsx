import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./Showtimes.scss";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getListFilmRequest } from "../../redux/actions/showtimeAction";
import { getListCinemaRequest } from "../../redux/actions/showtimeAction";
import { getListCinemaBrandById } from "../../redux/actions/showtimeAction";
import { getListCinemaRoomNumberById } from "../../redux/actions/showtimeAction";
import { handleCreateShowTime } from "../../redux/actions/showtimeAction";
import format from "date-format";
import { Paper } from "@material-ui/core";
import ShowtimeStatistical from "../../component/ShowtimePage/ShowtimeStatistical";
import { handleFilmSelected } from "../../redux/actions/showtimeAction";
import { resetCinemaInfo } from "../../redux/actions/showtimeAction";
import { FetchInfoFilmById } from "../../redux/actions/showtimeAction";
import { useHistory } from "react-router-dom";
import { FetchInfoCinemaByClick } from "../../redux/actions/showtimeAction";
import { getBrandSelected } from "../../redux/actions/showtimeAction";
const useStyles = makeStyles((theme) => ({
  styleMarginBottom: {
    marginBottom: "20px",
  },
  styleButton: {
    "&:focus": {
      outline: "none",
      border: "none",
    },
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
}));
function Showtimes(props) {
  const classes = useStyles();
  let date = new Date();
  let dispatch = useDispatch();
  let defaultValues;
  useEffect(() => {
    dispatch(getListFilmRequest());
    dispatch(getListCinemaRequest());
  }, []);
  let listFilm = useSelector((state) => {
    return state.showtimeReducer.listFilm;
  });
  let listCinemaSys = useSelector((state) => {
    return state.showtimeReducer.listCinemaSys;
  });
  let listCinemaBrand = useSelector((state) => {
    return state.showtimeReducer.cinemaBrand;
  });
  let listCinemaRoom = useSelector((state) => {
    return state.showtimeReducer.listCinemaRoom;
  });
  let infoFilmSelected = useSelector((state) => {
    return state.showtimeReducer.infoFilmSelected;
  });
  function handleSelectFilm(data) {
    dispatch(handleFilmSelected(data));
    dispatch(resetCinemaInfo());
  }
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues,
  });
  let maPhimProps = useSelector((state) => {
    return state.showtimeReducer.idFilm;
  });
  const onSubmit = (data, e, reset) => {
    e.preventDefault();
    console.log(data);
    let showtimeCreated = {
      maPhim: data.maPhim,
      ngayChieuGioChieu: data.ngayChieuGioChieu,
      maRap: data.maRap,
      giaVe: data.giaVe,
    };
    console.log(showtimeCreated);
    dispatch(handleCreateShowTime(showtimeCreated, data.maPhim, data.maCumRap));
    dispatch(getBrandSelected(data.maCumRap));
  };
  const color_theme = JSON.parse(localStorage.getItem("color_theme"));
  const [darkMode, setDarkMode] = useState(color_theme);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const whiteTheme = createMuiTheme({});
  console.log(color_theme);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : whiteTheme}>
      <Paper
        className={color_theme ? "wp__showtimes dark__theme" : "wp__showtimes"}
      >
        <Grid container direction="row">
          <Grid item container className={classes.styleMarginBottom}>
            <Typography variant="h4">MANAGE SHOWTIME</Typography>
          </Grid>

          <Grid item container>
            <Grid container item md={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container item md={12} spacing={2}>
                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Film
                      </InputLabel>
                      <Controller
                        as={
                          <Select
                            fullWidth
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Film"
                          >
                            {listFilm.map((item, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  value={item.maPhim}
                                  onClick={() => handleSelectFilm(item.maPhim)}
                                >
                                  {item.tenPhim}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        }
                        name="maPhim"
                        control={control}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Cinema System
                      </InputLabel>
                      <Controller
                        as={
                          <Select
                            fullWidth
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Cinema System"
                          >
                            {listCinemaSys.map((item, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  value={item.maHeThongRap}
                                  onClick={() =>
                                    dispatch(
                                      getListCinemaBrandById(item.maHeThongRap)
                                    )
                                  }
                                >
                                  {item.maHeThongRap}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        }
                        name="maHeThongRap"
                        control={control}
                        // defaultValue={defaultValue}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      className={classes.formControl}
                      disabled={listCinemaBrand.length > 0 ? false : true}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Cinema Brand
                      </InputLabel>
                      <Controller
                        as={
                          <Select
                            fullWidth
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label=" Cinema Brand"
                          >
                            {listCinemaBrand.map((item, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  value={item.maCumRap}
                                  onClick={() =>
                                    dispatch(
                                      getListCinemaRoomNumberById(item.maCumRap)
                                    )
                                  }
                                >
                                  {item.tenCumRap}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        }
                        name="maCumRap"
                        control={control}
                        // defaultValue={defaultValue}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      className={classes.formControl}
                      disabled={listCinemaRoom.length > 0 ? false : true}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Cinema Number
                      </InputLabel>
                      <Controller
                        as={
                          <Select
                            fullWidth
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Cinema Number"
                          >
                            {listCinemaRoom.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.maRap}>
                                  {item.tenRap}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        }
                        name="maRap"
                        control={control}
                        // defaultValue={defaultValue}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        name="ngayChieuGioChieu"
                        control={control}
                        defaultValue={date}
                        render={({ ref, ...rest }) => (
                          <KeyboardDatePicker
                            fullWidth
                            inputRef={register}
                            defaultValue={date}
                            className={classes.styleKeyDatePicker}
                            // margin="normal"
                            id="date-picker-dialog"
                            label="Date time"
                            format="dd/MM/yyyy hh:mm:ss"
                            // defaultValue="09/01/2020"
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                            {...rest}
                          />
                        )}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item md={6}>
                    <FormControl
                      // className={classes.styleInput}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Movie ticket price
                      </InputLabel>
                      <Controller
                        name="giaVe"
                        control={control}
                        defaultValue={"75000"}
                        as={
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="movie ticket price"
                          >
                            <MenuItem value={"75000"}>75000đ</MenuItem>
                            <MenuItem value={"90000"}>90000đ</MenuItem>
                          </Select>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      className={classes.styleButton}
                      disabled={
                        listFilm.length > 0 && listCinemaRoom.length > 0
                          ? false
                          : true
                      }
                    >
                      submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item md={6} style={{ marginTop: "18px" }}>
              {maPhimProps ? (
                <ShowtimeStatistical
                  maPhim={maPhimProps}
                  infoFilmSelected={infoFilmSelected}
                />
              ) : (
                ""
              )}
            </Grid>
          </Grid>

          <Grid item container>
            SDSA
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default Showtimes;
