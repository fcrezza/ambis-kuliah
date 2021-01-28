import styled from 'styled-components';
import {darken} from 'polished';

export const ProfileEditContainer = styled.div`
  padding: 1.5rem;
`;

export const AvatarWrapper = styled.div`
  padding: 1.5rem 0 3rem;
`;

export const ButtonWrapper = styled.div`
  text-align: right;
`;

export const Form = styled.form``;

export const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

export const InputLabel = styled.label`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  display: inline-block;
`;

export const Input = styled.input`
  padding: 0.8rem;
  width: 100%;
  background-color: ${({theme, disabled}) =>
    disabled ? darken(0.05, theme.colors['gray.50']) : theme.colors['gray.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
  font-size: 1rem;
  color: ${({theme, disabled}) =>
    disabled ? theme.colors['black.50'] : theme.colors['black.100']};
  border-radius: 5px;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

export const Textarea = styled.textarea`
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
  padding: 0.8rem;
  font-size: 1rem;
  width: 100%;
  color: ${({theme}) => theme.colors['black.100']};
  min-height: 100px;
  resize: vertical;
  display: block;
  border-radius: 5px;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

export const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
`;
