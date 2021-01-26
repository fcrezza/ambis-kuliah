import styled from 'styled-components';

export const ProfileDescriptionContainer = styled.div`
  padding: 3.5rem 1.5rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const ProfileContentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ProfileFullname = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.5rem;
`;

export const ProfileUsername = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1rem;
`;

export const ProfileBio = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1.1rem;
  line-height: 30px;
`;

export const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
`;
