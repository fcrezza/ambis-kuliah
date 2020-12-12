import {useState} from 'react';

import {topics} from 'utils/data';

function useTopics() {
  const [selectedTopics, setTopics] = useState([]);

  const onToggleSelect = topicName => {
    if (selectedTopics.includes(topicName)) {
      const filteredTopics = selectedTopics.filter(
        topic => topic !== topicName
      );
      setTopics(filteredTopics);
      return;
    }

    setTopics(prevState => [...prevState, topicName]);
  };

  return {
    topics,
    selectedTopics,
    onToggleSelect
  };
}

export default useTopics;
