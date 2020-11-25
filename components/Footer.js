import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: auto;
  background-color: ${({theme}) => theme.colors['black.150']};
`;

const FooterWrapper = styled.div`
  max-width: 1440px;
  padding: 60px 100px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    padding: 60px 70px;
  }

  @media screen and (max-width: 768px) {
    padding: 60px 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 50px 1.5rem;
  }
`;

const FooterContent = styled.div`
  text-align: center;

  .logo {
    width: 40px;
    margin-bottom: 1rem;
    @media screen and (max-width: 480px) {
      width: 32px;
    }
  }

  .text {
    color: ${({theme}) => theme.colors['gray.100']};
    font-size: 1rem;

    @media screen and (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterContent>
          <img
            src="/images/logo-standalone.svg"
            className="logo"
            alt="ambis kuliah logo"
          />
          <p className="text">© 2020 Ambis Kuliah. All rights reserved</p>
        </FooterContent>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
