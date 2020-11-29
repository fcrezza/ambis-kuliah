import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {lighten, darken} from 'polished';
import {FaRegCompass} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';

import {Button} from './Button';

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

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 2.5rem;
  }
`;

const DesktopNavItem = styled.a`
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

const MobileContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileNavItem = styled.a`
  background: ${({theme, isActive}) =>
    isActive
      ? darken(0.08, theme.colors['orange.50'])
      : theme.colors['orange.50']};
  flex: 1;
  text-decoration: none;
  display: inline-block;
  padding: 1rem;
  text-align: center;

  svg {
    font-size: 2rem;
    color: ${({theme}) => theme.colors['white.50']};
  }
`;

const MobileNavButton = styled.button`
  border: 0;
  cursor: pointer;
`;

function Navigation() {
  const router = useRouter();
  const isShowed = !['/', '/topics'].includes(router.pathname);
  const isAuth = true;

  const onClickWrite = () => {
    router.push(`${router.pathname}?compose=true`, router.pathname, {
      shallow: true
    });
  };

  return (
    <>
      <DesktopNavigation
        isShowed={isShowed}
        isAuth={isAuth}
        onClickWrite={onClickWrite}
      />
      <MobileNavigation
        isShowed={isShowed}
        isAuth={isAuth}
        onClickWrite={onClickWrite}
      />
    </>
  );
}

function DesktopNavigation({isShowed, isAuth, onClickWrite}) {
  return (
    <DesktopContainer isShowed={isShowed}>
      <Link href="/" passHref>
        <Logo>
          <img src="/images/logo.svg" alt="logo" />
        </Logo>
      </Link>
      {isShowed ? (
        <DesktopNav>
          <DesktopNavLink href="/home">Home</DesktopNavLink>
          <DesktopNavLink href="/explore">Eksplor</DesktopNavLink>
          {isAuth && <DesktopNavLink href="/profile">Profil</DesktopNavLink>}
          {isAuth && <Button onClick={onClickWrite}>Tulis</Button>}
        </DesktopNav>
      ) : null}
    </DesktopContainer>
  );
}

function MobileNavigation({isShowed, isAuth, onClickWrite}) {
  if (isShowed) {
    return (
      <MobileContainer>
        {isAuth && (
          <MobileNavItem as={MobileNavButton} onClick={onClickWrite}>
            <Write />
          </MobileNavItem>
        )}
        <MobileNavLink href="/home">
          <AiOutlineHome />
        </MobileNavLink>
        <MobileNavLink href="/explore">
          <FaRegCompass />
        </MobileNavLink>
        {isAuth && (
          <MobileNavLink href="/profile">
            <Profile />
          </MobileNavLink>
        )}
      </MobileContainer>
    );
  }

  return null;
}

function MobileNavLink({href, children}) {
  const {pathname} = useRouter();
  return (
    <Link href={href} passHref>
      <MobileNavItem isActive={pathname === href}>{children}</MobileNavItem>
    </Link>
  );
}

function DesktopNavLink({children, href}) {
  const {pathname} = useRouter();
  return (
    <Link href={href} passHref>
      <DesktopNavItem isActive={pathname === href}>{children}</DesktopNavItem>
    </Link>
  );
}

