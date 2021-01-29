import { Button, Container, FormControlLabel, Grid } from "@material-ui/core";
import React, { useState } from "react";
import "./ModalFilm.scss";
import format from "date-format";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { Rating } from "@material-ui/lab";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleAddFilmRequest } from "../../../redux/actions/filmAction";
const useStyles = makeStyles({
  styleInputFile: {
    fontSize: "9px !important",
  },
  borderNone: {
    outline: "none",
    border: "none",
  },
  stylebtnAdd: {
    "&:focus": {
      outline: "none",
    },
  },
  styleStar: {
    fontSize: "30px",
  },
  styleKeyDatePicker: {
    outline: "none",
    border: "none",
  },
  styleFormControlRating: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
});
const defaultValues = {};
function ModalFilm(props) {
  const classes = useStyles();
  const [rating, setRating] = useState(3);
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues,
  });
  let dispatch = useDispatch();
  let date = new Date();
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    let newData = { ...data, hinhAnh: data.hinhAnh[0] };
    var form_data = new FormData();
    for (var key in newData) {
      form_data.append(key, newData[key]);
    }
    // console.log(data.hinhAnh[0]);
    // let newDate = format("yyyy/MM/dd", new Date(data.ngayKhoiChieu));
    console.log(newData);
    dispatch(handleAddFilmRequest(form_data));
  };
  let newbg = props.darkMode ? "#141314" : "";
  let newcolor = props.darkMode ? "white" : "#000";
  return (
    <div
      className="modal fade style__modal"
      id="ModalFilm"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ background: newbg }}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              ADD FILM
            </h5>
            <button
              style={{ color: newcolor }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Container>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justify="center" spacing={3}>
                  <Grid item md={6}>
                    <TextField
                      inputRef={register}
                      className={classes.styleInput}
                      id="codefilm"
                      label="codefilm"
                      variant="outlined"
                      color="primary"
                      name="maPhim"
                      // error={!!errors.taiKhoan}
                      // inputProps={{ readOnly: true }}
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
                      // error={!!errors.taiKhoan}
                      // inputProps={{ readOnly: true }}
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
                      // error={!!errors.taiKhoan}
                      // inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item md={12}>
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
                      // inputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item md={12}>
                    <TextField
                      inputRef={register}
                      fullWidth
                      id="outlined-multiline-static"
                      label="description"
                      multiline
                      rows={4}
                      name="moTa"
                      // defaultValue="Default Value"
                      variant="outlined"
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
                        defaultValue={date}
                        render={({ ref, ...rest }) => (
                          <KeyboardDatePicker
                            inputRef={register}
                            defaultValue={date}
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

                  <Grid item md={12}>
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
                            defaultValue={rating}
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
                </Grid>
                <Grid container justify="center">
                  <Button
                    className={classes.stylebtnAdd}
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                  >
                    confirm
                  </Button>
                </Grid>
              </form>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFilm;
