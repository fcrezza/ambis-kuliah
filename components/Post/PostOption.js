import * as React from 'react';
import styled from 'styled-components';
import {GoKebabVertical} from 'react-icons/go';
import {lighten} from 'polished';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import {IconButton} from 'components/Button';
import PostReplyModal from './PostReplyModal';
import {PreventBubblingComponent} from './utils';

const OptionButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const ButtonIcon = styled(GoKebabVertical)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 1.3rem;
`;

const OptionItem = styled.button`
  padding: 12px;
  border: 0;
  color: ${({theme}) => theme.colors['black.100']};
  text-align: center;
  background: ${({theme}) => theme.colors['white.50']};
  display: block;
  width: 100%;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${({theme}) => lighten(0.01, theme.colors['gray.50'])};
  }
`;

const OptionContainer = styled.div`
  width: 150px;

  & > ${OptionItem}:not(:last-child) {
    border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  }
`;

const PopoverOverlay = styled.div`
  display: ${({isOpen}) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  cursor: default;
`;

/**
 * TODO:
 * - Make Component Keyboard Accesibble (ie: trap focus when popover open, hide popover when press esc key)
 */

function PostOption({hasAuth, postId, authorUsername, handleDelete}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isOptionVisible, setOptionVisibility] = React.useState(false);
  const popoverOvelayRef = React.useRef();

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onClickDelete = () => {
    handleDelete();
  };

  const handleReply = () => {
    setOptionVisibility(false);
    setIsModalOpen(true);
  };

  const handleShowOption = () => {
    setOptionVisibility(true);
  };

  const handleHideOption = () => {
    setOptionVisibility(false);
  };

  return (
    <PreventBubblingComponent>
      {hasAuth ? (
        <PostReplyModal
          postId={postId}
          postUsername={authorUsername}
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
        />
      ) : null}
      <PopoverOverlay
        ref={popoverOvelayRef}
        isOpen={isOptionVisible}
        onClick={handleHideOption}
      />
      <Tippy
        content={
          <OptionContainer>
            {hasAuth ? (
              <OptionItem onClick={onClickDelete}>Hapus</OptionItem>
            ) : null}
            <OptionItem onClick={handleReply}>Balas</OptionItem>
          </OptionContainer>
        }
        appendTo={popoverOvelayRef.current}
        animation={false}
        visible={isOptionVisible}
        placement="left-start"
        theme="light"
        arrow={false}
        offset={[0, -37]}
        interactive
      >
        <OptionButtonContainer>
          <IconButton onClick={handleShowOption}>
            <ButtonIcon />
          </IconButton>
        </OptionButtonContainer>
      </Tippy>
    </PreventBubblingComponent>
  );
}

export default PostOption;
