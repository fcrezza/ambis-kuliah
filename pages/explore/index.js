import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled, {css} from 'styled-components';
import {lighten} from 'polished';
import {MdCheck} from 'react-icons/md';
import {AiOutlineSetting} from 'react-icons/ai';

import Head from 'components/Head';
import Modal from 'components/Modal';
import Search from 'components/Search';
import {topics} from 'utils/data';

const Container = styled.main`
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

const IconButton = styled.button`
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;

  &:focus,
  &:hover {
    background: ${({theme}) => lighten(0.2, theme.colors['orange.50'])};
  }

  svg {
    font-size: 1.8rem;
    color: ${({theme, disabled}) =>
      disabled
        ? lighten(0.1, theme.colors['orange.50'])
        : theme.colors['orange.50']};
  }
`;

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

const ModalButtonIcon = styled.div`
  svg {
    color: ${({theme}) => theme.colors['white.50']};
    font-size: 1.2rem;
    display: block;
    margin-right: 10px;
  }
`;

const ModalTopicText = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1rem;
`;

const TopicText = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  font-weight: 500;
  font-size: 1.1rem;
`;

const TopicItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding-left: 1.5rem;

  &:focus,
  &:hover {
    ${TopicText} {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 480px) {
    .topic-image {
      display: none !important;
    }
  }
`;

const TopicsContainer = styled.div`
  ${({theme}) => css`
    ${TopicItem}:not(:last-child) {
      border-bottom: 1px solid ${theme.colors['gray.100']};
    }
  `}
`;

const SearchContainer = styled.div`
  padding: 1.5rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const Wrapper = styled.div`
  flex: 1;
`;

function explore() {
  const [isModalOpen, setModalState] = React.useState(false);

  const onSettingClick = () => {
    setModalState(true);
  };

  const onModalClose = () => {
    setModalState(false);
  };

  return (
    <Wrapper>
      <Head
        title="Eksplor topik - Ambis Kuliah"
        description="Eksplor berbagai macam topik diskusi"
      />
      <TopicsModal isOpen={isModalOpen} onClose={onModalClose} />
      <SearchContainer>
        <Search placeholder="Cari Diskusi" />
      </SearchContainer>
      <Container>
        <TitleContainer>
          <Title>Eksplor</Title>
          <IconButton onClick={onSettingClick}>
            <AiOutlineSetting />
          </IconButton>
        </TitleContainer>
        <TopicsContainer>
          {topics.map((topic, idx) => (
            <Link key={idx} href={`/explore/${topic.name}`} passHref>
              <TopicItem>
                <TopicText>{topic.name}</TopicText>
                <Image
                  className="topic-image"
                  src={topic.image}
                  alt={`${topic.name} image`}
                  width={200}
                  height={100}
                />
              </TopicItem>
            </Link>
          ))}
        </TopicsContainer>
      </Container>
    </Wrapper>
  );
}

function TopicsModal({isOpen, onClose}) {
  const [selectedTopics, setTopics] = React.useState([]);

  const onClickButton = newTopic => {
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
        {topics.map((topic, idx) => {
          const isSelected = selectedTopics.includes(topic.name);
          return (
            <ModalTopicButton
              key={idx}
              isSelected={isSelected}
              onClick={() => onClickButton(topic.name)}
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

export default explore;
