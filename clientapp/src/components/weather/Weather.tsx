import React, { useState } from "react";
import WeatherSummary from "./WeatherSummary";
import WeatherList from "./WeatherList";

const Weather = () => {
  const [message, setMessage] = useState("Default message");
  const changeMessage = (text: string) => {
    setMessage(text);
  };
  return (
    <React.Fragment>
      <WeatherSummary message={message} changeMessage={changeMessage} />
      <WeatherList />
    </React.Fragment>
  );
};

export default Weather;
