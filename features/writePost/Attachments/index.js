import {
  AttachmentValue,
  AttachmentCancelButton,
  AttachmentContent,
  AttachmentImageIcon,
  AttachmentLabelIcon,
  AttachmentText,
  AttachmentValuesGroup,
  CancelButtonIcon
} from './utils';

function WritePostValues({imageAttachment, onCancelImage, onClickTag, tags}) {
  return (
    <AttachmentValuesGroup>
      {imageAttachment ? (
        <ImageAttachment
          text={imageAttachment.name}
          onCancelImage={onCancelImage}
        />
      ) : null}
      {tags.length
        ? tags.map(tag => (
            <TagAttachment key={tag} tagName={tag} onClickTag={onClickTag} />
          ))
        : null}
    </AttachmentValuesGroup>
  );
}

function ImageAttachment({text, onCancelImage}) {
  return (
    <AttachmentValue>
      <AttachmentContent>
        <AttachmentImageIcon />
        <AttachmentText>{text.substring(0, 20)}...</AttachmentText>
      </AttachmentContent>
      <AttachmentCancelButton onClick={onCancelImage}>
        <CancelButtonIcon />
      </AttachmentCancelButton>
    </AttachmentValue>
  );
}

function TagAttachment({tagName, onClickTag}) {
  return (
    <AttachmentValue>
      <AttachmentContent>
        <AttachmentLabelIcon />
        <AttachmentText>{tagName}</AttachmentText>
      </AttachmentContent>
      <AttachmentCancelButton onClick={() => onClickTag(tagName)}>
        <CancelButtonIcon />
      </AttachmentCancelButton>
    </AttachmentValue>
  );
}

export default WritePostValues;
