import React from 'react';
import styled from 'styled-components';
import Modal from 'components/Modal';

import {PreventBubblingComponent} from './utils';
const ContentContainer = styled.div`
  width: 100%;
`;

export const ContentTitle = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1.4rem;
  line-height: 30px;
  font-weight: 700;
  display: inline-block;
  margin: 0 0 10px;
`;

const ContentDescription = styled.p`
  line-height: 30px;
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1rem;
  margin: 0 0 1rem;
`;

const ContentImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors['gray.150']};
  background-image: url(${({imageUrl}) => imageUrl});
  background-size: 100%;
  background-repeat: no-repeat;

  &:focus {
    outline: 2px solid ${({theme}) => theme.colors['black.100']};
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

function PostContent({title, description, image}) {
  const [isImageOpen, setIsImageOpen] = React.useState(false);

  const onClickImage = () => {
    setIsImageOpen(true);
  };

  const onKeyDownImage = e => {
    if (e.keyCode === 13) {
      setIsImageOpen(true);
    }
  };

  const closeImageModal = () => {
    setIsImageOpen(false);
  };

  return (
    <ContentContainer>
      {title ? <ContentTitle>{title}</ContentTitle> : null}
      <ContentDescription>{description}</ContentDescription>
      {image ? (
        <PreventBubblingComponent>
          <Modal isOpen={isImageOpen} onClose={closeImageModal} title="Foto">
            <ModalImage src={image} alt="" />
          </Modal>
          <ContentImage
            tabIndex="0"
            imageUrl={image}
            onClick={onClickImage}
            onKeyDown={onKeyDownImage}
          />
        </PreventBubblingComponent>
      ) : null}
    </ContentContainer>
  );
}

export default PostContent;
