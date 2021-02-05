import styled from 'styled-components';
import {mutate} from 'swr';

import {Button} from 'components/Button';

const ErrorContainer = styled.div`
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1rem;
  line-height: 40px;
  margin: 0 0 1.5rem;
`;

function ErrorFallback({error, resetErrorBoundary}) {
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
    <ErrorContainer>
      <ErrorMessage>
        Data tidak dapat dimuat, coba beberapa saat lagi
      </ErrorMessage>
      <Button onClick={reset}>Coba Lagi</Button>
    </ErrorContainer>
  );
}

export default ErrorFallback;
