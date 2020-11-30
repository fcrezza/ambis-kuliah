import React from 'react';
import styled from 'styled-components';
import {lighten, darken} from 'polished';
import {RiArrowUpSFill, RiArrowDownSFill} from 'react-icons/ri';

import Head from 'components/Head';
import {Button} from 'components/Button';
import Post from 'components/Post';
import {posts} from 'utils/data';
import Modal from 'components/Modal';

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

const ReplyContainer = styled.div`
  padding: 1.5rem;
  display: flex;
`;

const ReplyControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
  width: 30px;

  .text-stats {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({theme}) => theme.colors['black.150']};
    display: inline-block;
    margin: 5px 0;
  }
`;

const ControlButton = styled.button`
  border: 0;
  background: none;
  padding: 0;
  cursor: pointer;

  svg {
    font-size: 2.5rem;
    color: ${({theme, isTruth}) =>
      isTruth ? theme.colors['orange.50'] : theme.colors['black.150']};
    display: block;
  }
`;

const ReplyContent = styled.div``;

const ReplyText = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0 0 1.3rem;
  font-size: 1rem;
  line-height: 30px;
`;

const PostReplyContainer = styled.div`
  border-radius: 20px;
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
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
        title="Christoph Petersen (@chrispetersen) - Ambis Kuliah"
        description="Christoph Petersen profile page"
      />
      <ProfileEdit isOpen={isModalOpen} onClose={onModalClose} />
      <TitleContainer>
        <Title>Profile</Title>
        <Button>Logout</Button>
      </TitleContainer>
      <ProfileDescriptionContainer>
        <ProfileContentHeader>
          <ProfileAvatar src="/images/avatar1.png" alt="my avatar" />
          <Button variant="outline" onClick={onEditClick}>
            Edit Profil
          </Button>
        </ProfileContentHeader>
        <ProfileFullname>Christoph Petersen</ProfileFullname>
        <ProfileUsername>@chrispetersen</ProfileUsername>
        <ProfileBio>
          Mahasiswa Teknik Havard angkatan 2015 • Fulltime ngantukan
        </ProfileBio>
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
  return posts.map((post, idx) => <Post key={idx} data={post} showControl />);
}

function ProfileReply() {
  const [like, setLike] = React.useState(false);
  const [dislike, setDislike] = React.useState(false);

  const onLike = () => {
    if (dislike) {
      setDislike(prevState => !prevState);
    }

    setLike(prevState => !prevState);
  };

  const onDislike = () => {
    if (like) {
      setLike(prevState => !prevState);
    }

    setDislike(prevState => !prevState);
  };

  return (
    <ReplyContainer>
      <ReplyControl>
        <ControlButton onClick={onLike} isTruth={like}>
          <RiArrowUpSFill />
        </ControlButton>
        <span className="text-stats">30</span>
        <ControlButton onClick={onDislike} isTruth={dislike}>
          <RiArrowDownSFill />
        </ControlButton>
      </ReplyControl>
      <ReplyContent>
        <ReplyText>
          Budget ada berapa? kalo ada sekitar 6 juta lebih, mending rakit peci
          wkwkwk
        </ReplyText>
        <PostReplyContainer>
          <Post data={posts[0]} />
        </PostReplyContainer>
      </ReplyContent>
    </ReplyContainer>
  );
}

function ProfileEdit({isOpen, onClose}) {
  const [username, setUsername] = React.useState('chrispetersen');
  const [fullname, setFullname] = React.useState('Christoph Petersen');
  const [bio, setBio] = React.useState(
    'Mahasiswa Teknik Havard angkatan 2015 • Fulltime ngantukan'
  );

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
          <ProfileAvatar src="/images/avatar1.png" alt="my avatar" />
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
