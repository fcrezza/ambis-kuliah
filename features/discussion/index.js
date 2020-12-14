import React from 'react';
import styled from 'styled-components';

import PostDiscussion from './PostDiscussion';
import ReplyDiscussion from './ReplyDiscussion';

const DiscussionContainer = styled.main`
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

const TitleText = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

function Discussion() {
  return (
    <DiscussionContainer>
      <TitleContainer>
        <TitleText>Diskusi</TitleText>
      </TitleContainer>
      <PostDiscussion />
      <ReplyDiscussion />
    </DiscussionContainer>
  );
}

export default Discussion;
