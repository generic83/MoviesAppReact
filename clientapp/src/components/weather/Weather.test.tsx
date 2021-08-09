import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Weather from "./Weather";

//To update snapshot: npm test -- --updateSnapshot
//https://stackoverflow.com/questions/50138532/command-not-found-jest
//https://jestjs.io/docs/snapshot-testing

describe("Weather component", () => {
  test("should contain 'Default message'", () => {
    render(<Weather />);
    const element = screen.getByText(/Default message/i);
    expect(element).toBeInTheDocument();
  });

  test("should change default message", () => {
    //Arrange
    render(<Weather />);

    //Act
    const btn = screen.getByText("Change message"); //queryByText returns null in case no element found
    userEvent.click(btn);

    const element = screen.getByText(/This is a message with/i);
    expect(element).toBeInTheDocument();
  });

  test("test snapshot", () => {
    const { container, getByText } = render(<Weather />);
    //more about snapshots here
    expect(getByText(/Default message/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
