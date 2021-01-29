import {
  createMuiTheme,
  Paper,
  Switch,
  ThemeProvider,
} from "@material-ui/core";
import React, { useState } from "react";
import ActionFilms from "../../component/FilmsPage/ActionFilms";
import ListFilms from "../../component/FilmsPage/ListFilms";
import ModalFilm from "../../component/FilmsPage/ModalFilm";
import PaginationFilms from "../../component/FilmsPage/PaginationFilms";
import "./Films.scss";
function Films(props) {
  const initial = JSON.parse(localStorage.getItem("color_theme")) || false;
  const [darkMode, setDarkMode] = useState(initial);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const whiteTheme = createMuiTheme({});
  function handleSwitch(data) {
    setDarkMode(Boolean(data));
    localStorage.setItem("color_theme", data);
  }
  return (
    <ThemeProvider theme={darkMode ? darkTheme : whiteTheme}>
      <Paper className="wp__films">
        <ActionFilms darkMode={darkMode} handleSwitch={handleSwitch} />
        <ListFilms darkMode={darkMode} />
        <PaginationFilms />
        <ModalFilm darkMode={darkMode} />
      </Paper>
    </ThemeProvider>
  );
}

export default Films;
