import Link from 'next/link';
import styled from 'styled-components';

import {PreventBubblingComponent} from './utils';

const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const AuthorFullname = styled.p`
  font-size: 0.8rem;
  margin: 0 0 0 0.5rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

const AuthorContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover,
  &:focus {
    ${AuthorFullname} {
      text-decoration: underline;
    }
  }
`;

function PostAuthor({avatar, fullname, username}) {
  return (
    <PreventBubblingComponent>
      <Link href={`/profile/${username}`} passHref>
        <AuthorContainer>
          <AuthorAvatar src={avatar} alt={`${fullname} avatar`} />
          <AuthorFullname>{fullname}</AuthorFullname>
        </AuthorContainer>
      </Link>
    </PreventBubblingComponent>
  );
}

export default PostAuthor;
