import React, { useEffect, useState } from "react";
import {
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from "oidc-client";

export interface AuthContextProps {
  login: () => void;
  logout: () => void;
  signinCallback: (user: User | null) => void;
  isAuthenticated: User | null;
  querySessionStatus: () => void;
  userManager: UserManager | null;
}
const AuthContext = React.createContext<AuthContextProps>({
  userManager: null,
  login: () => {},
  logout: () => {},
  signinCallback: (user: User | null) => {},
  isAuthenticated: null,
  querySessionStatus: () => {},
});

//Implict flow settings
//On login an iframe is added to the page with url to identity server connect/checksession
//The way I understand it, this enables the application to check whether the user is still logged in
//https://connect2id.com/products/server/docs/api/check-session
// const IDENTITY_CONFIG: any = {
//   authority: "https://localhost:5443",
//   client_id: "js",
//   redirect_uri: "http://localhost:3000/callback.html",
//   //This is one way to renew when token expires.
//   //However, it requires changing SecurityHeaderAttribute in IdentityServer to allow iframe
//   silent_redirect_uri: "http://localhost:3000/silent-redirect.html",
//   response_type: "id_token token",
//   scope: "openid profile weatherapi.read",
//   post_logout_redirect_uri: "http://localhost:3000/index.html",
//   userStore: new WebStorageStateStore({
//     store: window.localStorage,
//   }),
// };

//Authorization code with pkce
//Refresh token request: https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess
//Why should not use refresh token with SPA: https://pragmaticwebsecurity.com/talks/xssoauth.html
type ExtendedUserManagerSetting = UserManagerSettings & {
  monitorAnonymousSession: boolean;
};
const IDENTITY_CONFIG: ExtendedUserManagerSetting = {
  authority: "https://localhost:5443",
  client_id: "js_code",
  response_type: "code",
  scope: "openid profile weatherapi.read role",
  userStore: new WebStorageStateStore({
    store: window.localStorage,
  }),
  post_logout_redirect_uri: "http://localhost:3000/index.html",

  //redirect_uri is for the sign-in callback
  redirect_uri: "http://localhost:3000/callback.html",

  //silent_redirect_uri is used when calling: signinSilent, querySessionStatus, and other methods
  //For the callback you can use signinCallback, proxy to popup, redirect, and silent callbacks
  //This is one way to renew tokens silently when they expire.
  //However, it requires changing SecurityHeaderAttribute in IdentityServer to allow iframe, frame-ancestors 'self' http://localhost:3000
  silent_redirect_uri: "http://localhost:3000/silent-redirect.html",
  response_mode: "query",
  //set this to true to monitor anonymous session, so addUserSignedIn is triggered
  //This also somehow causes silent_redirect_uri or redirect_url on page load(Place debugger in Route)
  monitorAnonymousSession: true,

  //https://github.com/IdentityModel/oidc-client-js/issues/330
  //JWTs are not revocable. Tokens are revoked when they are stored in the token service (presumably in some DB).
  //revokeAccessTokenOnSignout: true,

  //validateSubOnSilentRenew: true,
  //silentRequestTimeout: 10000,
  //filterProtocolClaims: true,
};

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

const querySessionStatus = () => {
  userManager
    .querySessionStatus()
    .then(function (status) {
      console.log("user's session status", status);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const login = async () => {
  userManager.signinRedirect({
    state: { path: window.location.pathname },
    useReplaceToNavigate: true,
  });
};

export const AuthContextProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const setUserIfExists = async () => {
      const usr = await getUser();
      setUser(usr);
    };
    setUserIfExists();

    userManager.events.addUserSignedOut(function () {
      setUser(null);
      window.location.href = "./";
    });

    userManager.events.addUserSignedIn(function () {
      userManager.getUser().then((user) => {
        setUser(user);
      });
    });

    userManager.events.addAccessTokenExpired(() => {
      userManager.signinSilent().then((user) => {
        setUser(user);
      });
    });
  }, []);

  const signinCallback = (user: User | null) => {
    setUser(user);
  };

  const providerValue: AuthContextProps = {
    login: login,
    logout: logout,
    signinCallback: signinCallback,
    isAuthenticated: user,
    querySessionStatus: querySessionStatus,
    userManager: userManager,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
