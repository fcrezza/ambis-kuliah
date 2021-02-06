import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import {MdClose} from 'react-icons/md';

import {IconButton} from 'components/Button';

const TitleContainer = styled.div`
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const TitleText = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.4rem;
`;

const CloseIcon = styled(MdClose)`
  font-size: 1.8rem;
  color: ${({theme}) => theme.colors['black.100']};
`;

function Modal({isOpen, onClose, contentLabel, title, children}) {
  const overlayRef = React.useRef();

  return (
    <ReactModal
      isOpen={isOpen}
      ref={node => (overlayRef.current = node)}
      onRequestClose={onClose}
      onAfterOpen={() => disableBodyScroll(overlayRef.current)}
      onAfterClose={() => enableBodyScroll(overlayRef.current)}
      contentLabel={contentLabel}
      className="customContent"
      overlayClassName="customOverlay"
    >
      <TitleContainer>
        <TitleText>{title}</TitleText>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </TitleContainer>
      {children}
    </ReactModal>
  );
}

export default Modal;
