import React from 'react';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Label from 'components/Label';
import ErrorMessage from 'components/ErrorMessage';
import {Input, InputGroup, PasswordInput} from 'components/Input';
import {Button} from 'components/Button';
import axios from 'utils/axios';

const SignupContainer = styled.div`
  margin-bottom: 100px;
`;

const SignupFormWrapper = styled.div`
  border-radius: 20px;
  margin: 20px auto 0;
  max-width: 450px;
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  padding: 2rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const SignupForm = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 1.3rem;
  }
`;

const SignupTitle = styled.h1`
  margin: 0;
  color: ${({theme}) => theme.colors['black.150']};
`;

const LoginOptionContainer = styled.div``;

const LoginOptionText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.50']};
`;

const LoginOptionLink = styled.a`
  font-size: 1rem;
  color: ${({theme}) => theme.colors['orange.50']};
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
    .min(8, 'Password minimal mengandung 8 karakter')
    .required('Masukan password yang valid')
});

function Signup() {
  const [requestStatus, setRequestStatus] = React.useState('iddle');
  const {register, handleSubmit, errors, setError, clearErrors} = useForm({
    resolver: yupResolver(schemaValidation)
  });
  const router = useRouter();

  const onSubmit = async data => {
    try {
      clearErrors('server');
      setRequestStatus('loading');
      await axios.post('/api/signup.php', data);
      setRequestStatus('success');
      router.push('/login');
    } catch (error) {
      if (error.response) {
        setError('server', {
          message: error.response.data.message
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
    <SignupContainer>
      <SignupFormWrapper>
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
              standalone
            />
          </InputGroup>
          <ErrorMessage errors={errors} name="email" />
          <InputGroup>
            <Label htmlFor="fullname">Nama Lengkap</Label>
            <Input
              type="text"
              placeholder="Nama Lengkap"
              id="fullname"
              name="fullname"
              ref={register}
              standalone
            />
          </InputGroup>
          <ErrorMessage errors={errors} name="fullname" />
          <InputGroup>
            <Label htmlFor="username">Nama Pengguna</Label>
            <Input
              type="text"
              placeholder="Nama Pengguna"
              id="username"
              name="username"
              ref={register}
              standalone
            />
          </InputGroup>
          <ErrorMessage errors={errors} name="username" />
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              placeholder="Password"
              id="password"
              name="password"
              ref={register}
            />
          </InputGroup>
          <ErrorMessage errors={errors} name="password" />
          <ErrorMessage errors={errors} name="server" />
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
      </SignupFormWrapper>
    </SignupContainer>
  );
}

export default Signup;
