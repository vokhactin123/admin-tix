import { Button, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import UpdateIcon from "@material-ui/icons/Update";
import { useHistory } from "react-router-dom";
import { getUserByUsername } from "../../../redux/actions/usersAction";
import { useDispatch, useSelector } from "react-redux";
import { getInfoAdminCurrently } from "../../../redux/actions/usersAction";
const useStyles = makeStyles({
  styleContainer: {
    background: "#ffffff",
    minHeight: "600px",
    position: "relative",
  },
  styleGridContainer: {
    height: "100%",
    position: "absolute",
    left: "0",
  },
  styleIconPerson: {
    fontSize: "500px",
  },
  styleMarginBottom: {
    marginBottom: "30px",
    borderBottom: "1px dashed #000",
  },
  styleIcon: {
    fontSize: "35px",
    marginRight: "20px",
    color: "#33c6f5",
  },
  stylespan: {
    fontSize: "18px",
  },
  styleBtn: {
    "&:focus": {
      outline: "none",
    },
    margin: "20px 0px 0px 20px",
  },
});
function Profile(props) {
  let history = useHistory();
  let infoUser = JSON.parse(localStorage.getItem("userAdmin"));
  const classes = useStyles();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoAdminCurrently(infoUser.taiKhoan));
  }, []);
  const handleRedirect = () => {
    alert(infoUser.taiKhoan);
    dispatch(getUserByUsername(infoUser.taiKhoan));
    history.push("/Admin/Update");
  };
  let currentUser = useSelector((state) => {
    return state.userReducer.currentlyUser;
  });
  return (
    <Container maxWidth="md" className={classes.styleContainer}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        className={classes.styleGridContainer}
      >
        <Grid item md={12}>
          <Button
            onClick={handleRedirect}
            variant="contained"
            color="primary"
            className={classes.styleBtn}
          >
            <UpdateIcon />
            update
          </Button>
        </Grid>
        <Grid item md={6}>
          <PersonIcon className={classes.styleIconPerson} />
        </Grid>
        <Grid
          container
          item
          md={5}
          justify="center"
          style={{ marginTop: "50px" }}
        >
          <Grid item md={12} className={classes.styleMarginBottom}>
            <AccountBoxIcon className={classes.styleIcon} />
            <span className={classes.stylespan}>{currentUser?.taiKhoan}</span>
          </Grid>
          <Grid item md={12} className={classes.styleMarginBottom}>
            <MailOutlineIcon className={classes.styleIcon} />
            <span className={classes.stylespan}>{currentUser?.email}</span>
          </Grid>
          <Grid item md={12} className={classes.styleMarginBottom}>
            <PersonOutlineIcon className={classes.styleIcon} />
            <span className={classes.stylespan}>{currentUser?.hoTen}</span>
          </Grid>
          <Grid item md={12} className={classes.styleMarginBottom}>
            <PhoneIcon className={classes.styleIcon} />
            <span className={classes.stylespan}>{currentUser?.soDt}</span>
          </Grid>
          <Grid item md={12} className={classes.styleMarginBottom}>
            <SupervisorAccountIcon className={classes.styleIcon} />
            <span className={classes.stylespan}>
              {currentUser?.maLoaiNguoiDung}
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
