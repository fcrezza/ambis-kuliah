import {useRouter} from 'next/router';
import styled from 'styled-components';

import {Button} from 'components/Button';

const Container = styled.div`
  min-width: 100%;
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors['white.50']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.h1`
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0 0 2rem;
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

function ErrorFallback() {
  const {reload} = useRouter();
  const onReload = () => {
    reload();
  };

  return (
    <Container>
      <ContentWrapper>
        <ErrorMessage>Upzzz, ada yang tidak beres</ErrorMessage>
        <Button onClick={onReload}>Coba lagi</Button>
      </ContentWrapper>
    </Container>
  );
}

export default ErrorFallback;
