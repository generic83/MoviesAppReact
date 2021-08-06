import { Link, Route } from "react-router-dom";
import React, { useContext } from "react";
import classes from "./Header.module.css";
import AuthContext from "../../store/auth-context";

const Header: React.FC = () => {
  const ctx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Route>
        <Link to="/">
          <div className={classes.logo}>Movies App React</div>
        </Link>
        <nav>
          <ul>
            {ctx.isAuthenticated && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {ctx.isAuthenticated && (
              <li>
                <Link to="/weather">Weather</Link>
              </li>
            )}
            {!ctx.isAuthenticated && (
              <li>
                <button onClick={ctx.login}>Login</button>
              </li>
            )}
            {ctx.isAuthenticated && (
              <li>
                <button onClick={ctx.logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </Route>
    </header>
  );
};

export default Header;
