import React from "react";
import styled from "styled-components";
import QuestionList from "./components/QuestionList";

const questions = [
  "When is good, good enough?",
  "Do aliens exist?",
  "What is the most googled question?"
];

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
