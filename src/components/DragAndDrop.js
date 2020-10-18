import React, { useState, useMemo, useCallback, useEffect } from "react";

const COORDS = { x: 0, y: 0 };

const initialState = {
  isDragging: false,
  origin: COORDS, // Initial cursor position
  translation: COORDS // Postion relative to Origin
};

const DragAndDrop = ({ children, id, onDrag, onDragEnd }) => {
  const [drag, setDrag] = useState(initialState);

  // Mouse down event
  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setDrag((drag) => ({
      ...drag,
      isDragging: true,
      origin: { x: clientX, y: clientY }
    }));
  }, []);

  // Mouse move event
  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - drag.origin.x,
        y: clientY - drag.origin.y
      };
      setDrag((state) => ({
        ...state,
        translation
      }));

      onDrag({ translation, id });
    },
    [drag.origin, onDrag, id]
  );

  // Mouse up event
  const handleMouseUp = useCallback(() => {
    setDrag((drag) => ({
      ...drag,
      isDragging: false
    }));
    onDragEnd();
  }, [onDragEnd]);

  useEffect(() => {
    if (drag.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setDrag((drag) => ({ ...drag, translation: COORDS }));
    }
  }, [drag.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () => ({
      cursor: drag.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${drag.translation.x}px, ${drag.translation.y}px)`,
      transition: drag.isDragging ? "none" : "transform 500ms",
      zIndex: drag.isDragging ? 2 : 1,
      position: drag.isDragging ? "absolute" : "relative"
    }),
    [drag.isDragging, drag.translation]
  );

  return (
    <div>
      <div style={styles} onMouseDown={handleMouseDown}>
        {children}
      </div>
    </div>
  );
};

export default DragAndDrop;
