import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import { User } from "oidc-client";
import Container from "../components/layout/Container";

const ProfilePage = () => {
  const ctx = useContext(AuthContext);
  const user: User | null | undefined = ctx.isAuthenticated;
  return (
    <Container>
      <h2>Name: {user?.profile.name}</h2>
      <h2>Website: {user?.profile.website}</h2>
      <h2>Email: {user?.profile.email}</h2>
    </Container>
  );
};

export default ProfilePage;
