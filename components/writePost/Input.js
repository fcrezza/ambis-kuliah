import styled from 'styled-components';
import {darken} from 'polished';

const EditorContainer = styled.div`
  width: 100%;
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 5px;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({theme}) => theme.colors['gray.100']};
`;

const TitleInput = styled.input`
  padding: 0.8rem;
  width: 100%;
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: none;
  font-size: 1rem;
  border-radius: 5px 5px 0 0;
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
  border-radius: 0 0 5px 5px;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

function Input({title, onChangeTitle, description, onChangeDescription}) {
  return (
    <EditorContainer>
      <TitleInput
        value={title}
        onChange={onChangeTitle}
        placeholder="Judul Diskusi..."
      />
      <Divider />
      <DescriptionInput
        placeholder="Deskripsi Diskusi..."
        value={description}
        onChange={onChangeDescription}
      />
    </EditorContainer>
  );
}

export default Input;
