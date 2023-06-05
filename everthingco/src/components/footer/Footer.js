import React from "react";
import classes from "./footer.module.css";
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className={classes.footer}>
      <p>This site is protected by Captcha &copy; {year}</p>
    </div>
  );
};

export default Footer;
