import styled from 'styled-components';

import Head from 'components/Head';
import {Button} from 'components/Button';
import Footer from 'components/Footer';

const ContentContainer = styled.div`
  max-width: 750px;
  padding: 100px;

  @media screen and (max-width: 1024px) {
    padding: 40px 70px;
    max-width: 600px;
  }

  @media screen and (max-width: 768px) {
    padding: 40px 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 40px 1.5rem;
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
    margin: 0 0 3rem;

    @media screen and (max-width: 480px) {
      font-size: 1.1rem;
      line-height: 35px;
    }
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto 200px;
`;

const TopicsContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 5px;
  width: 100%;

  & > div:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

const TopicsItem = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors['black.100']};
  }

  @media screen and (max-width: 480px) {
    padding: 1.5rem;

    .text {
      font-size: 1.1rem;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 2rem;
`;

function topics() {
  return (
    <div>
      <Head title="Ikuti Topik - Pilih topik yang ingin kamu ikuti, diskusi tentang topik terkait akan mancul dihalaman utama kamu." />
      <Container>
        <ContentContainer>
          <h2 className="title">Ikuti Topik</h2>
          <p className="description">
            Pilih topik yang ingin kamu ikuti, diskusi tentang topik terkait
            akan mancul dihalaman utama kamu.
          </p>
          <TopicsContainer>
            <TopicsItem>
              <p className="text">Teknologi</p>
              <Button variant="outline">Ikuti</Button>
            </TopicsItem>{' '}
            <TopicsItem>
              <p className="text">Umum</p>
              <Button variant="outline">Ikuti</Button>
            </TopicsItem>
            <TopicsItem>
              <p className="text">Pendidikan</p>
              <Button variant="outline">Ikuti</Button>
            </TopicsItem>
            <TopicsItem>
              <p className="text">Agama</p>
              <Button variant="outline">Ikuti</Button>
            </TopicsItem>
            <TopicsItem>
              <p className="text">Ekonomi</p>
              <Button variant="outline">Ikuti</Button>
            </TopicsItem>
          </TopicsContainer>
          <ButtonContainer>
            <Button>Simpan</Button>
          </ButtonContainer>
        </ContentContainer>
      </Container>
      <Footer />
    </div>
  );
}

export default topics;
