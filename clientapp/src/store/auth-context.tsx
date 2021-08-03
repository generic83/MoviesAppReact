import React, { useEffect, useState } from "react";
import { User, UserManager, WebStorageStateStore } from "oidc-client";

const AuthContext = React.createContext<{
  login: () => void;
  logout: () => void;
  loginCallback: (location: any) => void;
  isAuthenticated: User | null;
  getUser: () => Promise<User | null>;
}>({
  login: () => {},
  logout: () => {},
  loginCallback: (location: any) => {},
  isAuthenticated: null,
  getUser: () => new Promise((user) => {}),
});

const IDENTITY_CONFIG: any = {
  authority: "https://localhost:5443",
  client_id: "js",
  redirect_uri: "http://localhost:3000/callback.html",
  response_type: "id_token token",
  scope: "openid profile weatherapi.read",
  post_logout_redirect_uri: "http://localhost:3000/index.html",
};

IDENTITY_CONFIG.userStore = new WebStorageStateStore({
  store: window.localStorage,
});

const userManager = new UserManager(IDENTITY_CONFIG);

const logout = () => {
  userManager.signoutRedirect();
};

const getUser = async (): Promise<User | null> => {
  const user = await userManager.getUser();
  if (user) {
    return user;
  }
  return null;
};

userManager.events.addAccessTokenExpired(() => {
  logout();
});

export const AuthContextProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const setUserIfExists = async () => {
      const usr = await getUser();
      setUser(usr);
    };
    setUserIfExists();
  }, []);

  const login = () => {
    userManager.signinRedirect({ state: { path: window.location.pathname } });
  };

  const loginCallback = (location: any) => {
    userManager.signinRedirectCallback().then(
      (user) => {
        window.history.replaceState(
          {},
          window.document.title,
          window.location.origin // + user.state.path
        );
        location.pathname = user.state.path;
        setUser(user);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const providerValue: {
    login: () => void;
    logout: () => void;
    loginCallback: (location: any) => void;
    isAuthenticated: User | null;
    getUser: () => Promise<User | null>;
  } = {
    login: login,
    logout: logout,
    loginCallback: loginCallback,
    isAuthenticated: user,
    getUser: getUser,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
