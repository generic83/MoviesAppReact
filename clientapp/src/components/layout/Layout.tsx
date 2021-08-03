import React, { Fragment } from "react";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
