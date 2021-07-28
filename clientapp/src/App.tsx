import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import MoviesPage from "./pages/MoviesPage";
import Layout from "./components/layout/Layout";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <MoviesPage />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage />
        </Route>
        <Route path="/movies/:id">
          <MovieDetailsPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
