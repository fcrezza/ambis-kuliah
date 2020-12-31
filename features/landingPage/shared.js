import NextLink from 'next/link';
import styled, {css} from 'styled-components';

const outline = css`
  border: ${({theme}) => `1px solid ${theme.colors['orange.50']}`};
  color: ${({theme}) => theme.colors['orange.50']};
`;

const defaultStyle = css`
  background-color: ${({theme}) => theme.colors['orange.50']};
  color: ${({theme}) => theme.colors['white.50']};
`;

const Link = styled.a`
  text-decoration: none;
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  font-weight: 700;
  font-size: 1.2rem;
  ${({variant}) => (variant === 'outline' ? outline : defaultStyle)};
`;

const LinkGroup = styled.div`
  & > a:first-child {
    margin-right: 1rem;
  }
`;

function SignupLink() {
  return (
    <NextLink href="/signup" passHref>
      <Link>Daftar</Link>
    </NextLink>
  );
}

function LoginLink() {
  return (
    <NextLink href="/login" passHref>
      <Link variant="outline">Masuk</Link>
    </NextLink>
  );
}

export function AuthLink() {
  return (
    <LinkGroup>
      <SignupLink />
      <LoginLink />
    </LinkGroup>
  );
}
