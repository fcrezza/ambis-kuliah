import React from 'react';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Head from 'components/Head';
import Label from 'components/Label';
import {Input, InputGroup, PasswordInput, ErrorMessage} from 'components/Input';
import {Button} from 'components/Button';
import {useAuth} from 'utils/auth';
import {UnauthenticatedRoute} from 'components/Route';
import useRequest from 'utils/useRequest';

const SignupContainer = styled.div`
  margin: 0 auto 100px;
  background-color: ${({theme}) => theme.colors['white.50']};
  border-radius: 20px;
  width: 450px;
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  padding: 2rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const SignupForm = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const SignupTitle = styled.h1`
  margin: 0;
  color: ${({theme}) => theme.colors['black.100']};
`;

const LoginOptionContainer = styled.div``;

const LoginOptionText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.50']};
`;

const LoginOptionLink = styled.a`
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.100']};
  font-weight: 700;
  text-decoration: none;
`;

const schemaValidation = yup.object().shape({
  fullname: yup.string().required('Masukan Nama lengkap yang valid'),
  username: yup.string().required('Masukan username yang valid'),
  email: yup
    .string()
    .email('Masukan alamat email yang valid')
    .required('Masukan alamat email yang valid'),
  password: yup
    .string()
    .min(4, 'Password minimal mengandung 4 karakter')
    .required('Masukan password yang valid')
});

function Signup() {
  const {requestStatus, changeRequestStatus} = useRequest();
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schemaValidation)
  });
  const {signup} = useAuth();
  const {push} = useRouter();

  const onSubmit = async data => {
    try {
      changeRequestStatus('loading', null);
      const randomNum = Math.round(Math.random() * 3 + 1);
      const defaultAvatarURl = `/images/avatars/default-avatar-${randomNum}.png`;
      const inputData = {
        ...data,
        avatarUrl: defaultAvatarURl
      };
      await signup(inputData);
      push('/auth/choose-topics');
    } catch (error) {
      if (error.response) {
        changeRequestStatus('error', {
          message: error.response.data.error.message
        });
      } else {
        changeRequestStatus('error', {
          message: 'Upss, ada yang salah'
        });
      }
    }
  };

  return (
    <UnauthenticatedRoute>
      <Head title="Daftar - Ambis Kuliah" description="Halaman daftar" />
      <SignupContainer>
        <SignupTitle>Daftar</SignupTitle>
        <SignupForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              ref={register}
            />
          </InputGroup>
          {errors.email ? (
            <ErrorMessage message={errors.email.message} />
          ) : null}
          <InputGroup>
            <Label htmlFor="fullname">Nama Lengkap</Label>
            <Input
              type="text"
              placeholder="Nama Lengkap"
              id="fullname"
              name="fullname"
              ref={register}
            />
          </InputGroup>
          {errors.fullname ? (
            <ErrorMessage message={errors.fullname.message} />
          ) : null}
          <InputGroup>
            <Label htmlFor="username">Nama Pengguna</Label>
            <Input
              type="text"
              placeholder="Nama Pengguna"
              id="username"
              name="username"
              ref={register}
            />
          </InputGroup>
          {errors.username ? (
            <ErrorMessage message={errors.username.message} />
          ) : null}
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              placeholder="Password"
              id="password"
              name="password"
              ref={register}
            />
          </InputGroup>
          {errors.password ? (
            <ErrorMessage message={errors.password.message} />
          ) : null}
          {requestStatus.name === 'error' ? (
            <ErrorMessage message={requestStatus.data.message} />
          ) : null}
          <Button disabled={requestStatus === 'loading'}>Daftar</Button>
        </SignupForm>
        <LoginOptionContainer>
          <LoginOptionText>
            Sudah punya akun?{' '}
            <NextLink href="/login" passHref>
              <LoginOptionLink>Masuk</LoginOptionLink>
            </NextLink>
          </LoginOptionText>
        </LoginOptionContainer>
      </SignupContainer>
    </UnauthenticatedRoute>
  );
}

export default Signup;
