import React from 'react';
import styled from 'styled-components';

import TopicsItem from './TopicsItem';
import {Button} from 'components/Button';
import useTopics from './useTopics';

const TopicsContainer = styled.div`
  max-width: 750px;
  padding: 100px;

  @media screen and (max-width: 1024px) {
    padding: 40px 70px;
    max-width: 600px;
  }

  @media screen and (max-width: 768px) {
    padding: 40px 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 40px 1.5rem;
  }
`;

const TopicsTitle = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 2.6rem;
  line-height: 70px;
  margin: 0 0 1.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.8rem;
    line-height: 60px;
  }
`;

const TopicsDescription = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.2rem;
  line-height: 40px;
  margin: 0 0 3rem;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    line-height: 35px;
  }
`;

const TopicsWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto 200px;
`;

const TopicsList = styled.div`
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 5px;
  width: 100%;

  & > div:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 2rem;
`;

function Topics() {
  const {topics, selectedTopics, onToggleSelect} = useTopics();

  return (
    <TopicsWrapper>
      <TopicsContainer>
        <TopicsTitle>Ikuti Topik</TopicsTitle>
        <TopicsDescription>
          Pilih topik yang ingin kamu ikuti, diskusi tentang topik terkait akan
          mancul dihalaman utama kamu.
        </TopicsDescription>
        <TopicsList>
          {topics.map(topic => {
            const isSelected = selectedTopics.includes(topic.name);
            return (
              <TopicsItem
                key={topic.name}
                isSelected={isSelected}
                title={topic.name}
                onToggleSelect={onToggleSelect}
              />
            );
          })}
        </TopicsList>
        <ButtonContainer>
          <Button>Simpan</Button>
        </ButtonContainer>
      </TopicsContainer>
    </TopicsWrapper>
  );
}

export default Topics;
