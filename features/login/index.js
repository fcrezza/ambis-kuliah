import React from 'react';
import styled from 'styled-components';
import Nextlink from 'next/link';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Label from 'components/Label';
import ErrorMessage from 'components/ErrorMessage';
import {Input, InputGroup, PasswordInput} from 'components/Input';
import {Button} from 'components/Button';
import {useAuth} from 'utils/auth';
import useRoute from 'utils/route';

const LoginContainer = styled.div``;

const LoginFormWrapper = styled.div`
  border-radius: 20px;
  margin: 20px auto 0;
  max-width: 450px;
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  padding: 2rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const LoginForm = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 1.3rem;
  }
`;

const LoginTitle = styled.h1`
  margin: 0;
  color: ${({theme}) => theme.colors['black.150']};
`;

const SignupOptionContainer = styled.div``;

const SignupOptionText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.50']};
`;

const SinupOptionLink = styled.a`
  font-size: 1rem;
  color: ${({theme}) => theme.colors['orange.50']};
  font-weight: 700;
  text-decoration: none;
`;

const schemaValidation = yup.object().shape({
  username: yup.string().required('Masukan username yang valid'),
  password: yup
    .string()
    .min(8, 'Password minimal mengandung 8 karakter')
    .required('Masukan password yang valid')
});

function Login() {
  useRoute('/home', null);
  const [requestStatus, setRequestStatus] = React.useState('iddle');
  const {login} = useAuth();
  const {register, handleSubmit, errors, setError, clearErrors} = useForm({
    resolver: yupResolver(schemaValidation)
  });
  const router = useRouter();

  const onSubmit = async data => {
    try {
      clearErrors('server');
      setRequestStatus('loading');
      await login(data);
      setRequestStatus('success');
      router.push('/home');
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
    <LoginContainer>
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
          <Button disabled={requestStatus === 'loading'}>Masuk</Button>
        </LoginForm>
        <SignupOptionContainer>
          <SignupOptionText>
            Belum punya akun?{' '}
            <Nextlink href="/signup" passHref>
              <SinupOptionLink>Daftar</SinupOptionLink>
            </Nextlink>
          </SignupOptionText>
        </SignupOptionContainer>
      </LoginFormWrapper>
    </LoginContainer>
  );
}

export default Login;
