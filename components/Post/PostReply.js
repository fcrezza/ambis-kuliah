import Link from 'next/link';
import styled from 'styled-components';

const ReplyContainer = styled.p`
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
  font-weight: 500;
`;

const ProfileLink = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors['black.50']};

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

function PostReply({replyTo}) {
  return (
    <ReplyContainer>
      Membalas kepada{' '}
      <Link
        href={`/discussion/${replyTo.author.username}/${replyTo.id}`}
        passHref
      >
        <ProfileLink onClick={e => e.stopPropagation()}>
          @{replyTo.author.username}
        </ProfileLink>
      </Link>
    </ReplyContainer>
  );
}

export default PostReply;