function Write() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.65 20.5699L11.8513 19.9349L25.105 6.52243C25.2095 6.4153 25.2678 6.27135 25.267 6.12166C25.2663 5.97198 25.2068 5.82858 25.1013 5.72243L24.3075 4.91993C24.2562 4.86723 24.1949 4.82527 24.1272 4.7965C24.0596 4.76774 23.9868 4.75274 23.9133 4.75239C23.8397 4.75204 23.7669 4.76635 23.6989 4.79447C23.631 4.82259 23.5693 4.86397 23.5175 4.91618L10.2988 18.2937L9.64875 20.5687L9.65 20.5699ZM25.8788 3.32993L26.6725 4.13368C27.7675 5.24243 27.7775 7.03118 26.6925 8.12868L13.035 21.9512L8.33 23.3062C8.04275 23.3866 7.73533 23.3497 7.4752 23.2037C7.21508 23.0577 7.0235 22.8145 6.9425 22.5274C6.88223 22.321 6.88136 22.1018 6.94 21.8949L8.30875 17.0949L21.93 3.30868C22.189 3.04788 22.4974 2.84126 22.8371 2.70087C23.1768 2.56048 23.541 2.48914 23.9086 2.491C24.2761 2.49286 24.6396 2.56789 24.9779 2.71171C25.3162 2.85553 25.6224 3.06527 25.8788 3.32868V3.32993ZM11.48 4.77118C12.1 4.77118 12.6025 5.27993 12.6025 5.90743C12.6035 6.05576 12.5752 6.20284 12.5193 6.34025C12.4634 6.47765 12.381 6.60269 12.2768 6.70822C12.1725 6.81375 12.0485 6.89769 11.9118 6.95525C11.7751 7.01281 11.6283 7.04286 11.48 7.04368H6.99C5.75 7.04368 4.745 8.06118 4.745 9.31493V22.9474C4.745 24.2024 5.75 25.2199 6.99 25.2199H20.46C21.7 25.2199 22.7063 24.2024 22.7063 22.9474V18.4037C22.7063 17.7762 23.2088 17.2674 23.8288 17.2674C24.4488 17.2674 24.9513 17.7762 24.9513 18.4049V22.9474C24.9513 25.4574 22.94 27.4924 20.46 27.4924H6.99C4.51 27.4924 2.5 25.4574 2.5 22.9474V9.31493C2.5 6.80618 4.51 4.77118 6.99 4.77118H11.48Z"
        fill="white"
      />
    </svg>
  );
}

function Profile() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 14.1667C16.1537 14.1667 17.2815 13.8246 18.2408 13.1836C19.2001 12.5426 19.9477 11.6316 20.3893 10.5657C20.8308 9.49975 20.9463 8.32687 20.7212 7.19531C20.4961 6.06375 19.9406 5.02435 19.1247 4.20855C18.3089 3.39274 17.2695 2.83717 16.138 2.61209C15.0064 2.38701 13.8335 2.50253 12.7676 2.94404C11.7017 3.38555 10.7907 4.13322 10.1497 5.09251C9.50874 6.0518 9.16663 7.17961 9.16663 8.33334C9.16663 9.88043 9.78121 11.3642 10.8752 12.4581C11.9691 13.5521 13.4529 14.1667 15 14.1667ZM15 4.16667C15.824 4.16667 16.6296 4.41104 17.3148 4.86888C18 5.32672 18.5341 5.97746 18.8495 6.73882C19.1648 7.50018 19.2473 8.33796 19.0866 9.14621C18.9258 9.95447 18.529 10.6969 17.9462 11.2796C17.3635 11.8623 16.6211 12.2592 15.8128 12.4199C15.0046 12.5807 14.1668 12.4982 13.4054 12.1828C12.6441 11.8675 11.9933 11.3334 11.5355 10.6482C11.0777 9.96301 10.8333 9.15742 10.8333 8.33334C10.8333 7.22827 11.2723 6.16846 12.0537 5.38706C12.8351 4.60566 13.8949 4.16667 15 4.16667Z"
        fill="white"
      />
      <path
        d="M25.3916 20.3084C24.0552 18.8959 22.4448 17.7708 20.6587 17.0019C18.8727 16.233 16.9486 15.8364 15.0041 15.8364C13.0596 15.8364 11.1355 16.233 9.34951 17.0019C7.56348 17.7708 5.95304 18.8959 4.61663 20.3084C4.32689 20.6179 4.16597 21.0261 4.16663 21.4501V25.8334C4.16663 26.2754 4.34222 26.6994 4.65478 27.0119C4.96734 27.3245 5.39127 27.5001 5.83329 27.5001H24.1666C24.6087 27.5001 25.0326 27.3245 25.3451 27.0119C25.6577 26.6994 25.8333 26.2754 25.8333 25.8334V21.4501C25.8362 21.0273 25.6783 20.6192 25.3916 20.3084ZM24.1666 25.8334H5.83329V21.4417C7.01432 20.1981 8.43604 19.2079 10.0119 18.5312C11.5878 17.8544 13.2849 17.5055 15 17.5055C16.715 17.5055 18.4121 17.8544 19.988 18.5312C21.5639 19.2079 22.9856 20.1981 24.1666 21.4417V25.8334Z"
        fill="white"
      />
    </svg>
  );
}

export default Navigation;
