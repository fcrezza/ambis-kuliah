import React from 'react';
import axios from 'utils/axios';

function useTopics() {
  const [selectedTopics, setTopics] = React.useState([]);

  const onToggleSelect = topicId => {
    const isIncluded = selectedTopics.includes(topicId);

    if (isIncluded) {
      const filteredTopics = selectedTopics.filter(topic => topic !== topicId);
      setTopics(filteredTopics);
      return;
    }

    setTopics([...selectedTopics, topicId]);
  };

  const onSaveTopics = async userId => {
    const data = {userId, data: selectedTopics};
    await axios.post('/api/user.php/topics', data, {withCredentials: true});
  };

  return {onSaveTopics, selectedTopics, onToggleSelect};
}

export default useTopics;
