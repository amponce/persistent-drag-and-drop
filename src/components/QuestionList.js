import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Draggable from "./DragAndDrop";

const HEIGHT = 80;

const QuestionList = ({ questions }) => {
  const defaultValue = {
    order: questions,
    dragOrder: questions,
    draggedIndex: null
  };

  const [state, setState] = useState(defaultValue);

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

  return (
    <Container>
      {questions.map((item, index) => {
        const isDragging = state.draggedIndex === index;
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10);

        return (
          <Draggable
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect isDragging={isDragging} top={isDragging ? draggedTop : top}>
              {item.text}
            </Rect>
          </Draggable>
        );
      })}
    </Container>
  );
};

export default QuestionList;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Rect = styled.div.attrs((props) => ({
  style: {
    transition: props.isDragging ? "none" : "all 500ms"
  }
}))`
  width: 300px;
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
