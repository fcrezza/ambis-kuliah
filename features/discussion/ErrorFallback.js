import {mutate} from 'swr';

import {Button} from 'components/Button';

import styled from 'styled-components';
import Head from 'components/Head';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
  align-self: flex-start;
  background: ${({theme}) => theme.colors['white.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 10px;

  & > *:not(:last-child) {
    margin: 0 0 2rem;
  }
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 2rem;
`;

const Message = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1rem;
`;

function NotFound() {
  return (
    <Container>
      <Head
        title={`Data tidak ditemukan - Ambis Kuliah`}
        description={`Data tidak ditemukan`}
      />
      <Title>
        <span role="img" aria-label="404">
          😭
        </span>
      </Title>
      <Message>Data tidak ditemukan</Message>
    </Container>
  );
}

function ErrorFallback({error, resetErrorBoundary}) {
  const reset = async () => {
    await mutate(error.config.url, null, true);
    resetErrorBoundary();
    return;
  };

  if (error?.response.status === 404) {
    return <NotFound />;
  }

  if (error.request) {
    return (
      <Container>
        <Head
          title={`Upzzz, Tidak dapat memuat data - Ambis Kuliah`}
          description={`Upzzz, Tidak dapat memuat data`}
        />
        <Message>Upzzz, tidak dapat memuat data</Message>
        <Button onClick={reset}>Coba Lagi</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Head
        title={`Upzzz, Ada yang salah - Ambis Kuliah`}
        description={`Upzzz, Ada yang salah`}
      />
      <Message>Upzzz, Ada yang salah</Message>
      <Button onClick={resetErrorBoundary}>Coba Lagi</Button>
    </Container>
  );
}

export default ErrorFallback;
