import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./WeatherList.module.css";

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
      <button onClick={getData}>Refresh</button>
    </div>
  );
};

export default React.memo(WeatherList);
