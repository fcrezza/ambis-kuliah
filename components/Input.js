import React from 'react';
import styled from 'styled-components';
import {darken} from 'polished';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {IconButton} from './Button';

const $ErrorMessage = styled.p`
  color: ${({theme}) => theme.colors['red.50']};
  font-size: 1rem;
  margin: 1rem 0;
`;

export const InputGroup = styled.div`
  & > label {
    margin-bottom: 12px;
  }
`;

const $Input = styled.input`
  border: 0;
  padding: 0.8rem 1rem;
  display: block;
  width: 100%;
  font-size: 1rem;
  background: transparent;
  color: ${({theme}) => theme.colors['black.150']};
  outline: none;
`;

const InputWrapper = styled.div`
  border-radius: 5px;
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  display: flex;
  background-color: ${({theme}) => theme.colors['gray.50']};

  &:hover {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }

  &:focus-within {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
    outline: 2px solid ${({theme}) => theme.colors['black.100']};
  }
`;

const PasswordVisibilityToggler = styled.button`
  color: ${({theme}) => theme.colors['black.100']};
  align-self: center;
  margin-right: 10px;
`;

const $TextArea = styled.textarea`
  border-radius: 5px;
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  background-color: ${({theme}) => theme.colors['gray.50']};
  padding: 0.8rem;
  font-size: 1rem;
  width: 100%;
  color: ${({theme}) => theme.colors['black.100']};
  min-height: 100px;
  resize: vertical;
  display: block;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }

  ${({styles}) => ({...styles})};
`;

const PasswordVisibleIcon = styled(AiOutlineEye)`
  font-size: 1.4rem;
`;

const PasswordHiddenIcon = styled(AiOutlineEyeInvisible)`
  font-size: 1.4rem;
`;

export const Input = React.forwardRef((props, ref) => {
  const {id, name, placeholder, type = 'text'} = props;

  return (
    <InputWrapper>
      <$Input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        ref={ref}
      />
    </InputWrapper>
  );
});

export const PasswordInput = React.forwardRef((props, ref) => {
  const {id, name, placeholder} = props;
  const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

  const onTogglePasswordVisibility = () => {
    setPasswordVisibility(prevState => !prevState);
  };

  return (
    <InputWrapper>
      <$Input
        id={id}
        name={name}
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={placeholder}
        ref={ref}
      />
      <PasswordVisibilityToggler
        as={IconButton}
        type="button"
        onClick={onTogglePasswordVisibility}
      >
        {isPasswordVisible ? <PasswordHiddenIcon /> : <PasswordVisibleIcon />}
      </PasswordVisibilityToggler>
    </InputWrapper>
  );
});

export const Textarea = React.forwardRef((props, ref) => {
  const {onChange, value, placeholder, name, styles} = props;
  return (
    <$TextArea
      ref={ref}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      styles={styles}
    />
  );
});

export function ErrorMessage({message}) {
  return <$ErrorMessage>{message}</$ErrorMessage>;
}
