import React from 'react';

import PostDiscussion from './PostDiscussion';
import ReplyDiscussion from './ReplyDiscussion';
import {DiscussionContainer, TitleContainer, TitleText} from './utils';

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
