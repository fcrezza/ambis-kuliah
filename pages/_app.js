import ReactModal from 'react-modal';
import 'normalize.css';
import 'focus-visible/dist/focus-visible.min.js';
import 'fontsource-inter/400-normal.css';
import 'fontsource-inter/500-normal.css';
import 'fontsource-inter/700-normal.css';
import {enableES5} from 'immer';

import Navigation from 'features/navigation';
import Init from 'features/Init';
import Layout from 'components/Layout';
import {GlobalStyle} from 'utils/styles/Global';
import {ThemeProvider} from 'utils/styles/Theme';
import GlobalSWRConfig from 'utils/swr';

ReactModal.setAppElement('#__next');
enableES5();

function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <GlobalSWRConfig>
        <Init>
          <Navigation />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Init>
      </GlobalSWRConfig>
    </ThemeProvider>
  );
}

export default MyApp;
