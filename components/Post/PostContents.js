import Link from 'next/link';
import styled from 'styled-components';
import usePostReply from './usePostReply';

const PostReplyContainer = styled.p`
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
`;

const ProfileLink = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors['orange.50']};

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const PostProfileAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const PostProfileName = styled.p`
  font-size: 0.8rem;
  margin: 0 0 0 0.5rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

const PostProfileContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover,
  &:focus {
    ${PostProfileName} {
      text-decoration: underline;
    }
  }
`;
export const PostTitle = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1.3rem;
  line-height: 30px;
  font-weight: 700;
  display: inline-block;
  margin: 0;
`;

export const PostDescription = styled.p`
  line-height: 30px;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1rem;
  margin: 0;
`;

export const PostFooter = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const Divider = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({theme}) => theme.colors['black.50']};
`;

export const AnswerStats = styled.p`
  font-size: 0.8rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

export const TimeStamp = styled.p`
  font-size: 0.8rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

export function PostReply({replyTo}) {
  const {username} = usePostReply(replyTo.userID);

  return (
    <PostReplyContainer>
      Membalas kepada
      <Link href={`/discussion/${username}/${replyTo.postID}`} passHref>
        <ProfileLink onClick={e => e.stopPropagation()}>
          {' '}
          @{username}
        </ProfileLink>
      </Link>
    </PostReplyContainer>
  );
}

export function PostProfile({avatar, name, href}) {
  return (
    <Link href={href} passHref>
      <PostProfileContainer onClick={e => e.stopPropagation()}>
        <PostProfileAvatar src={avatar} alt={`${name} avatar`} />
        <PostProfileName>{name}</PostProfileName>
      </PostProfileContainer>
    </Link>
  );
}
