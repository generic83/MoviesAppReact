import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherList from "./WeatherList";
import AuthContext, { AuthContextProps } from "../../store/auth-context";
import { User } from "oidc-client";

describe("async component", () => {
  test("renders weather", async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => [
        {
          date: "2020",
          summary: "summary1",
        },
      ],
    });

    //How to Properly Mock Typed Variables in Unit Tests with TypeScript
    //https://dev.to/zhiyueyi/how-to-properly-mock-typed-variables-in-unit-tests-with-typescript-116b
    const authContextValue = {
      isAuthenticated: {} as User,
    } as AuthContextProps;

    render(
      <AuthContext.Provider value={authContextValue}>
        <WeatherList />
      </AuthContext.Provider>
    );

    //https://testing-library.com/docs/queries/byrole/
    //https://www.w3.org/TR/html-aria/#docconformance
    //find methods return promise so they can await async call in case of async api call
    const tableDataRows = await screen.findAllByRole("cell");
    expect(tableDataRows).toHaveLength(4);
  });
});
