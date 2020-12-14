import styled from 'styled-components';

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
`;

const FeaturesTitle = styled.h2`
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
`;

const FeaturesItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 80px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const FeaturesItemContainer = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const FeaturesItemTitle = styled.h3`
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
`;

const FeaturesItemDescription = styled.p`
  font-size: 1.1rem;
  color: ${({theme}) => theme.colors['black.100']};
  line-height: 40px;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    line-height: 35px;
  }
`;

const FeaturesItemNumber = styled.div`
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
`;

const ContentWrapper = styled.div``;

function LandingFeatures() {
  return (
    <FeaturesContainer>
      <FeaturesTitle>Apa Yang Kamu Dapatkan</FeaturesTitle>
      <FeaturesItems>
        {Array(4)
          .fill({
            title: 'Timezone aint nothing',
            description:
              'Lorem Ipsum is dummy text of the printing and typesetting industry.'
          })
          .map((item, idx) => (
            <FeaturesItem
              key={idx}
              number={idx + 1}
              title={item.title}
              description={item.description}
            />
          ))}
      </FeaturesItems>
    </FeaturesContainer>
  );
}

function FeaturesItem({number, title, description}) {
  return (
    <FeaturesItemContainer>
      <ContentWrapper>
        <FeaturesItemNumber>{number}</FeaturesItemNumber>
      </ContentWrapper>
      <ContentWrapper>
        <FeaturesItemTitle>{title}</FeaturesItemTitle>
        <FeaturesItemDescription>{description}</FeaturesItemDescription>
      </ContentWrapper>
    </FeaturesItemContainer>
  );
}

export default LandingFeatures;
