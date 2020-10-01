import React from "react";
import styled from "styled-components";
import QuestionList from "./components/QuestionList";
import { questions } from "./components/JsonInput";

const App = () => {
  return (
    <Container>
      <QuestionList questions={questions} />
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;
