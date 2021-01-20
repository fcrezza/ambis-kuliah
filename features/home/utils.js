import styled from 'styled-components';
import {ImNewspaper} from 'react-icons/im';

export const HomeContainer = styled.main`
  flex: 1;
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border: 0;
  }
`;

export const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleText = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

export const TitleIcon = styled(ImNewspaper)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 2rem;
`;

export const WritePostWrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
