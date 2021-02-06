import styled, {css} from 'styled-components';
import {darken} from 'polished';
import {BiImage} from 'react-icons/bi';
import {MdClose, MdLabelOutline} from 'react-icons/md';

const AttachmentValuesGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const AttachmentItem = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const AttachmentContent = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors['black.100']};
  padding: 0.3rem;
  border-radius: 3px 0 0 3px;
`;
const icon = css`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.2rem;
  display: block;
`;

const AttachmentImageIcon = styled(BiImage)`
  ${icon}
`;

const AttachmentLabelIcon = styled(MdLabelOutline)`
  ${icon}
`;

const AttachmentText = styled.p`
  margin: 0 0 0 0.5rem;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 0.8rem;
`;

const AttachmentCancelButton = styled.button`
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

function AttachmentValue(props) {
  const {imageName, topics, onClickCancelImage, onClickTopic} = props;
  return (
    <AttachmentValuesGroup>
      {imageName ? (
        <AttachmentItem>
          <AttachmentContent>
            <AttachmentImageIcon />
            <AttachmentText>{imageName}</AttachmentText>
          </AttachmentContent>
          <AttachmentCancelButton onClick={onClickCancelImage}>
            <CancelButtonIcon />
          </AttachmentCancelButton>
        </AttachmentItem>
      ) : null}
      {topics.length
        ? topics.map(topic => (
            <AttachmentItem key={topic.id}>
              <AttachmentContent>
                <AttachmentLabelIcon />
                <AttachmentText>{topic.name}</AttachmentText>
              </AttachmentContent>
              <AttachmentCancelButton onClick={() => onClickTopic(topic)}>
                <CancelButtonIcon />
              </AttachmentCancelButton>
            </AttachmentItem>
          ))
        : null}
    </AttachmentValuesGroup>
  );
}

export default AttachmentValue;
