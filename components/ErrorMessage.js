import styled from 'styled-components';
import {ErrorMessage} from '@hookform/error-message';

const ErrorWrapper = styled.p`
  color: ${({theme}) => theme.colors['red.50']};
  font-size: 1rem;
  margin: 1rem 0;
`;

function CustomErrorMessage({errors, name}) {
  return <ErrorMessage as={ErrorWrapper} errors={errors} name={name} />;
}

export default CustomErrorMessage;
