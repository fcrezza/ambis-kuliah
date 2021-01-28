import React from 'react';
import Modal from 'components/Modal';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {mutate, cache} from 'swr';

import ErrorMessage from 'components/ErrorMessage';
import {Button} from 'components/Button';
import {
  ProfileAvatar,
  ProfileEditContainer,
  AvatarWrapper,
  Input,
  InputGroup,
  InputLabel,
  ButtonWrapper,
  Textarea,
  Form
} from './style';
import axios from 'utils/axios';
import {useUser} from 'utils/user';
import {useRouter} from 'next/router';

const schemaValidation = yup.object().shape({
  fullname: yup.string().required('Nama lengkap tidak boleh kosong'),
  username: yup.string().required('Username tidak boleh kosong'),
  email: yup
    .string()
    .email('Masukan Email yang valid')
    .required('Email tidak boleh kosong')
});

function ProfileEdit(props) {
  // const [avatar, setAvatar] = React.useState('');
  const [requestStatus, setRequestStatus] = React.useState('iddle');
  const router = useRouter();
  const {userData} = useUser();
  const {isOpen, onClose, username, fullname, email, bio, avatar} = props;
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
  const onSubmit = async data => {
    try {
      clearErrors('server');
      setRequestStatus('loading');

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
        bio: newData.data.bio
      }));

      if (newData.data.username !== userData.username) {
        router.replace(`/profile/${newData.data.username}`);
      } else {
        mutate(`/users/${userData.username}`, prevData => ({
          ...prevData,
          username: newData.data.username,
          fullname: newData.data.fullname,
          email: newData.data.email,
          bio: newData.data.bio
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
      reset({
        username: newData.data.username,
        fullname: newData.data.fullname,
        email: newData.data.email,
        bio: newData.data.bio
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

  return (
    <Modal title="Edit Profil" isOpen={isOpen} onClose={onClose}>
      <ProfileEditContainer>
        <AvatarWrapper>
          <ProfileAvatar src={avatar} alt={`${fullname} avatar`} />
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
