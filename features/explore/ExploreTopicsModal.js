import styled, {css} from 'styled-components';
import {MdCheck} from 'react-icons/md';

import useExploreTopicsModal from './useExploreTopicsModal';
import Modal from 'components/Modal';
import {topics} from 'utils/data';

const ModalTopicsContainer = styled.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  overflow: hidden;

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ModalTopicText = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1rem;
`;

const ModalButtonIcon = styled.div`
  svg {
    color: ${({theme}) => theme.colors['white.50']};
    font-size: 1.2rem;
    display: block;
    margin-right: 10px;
  }
`;

const ModalTopicButton = styled.button`
  border: 1px solid ${({theme}) => theme.colors['orange.50']};
  border-radius: 5px;
  background: ${({theme, isSelected}) =>
    isSelected ? theme.colors['orange.50'] : 'transparent'};
  padding: 12px;
  cursor: pointer;
  display: flex;

  &:hover,
  &:focus {
    background: ${({theme, isSelected}) =>
      isSelected ? null : theme.colors['gray.50']};
  }

  ${({theme, isSelected}) =>
    isSelected &&
    css`
      ${ModalTopicText} {
        color: ${theme.colors['white.50']};
      }
    `}
`;

function ExploreTopicsModal({isOpen, onClose}) {
  const {selectedTopics, onSelectTopic} = useExploreTopicsModal();

  return (
    <Modal title="Ikuti Topik" isOpen={isOpen} onClose={onClose}>
      <ModalTopicsContainer>
        {topics.map((topic, idx) => {
          const isSelected = selectedTopics.includes(topic.name);
          return (
            <ModalTopicButton
              key={idx}
              isSelected={isSelected}
              onClick={() => onSelectTopic(topic.name)}
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
