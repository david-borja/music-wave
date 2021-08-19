import React from "react";

export const useControlledInput = (initialState = "") => {
  const [input, setInput] = React.useState(initialState);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return { input, setInput, handleChange };
};

export default useControlledInput;
