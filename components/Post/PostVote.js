import styled, {css} from 'styled-components';
import {
  TiArrowDownThick,
  TiArrowDownOutline,
  TiArrowUpThick,
  TiArrowUpOutline
} from 'react-icons/ti';

import {IconButton} from 'components/Button';
import {PreventBubblingComponent} from './utils';
import {useUser} from 'utils/user';

const VoteContainer = styled.div`
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

function PostVote(props) {
  const {isUpvote, isDownvote, voteStats, handleUpvote, handleDownvote} = props;
  const {userData} = useUser();

  const onClickUpvote = () => {
    if (!Object.keys(userData).length) {
      alert('Kamu harus login terlebih dahulu');
      return;
    }
    handleUpvote();
  };

  const onClickDownvote = () => {
    if (!Object.keys(userData).length) {
      alert('Kamu harus login terlebih dahulu');
      return;
    }
    handleDownvote();
  };

  return (
    <PreventBubblingComponent>
      <VoteContainer>
        <IconButton onClick={onClickUpvote}>
          {isUpvote ? <UpvoteIconFill /> : <UpvoteIconDefault />}
        </IconButton>
        <VoteStats>{voteStats}</VoteStats>
        <IconButton onClick={onClickDownvote}>
          {isDownvote ? <DownvoteIconFill /> : <DownvoteIconDefault />}
        </IconButton>
      </VoteContainer>
    </PreventBubblingComponent>
  );
}

export default PostVote;
