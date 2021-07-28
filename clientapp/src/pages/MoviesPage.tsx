import React from "react";
import Movies from "../components/movies/Movies";
import Container from "../components/layout/Container";

const MoviesPage = () => {
  return (
    <React.Fragment>
      <Container>
        <Movies />
      </Container>
    </React.Fragment>
  );
};

export default MoviesPage;
