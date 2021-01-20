import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import Tags from '../Tags';
import {Button, IconButton} from 'components/Button';
import {
  ButtonGroup,
  AttachmentButtonImageIcon,
  AttachmentButtonLabelIcon,
  AttachmentGroup,
  FileInputHidden
} from './utils';

function WritePostButtons({
  onSelectedImage,
  imageAttachment,
  imgAttachmentRef,
  onChange,
  tags,
  onClickTag,
  titleValue
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
        <Tippy
          content={<Tags tags={tags} onClickTag={onClickTag} />}
          placement="bottom"
          trigger="click"
          theme="light"
          hideOnClick
          interactive
        >
          <IconButton disabled={tags.length === 3}>
            <AttachmentButtonLabelIcon />
          </IconButton>
        </Tippy>
      </AttachmentGroup>
      <Button disabled={!titleValue}>Kirim</Button>
    </ButtonGroup>
  );
}

export default WritePostButtons;
