import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import AuthContext, { AuthContextProps } from "./store/auth-context";
import { Profile, User } from "oidc-client";

//To update snapshot: npm test -- --updateSnapshot
//https://stackoverflow.com/questions/50138532/command-not-found-jest
//https://jestjs.io/docs/snapshot-testing

test("should show Weather component for /home router", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Welcome to Movies App/i);
  expect(linkElement).toBeInTheDocument();
});

test("should show Weather component for /weather router", () => {
  render(
    <MemoryRouter initialEntries={["/weather"]}>
      <App />
    </MemoryRouter>
  );
  const element = screen.getByText(/Default/i);
  expect(element).toBeInTheDocument();
});

const profile = {
  name: "Fadi",
} as Profile;
const authContextValue = {
  isAuthenticated: { profile: profile } as User,
} as AuthContextProps;

test("should show Weather component for /profile router", () => {
  render(
    <AuthContext.Provider value={authContextValue}>
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  const element = screen.getByText(/Fadi/i);
  expect(element).toBeInTheDocument();
});
