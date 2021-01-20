import React from 'react';
import {MdCheck} from 'react-icons/md';

import Modal from 'components/Modal';
import {useAuth} from 'utils/auth';
import {
  ModalTopicsContainer,
  ModalTopicButton,
  ModalButtonIcon,
  ModalTopicText
} from './utils';

function ExploreTopicsModal({isOpen, onClose, topics}) {
  const {userData} = useAuth();
  const [selectedTopics, setTopics] = React.useState(() =>
    userData.topics.map(({id}) => id)
  );

  const onSelectTopic = newTopic => {
    if (selectedTopics.includes(newTopic)) {
      return setTopics(prevState =>
        prevState.filter(topic => topic !== newTopic)
      );
    }

    setTopics(prevState => [...prevState, newTopic]);
  };

  return (
    <Modal title="Ikuti Topik" isOpen={isOpen} onClose={onClose}>
      <ModalTopicsContainer>
        {topics?.map(topic => {
          const isSelected = selectedTopics.includes(topic.id);
          return (
            <ModalTopicButton
              key={topic.id}
              isSelected={isSelected}
              onClick={() => onSelectTopic(topic.id)}
            >
              {isSelected && (
                <ModalButtonIcon>
                  <MdCheck />
                </ModalButtonIcon>
              )}
              <ModalTopicText>{topic.name}</ModalTopicText>
            </ModalTopicButton>
          );
        })}
      </ModalTopicsContainer>
    </Modal>
  );
}

export default ExploreTopicsModal;
