import Link from 'next/link';
import styled from 'styled-components';

import {PreventBubblingComponent} from './utils';

const TopicLink = styled.a`
	text-decoration: none;
	padding: 0.3rem;
	border-radius: 5px;
	border: 1px solid ${({theme}) => theme.colors['orange.50']};
	font-size: 0.8rem;
	font-weight: 500;
	color: ${({theme}) => theme.colors['orange.50']};

	&:focus, &:hover {
		background: ${({theme}) => theme.colors['gray.50']}}
	}
`;

const TopicLinkContainer = styled.div`
  & > ${TopicLink}:not(:last-child) {
    margin-right: 12px;
  }
`;

function PostTopic({topics}) {
  return (
    <PreventBubblingComponent>
      <TopicLinkContainer>
        {topics.map(({id, name}) => (
          <Link key={id} href={`/explore/${name}`} passHref>
            <TopicLink>{name}</TopicLink>
          </Link>
        ))}
      </TopicLinkContainer>
    </PreventBubblingComponent>
  );
}

export default PostTopic;
