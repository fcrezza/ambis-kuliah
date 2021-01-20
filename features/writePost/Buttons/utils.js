import styled, {css} from 'styled-components';
import {lighten} from 'polished';
import {BiImageAdd} from 'react-icons/bi';
import {MdLabelOutline} from 'react-icons/md';
import {IconButton} from 'components/Button';

export const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const buttonIcon = css`
  font-size: 1.8rem;
  color: ${({theme}) => theme.colors['orange.50']};

  ${IconButton}:disabled
  & {
    color: ${({theme}) => lighten(0.1, theme.colors['orange.50'])};
  }
`;

export const AttachmentButtonImageIcon = styled(BiImageAdd)`
  ${buttonIcon}
`;

export const AttachmentButtonLabelIcon = styled(MdLabelOutline)`
  ${buttonIcon}
`;

export const AttachmentGroup = styled.div`
  display: flex;

  & > ${IconButton}:not(:last-child) {
    margin-right: 0.6rem;
  }
`;

export const FileInputHidden = styled.input`
  display: none;
`;
