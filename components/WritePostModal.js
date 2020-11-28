import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import {lighten} from 'polished';
import {useRouter} from 'next/router';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import {MdClose} from 'react-icons/md';

import WritePost from 'components/WritePost';

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

const customStyles = {
  overlay: {
    overflowY: 'auto'
  },
  content: {
    top: '10%',
    padding: 0,
    borderRadius: '20px',
    width: '650px',
    left: '50%',
    bottom: 'auto',
    transform: 'translateX(-50%)',
    overflow: 'unset'
  }
};

function WritePostModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const overlayRef = React.useRef();
  const router = useRouter();

  const onClose = () => {
    setIsOpen(false);
    router.push(router.pathname, undefined, {
      shallow: true
    });
  };

  React.useEffect(() => {
    if ('compose' in router.query) {
      return setIsOpen(true);
    }
    setIsOpen(false);
  }, [router]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        ref={node => (overlayRef.current = node)}
        onRequestClose={onClose}
        onAfterOpen={() => disableBodyScroll(overlayRef.current)}
        onAfterClose={() => enableBodyScroll(overlayRef.current)}
        contentLabel="Compose Discussion"
        style={customStyles}
      >
        <Title>
          <h2>Tulis Sesuatu</h2>
          <button className="close-button" onClick={onClose}>
            <MdClose />
          </button>
        </Title>
        <WritePost />
      </Modal>
    </div>
  );
}

export default WritePostModal;
