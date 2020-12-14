import React from 'react';
import styled from 'styled-components';
import {AiOutlineSetting} from 'react-icons/ai';

import ExploreTopicsModal from './ExploreTopicsModal';
import ExploreTopics from './ExploreTopics';
import Head from 'components/Head';
import {IconButton} from 'components/Button';
import Search from 'components/Search';
import useExplore from './useExplore';

const Container = styled.main`
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

const SearchContainer = styled.div`
  padding: 1.5rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const ExploreContainer = styled.div`
  flex: 1;
`;

const ButtonIcon = styled(AiOutlineSetting)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 2rem;
`;

function Explore() {
  const {isModalOpen, onModalClose, onSettingClick} = useExplore();

  return (
    <ExploreContainer>
      <Head
        title="Eksplor topik - Ambis Kuliah"
        description="Eksplor berbagai macam topik diskusi"
      />
      <ExploreTopicsModal isOpen={isModalOpen} onClose={onModalClose} />
      <SearchContainer>
        <Search placeholder="Cari Diskusi" />
      </SearchContainer>
      <Container>
        <TitleContainer>
          <Title>Eksplor</Title>
          <IconButton onClick={onSettingClick}>
            <ButtonIcon />
          </IconButton>
        </TitleContainer>
        <ExploreTopics />
      </Container>
    </ExploreContainer>
  );
}

export default Explore;
