import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {FaRegCompass} from 'react-icons/fa';
import {HiOutlineHome} from 'react-icons/hi';

import Search from 'components/Search';
import {Button, IconButton} from 'components/Button';
import {useAuth} from 'utils/auth';

const DesktopContainer = styled.div`
  padding: 1rem;
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
  color: ${({theme}) => theme.colors['black.100']};
`;

const ExploreIcon = styled(FaRegCompass)`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.8rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

function DesktopNavigation({onClickWrite, onClickLogin}) {
  const {userData} = useAuth();
  const isAuth = Object.keys(userData).length;

  return (
    <DesktopContainer>
      <Wrapper>
        <Link href="/" passHref>
          <LogoLink>
            <LogoImage src="/images/logo.svg" alt="logo" />
          </LogoLink>
        </Link>
        <NavigationSearch />
      </Wrapper>
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
        {!isAuth && <Button onClick={onClickLogin}>Masuk</Button>}
      </NavigationLinkContainer>
    </DesktopContainer>
  );
}

function NavigationSearch() {
  const {push, pathname, query} = useRouter();
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    if (query.keywords && pathname.startsWith('/search')) {
      setSearchValue(query.keywords);
      return;
    }

    if (searchValue && !pathname.startsWith('/search')) {
      setSearchValue('');
    }
  }, [pathname, query]);

  const onChangeSearch = e => setSearchValue(e.target.value);

  const onSearch = () => {
    if (!searchValue) {
      return;
    }

    push({
      pathname: '/search',
      query: {
        keywords: searchValue
      }
    });
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
