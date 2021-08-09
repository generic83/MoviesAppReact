import React from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const SilentSigninCallback = () => {
  const ctx = useContext(AuthContext);
  ctx.userManager?.signinSilentCallback();
  return null;
};

export default SilentSigninCallback;
