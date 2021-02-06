import * as React from 'react';
import Link from 'next/link';
import {mutate, cache} from 'swr';
import styled from 'styled-components';
import {darken, lighten} from 'polished';
import {BiImage, BiImageAdd} from 'react-icons/bi';
import {MdClose} from 'react-icons/md';
import {Button, IconButton} from 'components/Button';

import {Textarea, ErrorMessage} from 'components/Input';
import {useAuth} from 'utils/auth';
import axios from 'utils/axios';
import useRequest from 'utils/useRequest';
import toast from 'react-hot-toast';

const WriteReplyContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  background: ${({theme}) => theme.colors['gray.50']};
  border-radius: 0 0 10px 10px;
`;

const EditorContainer = styled.div`
  margin-left: 1.5rem;
  width: 100%;
`;

const AuthorProfileLink = styled.a`
  display: inline-block;
  text-decoration: none;
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.colors['gray.150']};
  background-image: url(${({imageUrl}) => imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ImageAttachmentContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const ImageContent = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors['black.100']};
  padding: 0.3rem;
  border-radius: 3px 0 0 3px;
`;

const ImageIcon = styled(BiImage)`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.2rem;
  display: block;
`;

const TextImage = styled.p`
  margin: 0 0 0 0.5rem;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 0.8rem;
`;

const CancelImageButton = styled.button`
  cursor: pointer;
  border-radius: 0 3px 3px 0;
  padding: 0.1rem 0.2rem 0 0.1rem;
  border: 0;
  background-color: ${({theme}) => theme.colors['black.100']};
  display: inline-block;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.03, theme.colors['black.100'])};
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
  color: ${({theme}) => theme.colors['black.100']};

  ${IconButton}:disabled
  & {
    color: ${({theme}) => lighten(0.1, theme.colors['black.100'])};
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

function WriteReply({postId, authorUsername}) {
  const {userData} = useAuth();
  const [replyContent, setReplyContent] = React.useState('');
  const [imageAttachment, setImageAttachment] = React.useState(null);
  const {requestStatus, changeRequestStatus} = useRequest();
  const imgAttachmentRef = React.useRef();

  const onChangeReplyContent = e => setReplyContent(e.target.value);
  const onChangeImage = e => setImageAttachment(e.target.files[0]);
  const onClickSelectImage = () => imgAttachmentRef.current.click();
  const onClickCancelImage = () => setImageAttachment(null);
  const onSumitReply = async () => {
    try {
      changeRequestStatus('loading', null);
      const fd = new FormData();

      if (imageAttachment) {
        fd.append('image', imageAttachment);
      }

      fd.append('replyContent', replyContent);
      fd.append('userId', Number(userData.id));

      await axios.post(`/posts/${authorUsername}/${postId}/replies`, fd);
      changeRequestStatus('success', null);
      setReplyContent('');
      const cacheKeys = cache
        .keys()
        .filter(key =>
          key.startsWith(`/posts/${userData.username}/${postId}/replies`)
        );
      for (let key of cacheKeys) {
        // can't update cached value, bug in SWR?
        mutate(key);
      }
      toast.success('Berhasil mengirim komentar');
    } catch (error) {
      if (error.response) {
        changeRequestStatus('error', {
          message: error.response.data.data.message
        });
      } else {
        changeRequestStatus('error', {message: 'Upss, ada yang salah'});
      }
    }
  };

  return (
    <WriteReplyContainer>
      <Link href={`/profile/${userData.username}`} passHref>
        <AuthorProfileLink>
          <AuthorAvatar imageUrl={userData.avatar.url} />
        </AuthorProfileLink>
      </Link>
      <EditorContainer>
        <Textarea
          placeholder="Komentar..."
          value={replyContent}
          onChange={onChangeReplyContent}
        />
        {requestStatus.name === 'error' ? (
          <ErrorMessage message={requestStatus.data.message} />
        ) : null}
        {imageAttachment ? (
          <ImageAttachmentContainer>
            <ImageContent>
              <ImageIcon />
              <TextImage>{imageAttachment.name.substring(0, 20)}...</TextImage>
            </ImageContent>
            <CancelImageButton onClick={onClickCancelImage}>
              <CancelButtonIcon />
            </CancelImageButton>
          </ImageAttachmentContainer>
        ) : null}
        <ButtonGroup>
          <AttachmentGroup>
            <IconButton
              onClick={onClickSelectImage}
              disabled={Boolean(imageAttachment)}
            >
              <FileInputHidden
                type="file"
                name="image"
                accept="image/x-png,image/gif,image/jpeg"
                ref={imgAttachmentRef}
                onChange={onChangeImage}
                disabled={Boolean(imageAttachment)}
              />
              <AttachmentButtonImageIcon />
            </IconButton>
          </AttachmentGroup>
          <Button
            onClick={onSumitReply}
            disabled={!replyContent && requestStatus.name === 'loading'}
          >
            Kirim
          </Button>
        </ButtonGroup>
      </EditorContainer>
    </WriteReplyContainer>
  );
}

export default WriteReply;
