import React from 'react';
import useSWR from 'swr';
import styled, {css} from 'styled-components';
import {darken} from 'polished';
import {MdCheck, MdAdd} from 'react-icons/md';

import Search from 'components/Search';
import axios from 'utils/axios';

const TopicListContainer = styled.div`
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors['white.50']};
  height: 200px;
  overflow-y: auto;
`;

const TopicSearchContainer = styled.div`
  padding: 0.7rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const TopicItem = styled.div`
  padding: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
  }
`;

const TopicTitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.100']};
`;

const TopicAddButton = styled.button`
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

const buttonIcon = css`
  color: ${({theme}) => theme.colors['white.50']};
  font-size: 1.2rem;
  display: block;
`;

const ButtonCheckIcon = styled(MdCheck)`
  ${buttonIcon}
`;

const ButtonAddIcon = styled(MdAdd)`
  ${buttonIcon}
`;

const NotFoundContainer = styled.div`
  padding: 0.7rem;
`;

const NotFoundText = styled.p`
  margin: 2rem 0 0;
  font-weight: 500;
  color: ${({theme}) => theme.colors['black.50']};
  text-align: center;
  font-size: 1rem;
`;

function Topics({topics, onClickTopic}) {
  const [searchValue, setSearchValue] = React.useState('');
  const {data: topicsData} = useSWR('/topics', url =>
    axios.get(url).then(({data}) => data.data)
  );

  const topicList = topicsData?.filter(topic => {
    const lowercaseSearchValue = searchValue.toLowerCase();
    const lowercaseTag = topic.name.toLowerCase();
    return lowercaseTag.slice(0, searchValue.length) === lowercaseSearchValue;
  });

  const onChangeSearch = e => {
    setSearchValue(e.target.value);
  };

  return (
    <TopicListContainer>
      <TopicSearchContainer>
        <Search
          size="small"
          value={searchValue}
          onChange={onChangeSearch}
          placeholder="Cari Topik"
        />
      </TopicSearchContainer>
      {topicList?.length ? (
        topicList.map(topic => {
          const isPresent = topics.find(t => t.id === topic.id);
          return (
            <TopicItem key={topic.id}>
              <TopicTitle>{topic.name}</TopicTitle>
              <TopicAddButton onClick={() => onClickTopic(topic)}>
                {isPresent ? <ButtonCheckIcon /> : <ButtonAddIcon />}
              </TopicAddButton>
            </TopicItem>
          );
        })
      ) : (
        <NotFoundContainer>
          <NotFoundText>Item tidak ditemukan</NotFoundText>
        </NotFoundContainer>
      )}
    </TopicListContainer>
  );
}

export default Topics;
