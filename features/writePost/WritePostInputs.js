import styled from 'styled-components';

import {darken} from 'polished';

const InputGroup = styled.div`
  border-radius: 5px;
  width: 100%;
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({theme}) => theme.colors['gray.150']};
`;

const TitleInput = styled.input`
  padding: 0.8rem;
  width: 100%;
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: none;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.100']};

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

const DescriptionInput = styled.textarea`
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: 0;
  padding: 0.8rem;
  font-size: 1rem;
  width: 100%;
  color: ${({theme}) => theme.colors['black.100']};
  min-height: 100px;
  resize: vertical;
  display: block;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

function WritePostInput({
  titleValue,
  onTitleChange,
  descriptionValue,
  onDescriptionChange
}) {
  return (
    <InputGroup>
      <TitleInput
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Judul Diskusi..."
      />
      <Divider />
      <DescriptionInput
        placeholder="Deskripsi Diskusi..."
        value={descriptionValue}
        onChange={onDescriptionChange}
      />
    </InputGroup>
  );
}

export default WritePostInput;
