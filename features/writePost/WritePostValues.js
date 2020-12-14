import styled, {css} from 'styled-components';
import {darken} from 'polished';
import {BiImage} from 'react-icons/bi';
import {MdClose, MdLabelOutline} from 'react-icons/md';

const AttachmentValuesGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const AttachmentValue = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const AttachmentContent = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors['orange.50']};
  padding: 0.3rem;
  border-radius: 3px 0 0 3px;
`;
const icon = css`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 1.2rem;
  display: block;
`;

const AttachmentImageIcon = styled(BiImage)`
  ${icon}
`;

const AttachmentLabelIcon = styled(MdLabelOutline)`
  ${icon}
`;

const AttachmentText = styled.p`
  margin: 0 0 0 0.5rem;
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 0.8rem;
`;

const AttachmentCancelButton = styled.button`
  cursor: pointer;
  border-radius: 0 3px 3px 0;
  padding: 0.1rem 0.2rem 0 0.1rem;
  border: 0;
  background-color: ${({theme}) => theme.colors['orange.50']};
  display: inline-block;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.03, theme.colors['orange.50'])};
  }

  svg {
    color: ${({theme}) => theme.colors['white.50']};
    display: block;
    font-size: 1.1rem;
  }
`;

const CancelButtonIcon = styled(MdClose)`
  color: ${({theme}) => theme.colors['white.50']};
  display: block;
  font-size: 1.1rem;
`;

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
