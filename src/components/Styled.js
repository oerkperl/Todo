import styled, { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  
  * { 
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-family: 'Plus Jakarta Sans', sans-serif;
    ul{
      list-style-type: none;
    }
  }
`;
export const Wrapper = styled.div`
  width: 450px;
  margin: 1rem auto;
  //border: 1px solid blue;
  background-color: rgba(135, 206, 250, 0.06);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 1rem;
  box-sizing: border-box;
`;
export const StyledForm = styled.form`
  h4 {
    margin: 0.5rem 0;
  }
`;
export const Row = styled.div`
  display: flex;
  //border: 1px solid blue;
`;

export const Col = styled.div`
  //border: 1px solid red;
  box-sizing: border-box;
  min-height: 20px;
  width: ${(props) => props.$width};
  float: left;
`;
export const Center = styled.div`
  text-align: center;
`;
const Button = styled.button`
  border-radius: 500px;
  border: none;
`;
export const BlueButton = styled(Button)`
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};
  padding: 0.5rem;
  width: 100%;
  margin: 0.5rem 0 0 0;
`;
export const ButtonContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;
export const RoundButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#3498db" : "rgba(135, 206, 250, 0.3)"};
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#222")};
  &:hover {
    background-color: #3498db;
    color: #fff;
  }
`;
export const Lable = styled.label`
  font-size: 20px;
`;
const Input = styled.input`
  width: ${(props) => props.$width};
`;

export const StyledInput = styled(Input)`
  padding: 0.5rem;
  border-radius: 500px;
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.13), 0 1px 4px 0 rgba(0, 0, 0, 0.11);
  border: none;
`;

export const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem 1rem;
  border-radius: 500px;
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.13), 0 1px 4px 0 rgba(0, 0, 0, 0.11);
  border: none;
  width: 50%;
`;
export const RowContainer = styled.div`
  display: flex;
  gap: 10px;
  // border: 1px solid grey;
`;
export const Subtask = styled.li`
  display: flex;
  gap: 10px;
  margin-top: 0.5rem;
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.13), 0 1px 4px 0 rgba(0, 0, 0, 0.11);
  border: none;
  padding: 0.5rem;
  border-radius: 500px;
  background-color: #fff;

  h5 {
    margin-right: auto;
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
    &:hover {
      color: #3498db;
      font-weight: bolder;
    }
  }
`;
export const Dropdown = styled.select`
  padding: 0.5rem;
  border-radius: 500px;
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.13), 0 1px 4px 0 rgba(0, 0, 0, 0.11);
  border: none;
  width: ${(props) => props.$width};
`;

export const TodoCard = styled.div`
  //min-height: 150px;
  //width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.13), 0 1px 4px 0 rgba(0, 0, 0, 0.11);
  border: none;
  position: relative;
`;
const Card = styled.div`
  display: flex;
  gap: 10px;
`;

export const CardButtons = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  margin: 0.5rem 0.5rem 0 0;
  right: 0;
  top: ${(props) => props.$top};
  //border: 1px solid blue;
  z-index: 10;

  button {
    border: none;
    padding: 0.5rem;
    border-radius: 50%;
    color: gery;
    background-color: rgba(135, 206, 250, 0.3);
    cursor: pointer;

    &:hover {
      background-color: #3498db;
      color: #fff;
    }
  }
`;

export const CardRow = styled(Card)`
  //border: 1px solid blue;
  width: 100%;
  h4 {
    margin-right: auto;
    cursor: pointer;
  }

  i {
    //border: 2px solid orange;
    width: 10px;
    color: #333;
  }
  label {
    color: #555;
  }
`;
export const LevelIcon = styled.span`
  background-color: ${(props) => {
    switch (props.$priority) {
      case "High":
        return "red";
      case "Moderate":
        return "orange";
      case "Low":
        return "#3498db";
      default:
        return "transparent";
    }
  }};
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
`;
