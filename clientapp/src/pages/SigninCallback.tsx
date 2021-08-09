import React from "react";
import { useContext } from "react";
import { Redirect } from "react-router";
import AuthContext from "../store/auth-context";
import { User } from "oidc-client";

const SigninCallback = () => {
  const ctx = useContext(AuthContext);
  ctx.userManager?.signinRedirectCallback().then((user: User) => {
    ctx.signinCallback(user);
  });
  return <Redirect to="/" />;
};

export default SigninCallback;
