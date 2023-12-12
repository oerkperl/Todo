import Todo from "../components/Todo";
import { useState } from "react";
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

const conditions = ["priority", "complexity"];
const orders = ["Default", "Ascending", "Descending"];
const filters = ["name", "tags"];

const TasksList = () => {
  const {
    todos,
    getTodos,
    setSortOrder,
    setSortCondition,
    sortOrder,
    sortCondition,
  } = useContext(TodoContext);

  const noTask:boolean = todos.length === 0;
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("name");
  const myTodos = getTodos();

  return (
    <>
      {noTask && (
        <div>
          <Center>
            <div>No task in your Todo.Please Add...</div>
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
          {myTodos &&
            myTodos
              .filter((todo) => todo[filterBy].includes(searchValue))
              .map((todo) => <Todo key={todo.id} todo={todo} />)}
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

export default TasksList;
