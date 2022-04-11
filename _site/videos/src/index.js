import React from "react";
import ReactDOM from "react-dom";
import { App } from "@routes/App";
import ThemeContext from "../src/components/ThemeContext";

const style = {
  theme1: "dark",
  theme2: "whiteContrast",
  theme3: "black",
  theme4: "negro",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={style}>
      <App/>
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);