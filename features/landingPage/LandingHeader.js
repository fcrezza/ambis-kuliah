import styled from 'styled-components';

import {AuthLink} from './shared';

const HeaderContainer = styled.header`
  max-width: 1440px;
  margin: 0 auto;
  padding: 100px;
  background-image: url('/images/idea.svg');
  background-repeat: no-repeat;
  background-size: 450px;
  background-position: 95% center;

  @media screen and (max-width: 1024px) {
    background-image: none;
    padding: 100px 70px;
  }

  @media screen and (max-width: 768px) {
    padding: 100px 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 80px 1.5rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 550px;
`;

const HeaderTitle = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 3.2rem;
  line-height: 70px;
  margin: 0 0 1.8rem;

  span {
    display: block;

    @media screen and (max-width: 480px) {
      display: inline;
    }
  }

  @media screen and (max-width: 1024px) {
    font-size: 2.9rem;
  }

  @media screen and (max-width: 480px) {
    line-height: 60px;
    font-size: 2rem;
    margin: 0 0 1.3rem;
  }
`;

const HeaderDescription = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.3rem;
  line-height: 40px;
  margin: 0 0 1.8rem;

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    margin: 0 0 1.3rem;
    line-height: 35px;
  }
`;

function LandingHeader() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTitle>
          Mahasiswa, <span>Tunjukan Ambisimu!</span>
        </HeaderTitle>
        <HeaderDescription>
          Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat
          kamu berambisi
        </HeaderDescription>
        <AuthLink />
      </HeaderContent>
    </HeaderContainer>
  );
}

export default LandingHeader;
