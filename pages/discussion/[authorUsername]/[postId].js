import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import styled from 'styled-components';

import {DiscussionContent, ErrorFallback} from 'features/discussion';

const DiscussionContainer = styled.main``;

function Discussion() {
  return (
    <DiscussionContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DiscussionContent />
      </ErrorBoundary>
    </DiscussionContainer>
  );
}

export default Discussion;
