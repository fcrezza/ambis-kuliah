import Head from 'components/Head';
import {UnauthenticatedRoute} from 'components/Route';
import Link from 'next/link';
import {darken} from 'polished';

import styled, {css} from 'styled-components';

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  background-color: ${({theme, variant}) =>
    variant === 'dark' ? theme.colors['black.100'] : theme.colors['white.50']};
  padding: 3rem;
`;

const Wrapper = styled.div`
  & > ${Container}:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const HeadingTitle = styled.h1`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0 0 2rem;
  font-size: 3.5rem;
  line-height: 80px;
  text-transform: capitalize;
`;

const HeadingDescription = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0 0 2rem;
  font-size: 1.2rem;
`;

const FeaturesTitle = styled.h2`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 2rem;
  margin: 0;
`;

const FeaturesItemContainer = styled.div``;

const FeaturesItem = styled.div`
  margin-top: 3rem;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  padding: 2rem;
`;

const FeaturesItemTitle = styled.h3`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.5rem;
  margin: 0 0 1.5rem;
  text-transform: capitalize;
`;

const FeaturesItemDescription = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1.1rem;
  margin: 0;
  line-height: 30px;
`;

const JoinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const JoinTitle = styled.h2`
  color: ${({theme}) => theme.colors['white.50']};
  font-size: 2rem;
  margin: 0;
  text-transform: capitalize;
`;

const joinLinkDark = css`
  color: ${({theme}) => theme.colors['white.50']};
  background: ${({theme}) => theme.colors['black.100']};

  &:focus,
  &:hover {
    background: ${({theme}) => darken(0.03, theme.colors['black.100'])};
  }
`;

const joinLinkLight = css`
  color: ${({theme}) => theme.colors['white.50']};
  background: transparent;
  border: 1px solid ${({theme}) => theme.colors['white.50']};

  &:focus,
  &:hover {
    background: ${({theme}) => theme.colors['black.50']};
  }
`;

const $JoinLink = styled.a`
  text-decoration: none;
  padding: 1rem;
  border-radius: 5px;
  font-weight: 700;
  font-size: 1.1rem;
  display: inline-block;

  ${({variant}) => (variant === 'light' ? joinLinkLight : joinLinkDark)}
`;

function LandingPage() {
  return (
    <UnauthenticatedRoute>
      <Head
        title="Ambis Kuliah - Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat kamu berambisi"
        description="Biarkan orang lain tahu, bagikan dan diskusikan hal apa yang membuat kamu berambisi"
      />
      <Wrapper>
        <Container>
          <HeadingTitle>
            Dimana Mahasiswa Membahas Ide Dan Hal yang Menarik
          </HeadingTitle>
          <HeadingDescription>
            Temukan dan ikuti diskusi menarik seputar kehidupan mahasiswa
          </HeadingDescription>
          <JoinLink />
        </Container>
        <Container>
          <FeaturesTitle>Apa Yang Kamu Dapatkan</FeaturesTitle>
          <FeaturesItemContainer>
            <FeaturesItem>
              <FeaturesItemTitle>
                Terhubung dengan sesama mahasiswa
              </FeaturesItemTitle>
              <FeaturesItemDescription>
                Ikut diskusi dengan mahasiswa lain, dapatkan insight dan saling
                terhubung dengan sesama mahasiswa
              </FeaturesItemDescription>
            </FeaturesItem>
            <FeaturesItem>
              <FeaturesItemTitle>Kebebasan berpendapat</FeaturesItemTitle>
              <FeaturesItemDescription>
                Kebebasan menulis utas atau pendapat ke mahasiswa lain dengan
                tetap menjunjung tinggi nilai sopan santun dan tata krama
              </FeaturesItemDescription>
            </FeaturesItem>
            <FeaturesItem>
              <FeaturesItemTitle>Update dengan kabar terkini</FeaturesItemTitle>
              <FeaturesItemDescription>
                Ikuti topik yang kamu suka dan tetap update tentang apa yang
                sedang hangat dibicarakan di kalagan mahasiswa
              </FeaturesItemDescription>
            </FeaturesItem>
          </FeaturesItemContainer>
        </Container>
        <Container variant="dark">
          <JoinContainer>
            <JoinTitle>Mulai diskusi sekarang!</JoinTitle>
            <JoinLink variant="light" />
          </JoinContainer>
        </Container>
      </Wrapper>
    </UnauthenticatedRoute>
  );
}

function JoinLink({variant}) {
  return (
    <Link href="/signup" passHref>
      <$JoinLink variant={variant}>Bergabung Sekarang</$JoinLink>
    </Link>
  );
}

export default LandingPage;
