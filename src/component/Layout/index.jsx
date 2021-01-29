import React from "react";
import Users from "../../pages/Users";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./Layout.scss";
function Layout(props) {
  return (
    <div className="wrapper__admin container-fluid">
      <div className="row no-gutters row--fixed">
        <div className="wrapper__admin__left col-md-3 col-md-3--fixed">
          <Sidebar />
        </div>
        {/* end admin__left */}
        <div className="wrapper__admin__right col-md-9 col-md-9--fixed">
          <Header />

          <div className="wp__body">{props.children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
