import ReactModal from 'react-modal';
import 'normalize.css';
import 'focus-visible/dist/focus-visible.min.js';
import 'fontsource-inter/400-normal.css';
import 'fontsource-inter/500-normal.css';
import 'fontsource-inter/700-normal.css';

import Navigation from 'features/navigation';
import HotTopics from 'features/hotTopics';
import Layout from 'components/Layout';
import {AuthProvider} from 'utils/auth';
import {UserProvider} from 'utils/user';
import {GlobalStyle} from 'utils/styles/Global';
import {ThemeProvider} from 'utils/styles/Theme';
import GlobalSWRConfig from 'utils/swr';

ReactModal.setAppElement('#__next');

function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <GlobalSWRConfig>
        <AuthProvider>
          <UserProvider>
            <Navigation />
            <Layout>
              <Component {...pageProps} />
              <HotTopics />
            </Layout>
          </UserProvider>
        </AuthProvider>
      </GlobalSWRConfig>
    </ThemeProvider>
  );
}

export default MyApp;
