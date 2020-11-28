import styled from 'styled-components';
import {darken} from 'polished';
import {IoIosSearch} from 'react-icons/io';

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border: 0;
  background: inherit;
  color: ${({theme}) => theme.colors['black.50']};
  font-size: ${({size}) => (size === 'small' ? '0.9rem' : '1rem')};

  &:focus {
    outline: none;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 50px;
  background-color: ${({theme}) => theme.colors['gray.50']};
  position: relative;

  &:hover {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }

  &:focus-within {
    background-color: transparent;
    border: 1px solid ${({theme}) => theme.colors['orange.50']};

    svg {
      color: ${({theme}) => theme.colors['orange.50']};
    }
  }
`;

const IconContainer = styled.div`
  padding: ${({size}) =>
    size === 'small'
      ? '0.3rem 0.3rem 0.3rem 0.8rem'
      : '0.8em 0.7rem 0.7rem 1.2rem'};

  svg {
    color: ${({theme}) => theme.colors['black.50']};
  }
`;

function Search({placeholder, size, value, onChange}) {
  return (
    <SearchContainer>
      <IconContainer size={size}>
        <IoIosSearch title="search icon" size="1.3rem" />
      </IconContainer>
      <SearchInput
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size={size}
      />
    </SearchContainer>
  );
}

export default Search;
