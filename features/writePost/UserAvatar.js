import Link from 'next/link';
import styled from 'styled-components';

import {users} from 'utils/data';

const ProfileLink = styled.a`
  display: inline-block;
  text-decoration: none;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

function ProfileAvatar() {
  return (
    <Link href={`/profile/${users[2].username}`} passHref>
      <ProfileLink>
        <Avatar src={users[2].avatar} alt={`${users[2].fullname} avatar`} />
      </ProfileLink>
    </Link>
  );
}

export default ProfileAvatar;
