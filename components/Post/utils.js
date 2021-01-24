import styled from 'styled-components';
import {lighten} from 'polished';

export const PostContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  cursor: ${({type}) => (type !== 'detail' ? 'pointer' : 'default')};
  position: relative;

  &:focus,
  &:hover {
    background-color: ${({theme, type}) =>
      type !== 'detail' ? lighten(0.01, theme.colors['gray.50']) : null};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

export const PostContentContainer = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 1.3rem;
  }
`;
