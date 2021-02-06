import styled from 'styled-components';

import Head from 'components/Head';
import Posts from 'features/home/Posts';
import WritePost from 'components/writePost';
import {AuthenticatedRoute} from 'components/Route';

const HomeContainer = styled.main`
  flex: 1;
`;

const WritePostWrapper = styled.div`
  background: ${({theme}) => theme.colors['white.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 10px;
`;

function Home() {
  return (
    <AuthenticatedRoute>
      <Head
        title="Beranda - Ambis Kuliah"
        description="Ambis kuliah homepage"
      />
      <HomeContainer>
        <WritePostWrapper>
          <WritePost />
        </WritePostWrapper>
        <Posts />
      </HomeContainer>
    </AuthenticatedRoute>
  );
}

export default Home;
