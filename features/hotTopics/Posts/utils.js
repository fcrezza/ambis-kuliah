import styled from 'styled-components';
import {AiFillFire} from 'react-icons/ai';

export const PostsContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 5px;
  width: 100%;

  & > div:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

export const TitleContainer = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
`;

export const Title = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1.4rem;
  margin: 0;
`;

export const TitleIcon = styled(AiFillFire)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 2rem;
`;
