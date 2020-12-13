import React from 'react';
import styled from 'styled-components';

import HotTopicsPosts from './HotTopicsPosts';
import Search from 'components/Search';
import useHotTopics from './useHotTopics';

const HotTopicsContainer = styled.div`
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

const Copyright = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 0.8rem;
  margin: 0;
`;

function HotTopics() {
  const {isShowed} = useHotTopics();

  if (isShowed) {
    return (
      <HotTopicsContainer>
        <Search placeholder="Cari diskusi" />
        <HotTopicsPosts />
        <Copyright>© 2020 Ambis Kuliah. All rights reserved</Copyright>
      </HotTopicsContainer>
    );
  }

  return null;
}

export default HotTopics;
