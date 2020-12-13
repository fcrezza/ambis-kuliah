import styled from 'styled-components';

import UserAvatar from './UserAvatar';
import WritePostInput from './WritePostInputs';
import WritePostValues from './WritePostValues';
import WritePostButtons from './WritePostButtons';
import useWritePost from './useWritePost';

const WritePostContainer = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const EditorContainer = styled.div`
  margin-left: 2rem;
  width: 100%;
`;

function WritePost() {
  const {
    tags,
    titleValue,
    onTitleChange,
    imageAttachment,
    imgAttachmentRef,
    onCancelImage,
    onChange,
    onClickTag,
    onSelectedImage
  } = useWritePost();

  return (
    <WritePostContainer>
      <UserAvatar />
      <EditorContainer>
        <WritePostInput titleValue={titleValue} onTitleChange={onTitleChange} />
        <WritePostValues
          imageAttachment={imageAttachment}
          onCancelImage={onCancelImage}
          tags={tags}
          onClickTag={onClickTag}
        />
        <WritePostButtons
          onSelectedImage={onSelectedImage}
          imageAttachment={imageAttachment}
          imgAttachmentRef={imgAttachmentRef}
          onChange={onChange}
          tags={tags}
          onClickTag={onClickTag}
          titleValue={titleValue}
        />
      </EditorContainer>
    </WritePostContainer>
  );
}

export default WritePost;
