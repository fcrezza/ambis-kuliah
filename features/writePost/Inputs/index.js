import {InputGroup, TitleInput, Divider, DescriptionInput} from './utils';

function WritePostInput({
  titleValue,
  onTitleChange,
  descriptionValue,
  onDescriptionChange
}) {
  return (
    <InputGroup>
      <TitleInput
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Judul Diskusi..."
      />
      <Divider />
      <DescriptionInput
        placeholder="Deskripsi Diskusi..."
        value={descriptionValue}
        onChange={onDescriptionChange}
      />
    </InputGroup>
  );
}

export default WritePostInput;
