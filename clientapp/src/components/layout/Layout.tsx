import React, { Fragment } from "react";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {console.log(children)}
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
