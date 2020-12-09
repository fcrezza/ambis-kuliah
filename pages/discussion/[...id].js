import styled from 'styled-components';

import Post from 'components/Post';

const Container = styled.main`
  flex: 1;
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

function discussion() {
  return (
    <Container>
      <TitleContainer>
        <Title>Diskusi</Title>
      </TitleContainer>
      <Post
        type="detail"
        data={{
          replyTo: '@bagaskarahoahoe',
          avatar: '/images/avatar1.png',
          name: 'Christoph Petersen',
          text:
            'Budget ada berapa? kalo ada 8 juta lebih, mending rakit peci wkwkwk',
          stats: {
            like: 300,
            answer: 0
          },
          timestamp: '10:03 AM, 2 Nov 2020'
        }}
        showControl
      />
    </Container>
  );
}

export default discussion;
