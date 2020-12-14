import React from 'react';
import {useAuth} from 'utils/auth';

function useExploreTopicsModal() {
  const {user} = useAuth();
  const [selectedTopics, setTopics] = React.useState([...user.topics]);

  const onSelectTopic = newTopic => {
    if (selectedTopics.includes(newTopic)) {
      return setTopics(prevState =>
        prevState.filter(topic => topic !== newTopic)
      );
    }

    setTopics(prevState => [...prevState, newTopic]);
  };

  return {
    selectedTopics,
    onSelectTopic
  };
}

export default useExploreTopicsModal;
