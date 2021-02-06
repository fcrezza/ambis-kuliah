import {mutate} from 'swr';
import styled from 'styled-components';

import {Button} from 'components/Button';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Message = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1rem;
  margin: 0 0 2rem;
`;

function ErrorFallback({resetErrorBoundary, error}) {
  const reset = async () => {
    if (error.response) {
      await mutate(error.response.config.url, null, true);
      resetErrorBoundary();
      return;
    }

    if (error.request) {
      await mutate(error.config.url, null, true);
      resetErrorBoundary();
      // show tast or snackbar
      return;
    }

    resetErrorBoundary();
  };

  return (
    <Container>
      <Message>Upzzz, ada yang tidak beres</Message>
      <Button onClick={reset}>Coba lagi</Button>
    </Container>
  );
}

export default ErrorFallback;
