import React, { useContext } from "react";
import Container from "../components/layout/Container";
import AuthContext from "../store/auth-context";

const HomePage = () => {
  const ctx = useContext(AuthContext);
  return (
    <Container>
      <h2>Welcome to Movies App made with React!</h2>
      <button onClick={ctx.querySessionStatus}>Query user session state</button>
    </Container>
  );
};

export default HomePage;
