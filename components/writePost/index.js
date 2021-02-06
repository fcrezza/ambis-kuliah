import React from 'react';
import styled from 'styled-components';
import {toast} from 'react-hot-toast';

import UserAvatar from './UserAvatar';
import Input from './Input';
import AttachmentValue from './AttachmentValue';
import AttachementButton from './AttachmentButton';
import {ErrorMessage} from 'components/Input';
import axios from 'utils/axios';
import {useAuth} from 'utils/auth';
import useRequest from 'utils/useRequest';

export const WritePostContainer = styled.div`
  padding: 2rem;
  display: flex;
  align-items: flex-start;
`;

export const EditorContainer = styled.div`
  margin-left: 2rem;
  width: 100%;
`;

function WritePost({onSubmitPost = () => {}}) {
  const {userData} = useAuth();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [topics, setTopics] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const imageInputRef = React.useRef();
  const {requestStatus, changeRequestStatus} = useRequest();

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
    console.log(requestStatus);
    try {
      if (!topics.length) {
        changeRequestStatus('error', {
          message: 'Postingan harus memiliki minimal 1 topik'
        });
        return;
      }
      changeRequestStatus('loading', null);
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
      changeRequestStatus('success', null);
      setImage(null);
      setTopics([]);
      setTitle('');
      setDescription('');
      toast('Berhasil mengirim postingan');
      onSubmitPost();
    } catch (error) {
      if (error.response) {
        changeRequestStatus('error', {
          message: error.response.data.data.message
        });
      } else {
        changeRequestStatus('error', {
          message: 'Upzzz, ada yang salah'
        });
      }
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
        {requestStatus.name === 'error' ? (
          <ErrorMessage message={requestStatus.data.message} />
        ) : null}
        <AttachmentValue
          imageName={image?.name && `${image.name.substring(0, 20)}...`}
          topics={topics}
          onClickCancelImage={onClickCancelImage}
          onClickTopic={onClickTopic}
        />
        <AttachementButton
          isTitlePresent={Boolean(title)}
          isImagePresent={Boolean(image)}
          isSubmitting={requestStatus.name === 'loading'}
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
