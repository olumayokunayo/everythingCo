import React from "react";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif";
import classes from "./loader.module.css";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={classes.wrapper}>
      <div className={classes.loader}>
        <img src={loaderImg} alt="" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
