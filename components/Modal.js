import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import {lighten} from 'polished';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import {MdClose} from 'react-icons/md';

const Title = styled.div`
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};

  h2 {
    color: ${({theme}) => theme.colors['black.150']};
    margin: 0;
    font-size: 1.4rem;
  }

  .close-button {
    border: 0;
    background: transparent;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;

    &:focus,
    &:hover {
      background: ${({theme}) => lighten(0.2, theme.colors['orange.50'])};
    }

    svg {
      font-size: 1.8rem;
      color: ${({theme}) => theme.colors['orange.50']};
    }
  }
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
      <Title>
        <h2>{title}</h2>
        <button className="close-button" onClick={onClose}>
          <MdClose />
        </button>
      </Title>
      {children}
    </ReactModal>
  );
}

export default Modal;
