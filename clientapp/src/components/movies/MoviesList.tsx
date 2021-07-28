import React, { MouseEvent } from "react";
import classes from "./MoviesList.module.css";
import { Movie } from "./Movie";

const columns = ["title", "language", "location", "imdbRating"];

const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const MoviesList: React.FC<{
  movies: Movie[];
  onSortColumn: (
    event: MouseEvent<HTMLTableHeaderCellElement>,
    columnName: string
  ) => void;
  sortKey: string;
  sortOrder: number;
}> = ({ movies, onSortColumn, sortKey, sortOrder }) => {
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
                  {capitalize(column)}
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
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.language}</td>
                <td>{movie.location}</td>
                <td>{movie.imdbRating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesList;
