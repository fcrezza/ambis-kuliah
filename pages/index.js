import styled from 'styled-components';

import Head from 'components/Head';
import Footer from 'components/Footer';

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

  .title {
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
  }

  .description {
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
  }
`;

const AuthLink = styled.a`
  text-decoration: none;
  display: inline-block;

  img {
    display: block;
    width: 250px;

    @media screen and (max-width: 1024px) {
      width: 230px;
    }

    @media screen and (max-width: 480px) {
      width: 200px;
    }
  }
`;

const FeaturesContainer = styled.div`
  margin: 0 auto;
  padding: 100px;
  max-width: 1440px;
  margin-bottom: 50px;

  @media screen and (max-width: 1024px) {
    padding: 70px;
  }
  @media screen and (max-width: 768px) {
    padding: 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 50px 1.5rem;
  }

  .title {
    line-height: 70px;
    font-size: 2.6rem;
    color: ${({theme}) => theme.colors['black.150']};
    margin: 0 0 6rem;

    @media screen and (max-width: 1024px) {
      font-size: 2.2rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 1.8rem;
      line-height: 60px;
    }
  }
`;

const FeaturesItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 80px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const FeaturesItem = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }

  .features-item-title {
    color: ${({theme}) => theme.colors['black.150']};
    font-size: 1.8rem;
    margin: 0 0 1rem;
    font-weight: 500;

    @media screen and (max-width: 1024px) {
      font-size: 1.6rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 1.5rem;
      line-height: 35px;
    }
  }

  .features-item-description {
    font-size: 1.1rem;
    color: ${({theme}) => theme.colors['black.100']};
    line-height: 40px;

    @media screen and (max-width: 480px) {
      font-size: 1.1rem;
      line-height: 35px;
    }
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

    @media screen and (max-width: 1024px) {
      width: 45px;
      height: 45px;
      line-height: 45px;
      font-size: 1.5rem;
    }

    @media screen and (max-width: 480px) {
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 1.4rem;
      margin: 0 0 1rem 0;
    }
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

  .title {
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
  }

  .description {
    color: ${({theme}) => theme.colors['black.100']};
    font-size: 1.2rem;
    line-height: 40px;
    margin: 0 0 1.5rem;

    @media screen and (max-width: 480px) {
      font-size: 1.1rem;
      line-height: 35px;
    }
  }
`;

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

  h2 {
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
      <JoinContainer>
        <JoinWrapper>
          <JoinContent>
            <h2 className="title">Mulai Diskusi Sekarang!</h2>
            <AuthLink href="#">
              <img
                src={'/images/btn_google_signin_dark_normal_web@2x.png'}
                alt="login menggunakan google"
              />
            </AuthLink>
          </JoinContent>
        </JoinWrapper>
      </JoinContainer>
      <Footer />
    </div>
  );
}

export default landingPage;
