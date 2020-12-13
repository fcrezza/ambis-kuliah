import {useState} from 'react';

import {topics} from 'utils/data';

function useTags() {
  const [searchValue, setSearchValue] = useState('');
  const tagsList = topics.filter(tag => {
    const lowercaseSearchValue = searchValue.toLowerCase();
    const lowercaseTag = tag.name.toLowerCase();
    return lowercaseTag.slice(0, searchValue.length) === lowercaseSearchValue;
  });

  const onChangeSeach = e => {
    setSearchValue(e.target.value);
  };

  return {
    onChangeSeach,
    searchValue,
    tagsList
  };
}

export default useTags;
