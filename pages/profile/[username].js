import React from 'react';
import styled from 'styled-components';
import {lighten, darken} from 'polished';

import Head from 'components/Head';
import {Button} from 'components/Button';
import Post from 'components/Post';
import {PostSkeleton} from 'components/Skeleton';
import Modal from 'components/Modal';
import {posts, users} from 'utils/data';

const Container = styled.main`
  flex: 1;
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

const ProfileDescriptionContainer = styled.div`
  padding: 3.5rem 1.5rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const ProfileContentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
`;

const ProfileFullname = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.5rem;
`;

const ProfileUsername = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1rem;
`;

const ProfileBio = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1.1rem;
  line-height: 30px;
`;

const ProfileMenuContainer = styled.div`
  border-top: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
`;

const MenuLink = styled.button`
  border: 0;
  background: ${({theme, isActive}) =>
    isActive ? lighten(0.2, theme.colors['orange.50']) : 'transparent'};
  display: inline-block;
  width: 50%;
  padding: 1.5rem;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.1rem;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({theme, isActive}) =>
      !isActive && theme.colors['gray.50']};
  }
`;

const ProfileEditContainer = styled.div`
  padding: 1.5rem;
`;

const AvatarWrapper = styled.div`
  padding: 1.5rem 0 3rem;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

const InputLabel = styled.label`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  display: inline-block;
`;

const Input = styled.input`
  padding: 0.8rem;
  width: 100%;
  background-color: ${({theme, disabled}) =>
    disabled ? darken(0.05, theme.colors['gray.50']) : theme.colors['gray.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
  font-size: 1rem;
  color: ${({theme, disabled}) =>
    disabled ? theme.colors['black.50'] : theme.colors['black.100']};
  border-radius: 5px;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

const Textarea = styled.textarea`
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
  padding: 0.8rem;
  font-size: 1rem;
  width: 100%;
  color: ${({theme}) => theme.colors['black.100']};
  min-height: 100px;
  resize: vertical;
  display: block;
  border-radius: 5px;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

function Profile() {
  const [menuActive, setMenuActive] = React.useState('write');
  const [isModalOpen, setModalState] = React.useState(false);
  const user = users[2];

  const onMenuClick = menu => {
    if (menuActive !== menu) {
      setMenuActive(menu);
    }
  };

  const onEditClick = () => {
    setModalState(true);
  };

  const onModalClose = () => {
    setModalState(false);
  };

  return (
    <Container>
      <Head
        title={`${user.fullname} (@${user.username}) - Ambis Kuliah`}
        description={`${user.fullname} profile page`}
      />
      <ProfileEdit isOpen={isModalOpen} onClose={onModalClose} />
      <TitleContainer>
        <Title>Profile</Title>
        <Button>Logout</Button>
      </TitleContainer>
      <ProfileDescriptionContainer>
        <ProfileContentHeader>
          <ProfileAvatar src={user.avatar} alt={`${user.fullname} avatar`} />
          <Button variant="outline" onClick={onEditClick}>
            Edit Profil
          </Button>
        </ProfileContentHeader>
        <ProfileFullname>{user.fullname}</ProfileFullname>
        <ProfileUsername>@{user.username}</ProfileUsername>
        <ProfileBio>{user.bio}</ProfileBio>
      </ProfileDescriptionContainer>
      <ProfileMenuContainer>
        <MenuLink
          isActive={menuActive === 'write'}
          onClick={() => onMenuClick('write')}
        >
          Tulisan
        </MenuLink>
        <MenuLink
          isActive={menuActive === 'reply'}
          onClick={() => onMenuClick('reply')}
        >
          Balasan
        </MenuLink>
      </ProfileMenuContainer>
      {menuActive === 'write' ? <ProfileWrite /> : <ProfileReply />}
    </Container>
  );
}

function ProfileWrite() {
  const [discussions, setDiscussions] = React.useState(null);

  React.useEffect(() => {
    let data = posts.filter(
      post => !post.replyTo && post.userID === users[2].id
    );
    data = data.map(post => {
      const user = users.find(user => user.id === post.userID);
      return {
        user,
        post
      };
    });

    setTimeout(() => {
      setDiscussions(data);
    }, 3000);
  }, []);

  return discussions
    ? discussions.map((discussion, idx) => (
        <Post
          key={idx}
          postID={discussion.post.id}
          title={discussion.post.title}
          text={discussion.post.text}
          tags={discussion.post.tags}
          stats={discussion.post.stats}
          timestamp={discussion.post.timestamp}
          fullname={discussion.user.fullname}
          username={discussion.user.username}
          avatar={discussion.user.avatar}
          showControl
        />
      ))
    : Array(3)
        .fill()
        .map((_, idx) => (
          <PostSkeleton uniqueKey={`post-skeleton-${idx}`} key={idx} />
        ));
}

function ProfileReply() {
  const [discussions, setDiscussions] = React.useState(null);

  React.useEffect(() => {
    const replies = posts.filter(post => Boolean(post.replyTo));
    const data = replies.map(reply => {
      const user = users.find(user => user.id === reply.userID);
      return {
        user,
        reply
      };
    });

    setTimeout(() => {
      setDiscussions(data);
    }, 3000);
  }, []);

  return discussions
    ? discussions.map((discussion, idx) => (
        <Post
          key={idx}
          postID={discussion.reply.id}
          text={discussion.reply.text}
          stats={discussion.reply.stats}
          timestamp={discussion.reply.timestamp}
          fullname={discussion.user.fullname}
          username={discussion.user.username}
          avatar={discussion.user.avatar}
          showControl
          replyTo
        />
      ))
    : Array(3)
        .fill()
        .map((_, idx) => (
          <PostSkeleton uniqueKey={`post-skeleton-${idx}`} key={idx} />
        ));
}

function ProfileEdit({isOpen, onClose}) {
  const [username, setUsername] = React.useState(users[2].username);
  const [fullname, setFullname] = React.useState(users[2].fullname);
  const [bio, setBio] = React.useState(users[2].bio);

  const onUsernameChange = e => {
    setUsername(e.target.value);
  };
  const onFullnameChange = e => {
    setFullname(e.target.value);
  };
  const onBioChange = e => {
    setBio(e.target.value);
  };

  return (
    <Modal title="Edit Profil" isOpen={isOpen} onClose={onClose}>
      <ProfileEditContainer>
        <AvatarWrapper>
          <ProfileAvatar src={users[2].avatar} alt={`${fullname} avatar`} />
        </AvatarWrapper>
        <InputGroup>
          <InputLabel htmlFor="fullname">Nama Lengkap</InputLabel>
          <Input
            type="text"
            value={fullname}
            onChange={onFullnameChange}
            id="fullname"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            type="text"
            value={username}
            onChange={onUsernameChange}
            id="username"
            disabled
          />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="bio">Bio</InputLabel>
          <Textarea id="bio" value={bio} onChange={onBioChange} />
        </InputGroup>
        <ButtonWrapper>
          <Button>Simpan</Button>
        </ButtonWrapper>
      </ProfileEditContainer>
    </Modal>
  );
}

export default Profile;
