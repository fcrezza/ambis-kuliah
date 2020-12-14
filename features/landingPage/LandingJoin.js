import styled from 'styled-components';

import {AuthLink} from './shared';

const JoinContainer = styled.div`
  margin-top: auto;
  background-color: ${({theme}) => theme.colors['black.150']};
`;

const JoinWrapper = styled.div`
  max-width: 1440px;
  padding: 0 100px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    padding: 0 70px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 50px 1.5rem;
  }
`;

const JoinContent = styled.div`
  padding: 100px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors['black.50']};

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const JoinTitle = styled.h2`
  color: ${({theme}) => theme.colors['white.50']};
  font-size: 2.6rem;
  line-height: 70px;

  @media screen and (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.8rem;
    line-height: 60px;
  }
`;

function LandingJoin() {
  return (
    <JoinContainer>
      <JoinWrapper>
        <JoinContent>
          <JoinTitle>Mulai Diskusi Sekarang!</JoinTitle>
          <AuthLink />
        </JoinContent>
      </JoinWrapper>
    </JoinContainer>
  );
}

export default LandingJoin;
