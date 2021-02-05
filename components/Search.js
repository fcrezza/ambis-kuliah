import styled from 'styled-components';
import {darken} from 'polished';
import {IoIosSearch} from 'react-icons/io';

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors['gray.50']};
  position: relative;

  &:hover {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }

  &:focus-within {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
    outline: 2px solid #000;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border: 0;
  background: inherit;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: ${({size}) => (size === 'small' ? '0.9rem' : '1rem')};
  outline: none;
  font-weight: 400;
`;

const IconContainer = styled.div`
  padding: ${({size}) =>
    size === 'small'
      ? '0.3rem 0.3rem 0.3rem 0.8rem'
      : '0.6rem 0.6rem 0.6rem 1rem'};
`;

const SearchIcon = styled(IoIosSearch)`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1.3rem;
  display: block;
`;

function Search({placeholder, size, value, onChange, onSearch}) {
  const handleKeyPress = e => {
    if (e.charCode === 13) {
      onSearch();
    }
  };

  return (
    <SearchContainer>
      <IconContainer size={size}>
        <SearchIcon />
      </IconContainer>
      <SearchInput
        type="search"
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size={size}
      />
    </SearchContainer>
  );
}

export default Search;
