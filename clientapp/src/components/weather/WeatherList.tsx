import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./WeatherList.module.css";

const WeatherList: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
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
          setWeatherData(data);
        });
    }
  }, [ctx.isAuthenticated]);

  return (
    <>
      <h2>Weather</h2>
      <div className={classes.grid}>
        <table>
          <tbody>
            {weatherData.map((item: any) => {
              return (
                <tr key={Math.random()}>
                  <td>{item.date}</td>
                  <td>{item.summary}</td>
                  <td>{item.temperatureF}</td>
                  <td>{item.temperatureC}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WeatherList;
