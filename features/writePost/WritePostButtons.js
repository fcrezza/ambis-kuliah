import Tippy from '@tippyjs/react';
import styled, {css} from 'styled-components';
import {lighten} from 'polished';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import Tags from './Tags';
import {Button, IconButton} from 'components/Button';
import {BiImageAdd} from 'react-icons/bi';
import {MdLabelOutline} from 'react-icons/md';

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const buttonIcon = css`
  font-size: 1.8rem;
  color: ${({theme}) => theme.colors['orange.50']};

  ${IconButton}:disabled
  & {
    color: ${({theme}) => lighten(0.1, theme.colors['orange.50'])};
  }
`;

const AttachmentButtonImageIcon = styled(BiImageAdd)`
  ${buttonIcon}
`;

const AttachmentButtonLabelIcon = styled(MdLabelOutline)`
  ${buttonIcon}
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
