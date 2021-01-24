import styled from 'styled-components';
import {lighten} from 'polished';

export const ProfileMenuContainer = styled.div`
  border-top: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
`;

export const MenuLink = styled.button`
  border: 0;
  background: ${({theme, isActive}) =>
    isActive ? lighten(0.2, theme.colors['orange.50']) : 'transparent'};
  display: inline-block;
  width: 50%;
  padding: 1.5rem;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.1rem;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({theme, isActive}) =>
      !isActive && theme.colors['gray.50']};
  }
`;
