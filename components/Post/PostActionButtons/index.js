import {IconButton} from 'components/Button';
import {
  PostControl,
  UpvoteIconDefault,
  UpvoteIconFill,
  VoteStats,
  DownvoteIconDefault,
  DownvoteIconFill
} from './style';

function PostActionButtons(props) {
  const {isUpvote, isDownvote, voteStats, onUpvote, onDownvote} = props;

  const handleUpvote = e => {
    e.stopPropagation();
    onUpvote();
  };

  const handleDownvote = e => {
    e.stopPropagation();
    onDownvote();
  };

  return (
    <PostControl>
      <IconButton onClick={handleUpvote}>
        {isUpvote ? <UpvoteIconFill /> : <UpvoteIconDefault />}
      </IconButton>
      <VoteStats>{voteStats}</VoteStats>
      <IconButton onClick={handleDownvote}>
        {isDownvote ? <DownvoteIconFill /> : <DownvoteIconDefault />}
      </IconButton>
    </PostControl>
  );
}

export default PostActionButtons;
