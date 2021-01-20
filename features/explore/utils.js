import styled from 'styled-components';
import {AiOutlineSetting} from 'react-icons/ai';

export const Container = styled.main`
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

export const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

export const SearchContainer = styled.div`
  padding: 1.5rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const ExploreContainer = styled.div`
  flex: 1;
`;

export const ButtonIcon = styled(AiOutlineSetting)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 2rem;
`;
