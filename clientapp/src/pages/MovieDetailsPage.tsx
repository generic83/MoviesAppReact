import React from "react";
import MovieDetails from "../components/movies/MovieDetails";
import Container from "../components/layout/Container";

const MovieDetailsPage = () => {
  return (
    <React.Fragment>
      <Container>
        <MovieDetails />
      </Container>
    </React.Fragment>
  );
};

export default MovieDetailsPage;
