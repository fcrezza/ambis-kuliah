import styled from 'styled-components';
import Image from 'next/image';
import {lighten} from 'polished';

export const TopicsContainer = styled.div``;

export const TopicItemContainer = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding-left: 1.5rem;

  &:not(:last-child) {
    border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  }

  &:hover,
  &:focus {
    background-color: ${({theme}) => lighten(0.01, theme.colors['gray.50'])};
  }
`;

export const TopicItemText = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  font-weight: 500;
  font-size: 1.1rem;
`;

export const TopicItemImage = styled(Image)`
  @media screen and (max-width: 480px) {
    display: none !important;
  }
`;
