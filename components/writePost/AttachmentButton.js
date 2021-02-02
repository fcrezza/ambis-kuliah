import * as React from 'react';
import Tippy from '@tippyjs/react';
import styled, {css} from 'styled-components';
import {lighten} from 'polished';
import {BiImageAdd} from 'react-icons/bi';
import {MdLabelOutline} from 'react-icons/md';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import Topics from './Topics';
import {Button, IconButton} from 'components/Button';

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

function AttachmentButton(props) {
  const {
    topics,
    isImagePresent,
    isTitlePresent,
    isSubmitting,
    onClickImage,
    imageInputRef,
    onChangeImage,
    onClickTopic,
    onSubmit
  } = props;
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const showPopover = () => {
    setIsPopoverVisible(true);
  };

  const hidePopover = () => {
    setIsPopoverVisible(false);
  };

  return (
    <ButtonGroup>
      <AttachmentGroup>
        <IconButton onClick={onClickImage} disabled={isImagePresent}>
          <FileInputHidden
            type="file"
            name="image"
            accept="image/x-png,image/gif,image/jpeg"
            ref={imageInputRef}
            onChange={onChangeImage}
            disabled={isImagePresent}
          />
          <AttachmentButtonImageIcon />
        </IconButton>
        <Tippy
          placement="bottom"
          theme="light"
          content={<Topics topics={topics} onClickTopic={onClickTopic} />}
          visible={topics.length < 3 && isPopoverVisible}
          onClickOutside={hidePopover}
          interactive
        >
          <IconButton onClick={showPopover} disabled={topics.length === 3}>
            <AttachmentButtonLabelIcon />
          </IconButton>
        </Tippy>
      </AttachmentGroup>
      <Button onClick={onSubmit} disabled={!isTitlePresent || isSubmitting}>
        Kirim
      </Button>
    </ButtonGroup>
  );
}

export default AttachmentButton;
