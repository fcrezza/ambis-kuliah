import React from 'react';

function useComment() {
  const [imageAttachment, setImageAttachment] = React.useState(null);
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

  return {
    imgAttachmentRef,
    imageAttachment,
    onCancelImage,
    onSelectedImage,
    onChange
  };
}

export default useComment;
