import classes from "./Container.module.css";
import React from "react";

const Container: React.FC = ({ children }) => {
  return <main className={classes.container}>{children}</main>;
};

export default Container;
