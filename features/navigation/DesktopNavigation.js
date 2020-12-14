import Link from 'next/link';
import styled from 'styled-components';

import {DesktopNavLink} from './NavLink';
import {Button} from 'components/Button';

const DesktopContainer = styled.div`
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
    ${({isShowed}) => (isShowed ? 'display: none' : 'padding: 40px 50px')}
  }

  @media screen and (max-width: 480px) {
    padding: 40px 1.5rem;
  }
`;

const LogoLink = styled.a`
  text-decoration: none;
`;

const LogoImage = styled.img`
  width: 200px;
  display: block;

  @media screen and (max-width: 480px) {
    width: 180px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 2.5rem;
  }
`;

function DesktopNavigation({isShowed, isAuth, onClickWrite}) {
  return (
    <DesktopContainer isShowed={isShowed}>
      <Link href="/" passHref>
        <LogoLink>
          <LogoImage src="/images/logo.svg" alt="logo" />
        </LogoLink>
      </Link>
      {isShowed ? (
        <DesktopNav>
          <DesktopNavLink href="/home">Beranda</DesktopNavLink>
          <DesktopNavLink href="/explore">Jelajahi</DesktopNavLink>
          {isAuth && (
            <DesktopNavLink href="/profile/balde_alejandro">
              Profil
            </DesktopNavLink>
          )}
          {isAuth && <Button onClick={onClickWrite}>Tulis</Button>}
        </DesktopNav>
      ) : null}
    </DesktopContainer>
  );
}

export default DesktopNavigation;
