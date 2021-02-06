import styled, {css} from 'styled-components';
import {darken, lighten} from 'polished';

const outline = css`
  border: 1px solid ${({theme}) => theme.colors['black.100']};
  color: ${({theme}) => theme.colors['black.100']};
  background-color: transparent;

  &:hover,
  &:focus {
    background-color: ${({theme}) => theme.colors['gray.50']};
  }
`;

const original = css`
  border: 0;
  color: ${({theme}) => theme.colors['white.50']};
  background-color: ${({theme}) => theme.colors['black.100']};

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.03, theme.colors['black.100'])};
  }
`;

const $Button = styled.button`
  padding: 0.7rem 1.8rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  display: ${({block}) => (block ? 'block' : 'inline-block')};
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};

  ${({variant}) => (variant === 'outline' ? outline : original)};
  ${({styles}) => styles};
`;

export const IconButton = styled.button`
  border: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;

  &:focus,
  &:hover {
    background: ${({theme, styles}) =>
      styles?.backgroundColor || lighten(0.7, theme.colors['black.100'])};
  }
`;

export function Button({onClick, disabled, variant, block, children}) {
  return (
    <$Button
      onClick={onClick}
      variant={variant}
      block={block}
      disabled={disabled}
    >
      {children}
    </$Button>
  );
}
