import Modal from 'react-modal';

import 'normalize.css';
import 'focus-visible/dist/focus-visible.min.js';
import 'fontsource-inter/400-normal.css';
import 'fontsource-inter/500-normal.css';
import 'fontsource-inter/700-normal.css';

import Layout from 'components/Layout';
import Navigation from 'components/Navigation';
import HotTopics from 'components/HotTopics';
import WritePostModal from 'components/WritePostModal';
import {GlobalStyle} from 'utils/styles/Global';
import {ThemeProvider} from 'utils/styles/Theme';

Modal.setAppElement('#__next');

function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Navigation />
      <WritePostModal />
      <Layout>
        <Component {...pageProps} />
        <HotTopics />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
