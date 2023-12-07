import { HeaderWrapper, RoundButton, StyledLink } from "../components/Styled";

export const Header = ({ title }) => {
  return (
    <HeaderWrapper>
      <StyledLink to={"/"}>
        <RoundButton>
          <i className="fa-solid fa-arrow-left-long"></i>
        </RoundButton>
      </StyledLink>
      <span>
        <h3>{title}</h3>
      </span>
    </HeaderWrapper>
  );
};
