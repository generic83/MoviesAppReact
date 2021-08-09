import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import MoviesPage from "./pages/MoviesPage";
import Layout from "./components/layout/Layout";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import WeatherPage from "./pages/WeatherPage";
import SigninCallback from "./pages/SigninCallback";
import SilentSigninCallback from "./pages/SilentSigninCallback";

function App() {
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
        <Route path={"/callback.html"}>
          <SigninCallback />
        </Route>
        <Route path={"/silent-redirect.html"}>
          <SilentSigninCallback />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
