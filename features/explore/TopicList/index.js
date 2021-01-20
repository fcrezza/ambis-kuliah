import TopicItem from './TopicItem';
import {TopicsContainer} from './utils';

function TopicList({topics}) {
  return (
    <TopicsContainer>
      {topics?.map(topic => (
        <TopicItem
          key={topic.id}
          topicName={topic.name}
          topicImage={`/images/topics/${topic.name}.png`}
        />
      ))}
    </TopicsContainer>
  );
}

export default TopicList;
