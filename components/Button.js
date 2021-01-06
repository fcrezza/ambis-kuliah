import styled, {css} from 'styled-components';
import {darken, lighten} from 'polished';

const outline = css`
  border: 1px solid ${({theme}) => theme.colors['orange.50']};
  color: ${({theme}) => theme.colors['orange.50']};
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: ${({theme}) => theme.colors['gray.50']};
  }
`;

const original = css`
  border: 0;
  color: ${({theme}) => theme.colors['white.50']};
  background-color: ${({theme}) => theme.colors['orange.50']};

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.03, theme.colors['orange.50'])};
  }
`;

export const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  display: inline-block;
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};

  ${({variant}) => (variant === 'outline' ? outline : original)};
`;

export const IconButton = styled.button`
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;

  &:focus,
  &:hover {
    background: ${({theme}) => lighten(0.2, theme.colors['orange.50'])};
  }
`;
