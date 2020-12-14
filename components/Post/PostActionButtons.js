import {
  TiArrowDownThick,
  TiArrowDownOutline,
  TiArrowUpThick,
  TiArrowUpOutline
} from 'react-icons/ti';
import styled, {css} from 'styled-components';

import {IconButton} from 'components/Button';

const PostControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
  width: 30px;
`;

const buttonIcon = css`
  font-size: 2rem;
  color: ${({theme}) => theme.colors['orange.50']};
  display: block;
`;

const UpvoteIconFill = styled(TiArrowUpThick)`
  ${buttonIcon}
`;

const DownvoteIconFill = styled(TiArrowDownThick)`
  ${buttonIcon}
`;

const UpvoteIconDefault = styled(TiArrowUpOutline)`
  ${buttonIcon}
`;

const DownvoteIconDefault = styled(TiArrowDownOutline)`
  ${buttonIcon}
`;

const VoteStats = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({theme}) => theme.colors['black.150']};
  display: inline-block;
  margin: 5px 0;
`;

function PostActionButton({reaction, onReactPost, voteStats}) {
  return (
    <PostControl>
      <IconButton onClick={e => onReactPost('upvote', e)}>
        {reaction === 'upvote' ? <UpvoteIconFill /> : <UpvoteIconDefault />}
      </IconButton>
      <VoteStats>{voteStats}</VoteStats>
      <IconButton onClick={e => onReactPost('downvote', e)}>
        {reaction === 'downvote' ? (
          <DownvoteIconFill />
        ) : (
          <DownvoteIconDefault />
        )}
      </IconButton>
    </PostControl>
  );
}

export default PostActionButton;
