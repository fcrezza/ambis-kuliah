import styled from 'styled-components';

import Head from 'components/Head';

const HeaderContainer = styled.header`
  max-width: 1440px;
  margin: 0 auto;
  padding: 100px;
  background-image: url('/images/idea.svg');
  background-repeat: no-repeat;
  background-size: 450px;
  background-position: 95% center;
`;

const HeaderContent = styled.div`
  max-width: 550px;

  .title {
    color: ${({theme}) => theme.colors['black.150']};
    font-size: 3.2rem;
    line-height: 70px;
    margin: 0 0 1.8rem;

    span {
      display: block;
    }
  }

  .description {
    color: ${({theme}) => theme.colors['black.100']};
    font-size: 1.3rem;
    line-height: 40px;
    margin: 0 0 1.8rem;
  }
`;

const AuthLink = styled.a`
  text-decoration: none;

  img {
    display: block;
    width: 250px;
  }
`;

const FeaturesContainer = styled.div`
  margin: 0 auto;
  padding: 100px;
  max-width: 1440px;
  margin-bottom: 50px;

  .title {
    font-size: 2.6rem;
    color: ${({theme}) => theme.colors['black.150']};
    margin: 0 0 6rem;
  }
`;

const FeaturesItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 80px;
`;

const FeaturesItem = styled.div`
  width: 100%;
  display: flex;

  .features-item-title {
    color: ${({theme}) => theme.colors['black.150']};
    font-size: 1.8rem;
    margin: 0 0 1rem;
    font-weight: 500;
  }

  .features-item-description {
    font-size: 1.1rem;
    color: ${({theme}) => theme.colors['black.100']};
    line-height: 40px;
  }

  .features-item-number {
    align-self: flex-start;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors['orange.50']};
    font-weight: 700;
    color: ${({theme}) => theme.colors['white.50']};
    text-align: center;
    font-size: 1.6rem;
    line-height: 50px;
    margin-right: 2rem;
  }
`;

const AboutContainer = styled.div`
  padding: 100px;
  margin: 0 auto 180px;
  max-width: 1440px;
  background-image: url('/images/connect.svg');
  background-repeat: no-repeat;
  background-size: 450px;
  background-position: 95% center;
`;

const AboutContent = styled.div`
  max-width: 500px;

  .title {
    color: ${({theme}) => theme.colors['black.150']};
    font-size: 2.6rem;
    line-height: 70px;
    margin: 0 0 1.5rem;
  }

  .description {
    color: ${({theme}) => theme.colors['black.100']};
    font-size: 1.2rem;
    line-height: 40px;
    margin: 0 0 1.5rem;
  }
`;

const FooterContainer = styled.footer`
  margin-top: auto;
  background-color: ${({theme}) => theme.colors['black.150']};
`;

const FooterWrapper = styled.div`
  max-width: 1440px;
  padding: 0 100px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  padding: 100px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: ${({theme}) => theme.colors['white.50']};
    font-size: 2.6rem;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors['black.50']};
`;

const FooterCopyright = styled.div`
  padding: 60px 0;
  text-align: center;

  .logo {
    width: 40px;
    margin-bottom: 1rem;
  }

  .text {
    color: ${({theme}) => theme.colors['gray.100']};
    font-size: 1rem;
  }
`;

function landingPage() {
  return (
    <div>
      <Head
        title="Ambis Kuliah - Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat kamu berambisi"
        description="Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat kamu berambisi"
      />
      <HeaderContainer>
        <HeaderContent>
          <h1 className="title">
            Mahasiswa, <span>Tunjukan Ambisimu!</span>
          </h1>
          <p className="description">
            Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat
            kamu berambisi
          </p>
          <AuthLink href="#">
            <img
              src={'/images/btn_google_signin_dark_normal_web@2x.png'}
              alt="login menggunakan google"
            />
          </AuthLink>
        </HeaderContent>
      </HeaderContainer>
      <FeaturesContainer>
        <h2 className="title">Apa Yang Kamu Dapatkan</h2>
        <FeaturesItemContainer>
          <FeaturesItem>
            <div>
              <div className="features-item-number">1</div>
            </div>
            <div>
              <h3 className="features-item-title">Timezone aint nothing</h3>
              <p className="features-item-description">
                Lorem Ipsum is dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </FeaturesItem>
          <FeaturesItem>
            <div>
              <div className="features-item-number">2</div>
            </div>
            <div>
              <h3 className="features-item-title">Timezone aint nothing</h3>
              <p className="features-item-description">
                Lorem Ipsum is dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </FeaturesItem>
          <FeaturesItem>
            <div>
              <div className="features-item-number">3</div>
            </div>
            <div>
              <h3 className="features-item-title">Timezone aint nothing</h3>
              <p className="features-item-description">
                Lorem Ipsum is dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </FeaturesItem>
          <FeaturesItem>
            <div>
              <div className="features-item-number">4</div>
            </div>
            <div>
              <h3 className="features-item-title">Timezone aint nothing</h3>
              <p className="features-item-description">
                Lorem Ipsum is dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </FeaturesItem>
        </FeaturesItemContainer>
      </FeaturesContainer>
      <AboutContainer>
        <AboutContent>
          <h2 className="title">Terhubung Dengan Banyak Orang </h2>
          <p className="description">
            Banyak orang diluar sana yang mungkin punya ketertarikan seperti
            kamu, sekarang kamu bisa terhubung dengan mereka!
          </p>
        </AboutContent>
      </AboutContainer>
      <FooterContainer>
        <FooterWrapper>
          <FooterContent>
            <h2 className="title">Mulai Diskusi Sekarang!</h2>
            <AuthLink href="#">
              <img
                src={'/images/btn_google_signin_dark_normal_web@2x.png'}
                alt="login menggunakan google"
              />
            </AuthLink>
          </FooterContent>
          <Divider />
          <FooterCopyright>
            <img
              src="/images/logo-standalone.svg"
              className="logo"
              alt="ambis kuliah logo"
            />
            <p className="text">© 2020 Ambis Kuliah. All rights reserved</p>
          </FooterCopyright>
        </FooterWrapper>
      </FooterContainer>
    </div>
  );
}

export default landingPage;
