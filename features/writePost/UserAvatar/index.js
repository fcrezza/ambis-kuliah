import Link from 'next/link';
import {useUser} from 'utils/user';
import {ProfileLink, Avatar} from './utils';

function ProfileAvatar() {
  const {userData} = useUser();

  return (
    <Link href={`/profile/${userData?.username}`} passHref>
      <ProfileLink>
        <Avatar
          src={userData?.avatar.url}
          alt={`${userData?.username} avatar`}
        />
      </ProfileLink>
    </Link>
  );
}

export default ProfileAvatar;
