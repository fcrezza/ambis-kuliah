import styled from 'styled-components';
import {darken} from 'polished';
import {BiImage} from 'react-icons/bi';
import {MdClose} from 'react-icons/md';

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

const AttachmentImageIcon = styled(BiImage)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 1.2rem;
  display: block;
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

function imageAttachmentValue({imageAttachment, onCancelImage}) {
  if (imageAttachment) {
    return (
      <AttachmentValue>
        <AttachmentContent>
          <AttachmentImageIcon />
          <AttachmentText>
            {imageAttachment.name.substring(0, 20)}...
          </AttachmentText>
        </AttachmentContent>
        <AttachmentCancelButton onClick={onCancelImage}>
          <CancelButtonIcon />
        </AttachmentCancelButton>
      </AttachmentValue>
    );
  }

  return null;
}

export default imageAttachmentValue;
