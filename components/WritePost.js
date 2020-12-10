import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {BiImageAdd, BiImage} from 'react-icons/bi';
import {MdLabelOutline, MdClose, MdAdd, MdCheck} from 'react-icons/md';
import {lighten, darken} from 'polished';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import Search from 'components/Search';
import {Button} from 'components/Button';
import {users} from 'utils/data';

const WritePostContainer = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  align-items: flex-start;
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const Avatar = styled.a`
  display: inline-block;
  text-decoration: none;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

const EditorContainer = styled.div`
  margin-left: 2rem;
  width: 100%;
`;

const InputGroup = styled.div`
  border-radius: 5px;
  width: 100%;
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({theme}) => theme.colors['gray.150']};
`;

const TitleInput = styled.input`
  padding: 0.8rem;
  width: 100%;
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: none;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.100']};

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

const DescriptionInput = styled.textarea`
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: 0;
  padding: 0.8rem;
  font-size: 1rem;
  width: 100%;
  color: ${({theme}) => theme.colors['black.100']};
  min-height: 100px;
  resize: vertical;
  display: block;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const AttachmentButton = styled.button`
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
    color: ${({theme, disabled}) =>
      disabled
        ? lighten(0.1, theme.colors['orange.50'])
        : theme.colors['orange.50']};
  }
`;

const FileInputHidden = styled.input`
  display: none;
`;

const AttachmentGroup = styled.div`
  display: flex;

  & > ${AttachmentButton}:not(:last-child) {
    margin-right: 0.6rem;
  }
`;

const AttachmentValuesGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const AttachmentValue = styled.div`
  display: flex;
  margin-top: 1rem;

  .content-container {
    display: flex;
    align-items: center;
    border: 1px solid ${({theme}) => theme.colors['orange.50']};
    padding: 0.3rem;
    border-radius: 3px 0 0 3px;
  }

  .icon {
    color: ${({theme}) => theme.colors['orange.50']};
    font-size: 1.2rem;
    display: block;
  }

  .text {
    margin: 0 0 0 0.5rem;
    color: ${({theme}) => theme.colors['orange.50']};
    font-size: 0.8rem;
  }

  .cancel-button {
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
  }
`;

const TagListContainer = styled.div`
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors['white.50']};
  height: 200px;
  overflow-y: auto;
`;

const TagSearchContainer = styled.div`
  padding: 0.7rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
`;

const TagItemContainer = styled.div`
  padding: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.150']};
  }
`;

const TagTitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.100']};
`;

const TagAddButton = styled.button`
  border: 0;
  border-radius: 3px;
  padding: 0.2rem;
  background-color: ${({theme}) => theme.colors['orange.50']};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.03, theme.colors['orange.50'])};
  }

  svg {
    color: ${({theme}) => theme.colors['white.50']};
    font-size: 1.2rem;
    display: block;
  }
`;

const NotFound = styled.div`
  padding: 0.7rem;

  p {
    margin: 2rem 0 0;
    font-weight: 500;
    color: ${({theme}) => theme.colors['black.50']};
    text-align: center;
    font-size: 1rem;
  }
`;

function WritePost() {
  const [inputTitle, setInputTitle] = React.useState('');
  const [imageAttachment, setImageAttachment] = React.useState(null);
  const [tags, setTags] = React.useState([]);
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

  const onTitleChange = e => {
    setInputTitle(e.target.value);
  };

  const onClickTag = newTag => {
    if (tags.includes(newTag)) {
      return setTags(prevState => prevState.filter(tag => tag !== newTag));
    }

    if (tags.length < 3) {
      setTags(prevState => [...prevState, newTag]);
    }
  };

  return (
    <WritePostContainer>
      <Link href={`/profile/${users[2].username}`} passHref>
        <Avatar>
          <img src={users[2].avatar} alt={`${users[2].fullname} avatar`} />
        </Avatar>
      </Link>
      <EditorContainer>
        <InputGroup>
          <TitleInput
            value={inputTitle}
            onChange={onTitleChange}
            placeholder="Judul Diskusi..."
          />
          <Divider />
          <DescriptionInput placeholder="Deskripsi Diskusi..." />
        </InputGroup>
        <AttachmentValuesGroup>
          {imageAttachment ? (
            <AttachmentValue>
              <div className="content-container">
                <BiImage className="icon" />
                <p className="text">
                  {imageAttachment.name.substring(0, 20)}...
                </p>
              </div>
              <button className="cancel-button" onClick={onCancelImage}>
                <MdClose />
              </button>
            </AttachmentValue>
          ) : null}
          {tags.length
            ? tags.map(tag => (
                <AttachmentValue key={tag}>
                  <div className="content-container">
                    <MdLabelOutline className="icon" />
                    <p className="text">{tag}</p>
                  </div>
                  <button
                    className="cancel-button"
                    onClick={() => onClickTag(tag)}
                  >
                    <MdClose />
                  </button>
                </AttachmentValue>
              ))
            : null}
        </AttachmentValuesGroup>
        <ButtonGroup>
          <AttachmentGroup>
            <AttachmentButton
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
              <BiImageAdd />
            </AttachmentButton>
            <Tippy
              content={<TagList tags={tags} onClickTag={onClickTag} />}
              placement="bottom"
              trigger="click"
              theme="light"
              hideOnClick
              interactive
            >
              <AttachmentButton disabled={tags.length === 3}>
                <MdLabelOutline />
              </AttachmentButton>
            </Tippy>
          </AttachmentGroup>
          <Button disabled={!inputTitle}>Kirim</Button>
        </ButtonGroup>
      </EditorContainer>
    </WritePostContainer>
  );
}

function TagList({tags, onClickTag}) {
  const [searchValue, setSearchValue] = React.useState('');
  const tagList = ['Umum', 'Teknologi', 'Agama', 'Kesehatan', 'Politik'].filter(
    tag => {
      const lowercaseSearchValue = searchValue.toLowerCase();
      const lowercaseTag = tag.toLowerCase();

      return lowercaseTag.slice(0, searchValue.length) === lowercaseSearchValue;
    }
  );

  const onChangeSeach = e => {
    setSearchValue(e.target.value);
  };

  return (
    <TagListContainer>
      <TagSearchContainer>
        <Search
          size="small"
          value={searchValue}
          onChange={onChangeSeach}
          placeholder="Cari tag"
        />
      </TagSearchContainer>
      {tagList.length ? (
        tagList.map((tag, idx) => (
          <TagItem
            key={idx}
            isAdded={tags.includes(tag)}
            title={tag}
            onClickTag={onClickTag}
          />
        ))
      ) : (
        <NotFound>
          <p>Item tidak ditemukan</p>
        </NotFound>
      )}
    </TagListContainer>
  );
}

function TagItem({title, isAdded, onClickTag}) {
  return (
    <TagItemContainer>
      <TagTitle>{title}</TagTitle>
      <TagAddButton onClick={() => onClickTag(title)}>
        {isAdded ? <MdCheck /> : <MdAdd />}
      </TagAddButton>
    </TagItemContainer>
  );
}

export default WritePost;
