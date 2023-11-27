import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
export const GlobalStyle = createGlobalStyle`
  
  * { 
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position:relative;
    width:500px;
    margin:0 auto;
  }
`;
export const Wrapper = styled.div`
  h3,
  h4,
  input,
  button {
    margin-top: 0.5rem;
  }
`;
export const Center = styled.div`
  text-align: center;
`;
const Button = styled.button`
  border-radius: 500px;
  border: none;
`;
export const BlueButton = styled(Button)`
  background-color: #3498db;
  color: #fff;
  padding: 0.5rem 1rem;
  width: 50%;
`;
export const ButtonContainer = styled.div`
  display: flex;

  //justify-content: space-between;
`;

export const RoundButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 5px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#e74c3c" : "#3498db"}; /* Change the colors as needed */
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;
export const Lable = styled.label`
  font-size: 20px;
`;
const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 500px;
  border: 1px solid lightgray;
`;

export const LargInput = styled(Input)``;
export const SmallInput = styled(Input)`
  width: 50%;
`;
export const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem 1rem;
  border-radius: 500px;
  border: 1px solid lightgray;
  width: 50%;
`;
