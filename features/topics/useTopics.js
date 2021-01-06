import React from 'react';
// import axios from 'utils/axios';

function useTopics() {
  const [selectedTopics, setTopics] = React.useState([]);

  const onToggleSelect = topicId => {
    if (selectedTopics.includes(topicId)) {
      const filteredTopics = selectedTopics.filter(topic => topic !== topicId);
      setTopics(filteredTopics);
      return;
    }

    setTopics(prevState => [...prevState, topicId]);
  };

  const onSaveTopics = userId => {
    console.log(userId);
    console.log(selectedTopics);
  };

  return {
    onSaveTopics,
    selectedTopics,
    onToggleSelect
  };
}

export default useTopics;
