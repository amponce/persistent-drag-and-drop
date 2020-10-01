import React, { useState, useCallback } from "react";

export const questions = [
  "When is good, good enough?",
  "Do aliens exist?",
  "What is the most googled question?"
];

const JsonInput = () => {
  const [item, setItem] = useState({ questions });

  function handleChangeForm(event) {
    const string = event.target.value;
    // we must pass in the previous state object we had with the spread operator
    setItem({ ...item, string });
  }

  return (
    <div>
      <input type="text" value={item.question} onChange={handleChangeForm} />
      <ul>
        <li>{questions}</li>
      </ul>
    </div>
  );
};

export default JsonInput;
