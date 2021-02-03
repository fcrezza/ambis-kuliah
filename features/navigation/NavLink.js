import Link from 'next/link';
import styled from 'styled-components';
import {darken} from 'polished';

import useActiveRoute from './useActiveRoute';

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

export function MobileNavLink({href, children}) {
  const {isActive} = useActiveRoute(href);

  return (
    <Link href={href} passHref>
      <MobileLink isActive={isActive}>{children}</MobileLink>
    </Link>
  );
}
