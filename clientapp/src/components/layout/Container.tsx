import classes from "./Container.module.css";
import React from "react";

const Container: React.FC = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
