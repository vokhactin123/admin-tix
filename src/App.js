import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import DetailFilm from "./component/FilmsPage/DetailFilm";
import EditFilm from "./component/FilmsPage/EditFilm";
import Layout from "./component/Layout";
import Profile from "./component/UsersPage/Profile";
import UpdateUser from "./component/UsersPage/UpdateUser";
import Films from "./pages/Films";
import Login from "./pages/Login";
import Showtimes from "./pages/Showtimes";
import Users from "./pages/Users";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/Admin">
            <Layout>
              <Users />
            </Layout>
          </Route>
          <Route exact={true} path="/Admin/Profile">
            <Layout>
              <Profile />
            </Layout>
          </Route>
          <Route exact={true} path="/Admin/Update">
            <Layout>
              <UpdateUser />
            </Layout>
          </Route>
          <Route exact={true} path="/Admin/ListFilms">
            <Layout>
              <Films />
            </Layout>
          </Route>
          <Route exact={true} path="/Admin/DetailFilm/:id">
            <Layout>
              <DetailFilm />
            </Layout>
          </Route>
          <Route exact={true} path="/Admin/EditFilm/:id">
            <Layout>
              <EditFilm />
            </Layout>
          </Route>
          <Route exact={true} path="/Admin/Showtime">
            <Layout>
              <Showtimes />
            </Layout>
          </Route>
          <Route path="/Admin/Login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
