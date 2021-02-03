import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {FaRegCompass} from 'react-icons/fa';
import {HiOutlineHome} from 'react-icons/hi';

import Search from 'components/Search';
import {Button, IconButton} from 'components/Button';
import {useUser} from 'utils/user';

const DesktopContainer = styled.div`
  padding: 20px;
  z-index: 999;
  max-width: 1144px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors['white.50']};
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
  width: 195px;
  display: block;

  @media screen and (max-width: 480px) {
    width: 180px;
  }
`;

const SearchContainer = styled.div`
  margin: 0 2rem;
  width: 500px;
`;

const NavigationLinkContainer = styled.nav`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 1.7rem;
  }
`;

const AvatarContainer = styled.a`
  display: inline-block;
  text-decoration: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  overflow: hidden;

  &:focus,
  &:hover {
    box-shadow: 0 0 10px ${({theme}) => theme.colors['orange.50']};
  }
`;

const Avatar = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors['gray.150']};
  background-image: ${({imageUrl}) => `url(${imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const HomeIcon = styled(HiOutlineHome)`
  font-size: 2rem;
  color: ${({theme}) => theme.colors['orange.50']};
`;

const ExploreIcon = styled(FaRegCompass)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 1.8rem;
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
        <>
          <NavigationSearch />
          <NavigationLinkContainer>
            {isAuth ? (
              <Link href="/home" passHref>
                <IconButton as="a">
                  <HomeIcon />
                </IconButton>
              </Link>
            ) : null}
            <Link href="/explore" passHref>
              <IconButton as="a">
                <ExploreIcon />
              </IconButton>
            </Link>
            {isAuth ? (
              <>
                <Link href={`/profile/${userData?.username}`} passHref>
                  <AvatarContainer>
                    <Avatar imageUrl={userData?.avatar.url} />
                  </AvatarContainer>
                </Link>
                <Button onClick={onClickWrite}>Tulis</Button>
              </>
            ) : null}
          </NavigationLinkContainer>
        </>
      ) : null}
    </DesktopContainer>
  );
}

function NavigationSearch() {
  const router = useRouter();
  const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearch = e => setSearchValue(e.target.value);

  const onSearch = () => {
    if (!searchValue) {
      return;
    }

    console.log(searchValue);
  };

  return (
    <SearchContainer>
      <Search
        placeholder="Cari diskusi"
        value={searchValue}
        onChange={onChangeSearch}
        onSearch={onSearch}
      />
    </SearchContainer>
  );
}

export default DesktopNavigation;
