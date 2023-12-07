import { useNavigate } from "react-router-dom";
import { HeaderWrapper, RoundButton } from "../components/Styled";

export const Header = ({ title }) => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <RoundButton
        onClick={() => {
          navigate(-1) || navigate("/");
        }}
      >
        <i className="fa-solid fa-arrow-left-long"></i>
      </RoundButton>
      <span>
        <h3>{title}</h3>
      </span>
    </HeaderWrapper>
  );
};
