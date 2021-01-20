import styled from 'styled-components';

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
