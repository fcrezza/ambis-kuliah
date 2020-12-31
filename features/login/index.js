import React from 'react';
import Nextlink from 'next/link';
import {Button} from 'components/Button';
import styled from 'styled-components';
import {lighten} from 'polished';

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

const LoginFormInputGroup = styled.div`
  & > label {
    margin-bottom: 10px;
  }
`;

const LoginFormInputLabel = styled.label`
  display: block;
  margin: 0;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.50']};
`;

const LoginFormInputWrapper = styled.div`
  border-radius: 20px;
  border: 1px solid #d3d3d3;
  display: flex;

  &:focus-within {
    border-color: ${({theme}) => theme.colors['orange.50']};
  }
`;

const LoginFormInput = styled.input`
  border: 0;
  border-radius: 20px;
  padding: 0.8rem 1rem;
  display: block;
  width: 100%;
  font-size: 1rem;
  background: transparent;
  color: ${({theme}) => theme.colors['black.150']};
  outline: none;
`;

const PasswordVisibilityToggler = styled.button`
  color: ${({theme}) => theme.colors['orange.50']};
  padding: 5px;
  margin-right: 14px;
  align-self: center;
  cursor: pointer;
  font-weight: 500;
  border: 0;
  border-radius: 5px;
  background: none;
  font-size: 14px;

  &:focus,
  &:hover {
    background: ${({theme}) => lighten(0.23, theme.colors['orange.50'])};
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
  const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

  const onTogglePasswordVisibility = () => {
    setPasswordVisibility(prevState => !prevState);
  };

  return (
    <LoginContainer>
      <LoginFormWrapper>
        <LoginTitle>Masuk</LoginTitle>
        <LoginForm>
          <LoginFormInputGroup>
            <LoginFormInputLabel htmlFor="username">
              Username
            </LoginFormInputLabel>
            <LoginFormInputWrapper>
              <LoginFormInput
                type="text"
                placeholder="Username"
                id="username"
              />
            </LoginFormInputWrapper>
          </LoginFormInputGroup>
          <LoginFormInputGroup>
            <LoginFormInputLabel htmlFor="password">
              Password
            </LoginFormInputLabel>
            <LoginFormInputWrapper>
              <LoginFormInput
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                id="password"
              />
              <PasswordVisibilityToggler
                type="button"
                onClick={onTogglePasswordVisibility}
              >
                {isPasswordVisible ? 'Sembunyikan' : 'Tampilkan'}
              </PasswordVisibilityToggler>
            </LoginFormInputWrapper>
          </LoginFormInputGroup>
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
