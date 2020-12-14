import styled from 'styled-components';
import {lighten} from 'polished';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import {Button, IconButton} from 'components/Button';
import {BiImageAdd} from 'react-icons/bi';

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const AttachmentButtonImageIcon = styled(BiImageAdd)`
  font-size: 1.8rem;
  color: ${({theme}) => theme.colors['orange.50']};

  ${IconButton}:disabled
  & {
    color: ${({theme}) => lighten(0.1, theme.colors['orange.50'])};
  }
`;

const AttachmentGroup = styled.div`
  display: flex;

  & > ${IconButton}:not(:last-child) {
    margin-right: 0.6rem;
  }
`;

const FileInputHidden = styled.input`
  display: none;
`;

function CommentButtons({
  onSelectedImage,
  imageAttachment,
  imgAttachmentRef,
  onChange
}) {
  return (
    <ButtonGroup>
      <AttachmentGroup>
        <IconButton
          onClick={onSelectedImage}
          disabled={Boolean(imageAttachment)}
        >
          <FileInputHidden
            ref={imgAttachmentRef}
            type="file"
            onChange={onChange}
            name="image"
            disabled={Boolean(imageAttachment)}
            accept="image/x-png,image/gif,image/jpeg"
          />
          <AttachmentButtonImageIcon />
        </IconButton>
      </AttachmentGroup>
      <Button>Kirim</Button>
    </ButtonGroup>
  );
}

export default CommentButtons;
