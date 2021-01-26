import styled, {css} from 'styled-components';
import {
  TiArrowDownThick,
  TiArrowDownOutline,
  TiArrowUpThick,
  TiArrowUpOutline
} from 'react-icons/ti';

export const PostControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
  width: 30px;
`;

export const buttonIcon = css`
  font-size: 2rem;
  color: ${({theme}) => theme.colors['orange.50']};
  display: block;
`;

export const UpvoteIconFill = styled(TiArrowUpThick)`
  ${buttonIcon}
`;

export const DownvoteIconFill = styled(TiArrowDownThick)`
  ${buttonIcon}
`;

export const UpvoteIconDefault = styled(TiArrowUpOutline)`
  ${buttonIcon}
`;

export const DownvoteIconDefault = styled(TiArrowDownOutline)`
  ${buttonIcon}
`;

export const VoteStats = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({theme}) => theme.colors['black.150']};
  display: inline-block;
  margin: 5px 0;
`;
