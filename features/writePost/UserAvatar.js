import Link from 'next/link';
import styled from 'styled-components';
import {useUser} from 'utils/user';

const ProfileLink = styled.a`
  display: inline-block;
  text-decoration: none;
  border-radius: 50%;
  overflow: hidden;
  width: 80px;
  height: 70px;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

function ProfileAvatar() {
  const {userData} = useUser();

  return (
    <Link href={`/profile/${userData?.username}`} passHref>
      <ProfileLink>
        <Avatar
          src={userData?.avatarUrl}
          alt={`${userData?.username} avatar`}
        />
      </ProfileLink>
    </Link>
  );
}

export default ProfileAvatar;
