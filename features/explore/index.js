import React from 'react';
import useSWR from 'swr';

import Head from 'components/Head';
import ExploreModal from './Modal';
import TopicList from './TopicList';
import Search from 'components/Search';
import axios from 'utils/axios';
import {IconButton} from 'components/Button';
import {
  ExploreContainer,
  SearchContainer,
  Container,
  TitleContainer,
  Title,
  ButtonIcon
} from './utils';

function Explore() {
  const [isModalOpen, setModalState] = React.useState(false);
  const {data: topics} = useSWR('/topics', url =>
    axios.get(url).then(({data}) => data.data)
  );

  const onSettingClick = () => {
    setModalState(true);
  };

  const onModalClose = () => {
    setModalState(false);
  };

  return (
    <ExploreContainer>
      <Head
        title="Eksplor topik - Ambis Kuliah"
        description="Eksplor berbagai macam topik diskusi"
      />
      <ExploreModal
        topics={topics}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
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
        <TopicList topics={topics} />
      </Container>
    </ExploreContainer>
  );
}

export default Explore;
