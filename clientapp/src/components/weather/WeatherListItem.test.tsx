import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherListItem from "./WeatherListItem";
import { WeatherItem } from "./WeatherItem";

describe("WeatherListItem Component", () => {
  it("should show expected weather item properties", () => {
    const sourceWeatherItem: WeatherItem = {
      date: "2021",
      summary: "summary",
      temperatureC: "22",
      temperatureF: "40",
      key: Math.random(),
    };
    render(<WeatherListItem weatherItem={sourceWeatherItem} />);

    const tableCells = screen.getAllByRole("cell");
    expect(tableCells).toHaveLength(4);
    expect(tableCells[0].textContent).toEqual("2021");
  });
});
