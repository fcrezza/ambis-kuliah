import {Button} from 'components/Button';
import {useRouter} from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 3rem;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 2rem;
  margin: 0 0 2rem;
  text-transform: capitalize;
`;

const Description = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1rem;
  margin: 0 0 3rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  & > button:first-child {
    margin-bottom: 1rem;
  }
`;

function AuthReminder() {
  const {push} = useRouter();

  const onClickLogin = () => {
    push('/login');
  };

  const onClickSignup = () => {
    push('/signup');
  };

  return (
    <Container>
      <Title>Gabung dulu yuk!</Title>
      <Description>
        Bergabung sekarang agar dapat berinteraksi dengan mahasiswa lain
      </Description>
      <ButtonGroup>
        <Button onClick={onClickLogin} block>
          Masuk
        </Button>
        <Button variant="outline" onClick={onClickSignup} block>
          Daftar
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default AuthReminder;
