// LogoutButton.js
import React, { useContext, useState } from "react";
import { TestContext } from "./UserContext";

export const LogoutButton = () => {
  const { text, getText, changeText } = useContext(TestContext);
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    changeText(value);
  };

  return (
    <>
      <div>{text}</div>
      <div>{getText()}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
};
