import styled from 'styled-components';
import {GoKebabVertical} from 'react-icons/go';
import {lighten} from 'polished';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import {IconButton} from 'components/Button';
import {useAuth} from 'utils/auth';

const PostActionsContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const ButtonIcon = styled(GoKebabVertical)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 1.3rem;
`;

const ButtonAction = styled.button`
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

const ButtonActionsContainer = styled.div`
  width: 150px;

  & > ${ButtonAction}:not(:last-child) {
    border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  }
`;

const PostActionsWrapper = styled.div``;

function PostActions({postUsername, onReplyClick}) {
  return (
    <PostActionsWrapper>
      <Tippy
        arrow={false}
        content={
          <ButtonActions
            postUsername={postUsername}
            onReplyClick={onReplyClick}
          />
        }
        placement="left-start"
        trigger="click"
        theme="light"
        offset={[0, -37]}
        hideOnClick
        interactive
      >
        <PostActionsContainer>
          <IconButton onClick={e => e.stopPropagation()}>
            <ButtonIcon />
          </IconButton>
        </PostActionsContainer>
      </Tippy>
    </PostActionsWrapper>
  );
}

function ButtonActions({postUsername, onReplyClick}) {
  const {userData} = useAuth();
  return (
    <ButtonActionsContainer>
      {userData.username === postUsername ? (
        <PostActionButton onClick={() => {}}>Hapus</PostActionButton>
      ) : null}
      <PostActionButton onClick={onReplyClick}>Balas</PostActionButton>
    </ButtonActionsContainer>
  );
}

function PostActionButton({children, onClick}) {
  return <ButtonAction onClick={onClick}>{children}</ButtonAction>;
}

export default PostActions;
