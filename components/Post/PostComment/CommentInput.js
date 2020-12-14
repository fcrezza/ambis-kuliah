import styled from 'styled-components';

import {darken} from 'polished';

const Textarea = styled.textarea`
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
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

function CommentInput({descriptionValue, onDescriptionChange}) {
  return (
    <Textarea
      placeholder="Tulis Komentar..."
      value={descriptionValue}
      onChange={onDescriptionChange}
    />
  );
}

export default CommentInput;
