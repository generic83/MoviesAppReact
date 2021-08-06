import React from "react";

const WeatherSummary: React.FC<{
  message: string;
  changeMessage: (text: string) => void;
}> = ({ message, changeMessage }) => {
  const clickHandler = () => {
    changeMessage("This is a message with a random number" + Math.random());
  };

  return (
    <React.Fragment>
      <h2>{message}</h2>
      <button onClick={clickHandler}>Change message</button>
    </React.Fragment>
  );
};

export default WeatherSummary;
