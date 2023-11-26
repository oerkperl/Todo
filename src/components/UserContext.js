import React, { createContext, useState, useEffect } from "react";

export const TestContext = createContext("");

export const TestProvider = ({ children }) => {
  const [text, setText] = useState("test");

  useEffect(() => {
    setText("Text from context");
  }, []);

  const getText = () => {
    return text;
  };
  const changeText = (passedText) => {
    setText(passedText);
  };
  return (
    <TestContext.Provider value={{ text, getText, changeText }}>
      {children}
    </TestContext.Provider>
  );
};
