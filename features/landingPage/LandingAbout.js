import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 100px;
  margin: 0 auto 180px;
  max-width: 1440px;
  background-image: url('/images/connect.svg');
  background-repeat: no-repeat;
  background-size: 450px;
  background-position: 95% center;

  @media screen and (max-width: 1024px) {
    background-image: none;
    padding: 40px 70px;
    margin: 0 auto 120px;
  }

  @media screen and (max-width: 768px) {
    padding: 40px 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 40px 1.5rem;
  }
`;

const AboutContent = styled.div`
  max-width: 500px;

  @media screen and (max-width: 1024px) {
    max-width: 600px;
  }
`;

const AboutTitle = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 2.6rem;
  line-height: 70px;
  margin: 0 0 1.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.8rem;
    line-height: 60px;
  }
`;

const AboutDescription = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.2rem;
  line-height: 40px;
  margin: 0 0 1.5rem;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    line-height: 35px;
  }
`;

function LandingAbout() {
  return (
    <AboutContainer>
      <AboutContent>
        <AboutTitle>Terhubung Dengan Banyak Orang </AboutTitle>
        <AboutDescription>
          Banyak orang diluar sana yang mungkin punya ketertarikan seperti kamu,
          sekarang kamu bisa terhubung dengan mereka!
        </AboutDescription>
      </AboutContent>
    </AboutContainer>
  );
}

export default LandingAbout;
