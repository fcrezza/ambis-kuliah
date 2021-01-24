import Link from 'next/link';
import styled from 'styled-components';

import {DesktopNavLink} from './NavLink';
import {Button} from 'components/Button';
import {useUser} from 'utils/user';

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

function DesktopNavigation({isShowed, onClickWrite}) {
  const {userData} = useUser();
  const isAuth = Object.keys(userData).length;

  return (
    <DesktopContainer isShowed={isShowed}>
      <Link href="/" passHref>
        <LogoLink>
          <LogoImage src="/images/logo.svg" alt="logo" />
        </LogoLink>
      </Link>
      {isShowed ? (
        <DesktopNav>
          {isAuth ? (
            <DesktopNavLink href="/home">Beranda</DesktopNavLink>
          ) : null}
          <DesktopNavLink href="/explore">Jelajahi</DesktopNavLink>
          {isAuth ? (
            <>
              <DesktopNavLink href={`/profile/${userData.username}`}>
                Profil
              </DesktopNavLink>
              <Button onClick={onClickWrite}>Tulis</Button>
            </>
          ) : null}
        </DesktopNav>
      ) : null}
    </DesktopContainer>
  );
}

export default DesktopNavigation;
