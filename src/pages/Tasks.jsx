import Todo from "../components/Todo";
import React, { useState, useEffect } from "react";
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
  const {
    todos,
    getTodos,
    setSortOrder,
    setSortCondition,
    sortOrder,
    sortCondition,
  } = useContext(TodoContext);

  const noTask = todos.length === 0;
  const [searchValue, setSearchValue] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const conditions = ["priority", "complexity"];
  const orders = ["Default", "Ascending", "Descending"];
  const filters = ["name", "tags"];
  const [sortedTodos, setSortedTodos] = useState([...todos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sorted = await getTodos();
        setSortedTodos(sorted);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchData();
  }, [getTodos, sortOrder, sortCondition]);

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
            <Row>
              <StyledInput
                type="text"
                placeholder="Search..."
                $width="100%"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Row>

            <RowContainer
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
                  $width="100%"
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

              <Col $width="50%">
                <h4>Filter by</h4>
                <Dropdown
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  $width="100%"
                >
                  {filters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  ))}
                </Dropdown>
              </Col>
            </RowContainer>
          </div>
          {sortedTodos
            .filter((todo) => todo[filterBy].includes(searchValue))
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
