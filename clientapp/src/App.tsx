import React from "react";
import Header from "./components/layout/Header";
import "./App.css";
import Container from "./components/layout/Container";
import Movies from "./components/movies/Movies";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Movies />
      </Container>
    </React.Fragment>
  );
}

export default App;
