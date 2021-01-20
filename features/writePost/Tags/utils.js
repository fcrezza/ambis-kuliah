import {MdCheck, MdAdd} from 'react-icons/md';
import styled, {css} from 'styled-components';
import {darken} from 'polished';

export const TagListContainer = styled.div`
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors['white.50']};
  height: 200px;
  overflow-y: auto;
`;

export const TagSearchContainer = styled.div`
  padding: 0.7rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

export const TagItemContainer = styled.div`
  padding: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
  }
`;

export const TagTitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.100']};
`;

export const TagAddButton = styled.button`
  border: 0;
  border-radius: 3px;
  padding: 0.2rem;
  background-color: ${({theme}) => theme.colors['orange.50']};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.03, theme.colors['orange.50'])};
  }
`;

export const buttonIcon = css`
  color: ${({theme}) => theme.colors['white.50']};
  font-size: 1.2rem;
  display: block;
`;

export const ButtonCheckIcon = styled(MdCheck)`
  ${buttonIcon}
`;

export const ButtonAddIcon = styled(MdAdd)`
  ${buttonIcon}
`;

export const NotFoundContainer = styled.div`
  padding: 0.7rem;
`;

export const NotFoundText = styled.p`
  margin: 2rem 0 0;
  font-weight: 500;
  color: ${({theme}) => theme.colors['black.50']};
  text-align: center;
  font-size: 1rem;
`;
