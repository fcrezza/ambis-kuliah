import axios from 'utils/axios';

export function upvotePost(postId, userId, prevData) {
  let hasUpvote = false;
  let hasDownvote = false;
  const newData = prevData.flat().map(post => {
    if (post.id === postId) {
      if (post.feedback.upvotes) {
        hasUpvote = true;
        post = {
          ...post,
          feedback: {
            ...post.feedback,
            upvotes: false
          },
          stats: {
            ...post.stats,
            upvotes: post.stats.upvotes - 1
          }
        };

        return post;
      }

      if (post.feedback.downvotes) {
        hasDownvote = true;
        post = {
          ...post,
          feedback: {
            upvotes: true,
            downvotes: false
          },
          stats: {
            upvotes: post.stats.upvotes + 1,
            downvotes: post.stats.downvotes - 1
          }
        };
        return post;
      }

      post = {
        ...post,
        feedback: {
          ...post.feedback,
          upvotes: true
        },
        stats: {
          ...post.stats,
          upvotes: post.stats.upvotes + 1
        }
      };
      return post;
    }

    return post;
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
  const newData = prevData.flat().map(post => {
    if (post.id === postId) {
      if (post.feedback.downvotes) {
        hasDownvote = true;
        post = {
          ...post,
          feedback: {
            ...post.feedback,
            downvotes: false
          },
          stats: {
            ...post.stats,
            downvotes: post.stats.downvotes - 1
          }
        };
        return post;
      }

      if (post.feedback.upvotes) {
        hasUpvote = true;
        post = {
          ...post,
          feedback: {
            upvotes: false,
            downvotes: true
          },
          stats: {
            upvotes: post.stats.upvotes - 1,
            downvotes: post.stats.downvotes + 1
          }
        };
        return post;
      }

      post = {
        ...post,
        feedback: {
          ...post.feedback,
          downvotes: true
        },
        stats: {
          ...post.stats,
          downvotes: post.stats.downvotes + 1
        }
      };
      return post;
    }

    return post;
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

// handle server request and catch/ignore error when error happen

function downvote(postId, userId) {
  const url = `/posts/${postId}/downvotes`;
  const data = {postId, userId: Number(userId)};
  const options = {withCredentials: true};
  axios.post(url, data, options).catch(() => null);
}

function upvote(postId, userId) {
  const url = `/posts/${postId}/upvotes`;
  const data = {postId, userId: Number(userId)};
  const options = {withCredentials: true};
  axios.post(url, data, options).catch(() => null);
}

function unUpvote(postId, userId) {
  const url = `/posts/${postId}/upvotes/${userId}`;
  const options = {withCredentials: true};
  return axios.delete(url, options).catch(() => null);
}

function unDownvote(postId, userId) {
  const url = `/posts/${postId}/downvotes/${userId}`;
  const options = {withCredentials: true};
  return axios.delete(url, options).catch(() => null);
}
