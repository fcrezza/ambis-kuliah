import styled from 'styled-components';

import useLayout from './useLayout';

const LayoutContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 1024px) {
    padding: 40px 70px;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

function Layout({children}) {
  const {isShowed} = useLayout();

  if (isShowed) {
    return <LayoutContainer>{children}</LayoutContainer>;
  }

  return children;
}

export default Layout;
