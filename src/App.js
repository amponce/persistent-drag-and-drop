import React from "react";
import styled from "styled-components";
import QuestionList from "./components/QuestionList";

const questions = [
  "Generate app scaffold",
  "Test the todo list",
  "do some other stuff"
];
// const questions = {
//   lists: [
//     {
//       id: "0",
//       text: "Todo",
//       tasks: [{ id: "c0", text: "Generate app scaffold" }]
//     },
//     {
//       id: "1",
//       text: "In Progress",
//       tasks: [{ id: "c2", text: "Build the app" }]
//     },
//     {
//       id: "2",
//       text: "QA",
//       tasks: [{ id: "c2", text: "Ready for QA" }]
//     },
//     {
//       id: "3",
//       text: "Done",
//       tasks: [{ id: "c3", text: "Deploy to prod" }]
//     }
//   ]
// };

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
