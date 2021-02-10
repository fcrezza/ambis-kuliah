import axios from 'utils/axios';
import IProduce from 'immer';

export function upvotePost(postId, userId, prevData) {
  let hasUpvote = false;
  let hasDownvote = false;
  const newData = IProduce(prevData, draft => {
    if (Array.isArray(prevData)) {
      for (const {posts} of draft) {
        const post = posts.find(post => post.id === postId);
        if (post) {
          if (post.interactions.upvote) {
            hasUpvote = true;
            post.interactions.upvote = false;
            post.stats.upvotes--;
          } else if (post.interactions.downvote) {
            hasDownvote = true;
            post.interactions.downvote = false;
            post.interactions.upvote = true;
            post.stats.downvotes--;
            post.stats.upvotes++;
          } else {
            post.interactions.upvote = true;
            post.stats.upvotes++;
          }
          break;
        }
      }
    } else {
      if (draft.interactions.upvote) {
        hasUpvote = true;
        draft.interactions.upvote = false;
        draft.stats.upvotes--;
      } else if (draft.interactions.downvote) {
        hasDownvote = true;
        draft.interactions.downvote = false;
        draft.interactions.upvote = true;
        draft.stats.downvotes--;
        draft.stats.upvotes++;
      } else {
        draft.interactions.upvote = true;
        draft.stats.upvotes++;
      }
    }
  });

  if (hasUpvote) {
    unUpvote(postId, userId);
  } else if (hasDownvote) {
    unDownvote(postId, userId).then(() => upvote(postId, userId));
  } else {
    upvote(postId, userId);
  }
  return newData;
}

export function downvotePost(postId, userId, prevData) {
  let hasUpvote = false;
  let hasDownvote = false;
  const newData = IProduce(prevData, draft => {
    if (Array.isArray(prevData)) {
      for (const {posts} of draft) {
        const post = posts.find(post => post.id === postId);
        if (post) {
          if (post.interactions.downvote) {
            hasDownvote = true;
            post.interactions.downvote = false;
            post.stats.downvotes--;
          } else if (post.interactions.upvote) {
            hasUpvote = true;
            post.interactions.upvote = false;
            post.interactions.downvote = true;
            post.stats.upvotes--;
            post.stats.downvotes++;
          } else {
            post.interactions.downvote = true;
            post.stats.downvotes++;
          }
          break;
        }
      }
    } else {
      if (draft.interactions.downvote) {
        hasDownvote = true;
        draft.interactions.downvote = false;
        draft.stats.downvotes--;
      } else if (draft.interactions.upvote) {
        hasUpvote = true;
        draft.interactions.upvote = false;
        draft.interactions.downvote = true;
        draft.stats.upvotes--;
        draft.stats.downvotes++;
      } else {
        draft.interactions.downvote = true;
        draft.stats.downvotes++;
      }
    }
  });

  if (hasDownvote) {
    unDownvote(postId, userId);
  } else if (hasUpvote) {
    unUpvote(postId, userId).then(() => downvote(postId, userId));
  } else {
    downvote(postId, userId);
  }

  return newData;
}

export async function deletePost(postId, username, prevData) {
  const newData = Array.isArray(prevData)
    ? prevData.map(item => ({
        ...item,
        posts: item.posts.filter(post => post.id !== postId)
      }))
    : null;
  await axios.delete(`/posts/${username}/${postId}`);
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
