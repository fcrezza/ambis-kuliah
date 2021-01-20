import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Search from 'components/Search';
import {
  TagListContainer,
  TagSearchContainer,
  NotFoundContainer,
  NotFoundText,
  TagItemContainer,
  TagTitle,
  TagAddButton,
  ButtonAddIcon,
  ButtonCheckIcon
} from './utils';

function Tags({tags, onClickTag}) {
  const [searchValue, setSearchValue] = React.useState('');
  const {data: topics} = useSWR('/topics', url =>
    axios.get(url).then(({data}) => data.data)
  );

  const tagsList = topics?.filter(tag => {
    const lowercaseSearchValue = searchValue.toLowerCase();
    const lowercaseTag = tag.name.toLowerCase();
    return lowercaseTag.slice(0, searchValue.length) === lowercaseSearchValue;
  });

  const onChangeSeach = e => {
    setSearchValue(e.target.value);
  };

  return (
    <TagListContainer>
      <TagSearchContainer>
        <Search
          size="small"
          value={searchValue}
          onChange={onChangeSeach}
          placeholder="Cari tag"
        />
      </TagSearchContainer>
      {tagsList?.length ? (
        tagsList.map((tag, idx) => (
          <Tag
            key={idx}
            isAdded={tags.includes(tag.name)}
            title={tag.name}
            onClickTag={onClickTag}
          />
        ))
      ) : (
        <NotFoundContainer>
          <NotFoundText>Item tidak ditemukan</NotFoundText>
        </NotFoundContainer>
      )}
    </TagListContainer>
  );
}

function Tag({title, isAdded, onClickTag}) {
  return (
    <TagItemContainer>
      <TagTitle>{title}</TagTitle>
      <TagAddButton onClick={() => onClickTag(title)}>
        {isAdded ? <ButtonCheckIcon /> : <ButtonAddIcon />}
      </TagAddButton>
    </TagItemContainer>
  );
}

export default Tags;
