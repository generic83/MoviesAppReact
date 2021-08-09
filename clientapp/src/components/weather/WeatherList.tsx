import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./WeatherList.module.css";
import WeatherListItem from "./WeatherListItem";
import { WeatherItem } from "./WeatherItem";

const WeatherList: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const ctx = useContext(AuthContext);

  const getData = useCallback(() => {
    if (ctx.isAuthenticated) {
      var url = "https://localhost:5445/WeatherForecast";
      fetch(url, {
        headers: {
          Authorization: "Bearer " + ctx.isAuthenticated.access_token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        });
    }
  }, [ctx.isAuthenticated]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={classes.grid}>
      <table>
        <tbody>
          {weatherData.map((item: WeatherItem) => (
            <WeatherListItem key={Math.random()} weatherItem={item} />
          ))}
        </tbody>
      </table>
      <button onClick={getData}>Refresh</button>
    </div>
  );
};

export default React.memo(WeatherList);
