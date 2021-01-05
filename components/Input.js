import React from 'react';
import styled, {css} from 'styled-components';
import {lighten} from 'polished';

const inputStandalone = css`
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};

  &:focus {
    border-color: ${({theme}) => theme.colors['orange.50']};
  }
`;

export const InputGroup = styled.div`
  & > label {
    margin-bottom: 10px;
  }
`;

export const Input = styled.input`
  border: 0;
  border-radius: 20px;
  padding: 0.8rem 1rem;
  display: block;
  width: 100%;
  font-size: 1rem;
  background: transparent;
  color: ${({theme}) => theme.colors['black.150']};
  outline: none;
  ${({standalone}) => standalone && inputStandalone};
`;

const InputWrapper = styled.div`
  border-radius: 20px;
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  display: flex;

  &:focus-within {
    border-color: ${({theme}) => theme.colors['orange.50']};
  }
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

export const PasswordInput = React.forwardRef((props, ref) => {
  const {id, name, placeholder} = props;
  const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

  const onTogglePasswordVisibility = () => {
    setPasswordVisibility(prevState => !prevState);
  };

  return (
    <InputWrapper>
      <Input
        id={id}
        name={name}
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={placeholder}
        ref={ref}
      />
      <PasswordVisibilityToggler
        type="button"
        onClick={onTogglePasswordVisibility}
      >
        {isPasswordVisible ? 'Sembunyikan' : 'Tampilkan'}
      </PasswordVisibilityToggler>
    </InputWrapper>
  );
});
