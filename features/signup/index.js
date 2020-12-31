import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';

import Label from 'components/Label';
import {Input, InputGroup, PasswordInput} from 'components/Input';
import {Button} from 'components/Button';

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

function Signup() {
  return (
    <SignupContainer>
      <SignupFormWrapper>
        <SignupTitle>Daftar</SignupTitle>
        <SignupForm>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="Email" id="email" standalone />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="fullname">Nama Lengkap</Label>
            <Input
              type="text"
              placeholder="Nama Lengkap"
              id="fullname"
              standalone
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="username">Nama Pengguna</Label>
            <Input
              type="text"
              placeholder="Nama Pengguna"
              id="username"
              standalone
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordInput type="text" placeholder="Password" id="password" />
          </InputGroup>
          <Button>Daftar</Button>
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
