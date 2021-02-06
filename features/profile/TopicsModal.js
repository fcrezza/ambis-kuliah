import React from 'react';
import styled, {css} from 'styled-components';
import {MdCheck} from 'react-icons/md';

import Modal from 'components/Modal';
import {Button} from 'components/Button';

const TopicsContainer = styled.div`
  padding: 1.5rem;
  overflow: hidden;
`;

const TopicsItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ModalTopicText = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1rem;
`;

const SelectedIcon = styled(MdCheck)`
  color: ${({theme}) => theme.colors['white.50']};
  font-size: 1.2rem;
  display: block;
  margin-right: 10px;
`;

const TopicButton = styled.button`
  border: 1px solid ${({theme}) => theme.colors['black.100']};
  border-radius: 5px;
  background: ${({theme, isSelected}) =>
    isSelected ? theme.colors['black.100'] : 'transparent'};
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

const ButtonContainer = styled.div`
  border-top: 1px solid ${({theme}) => theme.colors['gray.100']};
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: right;
`;

function TopicsModal({topics, topicsData, isOpen, onClose}) {
  const [selectedTopics, setTopics] = React.useState(() => topics);

  const onSelectTopic = newTopic => {
    const isFound = selectedTopics.find(topic => topic.id === newTopic.id);
    if (isFound) {
      return setTopics(prevState =>
        prevState.filter(topic => topic.id !== newTopic.id)
      );
    }

    setTopics(prevState => [...prevState, newTopic]);
  };

  const onClickSubmit = () => {
    console.log(selectedTopics);
  };

  return (
    <Modal title="Ikuti Topik" isOpen={isOpen} onClose={onClose}>
      <TopicsContainer>
        <TopicsItemContainer>
          {topicsData.map(topic => {
            const isSelected = selectedTopics.find(t => t.id === topic.id);
            return (
              <TopicButton
                key={topic.id}
                isSelected={isSelected}
                onClick={() => onSelectTopic(topic)}
              >
                {isSelected && <SelectedIcon />}
                <ModalTopicText>{topic.name}</ModalTopicText>
              </TopicButton>
            );
          })}
        </TopicsItemContainer>
        <ButtonContainer>
          <Button onClick={onClickSubmit}>Simpan</Button>
        </ButtonContainer>
      </TopicsContainer>
    </Modal>
  );
}

export default TopicsModal;
