import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin-left: 3rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 1440px) {
    max-width: 340px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Copyright = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 0.8rem;
  margin: 0;
`;
