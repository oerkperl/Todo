import React, { useState, useEffect } from "react";
import Todo from "../components/Todo";
import { useContext } from "react";

import { TodoContext } from "../contexts/todoContext";
import { Link } from "react-router-dom";
import {
  Center,
  BlueButton,
  StyledInput,
  Row,
  Col,
  RowContainer,
  Dropdown,
} from "../components/Styled";

const Todos = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const noTask = todos.length === 0;
  const [sortOrder, setSortOrder] = useState("Default");
  const [sortCondition, setSortCondition] = useState("priority");
  const [searchValue, setSearchValue] = useState("");
  const conditions = ["priority", "complexity"];
  const orders = ["Default", "Ascending", "Descending"];
  const [sortedTodos, setSortedTodos] = useState([...todos]);

  const sortTodos = () => {
    if (sortOrder === "Ascending") {
      todos.sort((a, b) => a.sortCondition - b.sortCondition);
    }

    if (sortOrder === "Descending") {
      todos.sort((a, b) => b.sortCondition - a.sortCondition);
    }
    return todos;
  };

  useEffect(() => {
    if (sortOrder === "Default") {
      setSortedTodos([...todos]);
    } else {
      if (sortCondition === "priority" && sortOrder === "Ascending") {
        sortedTodos.sort((a, b) => a.priority - b.priority);
      }
      if (sortCondition === "priority" && sortOrder === "Descending") {
        sortedTodos.sort((a, b) => b.priority - a.priority);
      }

      if (sortCondition === "complexity" && sortOrder === "Ascending") {
        sortedTodos.sort((a, b) => a.complexity - b.complexity);
      }
      if (sortCondition === "complexity" && sortOrder === "Descending") {
        sortedTodos.sort((a, b) => b.complexity - a.complexity);
      }
    }

    setSortedTodos((previous) => [...previous]);
  }, [sortOrder, sortCondition]);

  return (
    <>
      {noTask && (
        <div>
          <Center>
            <div>No tasks In your Todo.Please Add...</div>
          </Center>
        </div>
      )}
      {!noTask && (
        <div>
          <div>
            <RowContainer>
              <StyledInput
                type="text"
                placeholder="Search..."
                $width="100%"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </RowContainer>
            <Row
              style={{
                justifyContent: "space-between",
                marginTop: "0.5rem",
              }}
            >
              <Col $width="50%">
                <h4>Sort by</h4>
                <Dropdown
                  value={sortCondition}
                  onChange={(e) => setSortCondition(e.target.value)}
                  $width="95%"
                >
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </Dropdown>
              </Col>
              <Col $width="50%">
                <h4>Order</h4>
                <Dropdown
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  $width="100%"
                >
                  {orders.map((order) => (
                    <option key={order} value={order}>
                      {order}
                    </option>
                  ))}
                </Dropdown>
              </Col>
            </Row>
          </div>
          {todos
            .filter((todo) => todo.name.includes(searchValue))
            .map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
        </div>
      )}
      <Center>
        <Link to={"/add"}>
          <BlueButton $backgroundColor="#3498db" $color="#fff">
            Add New Task
          </BlueButton>
        </Link>
      </Center>
    </>
  );
};

export default Todos;
