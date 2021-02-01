import React from 'react';
import styled, {useTheme} from 'styled-components';
import {useRouter} from 'next/router';
import {darken, lighten, parseToRgb} from 'polished';
import {MdAddAPhoto} from 'react-icons/md';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {mutate, cache} from 'swr';

import Modal from 'components/Modal';
import ErrorMessage from 'components/ErrorMessage';
import {Button, IconButton} from 'components/Button';
import axios from 'utils/axios';
import {useUser} from 'utils/user';

const ProfileEditContainer = styled.div`
  padding: 1.5rem;
`;

const AvatarWrapper = styled.div`
  padding: 1.5rem 0 3rem;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

const Form = styled.form``;

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

const ProfileAvatarPreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  background: ${({theme}) => theme.colors['gray.100']};
  background-image: url(${({imageUrl}) => imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background: ${({theme}) =>
    `rgba(${Object.values(parseToRgb(theme.colors['black.150'])).join(
      ','
    )}, 0.4)`};
`;

const ChangeAvatarIcon = styled(MdAddAPhoto)`
  font-size: 1.8rem;
  color: ${({theme}) => theme.colors['orange.50']};
`;

const ImageInput = styled.input`
  display: none;
`;

const schemaValidation = yup.object().shape({
  fullname: yup.string().required('Nama lengkap tidak boleh kosong'),
  username: yup.string().required('Username tidak boleh kosong'),
  email: yup
    .string()
    .email('Masukan Email yang valid')
    .required('Email tidak boleh kosong')
});

function ProfileEdit(props) {
  const {isOpen, onClose, username, fullname, email, bio, avatar} = props;
  const [avatarFile, setAvatarFile] = React.useState(null);
  const [avatarPreview, setAvatarPreview] = React.useState(() => avatar);
  const [requestStatus, setRequestStatus] = React.useState('iddle');
  const imgRef = React.useRef();
  const {colors} = useTheme();
  const router = useRouter();
  const {userData} = useUser();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    reset
  } = useForm({
    defaultValues: {
      username,
      fullname,
      email,
      bio
    },
    resolver: yupResolver(schemaValidation)
  });

  const onChange = e => {
    setAvatarFile(e.target.files[0]);
  };

  const onModalClose = () => {
    setAvatarFile(null);
    setAvatarPreview(avatar);
    onClose();
  };

  const onSelectedImage = () => {
    imgRef.current.click();
  };

  const onSubmit = async data => {
    try {
      clearErrors('server');
      setRequestStatus('loading');
      let newAvatar;

      if (avatarPreview !== avatar) {
        const fd = new FormData();
        fd.append('avatar', avatarFile);
        const {data: avatarData} = await axios.post(
          `/users/${userData.username}/avatar`,
          fd,
          {
            withCredentials: true
          }
        );
        newAvatar = avatarData.data;
      }

      const {data: newData} = await axios.put(
        `/users/${userData.username}/profile`,
        data,
        {
          withCredentials: true
        }
      );
      await mutate('/auth/user', prevData => ({
        ...prevData,
        username: newData.data.username,
        fullname: newData.data.fullname,
        email: newData.data.email,
        bio: newData.data.bio,
        avatar: newAvatar ? newAvatar : prevData.avatar
      }));

      if (newData.data.username !== userData.username) {
        router.replace(`/profile/${newData.data.username}`);
      } else {
        mutate(`/users/${userData.username}`, prevData => ({
          ...prevData,
          username: newData.data.username,
          fullname: newData.data.fullname,
          email: newData.data.email,
          bio: newData.data.bio,
          avatar: newAvatar ? newAvatar : prevData.avatar
        }));
        const cacheKeys = cache
          .keys()
          .filter(key => key.startsWith(`/posts/${userData.username}`));
        for (let key of cacheKeys) {
          // can't update cached value, bug in SWR?
          mutate(key, undefined, true);
        }
      }
      setRequestStatus('success');
      setAvatarFile(null);
      setAvatarPreview(avatar);
      reset({
        username: username,
        fullname: fullname,
        email: email,
        bio: bio
      });
      onClose();
    } catch (error) {
      if (error.response) {
        setError('server', {
          message: error.response.data.data.message
        });
      } else {
        setError('server', {
          message: 'Upss, ada yang salah'
        });
      }
      setRequestStatus('failed');
    }
  };

  React.useEffect(() => {
    if (!avatarFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [avatarFile]);

  return (
    <Modal title="Edit Profil" isOpen={isOpen} onClose={onModalClose}>
      <ProfileEditContainer>
        <AvatarWrapper>
          <ProfileAvatarPreview imageUrl={avatarPreview}>
            <ButtonContainer>
              <IconButton
                styles={{
                  backgroundColor: lighten(0.1, colors['black.150'])
                }}
                onClick={onSelectedImage}
              >
                <ImageInput
                  ref={imgRef}
                  type="file"
                  onChange={onChange}
                  name="image"
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <ChangeAvatarIcon />
              </IconButton>
            </ButtonContainer>
          </ProfileAvatarPreview>
        </AvatarWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <InputLabel htmlFor="fullname">Nama Lengkap</InputLabel>
            <Input type="text" id="fullname" name="fullname" ref={register} />
          </InputGroup>
          <ErrorMessage name="fullname" errors={errors} />
          <InputGroup>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input type="text" id="username" name="username" ref={register} />
          </InputGroup>
          <ErrorMessage name="username" errors={errors} />
          <InputGroup>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input type="email" id="email" name="email" ref={register} />
          </InputGroup>
          <ErrorMessage name="email" errors={errors} />
          <InputGroup>
            <InputLabel htmlFor="bio">Bio</InputLabel>
            <Textarea id="bio" name="bio" ref={register} />
          </InputGroup>
          <ErrorMessage name="bio" errors={errors} />
          <ErrorMessage errors={errors} name="server" />
          <ButtonWrapper>
            <Button disabled={requestStatus === 'loading'}>Simpan</Button>
          </ButtonWrapper>
        </Form>
      </ProfileEditContainer>
    </Modal>
  );
}

export default ProfileEdit;