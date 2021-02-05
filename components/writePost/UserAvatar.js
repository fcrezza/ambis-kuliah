import Link from 'next/link';
import styled from 'styled-components';

import {useAuth} from 'utils/auth';

const ProfileLink = styled.a`
  display: inline-block;
  text-decoration: none;
  border-radius: 50%;
  overflow: hidden;
  width: 80px;
  height: 70px;
`;

const Avatar = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors['gray.150']};
  background-image: ${({imageUrl}) => `url(${imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function UserAvatar() {
  const {userData} = useAuth();

  return (
    <Link href={`/profile/${userData?.username}`} passHref>
      <ProfileLink>
        <Avatar imageUrl={userData?.avatar.url} />
      </ProfileLink>
    </Link>
  );
}

export default UserAvatar;
