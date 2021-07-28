import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { Movie } from "./Movie";
import HttpRequestConfig from "../../hooks/HttpRequestConfig";
import classes from "./MovieDetails.module.css";
import { useHistory } from "react-router";

const MovieDetails = () => {
  const params: any = useParams();
  const { sendRequest, isLoading, hasHttpError } = useHttp();
  const [movie, setMovie] = useState<any>({});
  const history = useHistory();

  let content = null;
  const applyData = (selectedMovie: Movie) => {
    setMovie(selectedMovie);
  };

  useEffect(() => {
    const requestConfig: HttpRequestConfig = {
      url: `http://localhost:41295/api/movies/${params.id}`,
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest, params.id]);

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (hasHttpError && !isLoading) {
    content = <p>Something went wrong</p>;
  }

  if (!isLoading && !hasHttpError) {
    content = (
      <div className={classes["movie-details"]}>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.replace("/movies");
          }}
        >
          Back
        </button>
        <p>
          <span>Title: </span>
          {movie.title}
        </p>
        <p>
          <span>Language: </span>
          {movie.language}
        </p>
        <p>
          <span>Location: </span>
          {movie.location}
        </p>
        <p>
          <span>Listing Type: </span>
          {movie.listingType}
        </p>
        <p>
          <span>Imdb Rating: </span>
          {movie.imdbRating}
        </p>
        <p>
          <span>Imdb Id: </span>
          {movie.id}
        </p>
        {movie.soundEffects && (
          <p>
            <span>Sound Effect: </span>
            {movie.soundEffects.join(",")}
          </p>
        )}
        <p>
          <span>Plot: </span>
          {movie.plot}
        </p>
      </div>
    );
  }

  return content;
};

export default MovieDetails;
