import React from "react";
import "./ModalUsers.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../../redux/actions/usersAction";
function ModalUsers(props) {
  let dispatch = useDispatch();
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
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(Schema),
  });
  const onSubmit = (data, e, reset) => {
    dispatch(addNewUser(data, reset));
    console.log(data);
    // e.target.reset();
  };
  return (
    <div
      className="modal fade"
      id="addUser"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content modal-content--users">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              ADD USER
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() =>
                reset({
                  taiKhoan: "",
                  matKhau: "",
                  email: "",
                  soDt: "",
                  hoTen: "",
                })
              }
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form action onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <div class="input-field">
                    <input
                      type="text"
                      id="username"
                      name="taiKhoan"
                      required
                      ref={register}
                    />
                    <label for="username">username</label>
                  </div>
                  {errors.taiKhoan && (
                    <p className="text-danger">{errors.taiKhoan?.message}</p>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div class="input-field">
                    <input
                      type="password"
                      id="password"
                      name="matKhau"
                      required
                      ref={register}
                    />
                    <label for="password">password</label>
                  </div>
                  {errors.matKhau && (
                    <p className="text-danger">{errors.matKhau.message}</p>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div class="input-field">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      required
                      ref={register}
                    />
                    <label for="email">email</label>
                  </div>
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div class="input-field">
                    <input
                      type="text"
                      id="soDt"
                      name="soDt"
                      required
                      ref={register}
                    />
                    <label for="soDt">phoneNumber</label>
                  </div>
                  {errors.soDt && (
                    <p className="text-danger">{errors.soDt.message}</p>
                  )}
                </div>
              </div>

              <div className="row mt-4 d-none">
                <div className="col-md-12">
                  <div class="input-field">
                    <input
                      type="text"
                      id="maNhom"
                      name="maNhom"
                      value="GP01"
                      required
                      ref={register}
                    />
                    <label for="hoTen">maNhom</label>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12">
                  <select
                    name="maLoaiNguoiDung"
                    id="type"
                    className="userSelect custom-select"
                    ref={register}
                  >
                    <option value="QuanTri">admin</option>
                    <option value="KhachHang">user</option>
                  </select>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div class="input-field">
                    <input
                      type="text"
                      id="hoTen"
                      name="hoTen"
                      required
                      ref={register}
                    />
                    <label for="hoTen">fullname</label>
                  </div>
                  {errors.hoTen && (
                    <p className="text-danger">{errors.hoTen.message}</p>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-2 w-100">
                confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUsers;
