import Link from 'next/link';
import styled from 'styled-components';

import UserAvatar from './UserAvatar';
import CommentInput from './CommentInput';
import ImageAttachmentValue from './ImageAttachmentValue';
import CommentButtons from './CommentButtons';
import useComment from './useComment';
import Modal from 'components/Modal';

const WritePostContainer = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const EditorContainer = styled.div`
  margin-left: 2rem;
  width: 100%;
`;

const PostReplyContainer = styled.p`
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0 0 1rem;
`;

const ProfileLink = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors['orange.50']};

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

function PostComment({onModalClose, isModalOpen, postUsername, postID}) {
  const {
    imageAttachment,
    imgAttachmentRef,
    onCancelImage,
    onChange,
    onSelectedImage
  } = useComment();

  return (
    <Modal
      title="Balas Tulisan"
      contentLabel="reply post"
      onClose={onModalClose}
      isOpen={isModalOpen}
    >
      <WritePostContainer>
        <UserAvatar />
        <EditorContainer>
          <PostReplyContainer>
            Membalas kepada
            <Link href={`/discussion/${postUsername}/${postID}`} passHref>
              <ProfileLink onClick={e => e.stopPropagation()}>
                {' '}
                @{postUsername}
              </ProfileLink>
            </Link>
          </PostReplyContainer>
          <CommentInput />
          <ImageAttachmentValue
            imageAttachment={imageAttachment}
            onCancelImage={onCancelImage}
          />
          <CommentButtons
            onSelectedImage={onSelectedImage}
            imageAttachment={imageAttachment}
            imgAttachmentRef={imgAttachmentRef}
            onChange={onChange}
          />
        </EditorContainer>
      </WritePostContainer>
    </Modal>
  );
}

export default PostComment;
