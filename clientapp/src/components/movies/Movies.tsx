import React, { useState, useEffect, MouseEvent } from "react";
import MoviesList from "./MoviesList";
import MovieSearchInput from "./MovieSearchInput";
import useHttp from "../../hooks/use-http";
import { Movie } from "./Movie";
import HttpRequestConfig from "../../hooks/HttpRequestConfig";

const defaultSortColumn = "title";
const ascOrder = 1;
const descOrder = -1;
let timeout: NodeJS.Timeout;
let cachedMovies: Movie[];

const Movies = () => {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState(ascOrder);
  const { isLoading, sendRequest, hasHttpError } = useHttp();

  const textEnteredHandler = (filterText: string) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      const filteredMovies = cachedMovies.filter(
        (movie) =>
          movie.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
      );
      setMoviesData(filteredMovies);
    }, 500);
  };

  const applyData = (data: Movie[]) => {
    data.sort((a: Movie, b: Movie) => {
      return a[defaultSortColumn] < b[defaultSortColumn] ? -1 : 1;
    });
    cachedMovies = data.slice();
    setMoviesData(data);
    setSortKey(defaultSortColumn);
    setSortOrder(descOrder);
  };

  useEffect(() => {
    const requestConfig: HttpRequestConfig = {
      url: "http://localhost:41295/api/movies/getall",
    };
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);

  const onSortColumnHandler = (
    event: MouseEvent<HTMLTableHeaderCellElement>,
    sortKey: string
  ) => {
    event.preventDefault();
    setSortKey(sortKey);
    const sortedData = moviesData.slice();
    sortedData.sort((a: Movie, b: Movie) => {
      return (a[sortKey] < b[sortKey] ? -1 : 1) * sortOrder;
    });
    setSortOrder(sortOrder * -1);
    setMoviesData(sortedData);
  };

  return (
    <React.Fragment>
      {<MovieSearchInput onTextEntered={textEnteredHandler} />}
      {isLoading && <p>Loading...</p>}
      {hasHttpError && !isLoading && <p>Something went wrong!</p>}
      {!hasHttpError && !isLoading && (
        <MoviesList
          movies={moviesData}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortColumn={onSortColumnHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Movies;
