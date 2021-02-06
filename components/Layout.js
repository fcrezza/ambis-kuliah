import styled, {useTheme} from 'styled-components';
import {Toaster} from 'react-hot-toast';

import HotTopics from 'features/hotTopics';

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

const MainContainer = styled.div`
  flex: 1;
`;

function Layout({children}) {
  const {colors} = useTheme();

  return (
    <LayoutContainer>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: colors['black.100'],
            color: colors['white.50']
          }
        }}
      />
      <MainContainer>{children}</MainContainer>
      <HotTopics />
    </LayoutContainer>
  );
}

export default Layout;
