import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {lighten} from 'polished';

import {Button} from './Button';

const Container = styled.div`
  padding: 40px 100px;
  z-index: 999;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1024px) {
    padding: 40px 70px;
  }

  @media screen and (max-width: 768px) {
    padding: 40px 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 40px 1.5rem;
  }
`;

const Logo = styled.a`
  text-decoration: none;

  img {
    width: 200px;
    display: block;

    @media screen and (max-width: 480px) {
      width: 180px;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 2.5rem;
  }
`;

const NavItem = styled.a`
  padding: 0.6rem 0.8rem;
  border-radius: 5px;
  font-weight: 500;
  color: ${({theme}) => theme.colors['black.150']};
  text-decoration: none;
  background-color: ${({theme, isActive}) =>
    isActive ? lighten(0.2, theme.colors['orange.50']) : 'transparent'};
  font-size: 1.2rem;

  &:hover,
  &:focus {
    background-color: ${({theme, isActive}) =>
      !isActive && theme.colors['gray.50']};
  }
`;

function Navigation() {
  const router = useRouter();
  const isShowed = !['/', '/topics'].includes(router.pathname);

  const onClick = () => {
    router.push(`${router.pathname}?compose=true`, router.pathname, {
      shallow: true
    });
  };

  return (
    <Container>
      <Link href="/" passHref>
        <Logo>
          <img src="/images/logo.svg" alt="logo" />
        </Logo>
      </Link>
      {isShowed ? (
        <Nav>
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/explore">Eksplor</NavLink>
          <NavLink href="/profile">Profil</NavLink>
          <Button onClick={onClick}>Tulis</Button>
        </Nav>
      ) : null}
    </Container>
  );
}

function NavLink({children, href}) {
  const {pathname} = useRouter();
  return (
    <Link href={href} passHref>
      <NavItem isActive={pathname === href}>{children}</NavItem>
    </Link>
  );
}

export default Navigation;
