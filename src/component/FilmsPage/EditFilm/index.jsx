import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./EditFilm.scss";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Controller, useForm } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import { Rating } from "@material-ui/lab";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateFilmRequest } from "../../../redux/actions/filmAction";

const useStyles = makeStyles({
  maxWidthContainer: {
    maxWidth: "800px",
  },
});
function EditFilm(props) {
  const classes = useStyles();
  let { id } = useParams();
  let dispatch = useDispatch();
  const color_theme = JSON.parse(localStorage.getItem("color_theme"));
  const [darkMode, setDarkMode] = useState(color_theme);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const whiteTheme = createMuiTheme({});
  let filmInfo = useSelector((state) => {
    return state.filmReducer.filmSelected;
  });
  let initial = filmInfo?.danhGia || 3;
  const [rating, setRating] = useState(initial);
  let preloadedValues;
  if (filmInfo) {
    preloadedValues = {
      maPhim: `${filmInfo.maPhim}`,
      tenPhim: `${filmInfo.tenPhim}`,
      biDanh: `${filmInfo.biDanh}`,
      trailer: `${filmInfo.trailer}`,
      maNhom: "GP11",
      ngayKhoiChieu: `${filmInfo.ngayKhoiChieu}`,
      danhGia: `${filmInfo.danhGia}`,
      moTa: `${filmInfo.moTa}`,
    };
  }
  console.log(preloadedValues);
  let { register, handleSubmit, reset, control, errors } = useForm({
    mode: "onChange",
    defaultValues: preloadedValues,
  });
  let history = useHistory();
  const onSubmit = (data, e, reset) => {
    e.preventDefault();
    console.log(data);
    let newData = { ...data, hinhAnh: data.hinhAnh[0] };
    console.log(newData);
    var form_data = new FormData();
    for (var key in newData) {
      form_data.append(key, newData[key]);
    }
    console.log(newData);
    dispatch(handleUpdateFilmRequest(form_data, history));
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : whiteTheme}>
      <Paper className="wp__films">
        <Container className={classes.maxWidthContainer}>
          <Grid container direction="row">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container item direction="row" spacing={3}>
                <Grid item md={6}>
                  <TextField
                    inputRef={register}
                    // className={classes.styleInput}
                    id="maPhim"
                    label="maPhim"
                    variant="outlined"
                    color="primary"
                    name="maPhim"
                    fullWidth
                    error={!!errors.taiKhoan}
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    inputRef={register}
                    className={classes.styleInput}
                    id="namefilm"
                    label="namefilm"
                    variant="outlined"
                    color="primary"
                    name="tenPhim"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // error={!!errors.taiKhoan}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    inputRef={register}
                    className={classes.styleInput}
                    id="subtitlefilm"
                    label="subtitle"
                    variant="outlined"
                    color="primary"
                    name="biDanh"
                    fullWidth
                    // value={preloadedValues?.biDanh}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // error={!!errors.taiKhoan}
                    // inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    inputRef={register}
                    className={classes.styleInput}
                    id="trailer"
                    label="trailer"
                    variant="outlined"
                    color="primary"
                    name="trailer"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // error={!!errors.taiKhoan}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    inputRef={register}
                    fullWidth
                    className={classes.styleInputFile}
                    id="file"
                    label="file"
                    variant="outlined"
                    color="primary"
                    name="hinhAnh"
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // error={!!errors.taiKhoan}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    inputRef={register}
                    fullWidth
                    // className={classes.styleInputFile}
                    id="codegroup"
                    label="codegroup"
                    variant="outlined"
                    color="primary"
                    name="maNhom"
                    defaultValue="GP11"
                    // error={!!errors.taiKhoan}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Controller
                      name="ngayKhoiChieu"
                      control={control}
                      // defaultValue={filmInfo?.ngayKhoiChieu}
                      render={({ ref, ...rest }) => (
                        <KeyboardDatePicker
                          inputRef={register}
                          // value={format(
                          //   "dd/MM/yyyy",
                          //   new Date(preloadedValues?.ngayKhoiChieu)
                          // )}
                          className={classes.styleKeyDatePicker}
                          // margin="normal"
                          id="date-picker-dialog"
                          label="Date picker dialog"
                          format="dd/MM/yyyy"
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
                  <FormControlLabel
                    className={classes.styleFormControlRating}
                    label="select rating"
                    control={
                      <>
                        <input
                          className={classes.styleStar}
                          name="danhGia"
                          type="number"
                          value={rating}
                          ref={register}
                          hidden
                          readOnly
                        />
                        <Controller
                          name="danhGia"
                          control={control}
                          value={preloadedValues?.danhGia}
                          rules={{ required: true }}
                          render={(props) => (
                            <Rating
                              name="danhGia"
                              className={classes.styleStar}
                              value={rating}
                              precision={1}
                              onChange={(_, value) => {
                                setRating(value);
                              }}
                            />
                          )}
                        />
                      </>
                    }
                    // label="select rating"
                  />
                </Grid>

                <Grid item md={12}>
                  <TextField
                    inputRef={register}
                    fullWidth
                    id="outlined-multiline-static"
                    label="description"
                    multiline
                    rows={6}
                    name="moTa"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Edit FILM
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}

export default React.memo(EditFilm);
