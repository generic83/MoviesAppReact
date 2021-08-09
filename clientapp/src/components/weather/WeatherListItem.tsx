import React from "react";
import { WeatherItem } from "./WeatherItem";

interface Props {
  weatherItem: WeatherItem;
}

const WeatherListItem: React.FC<Props> = (props) => {
  return (
    <tr key={props.weatherItem.key}>
      <td>{props.weatherItem.date}</td>
      <td>{props.weatherItem.summary}</td>
      <td>{props.weatherItem.temperatureF}</td>
      <td>{props.weatherItem.temperatureC}</td>
    </tr>
  );
};

export default WeatherListItem;
