import React, { useCallback, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import DragAndDrop from "./DragAndDrop";
// import usePersistedState from "../hooks/usePersistedState";

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
  const [state, setState] = useState(defaultValue || questions);

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
      {questions.map((list, index) => {
        const isDragging = state.draggedIndex === index;
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10);

        return (
          <DragAndDrop
            key={list.id}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect
              key={list.id}
              isDragging={isDragging}
              top={isDragging ? draggedTop : top}
            >
              {list}
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
    transition: props.isDragging ? "none" : "all 500ms"
  }
}))`
  width: 450px;
  user-select: none;
  height: ${HEIGHT}px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ top }) => 100 + top}px;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
`;
