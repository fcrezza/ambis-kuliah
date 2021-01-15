import React from 'react';
import {useAuth} from 'utils/auth';
import axios from 'utils/axios';

function useTopics() {
  const [selectedTopics, setTopics] = React.useState([]);
  const {updateProfile} = useAuth();

  const onToggleSelect = topicId => {
    const isIncluded = selectedTopics.includes(topicId);

    if (isIncluded) {
      const filteredTopics = selectedTopics.filter(topic => topic !== topicId);
      setTopics(filteredTopics);
      return;
    }

    setTopics([...selectedTopics, topicId]);
  };

  const onSaveTopics = async () => {
    const data = {
      name: 'topics',
      data: selectedTopics
    };
    const response = await axios.put('/auth/user', data, {
      withCredentials: true
    });

    updateProfile(
      async userData => ({
        ...userData,
        topics: response.data.data
      }),
      false
    );
  };

  return {onSaveTopics, selectedTopics, onToggleSelect};
}

export default useTopics;
