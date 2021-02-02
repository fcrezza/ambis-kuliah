import axios from 'utils/axios';
import produce from 'immer';

export function upvotePost(postId, userId, prevData) {
  let hasUpvote = false;
  let hasDownvote = false;
  const newData = produce(prevData, draft => {
    const post = Array.isArray(draft)
      ? draft.find(p => p.id === postId)
      : draft;
    if (post.feedback.upvotes) {
      hasUpvote = true;
      post.feedback.upvotes = false;
      post.stats.upvotes--;
    } else if (post.feedback.downvotes) {
      hasDownvote = true;
      post.feedback.downvotes = false;
      post.feedback.upvotes = true;
      post.stats.downvotes--;
      post.stats.upvotes++;
    } else {
      post.feedback.upvotes = true;
      post.stats.upvotes++;
    }
  });

  if (hasUpvote) {
    unUpvote(Number(postId), Number(userId));
  } else if (hasDownvote) {
    unDownvote(Number(postId), Number(userId)).then(() =>
      upvote(Number(postId), Number(userId))
    );
  } else {
    upvote(Number(postId), Number(userId));
  }

  return newData;
}

export function downvotePost(postId, userId, prevData) {
  let hasUpvote = false;
  let hasDownvote = false;
  const newData = produce(prevData, draft => {
    const post = Array.isArray(draft)
      ? draft.find(p => p.id === postId)
      : draft;
    if (post.feedback.downvotes) {
      hasDownvote = true;
      post.feedback.downvotes = false;
      post.stats.downvotes--;
    } else if (post.feedback.upvotes) {
      hasUpvote = true;
      post.feedback.upvotes = false;
      post.feedback.downvotes = true;
      post.stats.upvotes--;
      post.stats.downvotes++;
    } else {
      post.feedback.downvotes = true;
      post.stats.downvotes++;
    }
  });

  if (hasDownvote) {
    unDownvote(Number(postId), Number(userId));
  } else if (hasUpvote) {
    unUpvote(Number(postId), Number(userId)).then(() =>
      downvote(Number(postId), Number(userId))
    );
  } else {
    downvote(Number(postId), Number(userId));
  }

  return newData;
}

export function deletePost(postId, username, prevData) {
  const newData = prevData
    ? prevData.filter(p => Number(p.id) !== Number(postId))
    : null;
  axios.delete(`/posts/${username}/${postId}`);
  return newData;
}

/**
 * functions bellow handle server request and
 * catch/ignore error when error happen
 */

function downvote(postId, userId) {
  const url = `/posts/${postId}/downvotes`;
  const data = {postId, userId};
  axios.post(url, data).catch(() => null);
}

function upvote(postId, userId) {
  const url = `/posts/${postId}/upvotes`;
  const data = {postId, userId};
  axios.post(url, data).catch(() => null);
}

function unUpvote(postId, userId) {
  const url = `/posts/${postId}/upvotes/${userId}`;
  return axios.delete(url).catch(() => null);
}

function unDownvote(postId, userId) {
  const url = `/posts/${postId}/downvotes/${userId}`;
  return axios.delete(url).catch(() => null);
}
