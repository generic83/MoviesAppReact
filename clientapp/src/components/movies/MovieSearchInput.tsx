import React, { ChangeEvent } from "react";
import classes from "./MovieSearchInput.module.css";

const MovieSearchInput: React.FC<{ onTextEntered: (val: string) => void }> = ({
  onTextEntered,
}) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onTextEntered(val);
  };

  return (
    <div className={classes.input}>
      <label htmlFor="searchText">Enter search text: </label>
      <input type="text" id="searchText" onChange={onChangeHandler} />
    </div>
  );
};

export default MovieSearchInput;
