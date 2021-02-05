import styled from 'styled-components';

import {Button} from 'components/Button';

const Message = styled.p`
  margin: 0;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1rem;
`;

const Container = styled.div`
  text-align: center;
  padding: 1.5rem;
`;

export function ErrorBoundary() {
  return (
    <Container>
      <Message>Upzzz, ada yang salah</Message>
    </Container>
  );
}

export function ErrorBoundaryWithRetry({resetErrorBoundary}) {
  return (
    <Container>
      <Message>Upzzz, ada yang tidak beres</Message>
      <Button onClick={resetErrorBoundary}>Coba lagi</Button>
    </Container>
  );
}
