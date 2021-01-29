import React, { useState } from "react";
import "./UpdateUser.scss";
import Grid from "@material-ui/core/Grid";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/actions/usersAction";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  styleInput: {
    width: "90%",
  },
  styleInputFullname: {
    width: "95.5%",
  },
  styleMarginBottom: {
    marginBottom: "5px",
  },
  styleH1: {
    margin: "20px 0px",
  },
  styleForm: {
    width: "100%",
  },
  styleButton: {
    outline: "none",
    width: "95.5%",
    "&:focus": {
      border: "none !important",
      outline: "none !important",
    },
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  styleGrid: {
    height: "100px",
  },
  styleColorUsername: {},
});
function UpdateUser(props) {
  const color_theme = JSON.parse(localStorage.getItem("color_theme"));
  const [darkMode, setDarkMode] = useState(color_theme);
  console.log("oksadsa");
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const whiteTheme = createMuiTheme({});
  let userInfo = useSelector((state) => {
    return state.userReducer.userSelected;
  });
  if (userInfo) {
    console.log(userInfo);
  }
  let preloadedValues;
  if (userInfo) {
    preloadedValues = {
      taiKhoan: `${userInfo?.taiKhoan}`,
      matKhau: `${userInfo?.matKhau}`,
      email: `${userInfo?.email}`,
      soDt: `${userInfo?.soDt}`,
      maNhom: "GP01",
      maLoaiNguoiDung: `${userInfo?.maLoaiNguoiDung}`,
      hoTen: `${userInfo?.hoTen}`,
    };
  }

  const Schema = yup.object().shape({
    taiKhoan: yup
      .string()
      .required("*taiKhoan is not empty!")
      .min(3, "*taiKhoan length must min 3!"),
    matKhau: yup
      .string()
      .required("*matKhau is not empty!")
      .min(3, "password length has min 3!"),
    email: yup
      .string()
      .required("*Email is not empty!")
      .email("*Email should have correct format!"),
    soDt: yup
      .string()
      .required("*soDt is not empty!")
      .matches(
        /(09|03|07|08|05)+([0-9]{8})\b/,
        "*soDt length is 10 and start with 09/03/07/08/05!"
      ),
    hoTen: yup
      .string()
      .required("*hoTen is not empty!")
      .min(4, "*hoTen length must be 4 or more 4!"),
  });
  let { register, errors, handleSubmit, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(Schema),
    defaultValues: preloadedValues,
  });
  const classes = useStyles();
  let dispatch = useDispatch();
  let history = useHistory();
  const onSubmit = (data, e, reset) => {
    console.log("ok");
    console.log(data, history);
    dispatch(updateUser(data, history));

    // e.target.reset();
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : whiteTheme}>
      <Paper className="content__updateInfo">
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item md={12} justify="center" className={classes.styleH1}>
            <Typography variant="h4">UPDATE USER</Typography>
          </Grid>
          <form className={classes.styleForm} onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              // item
              container
              justify="center"
              alignItems="center"
              className={classes.styleMarginBottom}
            >
              <Grid item md={3} className={classes.styleGrid}>
                <TextField
                  inputRef={register}
                  className={(classes.styleInput, classes.styleColorUsername)}
                  id="username"
                  label="username"
                  variant="outlined"
                  color="primary"
                  name="taiKhoan"
                  error={!!errors.taiKhoan}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {errors.taiKhoan && (
                  <p className="text-danger">{errors.taiKhoan?.message}</p>
                )}
              </Grid>
              <Grid item md={3} className={classes.styleGrid}>
                <TextField
                  inputRef={register({ required: true })}
                  className={classes.styleInput}
                  id="password"
                  label="password"
                  variant="outlined"
                  color="primary"
                  name="matKhau"
                  error={!!errors.matKhau}
                  // preloadedValues={preloadedValues.matKhau}
                />
                {errors.matKhau && (
                  <p className="text-danger">{errors.matKhau?.message}</p>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              // item
              justify="center"
              alignItems="center"
              className={classes.styleMarginBottom}
            >
              <Grid item md={3} className={classes.styleGrid}>
                <TextField
                  inputRef={register}
                  className={classes.styleInput}
                  id="email"
                  label="email"
                  variant="outlined"
                  color="primary"
                  name="email"
                  error={!!errors.email}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email?.message}</p>
                )}
              </Grid>
              <Grid item md={3} className={classes.styleGrid}>
                <TextField
                  inputRef={register}
                  className={classes.styleInput}
                  id="soDt"
                  label="phone number"
                  variant="outlined"
                  color="primary"
                  name="soDt"
                  error={!!errors.soDt}
                />
                {errors.soDt && (
                  <p className="text-danger">{errors.soDt?.message}</p>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              // item
              justify="center"
              alignItems="center"
              className={classes.styleMarginBottom}
            >
              <Grid item md={3} className={classes.styleGrid}>
                <TextField
                  inputRef={register}
                  className={classes.styleInput}
                  id="maNhom"
                  label="codeGroup"
                  variant="outlined"
                  color="primary"
                  defaultValue="GP01"
                  aria-readonly
                  name="maNhom"
                />
              </Grid>
              <Grid item md={3} className={classes.styleGrid}>
                <FormControl className={classes.styleInput}>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Controller
                    name="maLoaiNguoiDung"
                    control={control}
                    defaultValue={"QuanTri"}
                    as={
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                      >
                        <MenuItem value={"KhachHang"}>KhachHang</MenuItem>
                        <MenuItem value={"QuanTri"}>QuanTri</MenuItem>
                      </Select>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              // item
              justify="center"
              alignItems="center"
              className={classes.styleMarginBottom}
            >
              <Grid item md={6} className={classes.styleGrid}>
                <TextField
                  inputRef={register}
                  className={classes.styleInputFullname}
                  id="fullname"
                  label="fullname"
                  variant="outlined"
                  color="primary"
                  name="hoTen"
                />
                {errors.hoTen && (
                  <p className="text-danger">{errors.hoTen?.message}</p>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              // item
              justify="center"
              alignItems="center"
              className={classes.styleMarginBottom}
            >
              <Grid item md={6}>
                <Button
                  type="submit"
                  className={classes.styleButton}
                  variant="contained"
                  color="secondary"
                  name="submit"
                >
                  CONFIRM
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default UpdateUser;
