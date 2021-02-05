import styled from 'styled-components';

const LayoutContainer = styled.div`
  max-width: 1144px;
  margin: 0 auto;
  padding: 20px 0 0;
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
  return <LayoutContainer>{children}</LayoutContainer>;
}

export default Layout;