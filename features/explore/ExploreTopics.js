import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import {lighten} from 'polished';

import {topics} from 'utils/data';

const TopicsContainer = styled.div``;

const TopicItemContainer = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding-left: 1.5rem;

  &:not(:last-child) {
    border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  }

  &:hover,
  &:focus {
    background-color: ${({theme}) => lighten(0.01, theme.colors['gray.50'])};
  }
`;

const TopicItemText = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  font-weight: 500;
  font-size: 1.1rem;
`;

const TopicItemImage = styled(Image)`
  @media screen and (max-width: 480px) {
    display: none !important;
  }
`;

function ExploreTopics() {
  return (
    <TopicsContainer>
      {topics.map((topic, idx) => (
        <TopicItem key={idx} topicName={topic.name} topicImage={topic.image} />
      ))}
    </TopicsContainer>
  );
}

function TopicItem({topicName, topicImage}) {
  return (
    <Link href={`/explore/${topicName}`} passHref>
      <TopicItemContainer>
        <TopicItemText>{topicName}</TopicItemText>
        <TopicItemImage
          src={topicImage}
          alt={`${topicName} image`}
          width={200}
          height={100}
        />
      </TopicItemContainer>
    </Link>
  );
}

export default ExploreTopics;
