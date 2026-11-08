'use client';
import { useState } from "react";
import styled, { css } from "styled-components";

const sharedStyles = css`
  color: lightgray;
  border: 0.25vw solid lightgray;
  border-radius: 4px;
`;

const CenteredLayout = styled.div`
  width: 100%;
  height: 100vh; /* Use viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75vw;
`;

const Input = styled.input`
  ${sharedStyles}
  display: flex;
  height: 2vw;
  width: 10vw;
  color: lightgray;
  font-size: 1.75vw;
  font-family: monospace;
  font-weight: 600;
  text-align: center;
  caret-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Enter = styled.button`
  ${sharedStyles}
  height: 2vw;
  width: 7.5vw;
  color: lightgray;
  background-color: transparent;
  font-size: 1.25vw;
  font-family: monospace;
  font-weight: 600;
  text-align: center;
  transition: all 0.05s;
  &:hover {
    cursor: pointer;
    color: black;
    border-color: black;
  }
`;

export default function Login() {
  const [password, setPassword] = useState(""); // Real password stored here

  const handleChange = (e) => {
    // Store the actual password in state
    setPassword(e.target.value);
  };

  return (
    <CenteredLayout>
      {/* Show asterisks in the input but handle real password with onChange */}
      <Input
        type="text"
        value={'*'.repeat(password.length)} // Display asterisks
        onChange={handleChange} // Capture actual password input
        placeholder=""
      />
      <Enter>Enter</Enter>
    </CenteredLayout>
  );
}

