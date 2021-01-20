import Link from 'next/link';

import {TopicItemContainer, TopicItemImage, TopicItemText} from './utils';

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

export default TopicItem;
