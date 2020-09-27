import React, { useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import DragAndDrop from "./DragAndDrop";
import usePersistedState from "../hooks/usePersistedState";

const HEIGHT = 80;

const QuestionList = ({ questions }) => {
  const defaultValue = useMemo(
    () => ({
      order: questions,
      dragOrder: questions,
      draggedIndex: null
    }),
    [questions]
  );

  //  list changes to local storage
  const [state, setState] = usePersistedState("update-list", defaultValue);

  const handleDrag = useCallback(
    ({ translation, id }) => {
      const delta = Math.round(translation.y / HEIGHT);
      const index = state.order.indexOf(id);
      const dragOrder = state.order.filter((index) => index !== id);

      if (!questions) {
        return;
      }

      dragOrder.splice(index + delta, 0, id);

      setState((state) => ({
        ...state,
        draggedIndex: id,
        dragOrder
      }));
    },
    [state.order, questions, setState]
  );

  const handleDragEnd = useCallback(() => {
    setState((state) => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null
    }));
  }, [setState]);

  useEffect(() => {
    console.log("Update order: ", state && state.dragOrder);
  }, [state]);

  return (
    <Container>
      {questions.map((index) => {
        const isDragging = state.draggedIndex === index;
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10);

        return (
          <DragAndDrop
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect isDragging={isDragging} top={isDragging ? draggedTop : top}>
              {index}
            </Rect>
          </DragAndDrop>
        );
      })}
    </Container>
  );
};

export default QuestionList;

const Container = styled.div`
  background: #eee;
  width: 100vw;
  min-height: 100vh;
`;

const Rect = styled.div.attrs((props) => ({
  style: {
    transition: props.isDragging ? "none" : "all 500ms",
    opacity: props.isDragging ? 0.7 : 1
  }
}))`
  font-family: "Raleway", sans-serif;
  width: 450px;
  user-select: none;
  height: ${HEIGHT}px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 5px;
  background: lightblue;
  text-transform: uppercase;
  top: ${({ top }) => 100 + top}px;
  left: calc(50vw - 150px);
  font-size: 14.5px;
  color: #fff;
  letter-spacing: 2px;
  :nth-child(1) {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }
`;
