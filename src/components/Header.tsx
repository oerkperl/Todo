
import React from 'react';
import { HeaderWrapper, RoundButton, StyledLink } from './Styled'; 

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <HeaderWrapper>
      <StyledLink to={'/'}>
        <RoundButton >
          <i className="fa-solid fa-arrow-left-long"></i>
        </RoundButton>
      </StyledLink>
      <span>
        <h3>{title}</h3>
      </span>
    </HeaderWrapper>
  );
};

export default Header;
