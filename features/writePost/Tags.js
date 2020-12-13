import {MdCheck, MdAdd} from 'react-icons/md';
import styled, {css} from 'styled-components';
import {darken} from 'polished';

import Search from 'components/Search';
import useTags from './useTags';

const TagListContainer = styled.div`
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors['white.50']};
  height: 200px;
  overflow-y: auto;
`;

const TagSearchContainer = styled.div`
  padding: 0.7rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const TagItemContainer = styled.div`
  padding: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
  }
`;

const TagTitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.100']};
`;

const TagAddButton = styled.button`
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

function Tags({tags, onClickTag}) {
  const {onChangeSeach, searchValue, tagsList} = useTags();

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
      {tagsList.length ? (
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
