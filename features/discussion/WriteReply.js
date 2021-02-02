import * as React from 'react';
import Link from 'next/link';
import {mutate, cache} from 'swr';
import styled, {useTheme} from 'styled-components';
import {darken, lighten} from 'polished';
import {BiImage, BiImageAdd} from 'react-icons/bi';
import {MdClose} from 'react-icons/md';
import {Button, IconButton} from 'components/Button';

import {Textarea} from 'components/Input';
import {useUser} from 'utils/user';
import axios from 'utils/axios';

const WriteReplyContainer = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const EditorContainer = styled.div`
  margin-left: 2rem;
  width: 100%;
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

export const ErrorMessage = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['red.50']};
`;

function WriteReply({postId, authorUsername}) {
  const {userData} = useUser();
  const {colors} = useTheme();
  const [replyContent, setReplyContent] = React.useState('');
  const [imageAttachment, setImageAttachment] = React.useState(null);
  const [requestStatus, setRequestStatus] = React.useState('iddle');
  const [error, setError] = React.useState('');
  const imgAttachmentRef = React.useRef();

  const onChangeReplyContent = e => setReplyContent(e.target.value);
  const onChangeImage = e => setImageAttachment(e.target.files[0]);
  const onClickSelectImage = () => imgAttachmentRef.current.click();
  const onClickCancelImage = () => setImageAttachment(null);
  const onSumitReply = () => {
    setError('');
    setRequestStatus('loading');
    const fd = new FormData();

    if (imageAttachment) {
      fd.append('image', imageAttachment);
    }

    fd.append('replyContent', replyContent);
    fd.append('userId', Number(userData.id));
    axios
      .post(`/posts/${authorUsername}/${postId}/replies`, fd)
      .then(() => {
        setRequestStatus('success');
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
        alert('berhasil!');
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.data.data.message);
        } else {
          setError('Upss, ada yang salah');
        }
        setRequestStatus('failed');
      });
  };

  return (
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
        <Textarea
          placeholder="Komentar..."
          value={replyContent}
          onChange={onChangeReplyContent}
          styles={{
            borderRadius: '5px',
            border: `1px solid ${colors['gray.100']}`
          }}
        />
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
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
            disabled={!replyContent && requestStatus === 'loading'}
          >
            Kirim
          </Button>
        </ButtonGroup>
      </EditorContainer>
    </WriteReplyContainer>
  );
}

export default WriteReply;
