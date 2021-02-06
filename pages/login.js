import React from 'react';
import styled from 'styled-components';
import Nextlink from 'next/link';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Head from 'components/Head';
import Label from 'components/Label';
import {Input, InputGroup, PasswordInput, ErrorMessage} from 'components/Input';
import {Button} from 'components/Button';
import {useAuth} from 'utils/auth';
import useRequest from 'utils/useRequest';
import {UnauthenticatedRoute} from 'components/Route';

const LoginFormWrapper = styled.div`
  background: ${({theme}) => theme.colors['white.50']};
  border-radius: 10px;
  margin: 0 auto;
  width: 450px;
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  padding: 2rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const LoginForm = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const LoginTitle = styled.h1`
  margin: 0;
  color: ${({theme}) => theme.colors['black.100']};
`;

const SignupOptionContainer = styled.div``;

const SignupOptionText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.50']};
`;

const SignupOptionLink = styled.a`
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.100']};
  font-weight: 700;
  text-decoration: none;
`;

const schemaValidation = yup.object().shape({
  username: yup.string().required('Masukan username yang valid'),
  password: yup
    .string()
    .min(4, 'Password minimal mengandung 4 karakter')
    .required('Masukan password yang valid')
});

function Login() {
  const {requestStatus, changeRequestStatus} = useRequest();
  const {login} = useAuth();
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schemaValidation)
  });
  const router = useRouter();

  const onSubmit = async data => {
    try {
      changeRequestStatus('loading', null);
      await login(data);
      router.push('/home');
    } catch (error) {
      if (error.response) {
        changeRequestStatus('error', {
          message: error.response.data.data.message
        });
      } else {
        changeRequestStatus('error', {
          message: 'Upzzz, ada yang salah'
        });
      }
    }
  };

  return (
    <UnauthenticatedRoute>
      <Head title="Masuk - Ambis Kuliah" description="Halaman masuk" />
      <LoginFormWrapper>
        <LoginTitle>Masuk</LoginTitle>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              ref={register}
              standalone
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
          <Button disabled={requestStatus === 'loading'}>Masuk</Button>
        </LoginForm>
        <SignupOptionContainer>
          <SignupOptionText>
            Belum punya akun?{' '}
            <Nextlink href="/signup" passHref>
              <SignupOptionLink>Daftar</SignupOptionLink>
            </Nextlink>
          </SignupOptionText>
        </SignupOptionContainer>
      </LoginFormWrapper>
    </UnauthenticatedRoute>
  );
}

export default Login;
