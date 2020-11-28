import {useRouter} from 'next/router';
import styled from 'styled-components';

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
    padding: 40px 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 40px 1.5rem;
  }
`;

function Layout({children}) {
  const router = useRouter();
  const isShowed = !['/', '/topics'].includes(router.pathname);

  if (isShowed) {
    return <LayoutContainer>{children}</LayoutContainer>;
  }

  return children;
}

export default Layout;
