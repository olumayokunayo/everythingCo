import React from "react";
import classes from "./card.module.css";
const Card = ({ children }) => {
  return <div className={classes.children}>{children}</div>;
};

export default Card;
