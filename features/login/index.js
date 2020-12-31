import React from 'react';
import styled from 'styled-components';
import Nextlink from 'next/link';

import Label from 'components/Label';
import {Input, InputGroup, PasswordInput} from 'components/Input';
import {Button} from 'components/Button';

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

function Login() {
  return (
    <LoginContainer>
      <LoginFormWrapper>
        <LoginTitle>Masuk</LoginTitle>
        <LoginForm>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="Username"
              id="username"
              standalone
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordInput placeholder="Password" id="password" />
          </InputGroup>
          <Button block>Masuk</Button>
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
