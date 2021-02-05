import React from 'react';
import styled from 'styled-components';

import UserAvatar from './UserAvatar';
import Input from './Input';
import AttachmentValue from './AttachmentValue';
import AttachementButton from './AttachmentButton';
import axios from 'utils/axios';
import {useAuth} from 'utils/auth';

export const WritePostContainer = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

export const EditorContainer = styled.div`
  margin-left: 2rem;
  width: 100%;
`;

export const ErrorMessage = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['red.50']};
`;

function WritePost({onSubmitPost = () => {}}) {
  const {userData} = useAuth();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [topics, setTopics] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const imageInputRef = React.useRef();
  const [requestStatus, setRequestStatus] = React.useState('iddle');
  const [error, setError] = React.useState('');

  const onChangeImage = e => {
    setImage(e.target.files[0]);
  };

  const onClickImage = () => {
    imageInputRef.current.click();
  };

  const onClickCancelImage = () => {
    setImage(null);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
  };

  const onClickTopic = topic => {
    if (topics.includes(topic)) {
      return setTopics(prevState => prevState.filter(t => t.id !== topic.id));
    }

    if (topics.length < 3) {
      setTopics(prevState => [...prevState, topic]);
    }
  };

  const onSubmit = async () => {
    try {
      if (!topics.length) {
        setError('Postingan harus memiliki minimal 1 topik');
        return;
      }
      setError('');
      setRequestStatus('loading');
      const fd = new FormData();

      if (image) {
        fd.append('image', image);
      }

      fd.append('title', title);
      fd.append('description', description);
      fd.append(
        'topics',
        JSON.stringify(topics.map(topic => Number(topic.id)))
      );
      await axios.post(`/posts/${userData.username}`, fd);
      setRequestStatus('success');
      setImage(null);
      setTopics([]);
      setTitle('');
      setDescription('');
      alert('berhasil!');
      onSubmitPost();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.data.message);
      } else {
        setError('Upss, ada yang salah');
      }
      setRequestStatus('failed');
    }
  };

  return (
    <WritePostContainer>
      <UserAvatar />
      <EditorContainer>
        <Input
          title={title}
          description={description}
          onChangeTitle={onChangeTitle}
          onChangeDescription={onChangeDescription}
        />
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        <AttachmentValue
          imageName={image?.name && `${image.name.substring(0, 20)}...`}
          topics={topics}
          onClickCancelImage={onClickCancelImage}
          onClickTopic={onClickTopic}
        />
        <AttachementButton
          isTitlePresent={Boolean(title)}
          isImagePresent={Boolean(image)}
          isSubmitting={requestStatus === 'loading'}
          topics={topics}
          imageInputRef={imageInputRef}
          onSubmit={onSubmit}
          onClickImage={onClickImage}
          onChangeImage={onChangeImage}
          onClickTopic={onClickTopic}
        />
      </EditorContainer>
    </WritePostContainer>
  );
}

export default WritePost;

/**
 * 1. Make sure title filled (if not disable the button)
 * 2. Make sure not more than 3 topics (if not show alert/warning or whatever)
 * 3. handle submit
 * 4. handle exception
 */
