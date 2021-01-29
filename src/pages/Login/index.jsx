import React from "react";
import "./Login.scss";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleLogin } from "../../redux/actions/loginAction";
function Login(props) {
  let errorName = useSelector((state) => {
    return state.loginReducer.errorName;
  });
  const { register, handleSubmit, errors } = useForm();
  let dispatch = useDispatch();
  let history = useHistory();
  const onSubmit = (data) => {
    console.log(data.password);
    dispatch(handleLogin(data, history));
  };
  return (
    <div className="background__login">
      <div className="wrapper__login">
        <div className="logo__login text-center">
          <img src=".../../../images/logo.png" alt="anh" />
        </div>
        <div id="wrap" className="input">
          <section className="input-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-content-wrap">
                <div className="inputbox">
                  <div className="inputbox-content">
                    <input
                      id="input0"
                      type="text"
                      name="taiKhoan"
                      required
                      ref={register({ required: true, minLength: 3 })}
                    />
                    <div className="icon-form">
                      <BsFillPersonFill color="#ffffff" size="20px" />
                    </div>
                    <label htmlFor="input0">Username</label>
                    <span className="underline" />
                    {errors.taiKhoan && errors.taiKhoan.type === "minLength" && (
                      <p
                        style={{
                          color: "red",
                          marginTop: "-17px",
                        }}
                      >
                        *Minlength must be 3 keyword!
                      </p>
                    )}
                    {errors.taiKhoan && errors.taiKhoan.type === "required" && (
                      <p style={{ color: "red", marginTop: "-17px" }}>
                        *Username is required!
                      </p>
                    )}
                  </div>
                </div>
                <div className="inputbox">
                  <div className="inputbox-content">
                    <input
                      id="input1"
                      type="password"
                      name="matKhau"
                      required
                      ref={register({ required: true, minLength: 3 })}
                    />
                    <div className="icon-form">
                      <AiFillLock color="#ffffff" size="20px" />
                    </div>
                    <label htmlFor="input1">Password</label>
                    <span className="underline" />
                    {errors.matKhau && errors.matKhau.type === "minLength" && (
                      <p
                        style={{
                          color: "red",
                          marginTop: "-17px",
                        }}
                      >
                        *Minlength must be 3 keyword!
                      </p>
                    )}
                    {errors.matKhau && errors.matKhau.type === "required" && (
                      <p style={{ color: "red", marginTop: "-17px" }}>
                        *password is required!
                      </p>
                    )}
                  </div>
                </div>
                <div className="btns">
                  <input
                    className="btn btn-confirm"
                    type="submit"
                    value="login"
                  />
                </div>
              </div>
              <p
                className="text-danger text-center"
                style={{ marginTop: "-50px" }}
              >
                {errorName}
              </p>
            </form>
          </section>
          <p className="text-center text-white">
            Don’t have an account? Sign Up
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
