import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {darken, lighten} from 'polished';
import {BiImage, BiImageAdd} from 'react-icons/bi';
import {MdClose} from 'react-icons/md';
import {Button, IconButton} from 'components/Button';

import Modal from 'components/Modal';
import {Textarea} from 'components/Input';
import {useUser} from 'utils/user';

const WriteReplyContainer = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const EditorContainer = styled.div`
  margin-left: 2rem;
  width: 100%;
`;

const AuthorPostReplyContainer = styled.p`
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0 0 1rem;
`;

const AuthorPostProfileLink = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors['orange.50']};

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const AuthorProfileLink = styled.a`
  display: inline-block;
  text-decoration: none;
`;

const AuthorAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: block;
`;

const ImageAttachmentContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const ImageContent = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors['orange.50']};
  padding: 0.3rem;
  border-radius: 3px 0 0 3px;
`;

const ImageIcon = styled(BiImage)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 1.2rem;
  display: block;
`;

const TextImage = styled.p`
  margin: 0 0 0 0.5rem;
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 0.8rem;
`;

const CancelImageButton = styled.button`
  cursor: pointer;
  border-radius: 0 3px 3px 0;
  padding: 0.1rem 0.2rem 0 0.1rem;
  border: 0;
  background-color: ${({theme}) => theme.colors['orange.50']};
  display: inline-block;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.03, theme.colors['orange.50'])};
  }

  svg {
    color: ${({theme}) => theme.colors['white.50']};
    display: block;
    font-size: 1.1rem;
  }
`;

const CancelButtonIcon = styled(MdClose)`
  color: ${({theme}) => theme.colors['white.50']};
  display: block;
  font-size: 1.1rem;
`;

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

function PostReplyModal({onModalClose, isModalOpen, postUsername, postID}) {
  const {userData} = useUser();
  const [imageAttachment, setImageAttachment] = React.useState(null);
  const imgAttachmentRef = React.useRef();

  const onChange = e => {
    setImageAttachment(e.target.files[0]);
  };

  const onSelectedImage = () => {
    imgAttachmentRef.current.click();
  };

  const onCancelImage = () => {
    setImageAttachment(null);
  };

  return (
    <Modal
      title="Balas Tulisan"
      contentLabel="reply post"
      onClose={onModalClose}
      isOpen={isModalOpen}
    >
      <WriteReplyContainer>
        <Link href={`/profile/${userData?.username}`} passHref>
          <AuthorProfileLink>
            <AuthorAvatar
              src={userData?.avatar.url}
              alt={`${userData?.fullname} avatar`}
            />
          </AuthorProfileLink>
        </Link>
        <EditorContainer>
          <AuthorPostReplyContainer>
            Membalas kepada
            <Link href={`/discussion/${postUsername}/${postID}`} passHref>
              <AuthorPostProfileLink onClick={e => e.stopPropagation()}>
                {' '}
                @{postUsername}
              </AuthorPostProfileLink>
            </Link>
          </AuthorPostReplyContainer>
          <Textarea />
          {imageAttachment ? (
            <ImageAttachmentContainer>
              <ImageContent>
                <ImageIcon />
                <TextImage>
                  {imageAttachment.name.substring(0, 20)}...
                </TextImage>
              </ImageContent>
              <CancelImageButton onClick={onCancelImage}>
                <CancelButtonIcon />
              </CancelImageButton>
            </ImageAttachmentContainer>
          ) : null}
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
        </EditorContainer>
      </WriteReplyContainer>
    </Modal>
  );
}

export default PostReplyModal;
