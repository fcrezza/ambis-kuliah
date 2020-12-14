import Link from 'next/link';
import styled from 'styled-components';
import {darken, lighten} from 'polished';

import useActiveRoute from './useActiveRoute';

const DesktopLink = styled.a`
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

export const MobileLink = styled.a`
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

export function DesktopNavLink({children, href}) {
  const {isActive} = useActiveRoute(href);

  return (
    <Link href={href} passHref>
      <DesktopLink isActive={isActive}>{children}</DesktopLink>
    </Link>
  );
}

export function MobileNavLink({href, children}) {
  const {isActive} = useActiveRoute(href);

  return (
    <Link href={href} passHref>
      <MobileLink isActive={isActive}>{children}</MobileLink>
    </Link>
  );
}
