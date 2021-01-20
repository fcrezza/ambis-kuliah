import React from 'react';

import UserAvatar from './UserAvatar';
import WritePostInput from './Inputs';
import WritePostAttachments from './Attachments';
import WritePostButtons from './Buttons';
import {WritePostContainer, EditorContainer} from './utils';

function WritePost() {
  const [titleValue, setInputTitle] = React.useState('');
  const [imageAttachment, setImageAttachment] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const imgAttachmentRef = React.useRef();

  const onChange = e => {
    setImageAttachment(e.target.files[0]);
  };

  const onSelectedImage = () => {
    imgAttachmentRef.current.click();
  };

  const onCancelImage = () => {
    setImageAttachment(null);
  };

  const onTitleChange = e => {
    setInputTitle(e.target.value);
  };

  const onClickTag = newTag => {
    if (tags.includes(newTag)) {
      return setTags(prevState => prevState.filter(tag => tag !== newTag));
    }

    if (tags.length < 3) {
      setTags(prevState => [...prevState, newTag]);
    }
  };

  return (
    <WritePostContainer>
      <UserAvatar />
      <EditorContainer>
        <WritePostInput titleValue={titleValue} onTitleChange={onTitleChange} />
        <WritePostAttachments
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
