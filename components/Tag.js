import styled from 'styled-components';

export const Tag = styled.a.attrs({
  className: 'tag'
})`
	text-decoration: none;
	padding: 0.3rem;
	border-radius: 5px;
	border: 1px solid ${({theme}) => theme.colors['orange.50']};
	font-size: 0.8rem;
	font-weight: 500;
	color: ${({theme}) => theme.colors['orange.50']};

	&:focus, &:hover {
		background: ${({theme}) => theme.colors['gray.50']}}
	}
`;

export const TagGroup = styled.div`
  & > .tag:not(:last-child) {
    margin-right: 10px;
  }
`;
