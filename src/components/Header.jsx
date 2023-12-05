import {
  Subtask,
  BlueButton,
  Row,
  RoundButton,
  Col,
  StyledLink,
  RowContainer,
  StyledInput,
} from "../components/Styled";

export const Header = ({ title }) => {
  return (
    <Row style={{ alignItems: "center" }}>
      <Col $width="33.3%">
        <StyledLink to={"/"}>
          <RoundButton>
            <i className="fa-solid fa-arrow-left-long"></i>
          </RoundButton>
        </StyledLink>
      </Col>
      <Col>
        {/* <h3>{isEditing ? "Edit Task" : "Add New Task"}</h3> */}
        <h3>{title}</h3>
      </Col>
    </Row>
  );
};
