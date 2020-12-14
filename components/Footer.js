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
`;

const FooterLogo = styled.img`
  width: 40px;
  margin-bottom: 1rem;

  @media screen and (max-width: 480px) {
    width: 32px;
  }
`;

const FooterCopyright = styled.p`
  color: ${({theme}) => theme.colors['gray.100']};
  font-size: 1rem;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterContent>
          <FooterLogo
            src="/images/logo-standalone.svg"
            alt="ambis kuliah logo"
          />
          <FooterCopyright>
            © 2020 Ambis Kuliah. All rights reserved
          </FooterCopyright>
        </FooterContent>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
