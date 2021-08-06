import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import MoviesPage from "./pages/MoviesPage";
import Layout from "./components/layout/Layout";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AuthContext from "./store/auth-context";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import WeatherPage from "./pages/WeatherPage";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/weather" exact>
          <WeatherPage />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage />
        </Route>
        <Route path="/movies/:id">
          <MovieDetailsPage />
        </Route>
        <Route path={["/callback.html", "/silent-redirect.html"]}>
          {() => {
            ctx.loginCallback();
          }}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
