import React, { MouseEvent } from "react";
import classes from "./MoviesList.module.css";
import { Movie } from "./Movie";
import { capitalizeFirstLetter } from "../../utilities/text/capitalize";
import { useHistory } from "react-router";

const columns = ["title", "language", "location", "imdbRating"];

const MoviesList: React.FC<{
  movies: Movie[];
  onSortColumn: (
    event: MouseEvent<HTMLTableHeaderCellElement>,
    columnName: string
  ) => void;
  sortKey: string;
  sortOrder: number;
}> = ({ movies, onSortColumn, sortKey, sortOrder }) => {
  const history = useHistory();

  const onRowClickHandler = (
    event: MouseEvent<HTMLTableRowElement>,
    id: number
  ) => {
    event.preventDefault();
    history.replace(`/movies/${id}`);
  };

  return (
    <div className={classes.grid}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th
                  key={column}
                  onClick={(e) => onSortColumn(e, column)}
                  className={sortKey === column ? classes.active : ""}
                >
                  {capitalizeFirstLetter(column)}
                  <span
                    className={`${classes.arrow} ${
                      sortOrder === 1 ? classes.dsc : classes.asc
                    }`}
                  ></span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            return (
              <tr
                key={movie.id}
                onClick={(e) => {
                  onRowClickHandler(e, movie.id);
                }}
              >
                <td>{movie.title}</td>
                <td>{movie.language}</td>
                <td>{movie.location}</td>
                <td>{movie.imdbRating}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ width: 80 }}
                  ></img>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesList;
