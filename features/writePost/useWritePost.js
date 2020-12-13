import React from 'react';

function useWritePost() {
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

  return {
    tags,
    titleValue,
    imgAttachmentRef,
    imageAttachment,
    onClickTag,
    onTitleChange,
    onCancelImage,
    onSelectedImage,
    onChange
  };
}

export default useWritePost;
