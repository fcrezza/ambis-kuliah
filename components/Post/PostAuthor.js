import Link from 'next/link';
import styled from 'styled-components';

import {PreventBubblingComponent} from './utils';

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.colors['gray.100']};
  background-image: url(${({imageUrl}) => imageUrl});
  background-repeat: none;
  background-position: center;
  background-size: cover;
`;

const AuthorFullname = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

const AuthorUsername = styled.p`
  font-size: 0.8rem;
  margin: 0;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

const AuthorContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover,
  &:focus {
    ${AuthorFullname}, ${AuthorUsername} {
      text-decoration: underline;
    }
  }
`;

const NameContainer = styled.div`
  margin-left: 0.7rem;
`;

function PostAuthor({avatar, fullname, username}) {
  return (
    <PreventBubblingComponent>
      <Link href={`/profile/${username}`} passHref>
        <AuthorContainer>
          <AuthorAvatar imageUrl={avatar} />
          <NameContainer>
            <AuthorFullname>{fullname}</AuthorFullname>
            <AuthorUsername>@{username}</AuthorUsername>
          </NameContainer>
        </AuthorContainer>
      </Link>
    </PreventBubblingComponent>
  );
}

export default PostAuthor;
