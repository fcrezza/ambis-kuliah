import {users} from 'utils/data';

function usePostReply(userID) {
  const {username} = users.find(user => user.id === userID);

  return {username};
}

export default usePostReply;
