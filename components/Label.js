import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin: 0;
  font-size: 1rem;
  color: ${({theme}) => theme.colors['black.50']};
`;

export default Label;
