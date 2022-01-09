import React, { useState } from "react";

const RenderInput = ({ outputConsole }) => {
  const [input, setInput] = useState("");
  const updateValue = (e) => setInput(e.target.value);
  const outputValue = () => {
    if (input) {
      outputConsole(input);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="Enter"
        onChange={updateValue}
      />
      <button onClick={outputValue}>Console</button>
    </div>
  );
};

export default RenderInput;
