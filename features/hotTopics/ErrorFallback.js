import {mutate} from 'swr';

import {Button} from 'components/Button';

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
    <div style={{textAlign: 'center'}}>
      <p>Upzzz, ada yang tidak beres</p>
      <Button onClick={reset}>Coba lagi</Button>
    </div>
  );
}

export default ErrorFallback;
